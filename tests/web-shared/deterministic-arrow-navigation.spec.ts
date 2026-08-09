import { expect, test, type Locator } from '@playwright/test';

const PRODUCT_LABELS = [
  'Ir para Qevaryn FieldOps',
  'Ir para Qevaryn Hotel Operations',
  'Ir para Qevaryn Stock & Orders',
  'Ir para Solução personalizada para o seu contexto'
] as const;

async function indicatorLabel(carousel: Locator): Promise<string> {
  const indicators = carousel.getByLabel('Indicadores de posição');
  const pressed = indicators.locator('[aria-pressed="true"]');
  return (await pressed.getAttribute('aria-label')) as string;
}

async function tickerStep(tickerViewport: Locator): Promise<number> {
  return tickerViewport.evaluate((el: HTMLElement) => {
    const ul = el.querySelector('ul');
    if (!ul || ul.children.length === 0) return 0;
    const li = ul.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(ul).gap) || 0;
    return li.getBoundingClientRect().width + gap;
  });
}

async function readScroll(tickerViewport: Locator): Promise<number> {
  return tickerViewport.evaluate((el: HTMLElement) => Math.round(el.scrollLeft));
}

async function setScrollLeft(tickerViewport: Locator, value: number): Promise<void> {
  await tickerViewport.evaluate((el: HTMLElement, v: number) => {
    el.scrollLeft = v;
  }, value);
}

test('cliques rápidos Next no carrossel de produtos contam todos os passos (fila serializada)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => indicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  const next = carousel.getByRole('button', { name: 'Próximo slide' });
  for (let i = 0; i < 5; i++) {
    await next.click();
  }

  await expect.poll(() => indicatorLabel(carousel), { timeout: 8000 }).toBe(PRODUCT_LABELS[(0 + 5) % 4]);
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
});

test('direções mistas rápidas preservam a ordem no carrossel de produtos', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => indicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  const next = carousel.getByRole('button', { name: 'Próximo slide' });
  const prev = carousel.getByRole('button', { name: 'Slide anterior' });

  // +1 +1 -1 +1 -1 -1 +1 = índice 1 (Hotel Operations)
  await next.click();
  await next.click();
  await prev.click();
  await next.click();
  await prev.click();
  await prev.click();
  await next.click();

  await expect.poll(() => indicatorLabel(carousel), { timeout: 8000 }).toBe('Ir para Qevaryn Hotel Operations');
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
});

test('atravessar o limite do loop rapidamente não perde cliques', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const next = carousel.getByRole('button', { name: 'Próximo slide' });
  const prev = carousel.getByRole('button', { name: 'Slide anterior' });

  // vai para o último (índice 3)
  await expect.poll(() => indicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');
  await prev.click();
  await expect.poll(() => indicatorLabel(carousel), { timeout: 5000 }).toBe(PRODUCT_LABELS[3]);

  // Next ×3 rápido: 3 → 0 → 1 → 2 (Stock & Orders)
  for (let i = 0; i < 3; i++) {
    await next.click();
  }
  await expect.poll(() => indicatorLabel(carousel), { timeout: 8000 }).toBe('Ir para Qevaryn Stock & Orders');

  // Previous ×3 rápido: 2 → 1 → 0 → 3 (último)
  for (let i = 0; i < 3; i++) {
    await prev.click();
  }
  await expect.poll(() => indicatorLabel(carousel), { timeout: 8000 }).toBe(PRODUCT_LABELS[3]);
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
});

test('dez cliques rápidos terminam no índice correto e o card ativo acompanha o dot', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  await expect.poll(() => indicatorLabel(carousel), { timeout: 5000 }).toBe('Ir para Qevaryn FieldOps');

  const next = carousel.getByRole('button', { name: 'Próximo slide' });
  for (let i = 0; i < 10; i++) {
    await next.click();
  }

  await expect.poll(() => indicatorLabel(carousel), { timeout: 8000 }).toBe(PRODUCT_LABELS[(0 + 10) % 4]);

  const activeLabel = await carousel.locator('[data-active="true"]').getAttribute('aria-label');
  const dotLabel = await indicatorLabel(carousel);
  expect((activeLabel as string).replace(/^\d+ de \d+: /, '')).toBe(dotLabel.replace(/^Ir para /, ''));
  await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
});

test('seta seguinte no ticker avança exatamente um item alinhado', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const viewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const step = await tickerStep(viewport);
  // hover pausa o autoplay contínuo e mantém a posição estável durante o teste
  await ticker.hover();
  await page.waitForTimeout(150);
  await setScrollLeft(viewport, 2 * step);

  await ticker.getByRole('button', { name: 'Seguinte' }).click();
  await expect.poll(() => readScroll(viewport), { timeout: 4000 }).toBe(Math.round(3 * step));

  await ticker.getByRole('button', { name: 'Seguinte' }).click();
  await expect.poll(() => readScroll(viewport), { timeout: 4000 }).toBe(Math.round(4 * step));
});

test('seta anterior no ticker recua exatamente um item alinhado', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const viewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const step = await tickerStep(viewport);
  await ticker.hover();
  await page.waitForTimeout(150);
  await setScrollLeft(viewport, 3 * step);

  await ticker.getByRole('button', { name: 'Anterior' }).click();
  await expect.poll(() => readScroll(viewport), { timeout: 4000 }).toBe(Math.round(2 * step));
});

test('posição parcial do ticker alinha ao próximo item após Next', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const viewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const step = await tickerStep(viewport);
  await ticker.hover();
  await page.waitForTimeout(150);
  // posição parcial: item 2 (início em 2*step) + 35% do item
  await setScrollLeft(viewport, Math.round(2 * step + 0.35 * step));

  await ticker.getByRole('button', { name: 'Seguinte' }).click();
  await expect.poll(() => readScroll(viewport), { timeout: 4000 }).toBe(Math.round(3 * step));
});

test('cliques rápidos no ticker contam todos os passos (Next ×2 e Anterior ×2)', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const viewport = page.getByTestId('services-ticker-viewport');
  await page.evaluate(() =>
    document.querySelector('[data-testid="services-ticker"]')?.scrollIntoView({ block: 'center' })
  );
  await page.waitForTimeout(600);

  const step = await tickerStep(viewport);
  await ticker.hover();
  await page.waitForTimeout(150);
  await setScrollLeft(viewport, 2 * step);

  const next = ticker.getByRole('button', { name: 'Seguinte' });
  const prev = ticker.getByRole('button', { name: 'Anterior' });

  // Next ×2 rápido → 4*step
  await next.click();
  await next.click();
  await expect.poll(() => readScroll(viewport), { timeout: 5000 }).toBe(Math.round(4 * step));

  // Anterior ×2 rápido → volta a 2*step
  await prev.click();
  await prev.click();
  await expect.poll(() => readScroll(viewport), { timeout: 5000 }).toBe(Math.round(2 * step));
});
