import { test, expect } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';
import { correctEmail1, correctPassword1 } from '../test-data/credentials';

test.describe('Profile test with mocking API', () => {
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
    })

    test('Change name on profile page', async ({ page }) => {
        const resp = {
            "status": "ok",
            "data": [
                {
                    "status": "ok",
                    "data": {
                        "userId": 112303,
                        "photoFilename": "default-user.png",
                        "name": "Joe",
                        "lastName": "Biden"
                    }
                }
            ]
        }

        await page.route('**/api/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(resp),
        }));

        await garagePage.openAsLoggedUser(correctEmail1, correctPassword1);
        await page.locator('.sidebar_btn-group').click();
        expect(await page.locator('.profile_name.display-4').textContent()).toBe('Joe Biden');
    });
})