# Rahul Shetty Academy E-Commerce Client - Smoke Test Plan

## Application Overview

Angular practice shop at https://rahulshettyacademy.com/client (hash routing). Flows covered: login, dashboard product list, cart, checkout/place order, order history and details, sign out.

**Credentials:** read from env vars `CLIENT_USER_EMAIL` and `CLIENT_USER_PASSWORD`. Never hardcode them.

**Key locators / text (observed):**
- Login: `#userEmail`, `#userPassword`, `#login` (placeholders "email@example.com" / "enter your passsword"; button "Login")
- Toasts: "Login Successfully", "Incorrect email or password.", "Product Added To Cart", "Order Placed Successfully", "Logout Successfully"
- Nav buttons: HOME, ORDERS, Cart (shows count badge), Sign Out
- Dashboard products currently present (3 only, "Showing 3 results"): **ADIDAS ORIGINAL ($11500)**, **ZARA COAT 3 ($11500)**, **iphone 13 pro ($55000)**. Each card has "View" and "Add To Cart" buttons. "PUMA SHIRT" is not present.
- Cart page (`#/dashboard/cart`): heading "My Cart", item name as h3, "Buy Now", "Checkout" button, Subtotal/Total.
- Checkout (`#/dashboard/order`): Payment Method options, prefilled card, "Select Country" textbox (placeholder; type "ind" and pick "India" from suggestions), "Place Order" link/button.
- Thank-you page (`#/dashboard/thanks`): "Thankyou for the order.", order id, "Orders History Page" link.
- Orders page (`#/dashboard/myorders`): heading "Your Orders", table columns Order Id / Product Image / Name / Price / Ordered Date / View / Delete.
- Order details (`#/dashboard/order-details/<id>`): "Thank you for Shopping With Us", "order summary", Billing/Delivery Address.

Each scenario assumes a fresh browser session, starting at the login page unless noted. Scenarios 2-7 require a valid login (reuse a login helper / storage state).

## Test Scenarios

### 1. Login with invalid password shows error

**Preconditions:** Logged out, on https://rahulshettyacademy.com/client.
**Steps:**
1. Enter `CLIENT_USER_EMAIL` in `#userEmail`.
2. Enter `wrongpass123` in `#userPassword`.
3. Click `#login`.

**Expected Results:**
- Toast "Incorrect email or password." appears.
- URL stays at `#/auth/login`; user is not taken to dashboard.

### 2. Login with valid credentials loads dashboard

**Preconditions:** Logged out, on login page.
**Steps:**
1. Enter `CLIENT_USER_EMAIL` and `CLIENT_USER_PASSWORD`.
2. Click `#login`.

**Expected Results:**
- Toast "Login Successfully" appears.
- URL becomes `#/dashboard/dash`.
- Nav shows HOME, ORDERS, Cart, Sign Out.
- Product list shows ADIDAS ORIGINAL, ZARA COAT 3, iphone 13 pro, each with "View" and "Add To Cart".

### 3. Add product to cart and verify cart page

**Preconditions:** Logged in, cart empty, on dashboard.
**Steps:**
1. Click "Add To Cart" on the ZARA COAT 3 card.
2. Observe toast and Cart badge.
3. Click the "Cart" nav button.

**Expected Results:**
- Toast "Product Added To Cart"; Cart badge shows 1.
- Cart page shows "My Cart" with ZARA COAT 3, "$ 11500", "In Stock"; Subtotal and Total $11500.
- "Checkout" button is visible.

### 4. Checkout and place order

**Preconditions:** Logged in, cart contains ZARA COAT 3 (Scenario 3 steps).
**Steps:**
1. On the cart page click "Checkout".
2. Verify order summary shows ZARA COAT 3, $ 11500, Quantity: 1, and email field prefilled with the user email.
3. Type "ind" in the "Select Country" textbox and choose "India" from the suggestions.
4. Click "Place Order".

**Expected Results:**
- Toast "Order Placed Successfully".
- URL becomes `#/dashboard/thanks?...`; heading "Thankyou for the order." and an order id are displayed, along with ZARA COAT 3, Qty: 1, $ 11500.
- Cart badge is cleared.
- Note: creates a real order; site keeps max 7 orders. Record the order id for Scenarios 5-6.

### 5. Order appears in order history

**Preconditions:** Logged in; an order for ZARA COAT 3 was just placed (Scenario 4).
**Steps:**
1. Click the "ORDERS" nav button.
2. Find the row whose Order Id matches the placed order.

**Expected Results:**
- URL is `#/dashboard/myorders`, heading "Your Orders".
- Row shows the order id, ZARA COAT 3, "$ 11500", today's date, with "View" and "Delete" buttons.

### 6. View order details

**Preconditions:** Logged in; order exists in history.
**Steps:**
1. On the Orders page click "View" on the placed order's row.

**Expected Results:**
- URL is `#/dashboard/order-details/<orderId>` matching the order.
- Page shows "order summary", the Order Id, Billing and Delivery Address with the user email and "Country - India", and product ZARA COAT 3 at $ 11500.

### 7. Sign out

**Preconditions:** Logged in, on any dashboard page.
**Steps:**
1. Click "Sign Out" in the nav.
2. Try navigating directly to `https://rahulshettyacademy.com/client/#/dashboard/dash`.

**Expected Results:**
- Toast "Logout Successfully"; URL is `#/auth/login` with empty login form.
- Direct navigation to the dashboard does not show products (user redirected to login / not authenticated).
