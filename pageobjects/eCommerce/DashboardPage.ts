import type { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly productCards: Locator;
  readonly cartButton: Locator;
  readonly ordersButton: Locator;
  readonly signOutButton: Locator;
  readonly toast: Locator;

  constructor(public page: Page) {
    this.productCards = page.locator(".card-body");
    this.cartButton = page.locator("button[routerlink*='cart']");
    this.ordersButton = page.locator("button[routerlink*='myorders']");
    this.signOutButton = page.getByRole("button", { name: /Sign Out/ });
    this.toast = page.locator("#toast-container");
  }

  getProductCard(productName: string) {
    return this.productCards.filter({
      has: this.page.locator("b", { hasText: productName }),
    });
  }

  async addProductToCart(productName: string) {
    await this.getProductCard(productName)
      .getByRole("button", { name: /Add To Cart/ })
      .click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async openOrders() {
    await this.ordersButton.click();
  }

  async signOut() {
    await this.signOutButton.click();
  }
}
