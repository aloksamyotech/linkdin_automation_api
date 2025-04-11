export const postLike = async (lead, page) => {
  try {
    if (!lead?.profile) {
      return { success: false, message: "Lead profile URL is missing!" };
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const profileURL = lead.profile.split("?")[0];

    await page.goto(`${profileURL}/recent-activity/all/`, {
      waitUntil: "domcontentloaded",
    });

    console.log("✅ Successfully navigated to profile!");

    // Wait for posts to load
    await page
      .waitForSelector(".scaffold-finite-scroll__content ul li:first-child", {
        timeout: 5000,
      })
      .catch(() => null);
    const firstPost = await page.$(
      ".scaffold-finite-scroll__content ul li:first-child"
    );

    if (!firstPost) {
      console.log("No posts found.");
      return { success: false, message: "No posts found for this lead." };
    }

    // Find all buttons inside the first post
    const buttons = await firstPost.$$("button");

    let likeButton = null;
    for (const button of buttons) {
      const isNotLiked = await button.evaluate(
        (node) => node.getAttribute("aria-pressed") === "false"
      );
      const buttonText = await button.evaluate((node) => {
        const outerSpan = node.querySelector("span");
        const innerSpan = outerSpan ? outerSpan.querySelector("span") : null;
        return innerSpan ? innerSpan.innerText.trim() : "";
      });

      // Ensure the button has "Like" text and is not already liked
      if (isNotLiked && buttonText === "Like") {
        likeButton = button;
        break;
      }
    }

    if (likeButton) {
      await likeButton.click();
      console.log("👍 Liked the most recent post successfully!");
      return {
        success: true,
        message: "Liked the most recent post successfully!",
      };
    }

    console.log("⚠️ Post already liked.");
    return {
      success: false,
      message: "Post already liked.",
    };
  } catch (error) {
    console.log("Error : ", error);
  }
};
