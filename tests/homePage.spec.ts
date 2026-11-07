import { test, expect } from '@playwright/test';

test('Check header', async({page}) => {
  const header = page.getByTestId('homePageHeader');

  await page.goto('');
  await expect(header).toBeVisible();
});

test('Check card list items', async({page}) => {
  const firstCard = page.getByTestId('catCard1');
  const listCard = page.getByTestId(/catCard/);

  await page.goto('');
  await expect(firstCard).toBeVisible();
  expect(await listCard.count()).toBe(9);
});
