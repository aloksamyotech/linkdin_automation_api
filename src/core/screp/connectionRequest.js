export const sendConnection = async (lead, page) => {
  if (!lead?.profile) {
    return { success: false, message: "Lead profile URL is missing!" };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await page.goto(lead.profile, {
      waitUntil: "domcontentloaded",
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector(".artdeco-button--primary");

    const connectButtons = await page.$$eval(
      ".artdeco-button--primary",
      (buttons) => {
        return buttons
          .filter((button) => {
            const ariaLabel = button.getAttribute("aria-label");
            return (
              ariaLabel &&
              ariaLabel.includes("Invite") &&
              ariaLabel.includes("to connect")
            );
          })
          .map((button) => ({
            buttonText: button.textContent.trim(),
            buttonId: button.id,
            buttonClasses: button.className,
          }));
      }
    );

    if (connectButtons.length > 0) {
      const buttonHandle = await page.$(`#${connectButtons[1].buttonId}`);

      if (buttonHandle) {
        await buttonHandle.click();
        await page.waitForSelector(".artdeco-modal", { timeout: 5000 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await page.waitForSelector(".artdeco-modal__actionbar", {
          timeout: 5000,
        });

        const sendButton = await page.$(
          "button[aria-label='Send without a note']"
        );

        if (sendButton) {
          await sendButton.click();
          return { success: true, message: "Connection request sent!" };
        } else {
          throw new Error(
            "Could not find 'Send without a note' button inside modal."
          );
        }
      } else {
        throw new Error(
          "Could not find the specific 'Connect' button element."
        );
      }
    } else {
      throw new Error("No valid 'Connect' button found.");
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
