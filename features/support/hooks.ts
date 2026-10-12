import { After, Before, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(30 * 1000);
import { chromium } from "@playwright/test";

Before({ timeout: 60 * 1000 }, async function () {
  // This hook will be executed before each scenario
  console.log("i am first");
  const browser = await chromium.launch({
    headless: false,
  });
  (this as any).browser = browser;
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  (this as any).page = await context.newPage();
});

AfterStep(async function ({ result }: any) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const buffer = await (this as any).page.screenshot();
    await (this as any).page.screenshot({ path: "screenshot1.png" });
    this.attach(buffer.toString("base64"), "base64:image/png");
    console.log("Screenshot logged");
  }
});

After(async function () {
  if ((this as any).page) {
    console.log("Closing browser after scenario");
  }

  if ((this as any).browser) {
    await (this as any).browser.close();
  }
});
