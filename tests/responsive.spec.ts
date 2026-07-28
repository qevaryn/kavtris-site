import { test, expect } from '@playwright/test';

test.describe('responsividade e acessibilidade básica', () => {
  test('não existe scroll horizontal e o layout adapta-se em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewport = await page.evaluate(() => window.innerWidth);
    expect(width).toBeLessThanOrEqual(viewport);

    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
  });

  test('abre e fecha o menu mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Menu móvel' })).toBeVisible();

    await page.getByRole('navigation', { name: 'Menu móvel' }).getByRole('link', { name: 'Serviços', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('links sociais estão disponíveis', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', /linkedin\.com/);
    await expect(page.locator('#sobre').getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', /github\.com/);
  });
});
