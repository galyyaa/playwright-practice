import { expect } from '@playwright/test';
import { test } from '../fixtures/garageFixtures';

test.describe('Garage tests', () => {

    test.describe('Garage tests with POM and fixtures', () => {

        test('Add Porsche 911 car to the garage', async ({ garagePage }) => {
            await garagePage.clickAddCarButton();
            await garagePage.selectBrand('Porsche');
            await garagePage.selectModel('911');
            await garagePage.enterMileage('2000');
            await garagePage.clickAddButton();
            await expect(garagePage.firstCarName).toHaveText('Porsche 911');
        })

        test('Add Audi TT car to the garage', async ({ garagePage }) => {
            await garagePage.clickAddCarButton();
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('TT');
            await garagePage.enterMileage('10000');
            await garagePage.clickAddButton();
            await expect(garagePage.firstCarName).toHaveText('Audi TT');
        });

        test('Edit car mileage for Audi TT', async ({ garagePage }) => {
            await garagePage.editMileage('11000');
            await garagePage.updateMileage();
        })

        test('Remove Audi TT from the garage', async ({ garagePage }) => {
            await garagePage.removeCar();
        })

        test('Add BMW 3 car to the garage', async ({ garagePage }) => {
            await garagePage.clickAddCarButton();
            await garagePage.selectBrand('BMW');
            await garagePage.selectModel('3');
            await garagePage.enterMileage('50000');
            await garagePage.clickAddButton();
            await expect(garagePage.firstCarName).toHaveText('BMW 3');
        })

        test('Edit BMW 3 to BMW X6 on the garage', async ({ garagePage }) => {
            await garagePage.editIcon();
            await garagePage.selectModel('X6');
            await garagePage.saveButtonEdit();
            await expect(garagePage.firstCarName).toHaveText('BMW X6');
        });

        test('Edit mileage for BMW X6 on the garage page', async ({ garagePage }) => {
            await garagePage.editIcon();
            await garagePage.enterMileage('55555');
            await garagePage.saveButtonEdit();
            await expect(garagePage.firstCarName).toHaveText('BMW X6');
        });

        test('Cancel editing BMW X6 on the garage page', async ({ garagePage }) => {
            await garagePage.editIcon();
            await garagePage.selectModel('X5');
            await garagePage.cancelButtonEdit();
            await expect(garagePage.firstCarName).toHaveText('BMW X6');
        });

        test('Close modal window while editing BMW X6 on the garage page', async ({ garagePage }) => {
            await garagePage.editIcon();
            await garagePage.closeModalWindow();
            await expect(garagePage.firstCarName).toHaveText('BMW X6');
        });
    });
})