Feature: Playwright Website Verification
  As a user
  I want to verify the Playwright homepage
  So that I can confirm the site is accessible and displays expected content

  @Smoke
  Scenario: Basic tests on the Playwright homepage
    Given I navigate to "https://playwright.dev/"
    Then I can see the text "Playwright"
    And the page title should contain "Playwright"
    When I select the "MCP" from the main navigation bar
    Then I can see the text "Playwright MCP"
    When I select "Python" from the main navigation bar dropdown
    Then I can see the text "This page is not available for Python."
    When I select the "Docs" from the main navigation bar
    And I extract the text from the header
    
