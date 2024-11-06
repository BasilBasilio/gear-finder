import { test } from '@playwright/test';

test('dummy test', async ({ page }) => {
  await page.goto('/');
});
