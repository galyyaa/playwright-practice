import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signInForm';
import { correctEmail1, correctPassword1 } from '../../test-data/credentials';

export class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly addButton: Locator;
    readonly firstCarName: Locator;
    readonly editCarMileageAudi: Locator;
    readonly updateCarMileageAudi: Locator;
    readonly editCarIcon: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly carDate: Locator;
    readonly close: Locator;
    readonly removeCarButton: Locator;
    readonly acceptCarRemovingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.getByText('Add car');
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.addButton = page.getByText('Add', { exact: true });
        this.firstCarName = page.locator('.car_name').first();
        this.editCarMileageAudi = this.page.locator('app-car:has-text("Audi TT") .update-mileage-form_input')
        this.updateCarMileageAudi = this.page.locator('app-car:has-text("Audi TT") .update-mileage-form_submit');
        this.editCarIcon = page.locator('.icon.icon-edit').first();
        this.saveButton = page.locator('button:has-text("Save")');
        this.cancelButton = page.locator("button[class='btn btn-secondary']");
        this.carDate = page.locator('#carCreationDate');
        this.close = page.locator("span[aria-hidden='true']");
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.acceptCarRemovingButton = page.locator('.btn-danger');
    }

    async open() {
        await this.page.goto('/panel/garage');
    }

    async openAsLoggedUser() {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(correctEmail1, correctPassword1);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption({ label: brand });
    }

    async selectModel(model: string) {
        await this.page.waitForTimeout(1000);
        await this.modelDropdown.selectOption({ label: model });
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async getFirstCarName() {
        return this.firstCarName;
    }

    async editMileage(mileage: string) {
        await this.editCarMileageAudi.fill(mileage);
    }

    async updateMileage() {
        await this.updateCarMileageAudi.click();
    }

    async removeCar() {
        await this.editCarIcon.first().click()
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
    }

    async editIcon() {
        await this.editCarIcon.first().click();
    }

    async saveButtonEdit() {
        await this.saveButton.click();
    }

    async cancelButtonEdit() {
        await this.cancelButton.click();
    }

    async closeModalWindow() {
        await this.close.click();
    }
}