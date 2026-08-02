import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage não tem violações críticas ou sérias de acessibilidade', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-PT');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const seriousOrCritical = results.violations.filter((violation) => (
    violation.impact === 'serious' || violation.impact === 'critical'
  ));

  expect(seriousOrCritical).toEqual([]);
});

test('permite navegação por teclado no header e menu mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Qevaryn Systems - início')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('banner').getByLabel('Explique o seu problema')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('button', { name: 'Fechar menu' }).first()).toHaveAttribute('aria-expanded', 'true');
});
