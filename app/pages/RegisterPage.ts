import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  private logInButton: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.registerButton = this.page.locator('[data-qa-id="logon-view-alternate-button"]');
    this.logInButton = this.page.locator('[data-qa-id="oauth-logon-button"]')
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async clickLogInButton() {
    await this.logInButton.click();
  }
}