import { test, expect, Page } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
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

test('should redirect to login page if not authenticated', async ({ page }) => {
  await page.goto('/user');
  await expect(page).toHaveURL('/login');
});

test.afterAll(async () => {
  await page.close();
});
