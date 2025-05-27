markdown
# Zara Playwright Tests

This repository contains end-to-end (E2E) tests for Zara's website using [Playwright](https://playwright.dev/). The tests simulate user order flow , validate form inputs, and ensure the website's functionality works as expected.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

.
├── .github/workflows/               # GitHub Actions CI config
│   └── playwright.yml
├── app/
│   ├── fixtures/                    # Custom Playwright fixtures
│   │   ├── page-fixtures.ts
│   │   ├── stealth-fixtures.ts
│   │   └── validation-error-messages.json
│   ├── helper/                      # Test data generators and helpers
│   │   └── registrationData.ts
│   └── pages/                       # Page Object Models
│       ├── BasePage.ts
│       ├── CartPage.ts
│       ├── CookieConsentPage.ts
│       ├── MainPage.ts
│       ├── PersonalDetailsPage.ts
│       └── RegisterPage.ts
├── tests/
│   └── zara-user-order-flow.spec.ts
├── playwright.config.ts             # Main Playwright configuration
├── stealth-test.js                  # Stealth browser launch test
├── package.json                     # Project metadata and dependencies
├── package-lock.json
├── .gitignore
├── README.md
├── playwright-report/               # HTML test report output
│   ├── index.html
│   └── ...
└── test-results/                    # Saved traces, screenshots, etc.


---


## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Playwright](https://playwright.dev/)

### Steps

1. Clone the repository:
bash
   git clone https://github.com/your-username/zara-playwright-tests.git   cd zara-playwright-tests
   

2. Install dependencies:
bash
   npm install
   
3. Install Playwright browsers:
bash
   npx playwright install --with-deps
   

---

## Running Tests

### Run All Tests
To execute all tests:
npx playwright test


### Run Specific Test
To run a specific test file:
npx playwright test zara-user-order-flow.spec.ts


### View Test Report
After running tests, view the HTML report:
npx playwright show-report


---

## Test Scenarios

The following test cases are implemented in [zara-user-order-flow.spec.ts](tests/zara-user-order-flow.spec.ts):

1. Search and Add Items to Cart  
   - Search for an item by name and add all available sizes to the cart.

2. Remove Items from Cart  
   - Remove every second item from the shopping bag.

3. Validate Email Field  
   - Check error messages for invalid or missing email input during registration.

4. Validate Password Field  
   - Check error messages for invalid or missing password input during registration.

5. Validate Name Field  
   - Check error messages for missing first name during registration.

6. Validate Surname Field  
   - Check error messages for missing last name during registration.

---

## Continuous Integration

This project uses GitHub Actions for CI. The workflow is defined in [.github/workflows/playwright.yml](.github/workflows/playwright.yml). It performs the following steps:

1. Checkout the repository.
2. Install dependencies and Playwright browsers.
3. Run the Playwright tests.
4. Upload test reports, traces, and screenshots for failed tests.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

---