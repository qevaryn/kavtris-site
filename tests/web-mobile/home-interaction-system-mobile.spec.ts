import { expect, test, type Locator } from '@playwright/test';

async function readActiveLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

async function touchSwipe(page: import('@playwright/test').Page, viewport: Locator, fromRatio: number, toRatio: number) {
  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const y = box.y + box.height / 2;
  const startX = box.x + box.width * fromRatio;
  const endX = box.x + box.width * toRatio;
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: (startX + endX) / 2, y }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: endX, y }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
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

test('carrossel de produtos mobile mostra um cartão em destaque e avança com swipe nos dois sentidos', async ({ page }) => {
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

  // swipe para a esquerda → próximo cartão
  await touchSwipe(page, viewport, 0.85, 0.15);
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  // swipe para a direita → cartão anterior
  await touchSwipe(page, viewport, 0.15, 0.85);
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
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');

  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 4');

  const track = page.getByTestId('process-carousel-track');
  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('3 de 4');
  await page.keyboard.press('ArrowLeft');
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 4');
});

test('carrossel de produtos mobile retoma autoplay 2 s depois de um swipe e mantém scroll vertical', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const viewport = carousel.getByTestId('featured-products-carousel-viewport');
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  await touchSwipe(page, viewport, 0.85, 0.15);
  await expect.poll(() => readActiveLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn Hotel Operations');

  // pausa pós-interação: não avança antes de 2000 ms
  await page.waitForTimeout(1400);
  expect(await readActiveLabel(carousel)).toBe('Ir para Qevaryn Hotel Operations');

  // retoma após 2000 ms → avança para o próximo cartão
  await expect.poll(() => readActiveLabel(carousel), { timeout: 3000 }).toBe('Ir para Qevaryn Stock & Orders');

  // swipe vertical mantém o scroll da página (pan-y)
  const scrollBefore = await page.evaluate(() => window.scrollY);
  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y: startY }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX, y: startY - 120 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX, y: startY - 240 }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeGreaterThan(scrollBefore);
});
test('ticker mobile permite arrasto horizontal por touch, estabiliza e retoma autoplay', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));
  const before = await readScroll();

  // drag para a esquerda (avança) e solta: a posição deve mudar e não ficar presa
  await touchSwipe(page, tickerViewport, 0.85, 0.15);
  await page.waitForTimeout(250);
  const afterLeft = await readScroll();
  expect(afterLeft).not.toBe(before);

  // drag para a direita (recua) e solta
  const mid = await readScroll();
  await touchSwipe(page, tickerViewport, 0.15, 0.85);
  await page.waitForTimeout(250);
  const afterRight = await readScroll();
  expect(afterRight).not.toBe(mid);

  // autoplay retoma após a pausa de interação: o scrollLeft volta a mover
  const stable = await readScroll();
  await expect.poll(() => readScroll(), { timeout: 5000 }).not.toBe(stable);
});
async function touchHold(page: import('@playwright/test').Page, viewport: Locator, durationMs: number) {
  const box = await viewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await page.waitForTimeout(durationMs);
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}

test('ticker mobile mantém posição estável durante hold (touch ativo bloqueia autoplay)', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const box = await tickerViewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));

  // touch down sem mover e manter durante um período superior ao resume delay (2000 ms)
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await page.waitForTimeout(200);
  const heldFirst = await readScroll();
  await page.waitForTimeout(3000);
  const heldSecond = await readScroll();
  // autoplay NÃO pode ter retomado sob o dedo
  expect(heldSecond).toBe(heldFirst);

  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

  // após soltar, o autoplay retoma normalmente
  const released = await readScroll();
  await expect.poll(() => readScroll(), { timeout: 5000 }).not.toBe(released);
});

