import { test as base } from '../fixtures/stealth-fixtures';
import { CookieConsentPage } from '../pages/CookieConsentPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import type { Page } from '@playwright/test';

type PageFixtures = {
    pageWithCookies: Page;
    cookieConsentPage: CookieConsentPage;
    mainPage: MainPage;
    cartPage: CartPage;
    registerPage: RegisterPage;
    personalDetailsPage: PersonalDetailsPage;
};

export const test = base.extend<PageFixtures>({
    pageWithCookies: async ({ page }, use) => {
        const cookieConsentPage = new CookieConsentPage(page);
        await page.goto('ua/en');
        await cookieConsentPage.goToStore();
        await use(page);
    },

    cookieConsentPage: async ({ pageWithCookies }, use) => {
        await use(new CookieConsentPage(pageWithCookies));
    },

    mainPage: async ({ pageWithCookies }, use) => {
        await use(new MainPage(pageWithCookies));
    },

    cartPage: async ({ pageWithCookies }, use) => {
        await use(new CartPage(pageWithCookies));
    },

    registerPage: async ({ pageWithCookies }, use) => {
        await use(new RegisterPage(pageWithCookies));
    },

    personalDetailsPage: async ({ pageWithCookies }, use) => {
        await use(new PersonalDetailsPage(pageWithCookies));
    },
});

export { expect } from '@playwright/test';