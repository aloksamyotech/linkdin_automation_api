export const sendMessage = async (lead, page, messageContent) => {
  if (!lead?.profile) {
    return { success: false, message: "Lead profile URL is missing!" };
  }

  try {
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

      // Find the index of the "Message" button
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
          messageButtonIndex !== -1 ? messageButtonIndex : null, // Ensure null if not found
      };
    });

    // Destructure results
    const { isMessage, isPending, isConnect, messageButtonIndex } = buttonData;

    if (!isMessage || isPending || isConnect) {
      console.log("❌ Cannot send message (Not Connected or Request Pending)");
      return {
        success: false,
        message:
          "Cannot send message. Lead is not connected or request is pending.",
      };
    }

    // **Click Message Button if Available**
    if (messageButtonIndex !== null) {
      const buttons = await page.$$(".artdeco-card button"); // Get all buttons inside the card
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
    await page.waitForSelector(".msg-form__contenteditable", { timeout: 5000 });

    // Type the message
    await page.type(".msg-form__contenteditable", messageContent, { delay: 100 });

    // Click Send
    const sendButton = await page
      .waitForSelector(".msg-form__send-button", { timeout: 5000 })
      .catch(() => null);

    if (sendButton) {
      await sendButton.click();
      console.log("✅ Message sent successfully!");
    } else {
      console.log("⚠️ Send button not found.");
      return { success: false, message: "Send button not found." };
    }
  } catch (error) {
    console.log("Error:", error);
    return {
      success: false,
      message: "An error occurred while sending the message.",
    };
  }
};
