import { expect, test, type Locator } from '@playwright/test';

async function readActiveIndicatorLabel(carousel: Locator) {
  return carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');
}

test('ticker de serviços mantém duplicação visual escondida e pausa por hover/foco no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  const mainTrack = page.getByTestId('services-ticker-main');
  const tickerTrack = page.getByTestId('services-ticker-track');
  const duplicateTrack = page.getByTestId('services-ticker-duplicate');

  await expect(mainTrack.getByText('Reduzir tarefas manuais')).toHaveCount(1);
  await expect(ticker.getByText('Reduzir tarefas manuais')).toHaveCount(2);
  await expect(duplicateTrack).toHaveAttribute('aria-hidden', 'true');
  await expect
    .poll(() => duplicateTrack.evaluate((element) => (element as HTMLElement).inert))
    .toBe(true);

  await page.evaluate(() => {
    const mainLi = document.querySelector('[data-testid="services-ticker-main"] li');
    const duplicateLi = document.querySelector('[data-testid="services-ticker-duplicate"] li');

    if (mainLi && !mainLi.querySelector('[data-test-injected="ticker-main-button"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'main injected';
      button.setAttribute('data-test-injected', 'ticker-main-button');
      mainLi.appendChild(button);
    }

    if (duplicateLi && !duplicateLi.querySelector('[data-test-injected="ticker-duplicate-button"]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'duplicate injected';
      button.setAttribute('data-test-injected', 'ticker-duplicate-button');
      duplicateLi.appendChild(button);
    }
  });

  const injectedMainButton = mainTrack.getByRole('button', { name: 'main injected' });
  const injectedDuplicateButtonDom = duplicateTrack.locator('[data-test-injected="ticker-duplicate-button"]');

  await injectedMainButton.focus();
  await expect(injectedMainButton).toBeFocused();

  await expect(injectedDuplicateButtonDom).toHaveCount(1);
  await expect(duplicateTrack.getByRole('button', { name: 'duplicate injected' })).toHaveCount(0);

  const duplicateWasFocused = await page.evaluate(() => {
    const duplicateButton = document.querySelector('[data-test-injected="ticker-duplicate-button"]') as HTMLButtonElement | null;
    if (!duplicateButton) {
      return false;
    }

    duplicateButton.focus();
    return document.activeElement === duplicateButton;
  });
  expect(duplicateWasFocused).toBe(false);

  await ticker.focus();
  await page.keyboard.press('Tab');
  await expect(injectedMainButton).toBeFocused();

  await page.locator('header').first().click();
  await expect(injectedMainButton).not.toBeFocused();

  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('running');

  await ticker.hover();
  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused');

  await ticker.focus();
  await expect(ticker).toBeFocused();
  await expect
    .poll(() => tickerTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused');
});

test('motion budget permite autoplay por seção conforme visibilidade', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const servicesTrack = page.getByTestId('services-ticker-track');
  const productsCarousel = page.getByTestId('featured-products-carousel');
  const processCarousel = page.getByTestId('process-carousel');
  const enterpriseCarousel = page.getByTestId('enterprise-capabilities-carousel');

  await expect
    .poll(() => servicesTrack.evaluate((element) => getComputedStyle(element).animationName))
    .not.toBe('none');

  const productsInitial = await readActiveIndicatorLabel(productsCarousel);
  await expect
    .poll(() => readActiveIndicatorLabel(productsCarousel), { timeout: 3500 })
    .toBe(productsInitial);

  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(productsCarousel), { timeout: 11000 })
    .not.toBe(productsInitial);

  const processInitial = await readActiveIndicatorLabel(processCarousel);
  await page.locator('#processo').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(processCarousel), { timeout: 13000 })
    .not.toBe(processInitial);

  const enterpriseInitial = await readActiveIndicatorLabel(enterpriseCarousel);
  await page.locator('#empresas').scrollIntoViewIfNeeded();
  await expect
    .poll(() => readActiveIndicatorLabel(enterpriseCarousel), { timeout: 12000 })
    .not.toBe(enterpriseInitial);
});

test('ticker e carrosséis respeitam reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.getByTestId('services-static-reduced')).toBeVisible();
  await expect(page.getByTestId('services-ticker')).toHaveCount(0);

  const productsTrack = page.getByTestId('featured-products-carousel-track');
  const processTrack = page.getByTestId('process-carousel-track');
  const enterpriseTrack = page.getByTestId('enterprise-capabilities-carousel-track');

  const initialProductsScroll = await productsTrack.evaluate((element) => element.scrollLeft);
  const initialProcessScroll = await processTrack.evaluate((element) => element.scrollLeft);
  const initialEnterpriseScroll = await enterpriseTrack.evaluate((element) => element.scrollLeft);

  await expect
    .poll(() => productsTrack.evaluate((element) => element.scrollLeft), { timeout: 8500 })
    .toBe(initialProductsScroll);
  await expect
    .poll(() => processTrack.evaluate((element) => element.scrollLeft), { timeout: 10500 })
    .toBe(initialProcessScroll);
  await expect
    .poll(() => enterpriseTrack.evaluate((element) => element.scrollLeft), { timeout: 9500 })
    .toBe(initialEnterpriseScroll);
});

