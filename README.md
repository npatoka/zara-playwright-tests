**ZARA-PLAYWRIGHT-TESTS**
=========================

**ZARA-PLAYWRIGHT-TESTS** is a Playwright-based end-to-end testing suite focused on simulating real user interactions on a retail website (e.g., Zara) while evading bot detection. It uses Playwright’s testing framework with a **stealth plugin** to avoid anti-bot measures, and implements Page Object Models and custom fixtures for maintainable, scalable tests.

**Description**
---------------

This project automates a typical user journey on the Zara e-commerce site, from handling the initial cookie consent modal through searching for products, adding items to the cart, and testing the user registration form. The tests are written in TypeScript and leverage Playwright’s robust features:

*   **Stealth mode** via the playwright-extra library and puppeteer-extra-plugin-stealth to mimic human-like browsing and bypass bot detection.
    
*   **Page Object Models (POM)** to encapsulate page interactions (search, cart, registration form, etc.) for cleaner test code.
    
*   **Custom Fixtures** to set up common test context (like launching a stealth Chromium browser, preloading pages with cookie consent handled, etc.) and provide ready-to-use page object instances in tests.
    

By combining these techniques, the suite can reliably test real-world user flows on a site with bot protection.

**Setup and Installation**
--------------------------

To set up the project locally, follow these steps:

