import { test, expect } from '@playwright/test';

test('Login test redirect to homepage', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Password').fill('testtest');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('/');
  expect(page.url()).toBe('/');
});
