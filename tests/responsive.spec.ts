import { test, expect } from '@playwright/test';

test.describe('responsividade e acessibilidade básica', () => {
  for (const viewport of [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'laptop', width: 1280, height: 800 },
    { name: 'desktop', width: 1440, height: 900 }
  ]) {
    test(`não existe scroll horizontal em ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      expect(width).toBeLessThanOrEqual(innerWidth);
    });
  }

  test('layout adapta-se em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
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

    await expect(page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
    await expect(page.locator('#sobre').getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/gabrielsouza80');
  });

  test('gera screenshots full-page de auditoria visual', async ({ page }, testInfo) => {
    for (const viewport of [
      { name: 'desktop-1440x900', width: 1440, height: 900 },
      { name: 'mobile-390x844', width: 390, height: 844 }
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.screenshot({
        path: testInfo.outputPath(`${viewport.name}.png`),
        fullPage: true
      });
    }
  });
});
