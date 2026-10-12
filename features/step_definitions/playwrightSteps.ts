import { Given, Then, When } from "@cucumber/cucumber";
import { expect, type Page } from "@playwright/test";
import { PlaywrightHomePage } from "../../pageobjects/PlaywrightHomePage";

let playwrightHomePage: PlaywrightHomePage;

Given("I navigate to {string}", async function (url: string) {
  playwrightHomePage = new PlaywrightHomePage(this.page as Page);
  await playwrightHomePage.navigateTo(url);
});

Then(
  "the page title should contain {string}",
  async function (expectedTitle: string) {
    const pageTitle = await playwrightHomePage.getPageTitle();
    expect(pageTitle).toContain(expectedTitle);
  },
);

When("I click the link with href {string}", async function (href: string) {
  const link = playwrightHomePage.page.locator(`a[href="${href}"]`).first();
  await link.waitFor({ state: "visible", timeout: 10000 });
  const linkText = await link.innerText();
  (this as any).savedLinkText = linkText;
  await link.click();
});

Then("I can see the text {string}", async function (expectedText: string) {
  // await playwrightHomePage.page.waitForTimeout(1500);
  const text = playwrightHomePage.getTextLocator(expectedText);
  await expect(text).toBeVisible();
});

When(
  "I select the {string} from the main navigation bar",
  async function (navItem: string) {
    const navItemLocator = playwrightHomePage.getMainNavItem(navItem);
    await navItemLocator.click();
  },
);

When(
  "I select {string} from the main navigation bar dropdown",
  async function (dropdownItem: string) {
    await playwrightHomePage.selectMainNavDropdownItem(dropdownItem);
  },
);

When(
  "I extract the text from the link with index {int} and store it",
  async function (index: number) {
    await playwrightHomePage.page.waitForLoadState("domcontentloaded");
    const link = playwrightHomePage.page.locator("a").nth(index);
    await link.waitFor({ state: "visible", timeout: 10000 });
    const linkText = (await link.innerText()).trim();
    const lastWord = linkText.split(" ").pop() ?? linkText;
    (this as any).savedLinkText = lastWord;
    console.log(`Extracted text: ${linkText}, last word: ${lastWord}`);
    (this as any).savedLinkIndex = index;
  },
);

When("I extract the text from the header", async function () {
  const header = playwrightHomePage.installingPlaywrightHeader;
  await header.waitFor({ state: "visible", timeout: 10000 });
  const headerText = (await header.innerText()).trim();
  console.log(`Extracted header text: ${headerText}`);
});

// Then("I can see the text on the page", async function () {
//   const lastWord = (this as any).savedLinkText;
//   const header = playwrightHomePage.installingPlaywrightHeader;
//   await header.waitFor({ state: "visible", timeout: 10000 });
//   await expect(header).toContainText(lastWord);
//   const index = (this as any).savedLinkIndex;
//   const link = playwrightHomePage.page.locator("a").nth(index);
//   await link.click({ timeout: 10000 });
// });
