# PlayWright Automation AI

Playwright + Cucumber BDD test framework for [playwright.dev](https://playwright.dev), with built-in AI agents for test planning, generation, and healing.

## Stack

- **Playwright** 1.56 — browser automation
- **Cucumber** — BDD test runner
- **TypeScript** — language
- **Node.js** 20 — runtime

## Project Structure

```
features/
  playwrightTests.feature     # BDD scenarios (@Smoke)
  step_definitions/
    playwrightSteps.ts        # Step implementations
  support/
    hooks.ts                  # Before/After hooks (browser setup)
pageobjects/
  PlaywrightHomePage.ts       # Page object for playwright.dev
specs/
  plan.md                     # Test plan (input for generator agent)
tests/
  seed.spec.ts                # Playwright Test seed (used by agents)
.claude/agents/               # AI agents (planner, generator, healer)
.mcp.json                     # MCP server config for agents
.env                          # Environment config (BASE_URL)
```

## Setup

```bash
# Install dependencies
npm install

# Copy the env template and adjust if needed
cp .env.example .env
```

## Running Tests

```bash
# Run all Cucumber scenarios
npm run cucumber -- features/playwrightTests.feature --require-module ts-node/register --require "features/**/*.ts" --exit

# Run only @Smoke scenarios
npm run cucumber -- features/playwrightTests.feature --require-module ts-node/register --require "features/**/*.ts" --tags @Smoke --exit

# Generate HTML report
npm run cucumber:html
```

## Scenarios (@Smoke)

| Scenario | Description |
|---|---|
| Basic tests on the Playwright homepage | Nav bar, MCP link, Python dropdown, Docs page |
| Get Started button | Navigates to Installation page |
| Switch to .NET language | Language dropdown selection |
| Discord link in footer | Footer link href validation |

## AI Agents

Three sub-agents are available in `.claude/agents/`:

| Agent | Purpose |
|---|---|
| `playwright-test-planner` | Explores a website and creates a test plan |
| `playwright-test-generator` | Takes a plan and generates `.spec.ts` test files |
| `playwright-test-healer` | Runs tests, finds failures, and fixes broken selectors |

Invoke by describing the task in Claude Code — e.g. *"use the planner agent on this URL"*.
