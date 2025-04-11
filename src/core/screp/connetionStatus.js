export const checkConnectionStatus = async (lead, page) => {
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

    const isMessage = await page.evaluate(() => {
      const firstCard = document.querySelector(".artdeco-card");
      if (!firstCard) return false;

      return Array.from(firstCard.querySelectorAll("button")).some(
        (button) =>
          button.innerText.includes("Message") &&
          button.hasAttribute("aria-label")
      );
    });

    // Check if "Pending" button exists inside first .artdeco-card
    const isPending = await page.evaluate(() => {
      const firstCard = document.querySelector(".artdeco-card");
      if (!firstCard) return false;

      return Array.from(firstCard.querySelectorAll("button")).some(
        (button) =>
          button.innerText.includes("Pending") &&
          button.hasAttribute("aria-label")
      );
    });

    // Check if "Connect" button exists inside first .artdeco-card
    const isConnect = await page.evaluate(() => {
      const firstCard = document.querySelector(".artdeco-card");
      if (!firstCard) return false;

      return Array.from(firstCard.querySelectorAll("button")).some(
        (button) =>
          button.innerText.includes("Connect") &&
          button.hasAttribute("aria-label")
      );
    });

    return {
      ConnectButton: isConnect,
      PendingButton: isPending,
      MessageButton: isMessage,
    };
  } catch (error) {
    console.log("Error : ", error);
    return { error: error };
  }
};