test('produtos no desktop usam carrossel com autoplay e controles manuais', async ({ page }) => {
  await page.goto('/');
  await page.locator('#produtos-preview').scrollIntoViewIfNeeded();

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');
  await expect(carousel).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(carousel.getByRole('heading', { name: 'Solução personalizada para o seu contexto' })).toBeVisible();

  const initialSelection = await readActiveIndicatorLabel(carousel);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 11000 }).not.toBe(initialSelection);

  await track.focus();
  const focusedSelection = await readActiveIndicatorLabel(carousel);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 5000 }).toBe(focusedSelection);

  await page.locator('header').first().click();
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
  });
  await page.mouse.move(0, 0);
  await expect.poll(() => readActiveIndicatorLabel(carousel), { timeout: 10000 }).toBe(focusedSelection);
});

test('carrossel de produtos mobile suporta setas, indicadores, teclado e pausa após interação', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const carousel = page.getByTestId('featured-products-carousel');
  const track = page.getByTestId('featured-products-carousel-track');

  await expect(carousel.locator('[data-testid^="featured-products-carousel-slide-"]')).toHaveCount(4);
  await expect(carousel.getByLabel('Indicadores de posição').locator('button')).toHaveCount(4);

  const initialIndex = await carousel.getByLabel('Indicadores de posição').locator('button[aria-pressed="true"]').count();
  expect(initialIndex).toBe(1);

  await track.focus();
  await page.keyboard.press('ArrowRight');
  await expect(carousel.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Slide anterior' }).click();
  await expect(carousel.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();

  await carousel.getByRole('button', { name: 'Próximo slide' }).click();
  const selectedAfterInteraction = await carousel
    .getByLabel('Indicadores de posição')
    .locator('button[aria-pressed="true"]')
    .first()
    .getAttribute('aria-label');

  await expect
    .poll(() =>
      carousel
        .getByLabel('Indicadores de posição')
        .locator('button[aria-pressed="true"]')
        .first()
        .getAttribute('aria-label'),
      { timeout: 9000 }
    )
    .toBe(selectedAfterInteraction);

  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
  });
  await page.mouse.move(0, 0);

  await expect
    .poll(() =>
      carousel
        .getByLabel('Indicadores de posição')
        .locator('button[aria-pressed="true"]')
        .first()
        .getAttribute('aria-label'),
      { timeout: 24000 }
    )
    .not.toBe(selectedAfterInteraction);
});

test('carrossel de processo mantém ordem, contador e controles manuais', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');

  await expect(processCarousel.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('1 de 4');
  await processCarousel.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(processCarousel.getByTestId('process-carousel-counter')).toHaveText('2 de 4');

  await processCarousel.getByTestId('process-carousel-track').focus();
  await page.keyboard.press('ArrowRight');
  await expect(processCarousel.getByTestId('process-carousel-counter')).not.toHaveText('1 de 4');
});

test('processo no desktop usa carrossel com autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#processo').scrollIntoViewIfNeeded();

  const processCarousel = page.getByTestId('process-carousel');
  await expect(processCarousel).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(processCarousel.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  const processInitial = await readActiveIndicatorLabel(processCarousel);
  await expect.poll(() => readActiveIndicatorLabel(processCarousel), { timeout: 13000 }).not.toBe(processInitial);
});

test('credibilidade no desktop usa ticker contínuo', async ({ page }) => {
  await page.goto('/');

  const ticker = page.getByTestId('services-ticker');
  await expect(ticker).toBeVisible();
  await expect(ticker.getByText('Reduzir tarefas manuais').first()).toBeVisible();
  await expect(ticker.getByText('Evitar falhas e melhorar processos').first()).toBeVisible();
  await expect(ticker.getByText('Sistemas para computador e telemóvel').first()).toBeVisible();
  await expect(ticker.getByText('Ligar as ferramentas da empresa').first()).toBeVisible();
  await expect(ticker.getByText('Suporte, correções e melhorias').first()).toBeVisible();
});

test('empresas no desktop mostra quatro capacidades em carrossel com autoplay', async ({ page }) => {
  await page.goto('/');
  await page.locator('#empresas').scrollIntoViewIfNeeded();

  const enterpriseCarousel = page.getByTestId('enterprise-capabilities-carousel');
  await expect(enterpriseCarousel).toBeVisible();
  await expect(enterpriseCarousel.getByText('Segurança e acessos')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Qualidade e testes')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Integrações e arquitetura')).toBeVisible();
  await expect(enterpriseCarousel.getByText('Suporte e continuidade')).toBeVisible();

  const enterpriseInitial = await readActiveIndicatorLabel(enterpriseCarousel);
  await expect.poll(() => readActiveIndicatorLabel(enterpriseCarousel), { timeout: 12000 }).not.toBe(enterpriseInitial);
});

test('hero mantém CTAs principais e sem overflow em 320', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  await expect(page.locator('#inicio').getByRole('link', { name: 'Encontrar uma solução' })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver produtos' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
