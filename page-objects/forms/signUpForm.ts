import { expect, type Locator, type Page } from '@playwright/test';
import { SignUpButton } from '../components/signUpButton';
import { correctPassword, incorrectPassword, incorrectPasswordSmallLetters, incorrectRepeatPassword } from '../../test-data/credentials';

export class SignUpForm {
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repeatPasswordField: Locator;
    readonly registerButton: Locator;
    readonly errorMessageBox: Locator;
    readonly errorColor: Locator;
    readonly formHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.repeatPasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('button', { hasText: 'Register' });
        this.errorMessageBox = page.locator('.invalid-feedback');
        this.errorColor = page.locator('.invalid-feedback');
        this.formHeader = page.getByRole('heading', { name: 'Registration' });
    }

    async triggerErrorOnElement(text: string, element: Locator) {
        await element.focus();
        await element.fill(text);
        await element.blur();
    }

    async open() {
        const signUpButton = new SignUpButton(this.page);
        await signUpButton.clickSignUpButton();
        await expect(this.formHeader).toBeVisible();
    }

    async registerWithEmptyNameField() {
        await this.nameField.focus();
        await this.nameField.blur();
    }

    async registerWithIncorrectName(incorrectName: string) {
        await this.triggerErrorOnElement(incorrectName, this.nameField);
    }

    async registerWrongLengthName(incorrectLength: string) {
        await this.triggerErrorOnElement(incorrectLength, this.nameField);
    }

    async borderColor(id: string, color: string) {
        const input = this.page.locator(`#${id}`);
        await expect(input).toHaveCSS('border-color', color);
    }

    async registerWithEmptyLastNameField() {
        await this.lastNameField.focus();
        await this.lastNameField.blur();
    }

    async registerWithIncorrectLastName(incorrectLastName: string) {
        await this.triggerErrorOnElement(incorrectLastName, this.lastNameField);
    }

    async registerWrongLengthLastName(incorrectLength: string) {
        await this.triggerErrorOnElement(incorrectLength, this.lastNameField);
    }

    async registerWithEmptyEmailField() {
        await this.emailField.focus();
        await this.emailField.blur();
    }

    async registerWithIncorrectEmail(incorrectEmail: string) {
        await this.emailField.focus();
        await this.emailField.fill(incorrectEmail);
        await this.emailField.blur();
    }

    async registerWithEmptyPasswordField() {
        await this.passwordField.focus();
        await this.passwordField.blur();
    }
    async registerWithIncorrectPassword(incorrectPassword: string) {
        await this.triggerErrorOnElement(incorrectPassword, this.passwordField);
    }

    async registerWithIncorrectPasswordLotSymbols(incorrectPasswordLength: string) {
        await this.triggerErrorOnElement(incorrectPasswordLength, this.passwordField);
    }

    async registerWithIncorrectPasswordSmallLeters(incorrectPasswordSmallLetters: string) {
        await this.triggerErrorOnElement(incorrectPasswordSmallLetters, this.passwordField);
    }

    async registerWithEmptyRepeatPasswordField() {
        await this.repeatPasswordField.focus();
        await this.repeatPasswordField.blur();
    }

    async registerPasswordsDoNotMatch() {
        await this.repeatPasswordField.focus();
        await this.passwordField.fill(correctPassword);
        await this.repeatPasswordField.fill(incorrectRepeatPassword);
        await this.repeatPasswordField.blur();
    }

    async signUpWithCorrectCredentials(correctName: string, correctLastName: string, correctEmail: string, correctPassword: string, correctRepeatPassword: string) {
        await this.nameField.focus();
        await this.nameField.fill(correctName);
        await this.nameField.blur();
        await this.lastNameField.focus();
        await this.lastNameField.fill(correctLastName);
        await this.lastNameField.blur();
        await this.emailField.focus();
        await this.emailField.fill(correctEmail);
        await this.emailField.blur();
        await this.passwordField.focus();
        await this.passwordField.fill(correctPassword);
        await this.passwordField.blur();
        await this.repeatPasswordField.focus();
        await this.repeatPasswordField.fill(correctRepeatPassword);
        await this.repeatPasswordField.blur();
        await this.page.waitForSelector('button:enabled');
        await this.registerButton.click();
    }
}
