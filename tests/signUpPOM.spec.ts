import { test, expect } from '@playwright/test';
import { SignUpButton } from '../page-objects/components/signUpButton';
import { SignUpForm } from '../page-objects/forms/signUpForm';
import { incorrectName, incorrectLength, incorrectLastName, incorrectEmail, incorrectPasswordSmallLetters, incorrectPassword, correctPassword, incorrectPasswordLength, incorrectRepeatPassword, correctName, correctLastName, correctEmail, correctRepeatPassword } from '../test-data/credentials';
import generateRandomEmail from "../utils/generateRandomEmail";

test.describe('Field "Name"', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Validation when empty "Name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyNameField();
        await expect(signUpForm.errorMessageBox).toHaveText('Name required');
    });

    test('Validation when incorrect data entered to "Name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.triggerErrorOnElement(incorrectName, signUpForm.nameField);
        await signUpForm.triggerErrorOnElement(incorrectLength, signUpForm.nameField);
        await expect(signUpForm.errorMessageBox).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Red border color when validation is triggered on the "Name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyNameField();
        await expect(signUpForm.errorMessageBox).toHaveText('Name required');
        await signUpForm.borderColor('signupName', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Last name"', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Validation when empty "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyLastNameField();
        await expect(signUpForm.errorMessageBox).toHaveText('Last name required');
    });

    test('Validation when incorrect data entered to the "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.triggerErrorOnElement(incorrectLastName, signUpForm.lastNameField);
        await signUpForm.triggerErrorOnElement(incorrectLength, signUpForm.lastNameField)
        await expect(signUpForm.errorMessageBox).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Red border color when validation is triggered on the "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyLastNameField();
        await expect(signUpForm.errorMessageBox).toHaveText('Last name required');
        await signUpForm.borderColor('signupLastName', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Email"', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Validation when empty "Email" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyEmailField();
        await expect(signUpForm.errorMessageBox).toHaveText('Email required');
    });

    test('Validation when incorrect data entered to "Email" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithIncorrectEmail(incorrectEmail);
        await expect(signUpForm.errorMessageBox).toHaveText('Email is incorrect');
    });

    test('Red border color when validation is triggered on the "Email" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyEmailField();
        await expect(signUpForm.errorMessageBox).toHaveText('Email required');
        await signUpForm.borderColor('signupEmail', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Password"', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Validation when empty "Password" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyPasswordField();
        await expect(signUpForm.errorMessageBox).toHaveText('Password required');
    });

    test('Validation when incorrect data entered to the "Password" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.triggerErrorOnElement(incorrectPassword, signUpForm.passwordField);
        await signUpForm.triggerErrorOnElement(incorrectPasswordLength, signUpForm.passwordField);
        await signUpForm.triggerErrorOnElement(incorrectPasswordSmallLetters, signUpForm.passwordField);
        await expect(signUpForm.errorMessageBox).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Red border color when validation is triggered on the "Password" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyPasswordField();
        await expect(signUpForm.errorMessageBox).toHaveText('Password required');
        await signUpForm.borderColor('signupPassword', 'rgb(220, 53, 69)');
    });
});

test.describe('Field "Re-enter password"', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Validation when empty "Re-enter password" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyRepeatPasswordField();
        await expect(signUpForm.errorMessageBox).toHaveText('Re-enter password required');
    });

    test('Validation when passwords do not match', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerPasswordsDoNotMatch();
        await expect(signUpForm.errorMessageBox).toHaveText('Passwords do not match');
    });

    test('Red border color when validation is triggered on the "Re-enter password" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyRepeatPasswordField();
        await expect(signUpForm.errorMessageBox).toHaveText('Re-enter password required');
        await signUpForm.borderColor('signupRepeatPassword', 'rgb(220, 53, 69)');
    });
});

test.describe('Successful sign up', () => {
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        signUpForm = new SignUpForm(page);
    })

    test('Sign up with correct credentials', async ({ page }) => {
        const correctEmail = generateRandomEmail();
        await signUpForm.open();
        await signUpForm.signUpWithCorrectCredentials(correctName, correctLastName, correctEmail, correctPassword, correctRepeatPassword);
        await page.waitForTimeout(3000);
        expect(page.url()).toBe('https://qauto.forstudy.space/panel/garage');
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });
})
