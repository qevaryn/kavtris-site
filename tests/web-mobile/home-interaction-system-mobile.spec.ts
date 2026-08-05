import { expect, test, type Locator } from '@playwright/test';

async function readActiveLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

test('solution finder mobile expande inline com um único resultado aberto', async ({ page }) => {
  await page.goto('/');

  const problems = page.locator('#problemas');
  const manualButton = problems.getByRole('button', { name: 'Centralizar operações' });
  const fieldButton = problems.getByRole('button', { name: 'Organizar equipas externas' });

  await expect(manualButton).toHaveAttribute('aria-expanded', 'false');
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'false');
  await expect(problems.locator('[data-testid^="solution-option-panel-"]:not([hidden])')).toHaveCount(0);

  await manualButton.click();
  await expect(manualButton).toHaveAttribute('aria-expanded', 'true');
  await expect(problems.locator('[data-testid="solution-option-panel-manual-work"]')).toBeVisible();

  await fieldButton.click();
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'true');
  await expect(manualButton).toHaveAttribute('aria-expanded', 'false');
  await expect(problems.locator('[data-testid="solution-option-panel-field"]')).toBeVisible();
  await expect(problems.locator('[data-testid="solution-option-panel-manual-work"]')).toBeHidden();

  await fieldButton.focus();
  await page.keyboard.press('Enter');
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'false');

  await expect(problems.locator('[data-testid^="solution-option-panel-"]:not([hidden])')).toHaveCount(0);
});

test('carrossel de produtos mobile usa scroll-snap, swipe manual e CTA único', async ({ page }) => {
  await page.clock.install();
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
  await expect.poll(() => readActiveLabel(carousel)).toBe('Ir para Qevaryn Hotel Operations');

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveLabel(carousel)).toBe('Ir para Qevaryn Stock & Orders');

  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');
});

test('processo mobile segue cadência de autoplay e controles manuais', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const processCarousel = page.getByTestId('process-carousel');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');

  const initial = await readActiveLabel(processCarousel);
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  const afterNext = await readActiveLabel(processCarousel);
  expect(afterNext).not.toBe(initial);

  await page.clock.runFor(1800);
  expect(await readActiveLabel(processCarousel)).toBe(afterNext);

  await page.clock.runFor(200);
  await page.clock.runFor(100);
  const afterResume = await readActiveLabel(processCarousel);
  expect(afterResume).not.toBe(afterNext);

  await page.clock.runFor(2800);
  expect(await readActiveLabel(processCarousel)).toBe(afterResume);
  await page.clock.runFor(200);
  const afterInterval = await readActiveLabel(processCarousel);
  expect(afterInterval).not.toBe(afterResume);

  const track = page.getByTestId('process-carousel-track');
  await track.focus();
  const beforeKeyboard = await readActiveLabel(processCarousel);
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveLabel(processCarousel)).not.toBe(beforeKeyboard);
});

test('carrossel de produtos mobile avança com swipe e retoma por inatividade após 2s', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = page.getByTestId('featured-products-carousel-viewport');

  const before = await readActiveLabel(carousel);

  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }

  const client = await page.context().newCDPSession(page);
  const startX = box.x + box.width * 0.8;
  const y = box.y + box.height / 2;

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: startX, y }]
  });
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: startX - 200, y }]
  });
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: []
  });

  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).not.toBe(before);
  const afterSwipe = await readActiveLabel(carousel);

  await page.clock.runFor(1900);
  expect(await readActiveLabel(carousel)).toBe(afterSwipe);

  await page.clock.runFor(100);
  await page.clock.runFor(100);
  expect(await readActiveLabel(carousel)).not.toBe(afterSwipe);
});