test('ticker mobile segue drag lento nos dois sentidos sem movimento automático', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));

  // drag lento para a esquerda (avança) com pausa intermédia
  const afterLeft = await (async () => {
    await touchSwipe(page, tickerViewport, 0.85, 0.15);
    await page.waitForTimeout(250);
    return readScroll();
  })();

  // enquanto o dedo segura após o primeiro drag, a posição permanece estável
  await touchHold(page, tickerViewport, 1200);
  const held = await readScroll();

  // drag lento para a direita (recua)
  const afterRight = await (async () => {
    await touchSwipe(page, tickerViewport, 0.15, 0.85);
    await page.waitForTimeout(250);
    return readScroll();
  })();

  // o conteúdo respondeu ao input nos dois sentidos e estabilizou
  expect(afterLeft).not.toBe(0);
  expect(afterRight).not.toBe(held);
});

test('ticker mobile mantém posição estável no intervalo entre drags (left → hold → right)', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const box = await tickerViewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const y = box.y + box.height / 2;

  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));

  // touch down → drag left → segurar (hold) → drag right → release
  const startX = box.x + box.width * 0.85;
  const midX = box.x + box.width * 0.5;
  const endX = box.x + box.width * 0.85;

  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: midX, y }] });
  await page.waitForTimeout(400);
  const afterLeft = await readScroll();
  await page.waitForTimeout(2500);
  const duringHold = await readScroll();
  // sem autoplay/rebase durante o hold
  expect(duringHold).toBe(afterLeft);

  await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: endX, y }] });
  await page.waitForTimeout(200);
  const afterRight = await readScroll();
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(250);

  // conteúdo acompanhou o gesto nos dois sentidos
  expect(afterRight).not.toBe(duringHold);
});
test('ticker mobile progride monotonicamente em pequenos incrementos (movimento contínuo)', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const box = await tickerViewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const y = box.y + box.height / 2;
  const startX = box.x + box.width * 0.7;
  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));

  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
  await page.waitForTimeout(200);
  const samples = [await readScroll()];

  // muitos pequenos movimentos à esquerda, mantendo o dedo ativo
  for (let i = 1; i <= 12; i += 1) {
    const x = startX - i * 8;
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
    await page.waitForTimeout(40);
    samples.push(await readScroll());
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });

  // sem retrocessos erráticos durante o gesto
  const deltas = samples.slice(1).map((value, index) => value - samples[index]);
  const regressions = deltas.filter((delta) => delta < -10).length;
  expect(regressions).toBe(0);
  // o conteúdo acompanhou o gesto
  expect(samples[samples.length - 1]).not.toBe(samples[0]);
});

test('ticker mobile muda de direção imediatamente sem soltar o dedo', async ({ page }) => {
  await page.goto('/');

  const tickerViewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const box = await tickerViewport.boundingBox();
  if (!box) {
    throw new Error('viewport sem dimensões');
  }
  const client = await page.context().newCDPSession(page);
  const y = box.y + box.height / 2;
  const readScroll = () => tickerViewport.evaluate((el) => Math.round(el.scrollLeft));

  // primeira fase: avança o ticker para garantir espaço dentro do ciclo antes
  // de inverter a direção sem cruzar os limites do loop
  const x1 = box.x + box.width * 0.7;
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x1, y }] });
  for (let i = 1; i <= 6; i += 1) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x1 - i * 30, y }] });
    await page.waitForTimeout(30);
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(300);
  const base = await readScroll();
  expect(base).toBeGreaterThan(0);

  // segunda fase: drag lento para a esquerda e direção invertida sem soltar
  const x2 = box.x + box.width * 0.7;
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x2, y }] });
  await page.waitForTimeout(150);

  for (let i = 1; i <= 4; i += 1) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x2 - i * 10, y }] });
    await page.waitForTimeout(40);
  }
  const afterLeft = await readScroll();
  expect(afterLeft).toBeGreaterThan(base);

  for (let i = 1; i <= 4; i += 1) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x2 - 40 + i * 10, y }] });
    await page.waitForTimeout(40);
  }
  const afterRight = await readScroll();
  expect(afterRight).toBeLessThan(afterLeft);

  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(250);
});
