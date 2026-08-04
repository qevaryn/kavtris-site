import { expect, test } from '@playwright/test';

test('mobile homepage exposes the mobile menu button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
});

test('mobile menu opens, locks body scroll and closes after route selection', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();
  await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  await page.getByRole('navigation', { name: 'Menu móvel' }).getByRole('link', { name: 'Exemplos', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('');
});
