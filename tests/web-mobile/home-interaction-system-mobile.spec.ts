import { expect, test, type Locator } from '@playwright/test';

async function readActiveLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

async function readScrollLeft(viewport: Locator) {
  return viewport.evaluate((element) => element.scrollLeft);
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
  await expect(problems.locator('[data-testid="solution-option-panel-manual-work"]')).toBeHidden();

  await fieldButton.focus();
  await page.keyboard.press('Enter');
  await expect(fieldButton).toHaveAttribute('aria-expanded', 'false');

  await expect(problems.locator('[data-testid^="solution-option-panel-"]:not([hidden])')).toHaveCount(0);
});

test('carrossel de produtos mobile usa scroll contínuo, swipe manual e CTA único', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');
  const viewport = page.getByTestId('featured-products-carousel-viewport');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const initialScroll = await readScrollLeft(viewport);
  await page.clock.runFor(1000);
  const nextScroll = await readScrollLeft(viewport);
  expect(nextScroll).not.toBe(initialScroll);

  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveLabel(carousel)).toBe('Ir para Qevaryn Hotel Operations');

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveLabel(carousel)).toBe('Ir para Qevaryn Stock & Orders');

  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');
});

test('processo mobile segue movimento contínuo e controles manuais', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');
  const viewport = page.getByTestId('process-carousel-viewport');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');

  await expect
    .poll(() => readScrollLeft(viewport), { timeout: 6000 })
    .not.toBe(await readScrollLeft(viewport));

  const initial = await readActiveLabel(processCarousel);
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  const afterNext = await readActiveLabel(processCarousel);
  expect(afterNext).not.toBe(initial);

  await expect
    .poll(() => readScrollLeft(viewport), { timeout: 6000 })
    .not.toBe(await readScrollLeft(viewport));

  const track = page.getByTestId('process-carousel-track');
  await track.focus();
  const beforeKeyboard = await readActiveLabel(processCarousel);
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveLabel(processCarousel)).not.toBe(beforeKeyboard);
});

test('carrossel de produtos mobile avança com swipe e retoma contínua após 2s', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = page.getByTestId('featured-products-carousel-viewport');

  await expect
    .poll(() => readScrollLeft(viewport), { timeout: 6000 })
    .not.toBe(await readScrollLeft(viewport));

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

  const beforeResumeScroll = await readScrollLeft(viewport);
  await expect
    .poll(() => readScrollLeft(viewport), { timeout: 10000 })
    .not.toBe(beforeResumeScroll);
});
