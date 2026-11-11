import { AfterAll, Given, Then, When } from "@cucumber/cucumber";
import { expect, type Page } from "@playwright/test";
import { POManager } from "../../pageobjects/eCommerce/POManager";
import { ECommerceApi } from "../../utils_ts/ECommerceApi";

const CLIENT_URL = process.env.CLIENT_URL ?? "https://rahulshettyacademy.com/client";

function getCredentials() {
  const email = process.env.CLIENT_USER_EMAIL;
  const password = process.env.CLIENT_USER_PASSWORD;
  if (!email || !password) {
    throw new Error("CLIENT_USER_EMAIL and CLIENT_USER_PASSWORD must be set in .env");
  }
  return { email, password };
}

let poManager: POManager;

// One API session (token) shared by the whole run: we log in via API only once,
// the first time a step needs it, and reuse it in every following scenario.
let apiSession: ECommerceApi | undefined;

async function getApiSession() {
  if (!apiSession) {
    const { email, password } = getCredentials();
    apiSession = await ECommerceApi.login(email, password);
    console.log("Logged in via API (token reused for the rest of the run)");
  }
  return apiSession;
}

AfterAll(async function () {
  // Close the shared API session once, after all scenarios have finished
  if (apiSession) {
    await apiSession.dispose();
  }
});

// ---------- Login ----------

Given("I navigate to the eCommerce login page", async function () {
  poManager = new POManager(this.page as Page);
  await poManager.loginPage.goTo(CLIENT_URL);
});

When("I log in with valid credentials", async function () {
  const { email, password } = getCredentials();
  await poManager.loginPage.login(email, password);
});

When(
  "I log in with a valid email and an invalid password {string}",
  async function (password: string) {
    const { email } = getCredentials();
    await poManager.loginPage.login(email, password);
  },
);

Given("I am logged in with valid credentials", async function () {
  const { email, password } = getCredentials();
  await poManager.loginPage.login(email, password);
  await expect(poManager.page).toHaveURL(/dashboard\/dash/);
  await expect(poManager.dashboardPage.productCards.first()).toBeVisible();
});

Given("I am logged in via API", async function () {
  // 1. Get the token from the shared API session (logs in via API only the first time)
  const api = await getApiSession();

  // 2. Put the token into localStorage before the app loads, so the app
  //    treats the browser as already logged in
  await poManager.page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, api.token);

  // 3. Open the app - it should go straight to the dashboard
  await poManager.loginPage.goTo(CLIENT_URL);
  await expect(poManager.page).toHaveURL(/dashboard\/dash/);
  await expect(poManager.dashboardPage.productCards.first()).toBeVisible();
});

Then("I see the toast message {string}", async function (message: string) {
  await expect(poManager.dashboardPage.toast).toContainText(message);
});

Then("I remain on the login page", async function () {
  await expect(poManager.page).toHaveURL(/auth\/login/);
  await expect(poManager.loginPage.loginButton).toBeVisible();
});

// ---------- Dashboard ----------

Then("I am on the dashboard page", async function () {
  await expect(poManager.page).toHaveURL(/dashboard\/dash/);
});

Then(
  "the product {string} is displayed on the dashboard",
  async function (productName: string) {
    await expect(poManager.dashboardPage.getProductCard(productName)).toBeVisible();
  },
);

// ---------- Cart ----------

When("I add the product {string} to the cart", async function (productName: string) {
  await poManager.dashboardPage.addProductToCart(productName);
});

Given(
  "I have added the product {string} to the cart",
  async function (productName: string) {
    await poManager.dashboardPage.addProductToCart(productName);
    await expect(poManager.dashboardPage.toast).toContainText("Product Added To Cart");
    await poManager.dashboardPage.openCart();
    await expect(poManager.cartPage.getProduct(productName)).toBeVisible();
  },
);

When("I open the cart", async function () {
  await poManager.dashboardPage.openCart();
});

Then("the product {string} is displayed in the cart", async function (productName: string) {
  await expect(poManager.cartPage.getProduct(productName)).toBeVisible();
});

Then("the {string} button is visible", async function (buttonName: string) {
  await expect(poManager.page.getByRole("button", { name: buttonName })).toBeVisible();
});

// ---------- Checkout ----------

When("I proceed to checkout", async function () {
  await poManager.cartPage.checkout();
});

When("I select the country {string}", async function (countryName: string) {
  await poManager.checkoutPage.selectCountry(countryName);
});

When("I place the order", async function () {
  await poManager.checkoutPage.placeOrder();
});

Then("I see the order confirmation {string}", async function (message: string) {
  await expect(poManager.checkoutPage.confirmationHeader).toHaveText(message, {
    ignoreCase: true,
  });
  this.orderId = await poManager.checkoutPage.getOrderId();
  console.log(`Placed order id: ${this.orderId}`);
  expect(this.orderId).toBeTruthy();
});

// ---------- Orders ----------

Given(
  "I have placed an order for the product {string}",
  async function (productName: string) {
    // Create the order via API (fast test-data setup), then check it in the UI.
    // Uses the same shared API session as "I am logged in via API".
    const api = await getApiSession();
    this.orderId = await api.createOrder(productName);
    console.log(`Order created via API: ${this.orderId}`);
  },
);

When("I open the orders page", async function () {
  await poManager.dashboardPage.openOrders();
  await expect(poManager.page).toHaveURL(/dashboard\/myorders/);
});

Then("the placed order is listed in the order history", async function () {
  await expect(poManager.ordersPage.getOrderRow(this.orderId)).toBeVisible();
});

When("I view the details of the placed order", async function () {
  await poManager.ordersPage.viewOrder(this.orderId);
});

Then("the order details show the placed order id", async function () {
  await expect(poManager.ordersPage.orderIdDetails).toHaveText(this.orderId);
});

Then(
  "the order details show the product {string}",
  async function (productName: string) {
    await expect(poManager.page.getByText(productName).first()).toBeVisible();
  },
);

// ---------- Sign out ----------

When("I sign out", async function () {
  await poManager.dashboardPage.signOut();
});
