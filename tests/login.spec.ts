import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Password').fill('testtest');
});

test.describe('Login', () => {
  test('should redirect to homepage', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('/');
    expect(page.url()).toBe('http://localhost:5173/');
  });

  test('should access to user protected route', async ({ page }) => {
    await page.goto('/user');
    expect(page.url()).toBe('http://localhost:5173/user');
  });
});
