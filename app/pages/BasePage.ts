import { Page, Locator } from '@playwright/test';
export abstract class BasePage {
    protected  page: Page;
    protected  searchButton: Locator;
    protected  shoppingBagButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchButton = this.page.locator('[data-qa-id="header-search-text-link"]');
        this.shoppingBagButton = this.page.locator('[data-qa-id="layout-header-go-to-cart"]');
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickShoppingBagButton() {
        await this.shoppingBagButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.shoppingBagButton.click();
    }
}
