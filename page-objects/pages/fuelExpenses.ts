import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signInForm';
import { correctEmail, correctPassword } from '../../test-data/credentials';

export class FuelExpenses {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly emptyState: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('h1', { hasText: 'Fuel expenses' })
        this.emptyState = page.locator('.panel-empty_message');
    }

    async open() {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(correctEmail, correctPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
        await this.page.locator('[routerlink="expenses"]').click();
        await expect(this.pageHeader).toBeVisible();
    }
}