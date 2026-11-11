import type { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly countryInput: Locator;
  readonly countryOptions: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmationHeader: Locator;
  readonly orderIdLabel: Locator;

  constructor(public page: Page) {
    this.countryInput = page.locator("[placeholder*='Country']");
    this.countryOptions = page.locator(".ta-results button");
    this.placeOrderButton = page.getByText("Place Order");
    this.confirmationHeader = page.locator(".hero-primary");
    this.orderIdLabel = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async selectCountry(countryName: string) {
    // The country dropdown only appears after typing, so type the first letters
    await this.countryInput.pressSequentially(countryName.slice(0, 3).toLowerCase(), {
      delay: 100,
    });
    await this.countryOptions
      .filter({ hasText: new RegExp(`^\\s*${countryName}\\s*$`) })
      .click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  /** Reads the order id from the thank-you page, e.g. " | 6af4... | " -> "6af4..." */
  async getOrderId() {
    const text = (await this.orderIdLabel.first().textContent()) ?? "";
    return text.replace(/\|/g, "").trim();
  }
}
