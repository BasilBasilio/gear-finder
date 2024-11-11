import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

test('should upload vite.svg image', async ({ page }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'test.svg');

  await page.goto('/login');
  await page.getByLabel('Email').fill('pay@gmail.com');
  await page.getByLabel('Password').fill('testtest');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForURL('/');
  await page.goto('/user');
  await expect(page).toHaveURL('/user');
  await page.goto('/new');
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);
  const fileInputValue = await fileInput.inputValue();
  expect(fileInputValue.split('\\').pop()).toBe('test.svg');
});
