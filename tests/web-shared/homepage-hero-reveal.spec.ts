import { expect, test } from '@playwright/test';

/**
 * Product Theatre T1 — Product-proof-first Hero validation.
 *
 * The previous logo-only hero reveal is intentionally superseded by one
 * governed FieldOps operational proof. The proof is static, readable without
 * client-side animation, responsive down to 320 CSS px, and equivalent under
 * reduced motion.
 */

const HERO = '[data-testid="hero-brand-visual"]';
const PROOF = '[data-testid="hero-product-proof"]';

test('hero: copy, CTAs e prova FieldOps ficam disponíveis na experiência inicial', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia que/ })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver como funciona' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Falar com a KAVTRIS' })).toBeVisible();

  const proof = page.locator(PROOF);
  await expect(proof).toBeVisible();
  await expect(proof.getByText('Produto em ação')).toBeVisible();
  await expect(proof.getByText('FieldOps', { exact: true })).toBeVisible();
  await expect(proof.getByText('Agenda de serviços')).toBeVisible();
  await expect(proof.getByText('Check-in feito')).toBeVisible();
  await expect(proof.getByText('12/14 pontos')).toBeVisible();
  await expect(proof.getByText('Com fotografia')).toBeVisible();
});

test('hero: Product proof é estático e não introduz media pesada ou animação perpétua', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const hero = page.locator(HERO);
  await expect(hero.locator('video, canvas')).toHaveCount(0);
  await expect(hero.locator('.hero-logo, .hero-fog, .hero-ring')).toHaveCount(0);
  await expect(hero.getByAltText('Símbolo KAVTRIS')).toHaveCount(0);

  const animations = await page.locator(PROOF).evaluate((node) =>
    node.getAnimations({ subtree: true }).filter((animation) => animation.playState !== 'finished').length
  );
  expect(animations).toBe(0);
});

test('reduced motion: mesma prova operacional fica imediatamente disponível', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const proof = page.locator(PROOF);
  await expect(proof).toBeVisible();
  await expect(proof.getByText('FieldOps', { exact: true })).toBeVisible();
  await expect(proof.getByText('Estado atualizado')).toBeVisible();
});

test('mobile 320/390/430: sem overflow e Product proof continua legível', async ({ page }) => {
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

    await expect(page.locator(PROOF).getByText('FieldOps', { exact: true })).toBeVisible();
    await expect(page.locator(PROOF).getByText('Check-in feito')).toBeVisible();
  }
});

test('hero Product Theatre não gera erros de consola ou hidratação', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(String(error)));

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator(PROOF)).toBeVisible();
  await page.waitForTimeout(400);

  expect(errors).toEqual([]);
});
