export const filterLinkedData = async (user, filterUrl, saveScrapedData) => {
    const browser = await puppeteer.launch({
      headless: false, // Debug mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add proxy if needed
    });
    const page = await browser.newPage();
  
    try {
      page.setDefaultNavigationTimeout(1000000);
      console.log("Logging into LinkedIn...");
      await page.goto("https://www.linkedin.com/login", {
        waitUntil: "domcontentloaded",
      });
  
      await page.type("#username", user.email, { delay: 100 });
      await page.type("#password", user.password, { delay: 100 });
      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  
      console.log("Navigating to the filter URL...", campain_status);
      await page.goto(filterUrl, { waitUntil: "domcontentloaded" });
  
      let pageNumber = 1;
      let isLastPage = false;
      let profiles = [];
  
      while (!isLastPage) {
        console.log(`Scraping page ${pageNumber}...`);
  
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
  
        await new Promise((resolve) => setTimeout(resolve, 3000));
  
        profiles = await page.evaluate(() => {
          const div = document.querySelector(
            'div[class="search-results-container"]'
          );
          const thirdDiv = div.querySelectorAll("div")[2];
          const ulList = thirdDiv.querySelector('ul[role="list"]');
          const liElements = ulList.querySelectorAll("li");
          const data = [];
          liElements.forEach((li) => {
            var item = {
              name: li.querySelector("img")
                ? li.querySelector("img").getAttribute("alt")
                : "",
              image: li.querySelector("img")
                ? li.querySelector("img").getAttribute("src")
                : "",
              profile: li.querySelector("a")
                ? li.querySelector("a").getAttribute("href")
                : "",
              headline: (() => {
                const mb1Div = li.querySelector("div.mb1");
                if (mb1Div) {
                  const secondDiv = mb1Div.querySelector("div:nth-of-type(2)");
                  return secondDiv ? secondDiv.textContent.trim() : "";
                }
                return "";
              })(),
              location: (() => {
                const mb1Div = li.querySelector("div.mb1");
                if (mb1Div) {
                  const secondDiv = mb1Div.querySelector("div:nth-of-type(3)");
                  return secondDiv ? secondDiv.textContent.trim() : "";
                }
                return "";
              })(),
            };
            item = {
              ...item,
              row: JSON.stringify(item),
              // createdBy: user?.userId,
              // campaignStatus: campain_status?.start,
            };
            if (item?.name) data.push(item);
          });
          return data;
        });
        if (profiles?.length > 0) {
          profiles = profiles.map((item) => ({
            ...item,
            campaignStatus: campain_status?.start,
          }));
          await saveScrapedData(profiles);
        }
  
        pageNumber++;
        const nextBtn = await page.evaluate(() => {
          const nextButton = document.getElementsByClassName(
            "artdeco-pagination__button--next"
          );
          return nextButton;
        });
        if (nextBtn) {
          var currentPageUrl = getNextPageUrl(filterUrl, pageNumber);
          await page.goto(currentPageUrl, { waitUntil: "domcontentloaded" });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          if (pageNumber === 50) {
            console.log("No more pages to scrape. Stopping scraping.");
            isLastPage = true;
          }
        } else {
          isLastPage = true;
        }
      }
  
      console.log("Scraping completed.");
      return profiles;
    } catch (error) {
      console.error("Error during scraping:", error);
      await page.screenshot({ path: "error-screenshot.png", fullPage: true });
      return [];
    } finally {
      console.log("Closing browser...");
      await browser.close();
    }
  };

  const getNextPageUrl = (baseUrl, pageNumber) => {
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
  
    params.set("page", pageNumber);
    url.search = params.toString();
    return url.toString();
  };