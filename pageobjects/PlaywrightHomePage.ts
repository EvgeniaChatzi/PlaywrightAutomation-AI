import type { Locator, Page } from "@playwright/test";

export class PlaywrightHomePage {
  mainNavLinks: Locator;
  installingPlaywrightHeader: Locator;
  languageSelectorLabel: Locator;

  constructor(public page: Page) {
    this.installingPlaywrightHeader = page.locator("h2#installing-playwright");
    this.mainNavLinks = page.locator(
      ".theme-layout-navbar-left .navbar__item.navbar__link",
    );
    this.languageSelectorLabel = page
      .locator(".navbar__item.dropdown.dropdown--hoverable .navbar__link")
      .first();
  }

  getFooterLink(name: string) {
    return this.page.locator("footer").getByRole("link", { name });
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
