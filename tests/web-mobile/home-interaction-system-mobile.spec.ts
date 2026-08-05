import { expect, test } from '@playwright/test';

test('solution finder mobile expande inline com um único resultado aberto', async ({ page }) => {
  await page.goto('/');

  const problems = page.locator('#problemas');
  const manualButton = problems.getByRole('button', { name: 'Centralizar operações' });
  const fieldButton = problems.getByRole('button', { name: 'Organizar equipas externas' });

  await expect(manualButton).toHaveAttribute('aria-expanded', 'true');
  await expect(problems.locator('[data-testid="solution-option-panel-manual-work"]')).toBeVisible();

  await fieldButton.click();
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'true');
  await expect(manualButton).toHaveAttribute('aria-expanded', 'false');
  await expect(problems.locator('[data-testid="solution-option-panel-field"]')).toBeVisible();
  await expect(problems.locator('[data-testid="solution-option-panel-manual-work"]')).toBeHidden();

  await fieldButton.focus();
  await page.keyboard.press('Enter');
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'true');

  await expect(problems.locator('[data-testid^="solution-option-panel-"]:not([hidden])')).toHaveCount(1);
});

test('carrossel de produtos mobile usa scroll-snap, swipe manual e CTA único', async ({ page }) => {
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');

  const snapType = await track.evaluate((element) => getComputedStyle(element).scrollSnapType);
  expect(snapType).toContain('x');

  const firstSlideWidth = await carousel.getByTestId('featured-products-carousel-slide-1').evaluate((element) => element.getBoundingClientRect().width);
  const viewportWidth = page.viewportSize()?.width ?? 390;
  expect(firstSlideWidth).toBeGreaterThan(viewportWidth * 0.75);
  expect(firstSlideWidth).toBeLessThan(viewportWidth * 0.98);

  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');
});

test('processo mobile mostra contador, setas e respeita reduced motion no autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');

  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 4');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const reducedTrack = page.getByTestId('process-carousel-track');
  const initialScroll = await reducedTrack.evaluate((element) => element.scrollLeft);

  await expect.poll(() => reducedTrack.evaluate((element) => element.scrollLeft), { timeout: 9000 }).toBe(initialScroll);
  await reducedTrack.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByTestId('process-carousel-counter')).toHaveText('2 de 4');
});
