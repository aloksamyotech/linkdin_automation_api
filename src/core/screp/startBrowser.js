import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import { campain_status } from "../common/constant.js";

puppeteer.use(StealthPlugin());

export const startBrowser = async (userId) => {
  const userSessionPath = `./sessions/${userId}`;
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: userSessionPath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const page = await browser.newPage();

  // Set User-Agent and Viewport
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );
  await page.setViewport({ width: 1366, height: 768 });

  return { page, browser };
};
