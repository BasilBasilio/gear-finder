import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Password').fill('testtest');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('/');
});

test('should access user protected route when logged in', async ({ page }) => {
  await page.goto('/user');
  await expect(page).toHaveURL('/user');
});

test('should redirect to login page if not authenticated', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const pageWithoutAuth = await context.newPage();

  await pageWithoutAuth.goto('/user');
  await expect(pageWithoutAuth).toHaveURL('/login');

  await pageWithoutAuth.close();
  await context.close();
});
