import { test, expect } from '@playwright/test';

test.describe('Access without authentication', () => {
  test('should redirect to login page if not authenticated', async ({
    page,
  }) => {
    await page.context().clearCookies();
    await page.goto('/user');
    await expect(page).toHaveURL('/login');
  });
});

test.describe('Access with authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@gmail.com');
    await page.getByLabel('Password').fill('testtest');
    await page.getByRole('button', { name: 'Log in' }).click();
  });

  test('should redirect to homepage after login', async ({ page }) => {
    await expect(page).toHaveURL('/');
  });

  test('should access user protected route when logged in', async ({
    page,
  }) => {
    await expect(page).toHaveURL('/');
    await page.goto('/user');
    await expect(page).toHaveURL('/user');
  });
});
