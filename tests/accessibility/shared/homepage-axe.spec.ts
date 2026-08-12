import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { revealWholePage } from '../../shared/helpers/reveal';

test('homepage não tem violações críticas ou sérias de acessibilidade', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-PT');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  // espera a hidratação concluir: os clones só ficam inert/tabindex -1 no cliente,
  // garantindo que a varredura reflete o estado acessível final.
  const featuredClone = page.getByTestId('featured-products-carousel-slide-clone-next');
  await expect.poll(() => featuredClone.evaluate((node) => (node as HTMLElement).inert)).toBe(true);
  await expect.poll(() => featuredClone.locator('a').first().evaluate((node) => node.getAttribute('tabindex'))).toBe('-1');

  // WEB.1D — the one-time scroll reveal is a progressive enhancement: scan the
  // fully-revealed page so the audit still covers every section.
  await revealWholePage(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const seriousOrCritical = results.violations.filter((violation) => (
    violation.impact === 'serious' || violation.impact === 'critical'
  ));

  expect(seriousOrCritical).toEqual([]);
});
