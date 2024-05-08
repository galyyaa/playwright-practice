import { test, expect } from '@playwright/test';
import { SignUpButton } from '../page-objects/components/signUpButton';
import { SignUpForm } from '../page-objects/forms/signUpForm';
import { incorrectName, incorrectLength1, incorrectLength2, incorrectLastName, incorrectEmail, incorrectPasswordSmallLetters, incorrectPassword, incorrectPasswordLength, correctPassword, incorrectRepeatPassword, correctName, correctLastName, correctEmail, correctRepeatPassword } from '../test-data/credentials';

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
        await signUpForm.registerWithIncorrectName(incorrectName);
        await expect(signUpForm.errorMessageBox).toHaveText('Name is invalid');
    });

    test('Validation when one symbol entered to "Name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWrongLengthName(incorrectLength1);
        await expect(signUpForm.errorMessageBox).toHaveText('Name is invalidName has to be from 2 to 20 characters long');
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

    test('Validation when incorrect data entered to "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithIncorrectLastName(incorrectLastName);
        await expect(signUpForm.errorMessageBox).toHaveText('Last name is invalid');
    });

    test('Validation when more than 20 symbols entered to "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWrongLengthLastName(incorrectLength2);
        await expect(signUpForm.errorMessageBox).toHaveText('Last name is invalidLast name has to be from 2 to 20 characters long');
    });

    test('Red border color when validation is triggered on the "Last name" field', async ({ page }) => {
        await signUpForm.open();
        await signUpForm.registerWithEmptyLastNameField();
        await expect(signUpForm.errorMessageBox).toHaveText('Last name required');
        await signUpForm.borderColor('signupLastName', 'rgb(220, 53, 69)');
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

        test('Validation when less than 8 symbols entered to the "Password" field', async ({ page }) => {
            await signUpForm.open();
            await signUpForm.registerWithIncorrectPassword(incorrectPassword);
            await expect(signUpForm.errorMessageBox).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Validation when more than 15 symbols entered to the "Password" field', async ({ page }) => {
            await signUpForm.open();
            await signUpForm.registerWithIncorrectPasswordLotSymbols(incorrectPasswordLength);
            await expect(signUpForm.errorMessageBox).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Validation when just small letters entered to the "Password" field', async ({ page }) => {
            await signUpForm.open();
            await signUpForm.registerWithIncorrectPasswordSmallLeters(incorrectPasswordSmallLetters);
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
});