import type { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly checkoutButton: Locator;

  constructor(public page: Page) {
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  getProduct(productName: string) {
    return this.page.locator("h3", { hasText: productName });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
