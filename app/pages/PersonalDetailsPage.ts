import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PersonalDetailsPage extends BasePage {
    private emailField: Locator;
    private passwordField: Locator;
    private nameField: Locator;
    private surnameField: Locator;
    private preferredLanguage: Locator;
    private newsLetterCheck: Locator;
    private createAccountButton: Locator;
    private errorMessage: Locator;
    private inputNameText: Locator;
    private phoneNumberInputField: Locator;
    private privacyCheck: Locator;

    constructor(page: Page) {
        super(page);
        this.emailField = this.page.locator('[data-qa-input-qualifier="email"]');
        this.passwordField = this.page.locator('[data-qa-input-qualifier="password"]');
        this.nameField = this.page.locator('[data-qa-input-qualifier="firstName"]');
        this.surnameField = this.page.locator('[data-qa-input-qualifier="lastName"]');
        this.preferredLanguage = this.page.locator('[data-qa-input-qualifier="preferredLanguage"]');
        this.newsLetterCheck = this.page.locator('[data-qa-input-qualifier="newsletterCheck"]');
        this.privacyCheck = this.page.locator('[data-qa-input-qualifier="privacyCheck"]');
        this.createAccountButton = this.page.locator('[data-qa-action="sign-up-submit"]');
        this.inputNameText = this.page.locator('.screen-reader-text');
        this.errorMessage = this.page.locator('.form-input-error');
    }

    async checkPrivacyCheckbox() {
        await this.privacyCheck.click({ force: true });
    }

    async getErrorMessage() {
        const fullText = await this.errorMessage.innerText();
        const labelText = await this.inputNameText.first().innerText();
        return fullText.replace(labelText, '').trim();
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async fillRegistrationForm({ email, password, name, surname, }:{
      email?: string;
      password?: string;
      name?: string;
      surname?: string;
    }) {
    if (email) await this.emailField.fill(email);
    if (password) await this.passwordField.fill(password);
    if (name) await this.nameField.fill(name);
    if (surname) await this.surnameField.fill(surname);

    await this.checkPrivacyCheckbox();
  }
}

