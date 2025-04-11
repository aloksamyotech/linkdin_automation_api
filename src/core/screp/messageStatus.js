export const checkReplyStatus = async (lead,page) => {
    try {
      if (!lead?.profile) {
        return { success: false, message: "Lead profile URL is missing!" };
      }
  
      console.log(`Navigating to lead profile: ${lead.profile}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
  
      await page.goto(lead.profile, {
        waitUntil: "domcontentloaded",
      });
  
      console.log("✅ Successfully navigated to profile!");
      await page.waitForSelector(".artdeco-card");
  
      const buttonData = await page.evaluate(() => {
        const firstCard = document.querySelector(".artdeco-card");
        if (!firstCard)
          return {
            isMessage: false,
            isPending: false,
            isConnect: false,
            messageButtonIndex: -1,
          };
  
        const buttons = Array.from(firstCard.querySelectorAll("button"));
  
        const messageButtonIndex = buttons.findIndex(
          (button) =>
            button.innerText.includes("Message") &&
            button.hasAttribute("aria-label")
        );
  
        return {
          isMessage: messageButtonIndex !== -1,
          isPending: buttons.some(
            (button) =>
              button.innerText.includes("Pending") &&
              button.hasAttribute("aria-label")
          ),
          isConnect: buttons.some(
            (button) =>
              button.innerText.includes("Connect") &&
              button.hasAttribute("aria-label")
          ),
          messageButtonIndex:
            messageButtonIndex !== -1 ? messageButtonIndex : null,
        };
      });
  
      const { isMessage, isPending, isConnect, messageButtonIndex } = buttonData;
  
      if (!isMessage || isPending || isConnect) {
        console.log(
          "❌ Cannot check messages (Not Connected or Request Pending)"
        );
        return {
          success: false,
          message:
            "Cannot check messages. Lead is not connected or request is pending.",
        };
      }
  
      if (messageButtonIndex !== null) {
        const buttons = await page.$$(".artdeco-card button");
        if (buttons[messageButtonIndex]) {
          await buttons[messageButtonIndex].click();
          console.log("✅ Message button clicked!");
        } else {
          console.log("⚠️ Message button not found.");
          return { success: false, message: "Message button not found." };
        }
      } else {
        console.log("⚠️ Message button not found.");
        return { success: false, message: "Message button not found." };
      }
  
      // Wait for the message list container to load
      await page.waitForSelector(".msg-s-message-list-content");
  
      // Extract the latest message
      const lastMessage = await page.evaluate(() => {
        const messages = document.querySelectorAll(".msg-s-event-listitem");
        if (!messages.length) return null; // No messages found
  
        const lastMsg = messages[messages.length - 1]; // Get the last message
        const senderName = lastMsg
          .querySelector(".msg-s-message-group__name")
          ?.innerText?.trim();
        const messageText = lastMsg
          .querySelector(".msg-s-event-listitem__body")
          ?.innerText?.trim();
  
        return { senderName, messageText };
      });
  
      if (lastMessage) {
        console.log(`📝 Last message from: ${lastMessage.senderName}`);
        console.log(`💬 Message: ${lastMessage.messageText}`);
  
        if (lastMessage.senderName !== "Vikas Chouhan") {
          // Replace with your LinkedIn profile name
          console.log("✅ Lead has replied!");
          return {
            success: true,
            message: "Lead has replied!",
            reply: lastMessage.messageText,
          };
        } else {
          console.log("❌ No reply from the lead yet.");
          return { success: false, message: "No reply from the lead yet." };
        }
      } else {
        console.log("⚠️ No messages found.");
        return { success: false, message: "No messages found." };
      }
    } catch (error) {
      console.log("❌ Error:", error);
      return {
        success: false,
        message: "An error occurred while checking replies.",
      };
    }
  };