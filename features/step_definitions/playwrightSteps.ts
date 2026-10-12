import { Given, Then, When } from "@cucumber/cucumber";
import { expect, type Page } from "@playwright/test";
import { PlaywrightHomePage } from "../../pageobjects/PlaywrightHomePage";

const BASE_URL = process.env.BASE_URL ?? "https://playwright.dev";

let playwrightHomePage: PlaywrightHomePage;

Given("I navigate to {string}", async function (path: string) {
  playwrightHomePage = new PlaywrightHomePage(this.page as Page);
  const resolved =
    path === "BASE_URL"
      ? BASE_URL
      : path.startsWith("http")
        ? path
        : `${BASE_URL}${path}`;
  await playwrightHomePage.navigateTo(resolved);
});

Then(
  "the page title should contain {string}",
  async function (expectedTitle: string) {
    await expect
      .poll(async () => playwrightHomePage.page.title(), { timeout: 10000 })
      .toContain(expectedTitle);
  },
);


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


When("I click the {string} button", async function (buttonText: string) {
  const button = playwrightHomePage.page
    .getByRole("link", { name: buttonText })
    .first();
  await button.click();
  await playwrightHomePage.page.waitForURL(/docs\/intro/);
});

Then(
  "the language selector should show {string}",
  async function (language: string) {
    await expect(playwrightHomePage.languageSelectorLabel).toContainText(
      language,
    );
  },
);

Then(
  "the {string} footer link href should contain {string}",
  async function (linkText: string, hrefPart: string) {
    const link = playwrightHomePage.getFooterLink(linkText);
    const href = await link.getAttribute("href");
    expect(href).toContain(hrefPart);
  },
);

When("I extract the text from the header", async function () {
  const header = playwrightHomePage.installingPlaywrightHeader;
  await header.waitFor({ state: "visible", timeout: 10000 });
  const headerText = (await header.innerText()).trim();
  console.log(`Extracted header text: ${headerText}`);
});
