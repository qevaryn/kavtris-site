import { expect, test } from '@playwright/test';

/**
 * WEB.1D.2 — Hero symbolic motion validation.
 *
 *  - Hero copy + CTAs visible/interactive immediately (no wait for animation)
 *  - final K converges after the ~6s build
 *  - reduced-motion → final static composition immediately
 *  - cross-like technical intersection: present, same trace language, window ≤500ms
 *  - mobile 320/390: no overflow/clipping
 *  - no console/hydration errors during the sequence
 */

const HERO = '[data-testid="hero-brand-visual"]';

test('hero: copy e CTAs imediatamente visíveis e interativos durante a animação', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  // Headline + descriptor + CTAs must be readable right away.
  await expect(page.getByRole('heading', { name: /Tecnologia que/ })).toBeVisible();
  await expect(page.locator('#inicio').getByText(/TECHNOLOGY\s*&\s*CONSULTING/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conhecer soluções' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toBeVisible();

  // The K symbol is still building (opacity 0 during the early stages) while
  // the CTA is already interactive — HERO_TEXT/CTA_WAIT_FOR_ANIMATION = NO.
  await expect(page.locator(HERO).getByAltText('Símbolo KAVTRIS')).toHaveCSS('opacity', '0');
  await page.getByRole('link', { name: 'Conhecer soluções' }).click();
  await expect(page.getByTestId('reveal-processo')).toHaveAttribute('data-reveal-state', 'revealed', { timeout: 10000 });
});

test('hero: K final converge e a estrutura estabiliza após a sequência', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const symbol = page.locator(HERO).getByAltText('Símbolo KAVTRIS');
  await expect(symbol).toHaveClass(/hero-k-symbol/);
  // ~6.2s build: K symbol resolves to full opacity.
  await expect.poll(() => symbol.evaluate((node) => getComputedStyle(node).opacity), { timeout: 12000 }).toBe('1');

  // Engineered order: all technical traces finish drawing (last K stroke ends
  // at ~7.5s) and the transient cross traces fade away (FINAL_LAYOUT_CHANGED=NO).
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const dash = Array.from(document.querySelectorAll('.hero-draw')).map((node) => getComputedStyle(node).strokeDashoffset);
          return dash.every((value) => value === '0px');
        }),
      { timeout: 5000 }
    )
    .toBe(true);

  const state = await page.evaluate(() => {
    const crossV = document.querySelector('.hero-cross-v');
    const crossH = document.querySelector('.hero-cross-h');
    return {
      crossVOpacity: crossV ? getComputedStyle(crossV).opacity : '?',
      crossHOpacity: crossH ? getComputedStyle(crossH).opacity : '?'
    };
  });
  expect(Number.parseFloat(state.crossVOpacity)).toBeLessThanOrEqual(0.1);
  expect(Number.parseFloat(state.crossHOpacity)).toBeLessThanOrEqual(0.1);
});

test('reduced motion: composição estática final imediata, sem sequência', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const svg = page.locator(`${HERO} svg`);
  await expect(svg).toHaveClass(/hero-reduced/);

  // Final static composition immediately: K visible, no draw animations.
  const symbol = page.locator(HERO).getByAltText('Símbolo KAVTRIS');
  await expect(symbol).toHaveCSS('opacity', '1');
  const animationName = await page.locator(`${HERO} .hero-draw`).first().evaluate((node) => getComputedStyle(node).animationName);
  expect(animationName).toBe('none');
});

test('cruz técnica subtil: traços na mesma linguagem com janela ≤500ms', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const crossV = page.locator('.hero-cross-v');
  const crossH = page.locator('.hero-cross-h');
  await expect(crossV).toHaveCount(1);
  await expect(crossH).toHaveCount(1);

  const timing = await page.evaluate(() => {
    const read = (selector: string) => {
      const node = document.querySelector(selector);
      const computed = node ? getComputedStyle(node) : null;
      return {
        // two animations: draw + fade
        delay: computed?.animationDelay ?? '',
        duration: computed?.animationDuration ?? '',
        strokeWidth: computed?.strokeWidth ?? '',
        dasharray: computed?.strokeDasharray ?? ''
      };
    };
    return { v: read('.hero-cross-v'), h: read('.hero-cross-h') };
  });

  const parseSeconds = (value: string, index: number) => Number.parseFloat(value.split(',')[index].trim());
  // Draw delays: v=2.8s, h=3.15s; durations 0.4s.
  expect(parseSeconds(timing.v.delay, 0)).toBeCloseTo(2.8, 1);
  expect(parseSeconds(timing.h.delay, 0)).toBeCloseTo(3.15, 2);
  expect(parseSeconds(timing.v.duration, 0)).toBeCloseTo(0.4, 1);

  // Same technical trace language: identical stroke width to surrounding traces.
  expect(timing.v.strokeWidth).toBe('1px');
  expect(timing.h.strokeWidth).toBe('1px');

  // Both-visible window = (fade start) - (last trace fully drawn) ≤ 500ms.
  const vFadeStart = parseSeconds(timing.v.delay, 1);
  const vDrawEnd = parseSeconds(timing.v.delay, 0) + parseSeconds(timing.v.duration, 0);
  const hDrawEnd = parseSeconds(timing.h.delay, 0) + parseSeconds(timing.h.duration, 0);
  const bothVisibleWindow = vFadeStart - Math.max(vDrawEnd, hDrawEnd);
  expect(bothVisibleWindow).toBeGreaterThanOrEqual(0);
  expect(bothVisibleWindow).toBeLessThanOrEqual(0.5);
});

test('mobile 320/390: hero sem overflow e sem clipping', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('/');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);

    const box = await page.locator(HERO).boundingBox();
    expect(box, `hero visual box at ${width}px`).not.toBeNull();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    }
  }
});

test('hero: sem erros de consola nem hydration durante a sequência completa', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  // Wait for the full ~6.2s build plus the idle settle.
  await expect
    .poll(() => page.locator(`${HERO} .hero-k-symbol`).evaluate((node) => getComputedStyle(node).opacity), { timeout: 12000 })
    .toBe('1');
  await page.waitForTimeout(1500);

  expect(errors).toEqual([]);
});

