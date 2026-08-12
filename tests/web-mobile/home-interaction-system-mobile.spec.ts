import { expect, test, type Locator } from '@playwright/test';

async function readActiveLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

test('homepage já não renderiza o Solution Finder e o processo mantém-se um carrossel mobile', async ({ page }) => {
  await page.goto('/');

  // WEB.1A — the Solution Finder is no longer rendered on the homepage.
  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toHaveCount(0);
  await expect(page.locator('#problemas')).toHaveCount(0);

  // How we work remains a carousel on mobile.
  const processCarousel = page.getByTestId('process-carousel');
  await page.locator('#processo').scrollIntoViewIfNeeded();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 5');
});

test('carrossel de produtos mobile mostra um cartão em destaque e navega com setas nos dois sentidos', async ({ page }) => {
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');
  const viewport = page.getByTestId('featured-products-carousel-viewport');

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);

  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();

  // largura real do cartão conforme a main (base 89%) e vizinhos visíveis
  const viewportBox = await viewport.boundingBox();
  const activeBox = await carousel.locator('[data-active="true"]').first().boundingBox();
  if (!viewportBox || !activeBox) {
    throw new Error('sem dimensões');
  }
  const widthRatio = activeBox.width / viewportBox.width;
  expect(widthRatio).toBeGreaterThanOrEqual(0.8);
  expect(widthRatio).toBeLessThanOrEqual(0.92);
  expect(activeBox.x).toBeGreaterThanOrEqual(viewportBox.x - 1);
  expect(activeBox.x + activeBox.width).toBeLessThanOrEqual(viewportBox.x + viewportBox.width + 1);

  let mobileNeighbors = 0;
  const allSlides = carousel.locator('[data-testid^="featured-products-carousel-slide-"]');
  const totalSlides = await allSlides.count();
  for (let i = 0; i < totalSlides; i += 1) {
    const box = await allSlides.nth(i).boundingBox();
    if (!box) {
      continue;
    }
    const overlaps = box.x < viewportBox.x + viewportBox.width && box.x + box.width > viewportBox.x;
    if (overlaps && (await allSlides.nth(i).getAttribute('data-active')) !== 'true') {
      mobileNeighbors += 1;
    }
  }
  expect(mobileNeighbors).toBeGreaterThanOrEqual(1);

  // seta seguinte → próximo cartão
  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  // seta anterior → cartão anterior
  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Ver todos os produtos' })).toHaveAttribute('href', '/produtos');
});

test('processo mobile usa cartão em destaque com contador e controles manuais', async ({ page }) => {
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 5');

  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 5');

  const track = page.getByTestId('process-carousel-track');
  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('3 de 5');
  await page.keyboard.press('ArrowLeft');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 5');
});

test('carrossel de produtos mobile retoma autoplay 2 s depois de uma seta', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  // pausa pós-interação: não avança antes de 2000 ms
  await page.waitForTimeout(1400);
  expect(await readActiveLabel(carousel)).toBe('Ir para Qevaryn Hotel Operations');

  // retoma após 2000 ms → avança para o próximo cartão
  await expect.poll(() => readActiveLabel(carousel), { timeout: 3000 }).toBe('Ir para Qevaryn Stock & Orders');

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
