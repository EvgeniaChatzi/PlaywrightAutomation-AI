# Playwright Website (playwright.dev) - Test Plan

## Application Overview

The playwright.dev website is the official documentation and marketing site for Playwright,
built on Docusaurus (React SPA). It features multi-language support (Node.js, Python, Java,
.NET), full-text search, and navigation across Docs, API, CLI, MCP, and Community sections.

**Already covered by existing Cucumber scenarios (do not duplicate):**
- Homepage loads with "Playwright" text and correct page title
- MCP nav item → "Playwright MCP" page
- Python language dropdown → "This page is not available for Python."
- Docs nav item → header text extraction
- Get Started button → Installation page with "Installing Playwright"

---

## Test Scenarios

### 1. Navigation Bar

**Seed:** `tests/seed.spec.ts`

#### 1.1 API link navigates to the API reference page
**Steps:**
1. Navigate to https://playwright.dev/
2. Click "API" in the main navigation bar

**Expected Results:**
- Page title contains "API"
- Page contains the text "Playwright Library"

---

#### 1.2 CLI link navigates to the CLI documentation page
**Steps:**
1. Navigate to https://playwright.dev/
2. Click "CLI" in the main navigation bar

**Expected Results:**
- Page title contains "CLI"
- Page contains the text "Playwright CLI"

---

### 2. Language Switcher

#### 2.1 Switch to Java language
**Steps:**
1. Navigate to https://playwright.dev/
2. Click the language dropdown (currently showing "Node.js")
3. Select "Java" from the dropdown

**Expected Results:**
- Page reloads or updates for Java context
- The language selector now shows "Java"

---

#### 2.2 Switch to .NET language
**Steps:**
1. Navigate to https://playwright.dev/
2. Click the language dropdown
3. Select ".NET" from the dropdown

**Expected Results:**
- The language selector now shows ".NET"

---

#### 2.3 Java is not available for MCP page
**Steps:**
1. Navigate to https://playwright.dev/
2. Click the language dropdown and select "Java"
3. Click "MCP" in the main navigation bar

**Expected Results:**
- Page shows "This page is not available for Java."

---

### 3. Search Functionality

#### 3.1 Search returns results for a valid keyword
**Steps:**
1. Navigate to https://playwright.dev/
2. Click the search icon or press Ctrl+K
3. Type "locator" in the search input

**Expected Results:**
- Search results appear
- At least one result is visible containing "locator"

---

#### 3.2 Search modal closes on pressing Escape
**Steps:**
1. Navigate to https://playwright.dev/
2. Open search (click icon or Ctrl+K)
3. Press the Escape key

**Expected Results:**
- The search modal closes
- User is back on the homepage

---

### 4. Homepage Content

#### 4.1 Homepage displays key feature sections
**Steps:**
1. Navigate to https://playwright.dev/
2. Scroll down the page

**Expected Results:**
- "Built for testing" section is visible
- "Built for AI agents" section is visible
- "Any browser. Any platform." section is visible

---

#### 4.2 GitHub star button is visible and links to GitHub
**Steps:**
1. Navigate to https://playwright.dev/
2. Locate the GitHub star button in the top navigation

**Expected Results:**
- A link to GitHub (href containing "github.com/microsoft/playwright") is visible on the page

---

### 5. Docs Section

#### 5.1 Docs sidebar contains Getting Started section
**Steps:**
1. Navigate to https://playwright.dev/
2. Click "Docs" in the main navigation bar
3. Inspect the left sidebar

**Expected Results:**
- Sidebar is visible
- "Installation" link is present in the sidebar
- "Writing tests" link is present in the sidebar

---

#### 5.2 Docs page Writing Tests link navigates correctly
**Steps:**
1. Navigate to https://playwright.dev/docs/intro
2. Click "Writing tests" in the left sidebar

**Expected Results:**
- URL changes to contain "writing-tests"
- Page title contains "Writing tests"

---

### 6. Community & Footer

#### 6.1 Footer contains expected navigation links
**Steps:**
1. Navigate to https://playwright.dev/
2. Scroll to the footer

**Expected Results:**
- "Getting started" link is present
- "GitHub" link is present
- "Discord" link is present
- "Stack Overflow" link is present

---

#### 6.2 Discord link points to the correct external URL
**Steps:**
1. Navigate to https://playwright.dev/
2. Scroll to the footer
3. Locate the "Discord" link

**Expected Results:**
- The Discord link has an href containing "aka.ms/playwright/discord" or "discord.com"

---
