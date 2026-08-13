import { test, expect } from '@playwright/test';

test('mobile menu supports keyboard navigation, Escape and focus return', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByLabel(/KAVTRIS — Technology & Consulting/i)).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', { name: 'Fechar menu' }).first()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
});

test('mobile menu moves focus inside on open and keeps it within the menu (Tab cycle)', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();

  const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
  const nav = page.getByRole('navigation', { name: 'Menu móvel' });
  await expect(nav).toBeVisible();

  // Foco inicial: primeiro link navegável.
  await expect(nav.getByRole('link', { name: 'Soluções', exact: true })).toBeFocused();

  // Tab até ao último elemento do menu.
  for (let i = 0; i < 5; i += 1) {
    await page.keyboard.press('Tab');
  }
  await expect(dialog.getByRole('link', { name: 'Pedir demonstração' })).toBeFocused();

  // Tab no último elemento volta ao primeiro (focus trap).
  await page.keyboard.press('Tab');
  await expect(nav.getByRole('link', { name: 'Soluções', exact: true })).toBeFocused();
});

test('mobile menu supports Shift+Tab backwards cycle', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();

  const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
  const nav = page.getByRole('navigation', { name: 'Menu móvel' });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Soluções', exact: true })).toBeFocused();

  // Shift+Tab no primeiro elemento vai para o último (focus trap reverso).
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Pedir demonstração' })).toBeFocused();
});

test('background content is inert while the mobile menu is open', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();

  await expect.poll(() => page.locator('main').evaluate((el) => (el as HTMLElement).inert)).toBe(true);
  await expect.poll(() => page.locator('footer').evaluate((el) => (el as HTMLElement).inert)).toBe(true);

  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toHaveCount(0);
  await expect.poll(() => page.locator('main').evaluate((el) => (el as HTMLElement).inert)).toBe(false);
  await expect.poll(() => page.locator('footer').evaluate((el) => (el as HTMLElement).inert)).toBe(false);
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
});
