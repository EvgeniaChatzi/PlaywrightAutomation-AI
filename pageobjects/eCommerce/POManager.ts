import type { Page } from "@playwright/test";
import { ECommerceLoginPage } from "./ECommerceLoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";

export class POManager {
  readonly loginPage: ECommerceLoginPage;
  readonly dashboardPage: DashboardPage;
  readonly cartPage: CartPage;
  readonly checkoutPage: CheckoutPage;
  readonly ordersPage: OrdersPage;

  constructor(public page: Page) {
    this.loginPage = new ECommerceLoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.ordersPage = new OrdersPage(page);
  }
}
