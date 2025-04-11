const sessionMap = new Map();

export const loginLinkedIn = async (user, page) => {
  try {
    await page.goto("https://www.linkedin.com/feed", {
      waitUntil: "domcontentloaded",
    });

    const isLoggedIn = await page.evaluate(() => {
      return !!document.querySelector("#global-nav");
    });

    if (isLoggedIn) {
      console.log("✅ Session is still active. Skipping login.");
      return { success: true, otpRequired:false, message: 'Already LoggedIn' };
    }

    // Navigate to login page
    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "networkidle2",
    });

    // Fill in login credentials
    await page.type("#username", user.username, { delay: 100 });
    await page.type("#password", user.password, { delay: 100 });

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for navigation or home page element
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    if (page.url().includes('checkpoint/challenge')) {
      console.log("ENTER OTP");
      const sessionId = Date.now().toString();
      sessionMap.set(sessionId, { page });
      return { success:false, otpRequired: true, message: 'Otp Required', sessionId };
    }

    // Recheck login status
    const loggedInAfterLogin = await page.evaluate(() => {
      return !!document.querySelector("#global-nav");
    });

    if (loggedInAfterLogin) {
      console.log("✅ Login successful!");
      return { success:true, otpRequired:false, message: 'Login Successful' };
    } else {
      console.error("❌ Login failed. Check credentials or captcha.");
      return { success:false, otpRequired:false, message: 'Invalid Credential' };
    }
  } catch (error) {
    console.error("❌ Error during LinkedIn login:", error);
    await page.screenshot({ path: `error-${user.Id}.png`, fullPage: true });
    return { success:false, otpRequired:false, message: 'Invalid Credential' };
  }
};

export const verifyOtp = async(linkdinData)=>{
  console.log("linkdinData ; ",linkdinData);
  const { sessionId, otp } = linkdinData;

  const session = sessionMap.get(sessionId);
  console.log("session ' ",session);  
  if (!session) return { success:false, error: 'Session not found' };

  const { page, browser } = session;
  await page.waitForSelector('input[name="pin"]', { timeout: 5000 });

  await page.type('input[name="pin"]', otp, { delay: 500 });
  await page.click('[type="submit"]');
  await page.waitForNavigation();

  if (page.url().includes('/feed/')) {
    sessionMap.delete(sessionId);
    await browser.close();

    return { status: true,message:'Login Successful' };
  } else {
    return { status: false, message: 'Invalid Otp' };
  }
}
