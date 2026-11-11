import type { Locator, Page } from "@playwright/test";

export class OrdersPage {
  readonly rows: Locator;
  readonly orderIdDetails: Locator;

  constructor(public page: Page) {
    this.rows = page.locator("tbody tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  getOrderRow(orderId: string) {
    return this.rows.filter({
      has: this.page.locator("th", { hasText: orderId }),
    });
  }

  async viewOrder(orderId: string) {
    await this.getOrderRow(orderId).getByRole("button", { name: "View" }).click();
  }
}
