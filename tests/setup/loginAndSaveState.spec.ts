import { test, expect } from '@playwright/test';
import { GaragePage } from '../../page-objects/pages/garagePage';
import { correctEmail1, correctPassword1 } from '../../test-data/credentials';

test.describe('Garage tests with storage', () => {
    let garagePage: GaragePage;

    test('Login As User and save state', async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.openAsLoggedUser(correctEmail1, correctPassword1);
        await page.context().storageState({
            path: 'userOneState.json'
        })
    })
})