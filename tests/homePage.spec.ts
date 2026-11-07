import { test, expect } from '@playwright/test';

test('Check header', async({page}) => {
  const header = page.getByTestId('homePageHeader');

  await page.goto('');
  await expect(header).toBeVisible();
});
