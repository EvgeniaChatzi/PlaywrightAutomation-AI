Feature: E-Commerce Client Smoke Tests
  As a registered customer
  I want to log in, buy products and review my orders
  So that I can confirm the main shopping flows of the e-commerce client work

  Background:
    Given I navigate to the eCommerce login page

  @Smoke @eCommerce
  Scenario: Login with invalid password shows an error
    When I log in with a valid email and an invalid password "wrongpass123"
    Then I see the toast message "Incorrect email or password."
    And I remain on the login page

  @Smoke @eCommerce
  Scenario: Login with valid credentials loads the dashboard
    When I log in with valid credentials
    Then I see the toast message "Login Successfully"
    And I am on the dashboard page
    And the product "ZARA COAT 3" is displayed on the dashboard

  @Smoke @eCommerce
  Scenario: Add a product to the cart
    Given I am logged in with valid credentials
    When I add the product "ZARA COAT 3" to the cart
    Then I see the toast message "Product Added To Cart"
    When I open the cart
    Then the product "ZARA COAT 3" is displayed in the cart
    And the "Checkout" button is visible

  @Smoke @eCommerce
  Scenario: Checkout and place an order
    Given I am logged in via API
    And I have added the product "ZARA COAT 3" to the cart
    When I proceed to checkout
    And I select the country "India"
    And I place the order
    Then I see the toast message "Order Placed Successfully"
    And I see the order confirmation "Thankyou for the order."

  @Smoke @eCommerce
  Scenario: Placed order appears in the order history
    Given I am logged in via API
    And I have placed an order for the product "ZARA COAT 3"
    When I open the orders page
    Then the placed order is listed in the order history

  @Smoke @eCommerce
  Scenario: View the details of a placed order
    Given I am logged in via API
    And I have placed an order for the product "ZARA COAT 3"
    When I open the orders page
    And I view the details of the placed order
    Then the order details show the placed order id
    And the order details show the product "ZARA COAT 3"

  @Smoke @eCommerce
  Scenario: Sign out
    Given I am logged in via API
    When I sign out
    Then I see the toast message "Logout Successfully"
    And I remain on the login page
