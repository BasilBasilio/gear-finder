import { test, expect } from '@playwright/test';

test('Login test redirect to homepage', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Password').fill('testtest');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('http://localhost:5173/');
  expect(page.url()).toBe('http://localhost:5173/');
});
