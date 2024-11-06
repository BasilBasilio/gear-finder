import { test, expect } from '@playwright/test';

test('Login test redirect to homepage', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('/');
  expect(page.url()).toBe('http://localhost:5173/');
});
