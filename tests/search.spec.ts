import { test, expect } from '@playwright/test';

test('should update input value and navigate on Enter key press', async ({
  page,
}) => {
  await page.goto('/');
  const searchInput = page.locator('input[type="text"]');
  const testQuery = 'Playwright test';
  await searchInput.fill(testQuery);
  await searchInput.press('Enter');
  await expect(page).toHaveURL(
    `/results?query=${encodeURIComponent(testQuery)}`,
  );
});
