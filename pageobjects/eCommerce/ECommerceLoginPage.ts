import type { Locator, Page } from "@playwright/test";

export class ECommerceLoginPage {
  readonly userEmail: Locator;
  readonly userPassword: Locator;
  readonly loginButton: Locator;

  constructor(public page: Page) {
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.loginButton = page.locator("#login");
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.loginButton.click();
  }
}
