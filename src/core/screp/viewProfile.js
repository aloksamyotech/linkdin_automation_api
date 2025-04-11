export const viewProfile = async (lead, page) => {
  if (!lead?.profile) {
    return { success: false, message: "Lead profile URL is missing!" };
  }

  try {
    console.log("Successfully logged in. Navigating to profile...");
    await page.goto(lead.profile, { waitUntil: "networkidle2" });

    return { success: true, message: "Profile viewed successfully!" };
  } catch (error) {
    console.error("Error viewing profile:", error.message);
    return { success: false, message: error.message };
  }
};
