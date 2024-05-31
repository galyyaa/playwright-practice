import { expect } from '@playwright/test';
import { test } from '../../fixtures/fuelExpensesFixture'

test.describe('Garage test', () => {
    test('Verify empty message on empty garage', async ({ fuelExpensesAsGuest }) => {
        await expect(fuelExpensesAsGuest.emptyState).toBeVisible();
    })
});