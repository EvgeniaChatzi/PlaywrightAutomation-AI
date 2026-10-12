Feature: Playwright Website Verification
  As a user
  I want to verify the Playwright homepage
  So that I can confirm the site is accessible and displays expected content

  @Smoke
  Scenario: Basic tests on the Playwright homepage
    Given I navigate to "BASE_URL"
    Then I can see the text "Playwright"
    And the page title should contain "Playwright"
    When I select the "MCP" from the main navigation bar
    Then I can see the text "Playwright MCP"
    When I select "Python" from the main navigation bar dropdown
    Then I can see the text "This page is not available for Python."
    When I select the "Docs" from the main navigation bar
    And I extract the text from the header

  @Smoke
  Scenario: Get Started button navigates to the installation page
    Given I navigate to "BASE_URL"
    When I click the "Get started" button
    Then the page title should contain "Installation"
    And I can see the text "Installing Playwright"

  @Smoke
  Scenario: Switch to .NET language from the navigation dropdown
    Given I navigate to "BASE_URL"
    When I select ".NET" from the main navigation bar dropdown
    Then the language selector should show ".NET"

  @Smoke
  Scenario: Discord link in footer points to Discord
    Given I navigate to "BASE_URL"
    Then the "Discord" footer link href should contain "discord"

