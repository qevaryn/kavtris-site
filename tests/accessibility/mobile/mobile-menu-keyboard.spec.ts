import { test, expect } from '@playwright/test';

test('mobile menu supports keyboard navigation, Escape and focus return', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Qevaryn Systems - início')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('banner').getByLabel('Explique o seu problema')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', { name: 'Fechar menu' }).first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
});
