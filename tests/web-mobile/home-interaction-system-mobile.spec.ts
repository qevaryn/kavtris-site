import { expect, test } from '@playwright/test';

/**
 * WEB.1B + WEB.1F.5 — mobile home interaction regression.
 *
 * WEB.1F.5 removed the old process/products/engineering carousels from the
 * homepage by owner decision. The protected credibility loop (ticker) remains
 * the mobile interaction contract tested here.
 */

test('homepage já não renderiza o Solution Finder nem os carrosséis antigos', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toHaveCount(0);
  await expect(page.locator('#problemas')).toHaveCount(0);

  await expect(page.getByTestId('process-carousel')).toHaveCount(0);
  await expect(page.getByTestId('featured-products-carousel')).toHaveCount(0);
  await expect(page.getByTestId('enterprise-capabilities-carousel')).toHaveCount(0);

  // O seletor de caminho do cliente substituiu o processo técnico.
  await expect(page.locator('#como-funciona')).toBeVisible();
  await expect(page.locator('#como-funciona').getByTestId('home-path-business-primary')).toBeVisible();
  await expect(page.locator('#como-funciona').getByTestId('home-path-systems-secondary')).toBeVisible();
});

test('ticker mobile avança e recua com as setas e retoma autoplay', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));
  const before = await readScroll();

  // seta seguinte → avança um item lógico
  await ticker.getByRole('button', { name: 'Seguinte' }).click();
  await page.waitForTimeout(150);
  const afterNext = await readScroll();
  expect(afterNext).not.toBe(before);

  // seta anterior → retrocede um item lógico
  await ticker.getByRole('button', { name: 'Anterior' }).click();
  await page.waitForTimeout(150);
  const afterPrev = await readScroll();
  expect(afterPrev).not.toBe(afterNext);

  // autoplay retoma após a pausa de interação: o scrollLeft volta a mover
  const stable = await readScroll();
  await expect.poll(() => readScroll(), { timeout: 5000 }).not.toBe(stable);
});
