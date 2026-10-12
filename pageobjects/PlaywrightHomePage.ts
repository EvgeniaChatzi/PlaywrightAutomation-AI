import type { Locator, Page } from "@playwright/test";

export class PlaywrightHomePage {
  playwrightLogo: Locator;
  playwrightText: Locator;
  getStartedButton: Locator;
  mainHeading: Locator;
  mainNavLinks: Locator;
  installingPlaywrightHeader: Locator;

  constructor(public page: Page) {
    this.playwrightLogo = page.locator(".navbar__brand");
    this.playwrightText = page.locator("text=Playwright").first();
    this.getStartedButton = page.locator("text=Get started");
    this.mainHeading = page.locator("h1").first();
    this.installingPlaywrightHeader = page.locator("h2#installing-playwright");
    this.mainNavLinks = page.locator(
      ".theme-layout-navbar-left .navbar__item.navbar__link",
    );
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  getTextLocator(text: string) {
    return this.page.getByText(text, { exact: true }).first();
  }

  getPageTitle() {
    return this.page.title();
  }

  getMainNavItem(itemText: string) {
    return this.mainNavLinks.filter({ hasText: itemText }).first();
  }

  async selectMainNavItem(itemText: string) {
    const navItem = this.getMainNavItem(itemText);
    await navItem.click();
  }

  async selectMainNavDropdownItem(itemText: string) {
    const dropdown = this.page.locator(
      ".navbar__item.dropdown.dropdown--hoverable",
    );
    await dropdown.hover();

    const menuItem = dropdown.locator(".dropdown__menu .dropdown__link", {
      hasText: itemText,
    });
    await menuItem.waitFor({ state: "visible", timeout: 10000 });
    await menuItem.click();
  }
}
