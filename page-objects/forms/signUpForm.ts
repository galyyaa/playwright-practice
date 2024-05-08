import { expect, type Locator, type Page } from '@playwright/test';
import { SignUpButton } from '../components/signUpButton';
import { correctPassword, incorrectPassword, incorrectPasswordLength, incorrectPasswordSmallLetters, incorrectRepeatPassword } from '../../test-data/credentials';

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
        await this.nameField.focus();
        await this.nameField.fill(incorrectName);
        await this.nameField.blur();
    }

    async registerWrongLengthName(incorrectLength1: string) {
        await this.nameField.focus();
        await this.nameField.fill(incorrectLength1);
        await this.nameField.blur();
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
        await this.lastNameField.focus();
        await this.lastNameField.fill(incorrectLastName);
        await this.lastNameField.blur();
    }

    async registerWrongLengthLastName(incorrectLength2: string) {
        await this.lastNameField.focus();
        await this.lastNameField.fill(incorrectLength2);
        await this.lastNameField.blur();
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
        await this.passwordField.focus();
        await this.passwordField.fill(incorrectPassword);
        await this.passwordField.blur();
    }

    async registerWithIncorrectPasswordLotSymbols(incorrectPasswordLength: string) {
        await this.passwordField.focus();
        await this.passwordField.fill(incorrectPasswordLength);
        await this.passwordField.blur();
    }

    async registerWithIncorrectPasswordSmallLeters(incorrectPasswordSmallLetters: string) {
        await this.passwordField.focus();
        await this.passwordField.fill(incorrectPasswordSmallLetters);
        await this.passwordField.blur();
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
}
