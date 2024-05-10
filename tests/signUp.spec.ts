import { test, expect } from '@playwright/test';
import generateRandomEmail from "../utils/generateRandomEmail";

test.describe('Text "Registration"', () => {
    test('Check on registration form text "Registration"', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
        const guestLoginLink = page.getByText('Registration', { exact: true });
        await guestLoginLink.click();
    });
});

test.describe('Field "Name"', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
    })

    test('Validation when empty "Name" field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name required')).toBeVisible();
    });

    test('Validation when incorrect data entered to "Name" field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').fill('Галя');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('Validation when one symbol entered to "Name" field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').fill('1');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Red border color when validation is triggered on the "Name" field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').fill('1234567890');
        await page.locator('#signupName').blur();
        const border = page.locator('#signupName');
        await expect(border).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Last name"', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
    })

    test('Validation when empty "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name required')).toBeVisible();
    });

    test('Validation when incorrect data entered to "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').fill('Моргун');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('Validation when more than 20 symbols entered to "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').fill('11111222223333344444qqqqqq');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('Red border color when validation is triggered on the "Last name" field', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').fill('t');
        await page.locator('#signupLastName').blur();
        const border = page.locator('#signupLastName');
        await expect(border).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Email"', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
    })

    test('Validation when empty "Email" field', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').blur();
        await expect(page.getByText('Email required')).toBeVisible();
    });

    test('Validation when incorrect data entered to "Email" field', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').fill('test+aqa@gmail.c');
        await page.locator('#signupEmail').blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('Red border color when validation is triggered on the "Email" field', async ({ page }) => {
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').fill('11111');
        await page.locator('#signupEmail').blur();
        const border = page.locator('#signupEmail');
        await expect(border).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Password"', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
    })

    test('Validation when empty "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        await expect(page.getByText('Password required')).toBeVisible();
    });

    test('Validation when less than 8 symbols entered to the "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').fill('123456');
        await page.locator('#signupPassword').blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    });

    test('Validation when more than 15 symbols entered to the "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').fill('123456qaTest@@@@@');
        await page.locator('#signupPassword').blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    });

    test('Validation when just small letters entered to the "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').fill('qwerfdsazxc');
        await page.locator('#signupPassword').blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    });

    test('Red border color when validation is triggered on the "Password" field', async ({ page }) => {
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').blur();
        const border = page.locator('#signupPassword');
        await expect(border).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Re-enter password"', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign up').click();
    })

    test('Validation when empty "Re-enter password" field', async ({ page }) => {
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('Validation when passwords do not match', async ({ page }) => {
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupPassword').fill('Qwerfdsa123');
        await page.locator('#signupRepeatPassword').fill('Qwerfdsa12');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('Red border color when validation is triggered on the "Re-enter password" field', async ({ page }) => {
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').blur();
        const border = page.locator('#signupRepeatPassword');
        await expect(border).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
});

test.describe('Successful sign up', () => {
    test('Sign up with valid data', async ({ page }) => {
        const randomEmail = generateRandomEmail();
        await page.goto('/');
        await page.getByText('Sign up').click();
        await page.locator('#signupName').focus();
        await page.locator('#signupName').fill('Galya');
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').fill('Morgun');
        await page.locator('#signupEmail').focus();
        await page.locator('#signupEmail').fill(randomEmail);
        await page.locator('#signupPassword').focus();
        await page.locator('#signupPassword').fill('Qwerfdsaz123');
        await page.locator('#signupRepeatPassword').focus();
        await page.locator('#signupRepeatPassword').fill('Qwerfdsaz123');
        await page.locator('#signupRepeatPassword').blur();
        await page.locator('button', { hasText: 'Register' }).click();
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });
});