1.  **Prerequisites**: Install [Node.js](https://nodejs.org/) (LTS version recommended) and npm. Ensure node -v and npm -v work in your terminal.
    
2.  **Clone the repository**: Download or clone the ZARA-PLAYWRIGHT-TESTS project to your machine.
    
3.  **Install dependencies**: In the project folder, run:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install   `

1.  This will install Playwright, Playwright Test, and other dependencies (including the stealth plugin libraries).
    
2.  **Install Playwright browsers**: Run the Playwright CLI to download browser binaries:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright install   `

1.  This ensures Chromium (and other browsers if needed) are available for the tests. (On Linux CI environments, you might use npx playwright install --with-deps to get dependencies.)
    
2.  **Verify configuration**: Ensure the default config in playwright.config.ts (such as base URL and browser settings) suits your needs. By default it targets Zara’s website.
    

Now you’re ready to run the tests.

**Project Structure**
---------------------

The repository is organized as follows:

*   **playwright.config.ts** – The Playwright configuration file. It defines the test directory, test options, base URL (defaulting to Zara’s site), browser launch settings (headless, viewport, user agent), reporters, etc.
    
*   *   MainPage.ts – Home page / search functionality
        
    *   CookieConsentPage.ts – Cookie consent modal handling
        
    *   CartPage.ts – Shopping cart page interactions (adding/removing items)
        
    *   RegisterPage.ts & PersonalDetailsPage.ts – Pages for user registration flow
        
    *   These POM classes encapsulate selectors and methods (like fillSearchField(), addItemToCart(), etc.) to be used in tests.
        
*   *   stealth-fixtures.ts – Launches a **stealth Chromium** browser instance using playwright-extra with the stealth plugin. It overrides Playwright’s default browser, context, and page fixtures to use a browser that has anti-bot evasion enabled.
        
    *   page-fixtures.ts – Provides fixtures for each Page Object. It uses stealth-fixtures as a base, then attaches instances of the page model classes (e.g., mainPage, cartPage, registerPage, etc.) to the test context. This means tests can directly use these page objects as arguments. It also includes a fixture (e.g., basePageWithCookies) that preloads the site and handles the cookie consent dialog and region selection at the start of tests.
        
    *   validation-error-messages.json – A JSON file containing expected validation error texts for the registration form (for example, error messages for invalid email, password, etc.). Tests load this to compare UI messages against expected values.
        
*   **app/helper/** – _Helper data and utilities_: Currently includes registrationData.ts, which likely provides sample user data or functions (using faker) to generate test input (e.g., random user details) for registration scenarios.
    
*   **tests/** – _Test specifications_: Contains the test files written using Playwright Test. In this project, there’s a primary spec file: zara-user-order-flow.spec.ts. This file defines the end-to-end test scenarios (detailed below) using the fixtures and page objects above.
    

Overall, this structure ensures a clear separation between test logic and page mechanics, making tests easier to read and maintain.

**Running the Tests**
---------------------

After installing everything, you can execute the test suite using the Playwright Test runner. Some common ways to run the tests:

*   **Run all tests (headless)**:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright test   `

*   By default, this will run all test cases in headless mode using the configuration in playwright.config.ts.
    
*   **Run tests in headed mode** (with visible browser, useful for debugging):
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright test --headed   `

*   Use Playwright’s filtering options. For example, to run a specific spec file:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright test tests/zara-user-order-flow.spec.ts   `

*   Or to run tests with a name (title) matching a pattern:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright test -g "Email field"   `

*   (This runs tests with “Email field” in their title.)
    
*   **View the test report**: After a test run, an HTML report will be generated (in the playwright-report folder). You can open this report in a browser, or use:
    

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npx playwright show-report   `

*   to launch the report viewer. The report provides a summary of test results and, for any failures, you can inspect screenshots, videos, and traces thanks to the configuration (which retains these artifacts on failure).
    

**Note:** The test runner is configured to retry tests twice on CI (no retries locally) and to run tests in parallel where possible. However, workers is set to 1 (one test at a time) in the config – this is likely to avoid overwhelming the site or to ensure tests run sequentially due to shared state or anti-bot considerations.

**Test Scenarios Overview**
---------------------------

The test suite currently focuses on the core user journey and validation checks. The main scenarios include:

*   **Search and Add to Cart**: _(“TC-1”)_ The test searches for a product by name (e.g., “Boots”) using the site’s search bar and adds all available sizes of that product to the shopping cart. This verifies that the search functionality works and that multiple item variants (sizes) can be added to the cart successfully.
    
*   **Cart Manipulation**: _(“TC-2”)_ After adding items to the cart, the test removes every second item from the shopping bag. This checks that cart item removal works as expected and that the cart updates correctly after each deletion.
    
*   *   **Email field validation**: Attempt to proceed with an incorrectly formatted email address and verify that the correct error message is displayed (e.g., “Please enter a valid email address.”).
        
    *   **Password field validation**: Input an invalid or weak password and confirm the appropriate error message is shown (e.g., password requirements not met).
        
    *   These validation messages are cross-checked against the expected text defined in the validation-error-messages.json fixture to ensure accuracy.
        
*   **Cookie Consent & Locale Selection**: Before performing the above actions, the tests automatically handle Zara’s cookie consent modal and select the appropriate regional store/locale. For example, the fixture might navigate to a specific locale URL (like https://www.zara.com/ua/en for Ukraine in English) and dismiss or accept the cookie banner. This ensures the site is in a state ready for interaction and that location-specific content is properly loaded.
    

Each test scenario uses the page object methods (e.g., fillSearchField, clickSearchButton, addItemToCart, removeItemFromCart, form field setters) to perform actions, and uses Playwright’s expect assertions to validate outcomes (like checking cart item count, or that an error message text appears). By structuring the tests this way, each scenario is easy to understand and covers a distinct piece of functionality.

**Stealth Mode and Bot Evasion Techniques**
-------------------------------------------

One of the standout features of this project is the use of **stealth mode** to evade bot detection. Many modern retail websites (including Zara) employ bot-detection and anti-scraping measures that can flag automation tools. To reliably run tests without being blocked, **ZARA-PLAYWRIGHT-TESTS integrates the Puppeteer Stealth plugin into Playwright**:

*   **Playwright Extra & Stealth Plugin**: The project uses the [playwright-extra](https://www.npmjs.com/package/playwright-extra) library, which allows Playwright to accept plugins similarly to Puppeteer. We register the [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth) with Playwright. This plugin applies various evasion tactics to make the automated browser appear as human as possible.
    
*   **How it works**: Under the hood, the stealth plugin alters or removes browser APIs and headers that typically reveal automation. For example, it can remove the navigator.webdriver property (which is usually true in automation contexts) and modify the user agent string to omit the “HeadlessChrome” token when running headlessly. It also patches other subtle differences, aiming to mimic a regular user’s browser environment. These measures help the Playwright-controlled browser pass common bot-detection tests and avoid triggers like CAPTCHA challenges.
    
*   **Integration in tests**: In app/fixtures/stealth-fixtures.ts, the standard Playwright browser launch is replaced with launching chromium from **playwright-extra**, after calling chromium.use(StealthPlugin()). This means every test uses a Chromium instance that has stealth modifications applied. The rest of the test code doesn’t need to change — the stealth behavior is injected automatically at the browser level.
    
*   **Why it matters**: By using stealth mode, our tests can navigate the real Zara website (or any site with similar protections) without being immediately blocked or served alternate content. This is crucial for end-to-end testing on a production-like environment. It allows us to test flows like registration and cart operations as a genuine user would experience them.
    

_(Note: Anti-bot measures evolve constantly. While the stealth plugin greatly reduces detection likelihood, it’s not guaranteed to bypass all systems. Always use such techniques responsibly and in accordance with the target site’s terms of service.)_

**Continuous Integration (CI)**
-------------------------------

It’s good practice to run tests on a Continuous Integration server. This project can be integrated with CI pipelines easily. For example, here’s a **GitHub Actions** workflow snippet for Playwright tests:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   name: Playwright Tests  on:    push:      branches: [ main ]    pull_request:      branches: [ main ]  jobs:    tests:      runs-on: ubuntu-latest      steps:        - uses: actions/checkout@v4        - name: Setup Node          uses: actions/setup-node@v4          with:            node-version: '20.x'    # Use Node.js 20 (or LTS version)        - name: Install dependencies          run: npm ci        - name: Install Playwright browsers          run: npx playwright install --with-deps        - name: Run tests          run: npx playwright test        - name: Upload test report          if: ${{ always() }}          uses: actions/upload-artifact@v3          with:            name: playwright-report            path: playwright-report   `

In the above workflow, tests run on every push or PR to the main branch. The steps check out the code, set up Node.js, install npm packages (using npm ci for a clean install), install Playwright browsers (including dependencies for Linux), and then execute the test suite. Finally, the HTML report is saved as a build artifact, so you can download and review it (along with traces/videos for any failures).

You can adapt this example to other CI platforms. Playwright is relatively CI-friendly out of the box — just remember to install the browsers and any required dependencies for the environment, and consider adjusting timeouts or retries for the CI environment if needed.

**Contributing**
----------------

Contributions are welcome! If you’d like to improve this project or add new tests, please follow these guidelines:

*   **Bug Reports & Feature Requests**: Feel free to open an issue to discuss potential changes or report bugs. Clear descriptions and steps to reproduce are appreciated.
    
*   **Pull Requests**: If you have a fix or new feature, you can fork the repository and open a pull request. Ensure that your code is clean and follows the style of the project (using Page Object patterns and fixtures where appropriate). Include relevant test coverage for any new functionality.
    
*   **Testing Changes**: Run the test suite locally to make sure everything passes. If you add new tests or pages, ensure they integrate with the existing structure (update fixtures or config if necessary). It’s a good idea to run npx playwright test --headed to watch the browser during new tests and verify they behave as expected.
    
*   For major changes or design decisions, it’s best to discuss first in an issue — this will help align with the project goals and get feedback before you invest too much effort.
    

By contributing, you agree that your contributions will be licensed under the same license as the project.

**License**
-----------

This project is open source and available under the **ISC License**. See the LICENSE information in the repository (or the package.json license field) for details. In summary, ISC is a permissive license similar to MIT, allowing you to use, modify, and distribute the code with proper attribution.

Happy testing! 🚀 With **ZARA-PLAYWRIGHT-TESTS**, you can ensure that end-to-end user flows work smoothly on a live website, without getting tripped up by bot detectors. Feel free to adapt this framework for your own projects or contribute improvements back to the community.