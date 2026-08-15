import { expect, test } from '@playwright/test';

const preLaunchRoutes = ['/', '/produtos', '/produtos/kavtris-ops'] as const;

test.describe('pre-launch search indexing policy', () => {
  for (const route of preLaunchRoutes) {
    test(`${route} exposes noindex and nofollow`, async ({ page }) => {
      await page.goto(route);

      const robots = page.locator('meta[name="robots"]');
      await expect(robots).toHaveAttribute('content', /noindex/i);
      await expect(robots).toHaveAttribute('content', /nofollow/i);
    });
  }
});
