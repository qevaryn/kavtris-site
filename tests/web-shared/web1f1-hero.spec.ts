import { expect, test } from '@playwright/test';

/**
 * WEB.1F.1 — Hero simplification & logo reveal validation.
 *
 *  - redundant KAVTRIS / TECHNOLOGY & CONSULTING eyebrow removed from the Hero
 *    (scoped to #inicio — the brand identifiers still exist in Header/Footer)
 *  - current white KAVTRIS symbol preserved (same approved asset + alt text)
 *  - old symbolic sequence (draw / nodes / cross / light-point) fully removed
 *  - new reveal: fast fade + subtle side fog, primary duration <= 1500ms
 *  - hero text/CTA immediately available (never wait for the logo)
 *  - reduced-motion: final static state immediately
 *  - mobile 320/390/430: no overflow, logo inside viewport
 *  - no console/hydration errors
 */

const HERO = '[data-testid="hero-brand-visual"]';

test('hero: copy e CTAs imediatamente visíveis; eyebrow redundante removido', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia que/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Conhecer soluções' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toBeVisible();

  // Scoped to the Hero: the redundant brand eyebrow must be gone.
  const hero = page.locator('#inicio');
  await expect(hero.getByText('KAVTRIS', { exact: true })).toHaveCount(0);
  await expect(hero.getByText(/TECHNOLOGY\s*&\s*CONSULTING/i)).toHaveCount(0);

  // Brand identifiers still exist elsewhere (Header/Footer).
  await expect(page.getByText('KAVTRIS', { exact: true }).first()).toBeVisible();
  await expect(page.getByTestId('brand-descriptor').first()).toBeVisible();

  // The current white symbol is still present in the Hero.
  await expect(page.locator(HERO).getByAltText('Símbolo KAVTRIS')).toBeVisible();
});

test('hero: novo reveal rápido — fade + fog, duração <= 1500ms, estático depois', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const logo = page.locator(`${HERO} .hero-logo`);
  await expect(logo).toHaveCount(1);

  // Computed animation: single fade-in, finished well inside the hard cap.
  const timing = await logo.evaluate((node) => {
    const style = getComputedStyle(node);
    const durations = style.animationDuration.split(',').map((v) => Number.parseFloat(v) * 1000);
    const delays = style.animationDelay.split(',').map((v) => Number.parseFloat(v) * 1000);
    return {
      name: style.animationName,
      durationMs: Math.max(...durations),
      delayMs: Math.max(...delays),
      iterationCount: style.animationIterationCount
    };
  });

  expect(timing.name).toBe('hero-logo-in');
  expect(timing.durationMs).toBeGreaterThanOrEqual(300);
  expect(timing.durationMs + timing.delayMs).toBeLessThanOrEqual(1500);
  expect(timing.iterationCount).toBe('1');

  // Primary reveal resolves quickly, then stays static.
  await expect.poll(() => logo.evaluate((node) => getComputedStyle(node).opacity), { timeout: 4000 }).toBe('1');

  // Subtle side fog: CSS-only, decorative, aria-hidden.
  const fog = page.locator(`${HERO} .hero-fog`);
  await expect(fog).toHaveCount(2);
  for (let i = 0; i < (await fog.count()); i += 1) {
    await expect(fog.nth(i)).toHaveAttribute('aria-hidden', 'true');
    const bg = await fog.nth(i).evaluate((node) => getComputedStyle(node).backgroundImage);
    expect(bg).toContain('radial-gradient');
  }

  // No old sequence traces remain.
  await expect(page.locator(`${HERO} .hero-draw`)).toHaveCount(0);
});

test('reduced motion: logo estático final imediato, sem animação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const logo = page.locator(`${HERO} .hero-logo`);
  await expect(logo).toHaveCSS('opacity', '1');
  const animationName = await logo.evaluate((node) => getComputedStyle(node).animationName);
  expect(animationName).toBe('none');
});

test('mobile 320/390/430: sem overflow, logo dentro do viewport', async ({ page }) => {
  for (const width of [320, 390, 430]) {
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

test('hero: sequência simbólica antiga removida do DOM e sem erros', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  for (const selector of ['.hero-draw', '.hero-cross-v', '.hero-cross-h', '.hero-light-point', '.hero-node', '.hero-origin', '.hero-k-symbol']) {
    await expect(page.locator(selector)).toHaveCount(0);
  }

  // No long 4-6s sequence: the reveal finishes within the short window.
  await expect.poll(() => page.locator(`${HERO} .hero-logo`).evaluate((node) => getComputedStyle(node).opacity), { timeout: 4000 }).toBe('1');
  await page.waitForTimeout(400);

  expect(errors).toEqual([]);
});
