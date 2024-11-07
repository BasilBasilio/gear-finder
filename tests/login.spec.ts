import { test, expect } from '@playwright/test';

test('should redirect to login page if not authenticated', async ({ page }) => {
  await page.goto('/user');
  await expect(page).toHaveURL('/login');
});

test('should access user protected route when logged in', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('pay@gmail.com');
  await page.getByLabel('Password').fill('testtest');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('/');
  await page.goto('/user');
  await expect(page).toHaveURL('/user');
});
