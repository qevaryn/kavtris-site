import { expect, test } from '@playwright/test';
import { scrollThroughPage, scrollToTop } from '../shared/helpers/reveal';

/**
 * WEB.1D — mobile validation for the one-time scroll reveal system.
 *  - small-mobile (320) and standard mobile (390): no overflow, no clipping
 *  - reveal is smooth: no blank waiting, no repeated reveals
 *  - Contact stacks as one whole block (stagger reset below lg)
 *  - carousels keep swiping/advancing after reveal
 */

const REVEAL_WRAPPERS = [
  'reveal-processo',
  'reveal-produtos',
  'reveal-empresas',
  'reveal-rede-left',
  'reveal-rede-right',
  'reveal-contacto-left',
  'reveal-contacto-form',
  'reveal-footer'
];

test('contacto mobile: sem stagger — formulário revela com o bloco (delay 0)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const form = page.getByTestId('reveal-contacto-form');
  await expect(form).toHaveAttribute('data-reveal-state', 'pending');
  // Stacked layout: the short-delay token is reset to 0ms below lg.
  expect(await form.evaluate((node) => getComputedStyle(node).transitionDelay)).toBe('0s');

  // Scroll the whole section into view (mobile stacks left above form, so
  // scrolling the form alone would skip the left column entirely).
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('reveal-contacto-left')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(form).toHaveAttribute('data-reveal-state', 'revealed');
});

test('mobile: scroll completo revela tudo sem esperas e sem reveals repetidos', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await scrollThroughPage(page, 0.5, 30);
  for (const id of REVEAL_WRAPPERS) {
    await expect(page.getByTestId(id)).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 5000 });
  }

  // No blank section waiting: every governed region is fully opaque after reveal.
  await scrollToTop(page);
  for (const id of REVEAL_WRAPPERS) {
    await expect
      .poll(() => page.getByTestId(id).evaluate((node) => getComputedStyle(node).opacity))
      .toBe('1');
  }

  // No horizontal overflow after full reveal.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('small mobile 320: sem overflow nem clipping de transform', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/');

  await scrollThroughPage(page, 0.5, 30);
  await scrollToTop(page);

  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    viewportWidth: window.innerWidth
  }));
  expect(metrics.overflow).toBeLessThanOrEqual(0);

  // Reveal wrappers keep their real box (no delayed offscreen/clipped content).
  for (const id of REVEAL_WRAPPERS) {
    const box = await page.getByTestId(id).boundingBox();
    expect(box, `wrapper ${id} should be laid out`).not.toBeNull();
  }
});

test('mobile: carrossel do processo funciona após reveal (seta avança o contador)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const processCarousel = page.getByTestId('process-carousel');
  await page.locator('#processo').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('reveal-processo')).toHaveAttribute('data-reveal-state', 'revealed');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');

  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 5');
});
