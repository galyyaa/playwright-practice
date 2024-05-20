import { test, expect } from '@playwright/test';
import { SignInForm } from '../page-objects/forms/signInForm';
import { correctEmail1, correctPassword1 } from '../test-data/credentials';

test.describe('Login with correct credentials', () => {
  let signInForm: SignInForm;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test.describe('Successful sign in', () => {
    test.beforeEach(async ({ page }) => {
      signInForm = new SignInForm(page);
    })

    test('Login with correct credentials', async ({ page }) => {
      await signInForm.open();
      await signInForm.loginWithCredentials(correctEmail1, correctPassword1);
      await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });
  });
})