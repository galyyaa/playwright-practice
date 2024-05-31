import { expect } from '@playwright/test';
import { test } from '../../fixtures/fuelExpensesFixture'

test.describe('Garage tests in guest mode using Session Storage', () => {

    test('Session Storage is empty by default', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        expect(parsedObject.cars).toHaveLength(0);
    })

    test('Check Audi in Session Storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('10000');
        await page.waitForTimeout(1000);
        await page.getByText('Add', { exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        const firstCar = parsedObject.cars[0];
        expect(firstCar.brand).toBe('Audi')
    })

    test('Change Session Storage', async ({ page }) => {
        await page.goto('/');
        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 10000,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 10000
                },
                {
                    "id": 1,
                    "brand": "BMW",
                    "model": "3",
                    "logo": "bmw.png",
                    "initialMileage": 40000,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 40000
                }
            ]
        }

        await page.evaluate((object) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(object))
        }, data)
        await page.getByText('Guest log in').click();
    });
})