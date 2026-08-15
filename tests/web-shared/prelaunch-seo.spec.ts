import { expect, test } from '@playwright/test';

const preLaunchRoutes = ['/', '/produtos', '/produtos/kavtris-ops'] as const;
const metadataRoutes = ['/', '/sobre', '/produtos', '/produtos/kavtris-ops'] as const;
const legacyProductionHostPattern = /qevaryn-site\.vercel\.app/i;

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

test.describe('production metadata identity', () => {
  for (const route of metadataRoutes) {
    test(`${route} does not emit legacy Qevaryn production URLs in metadata`, async ({ page }) => {
      await page.goto(route);

      const metadataValues = await page.evaluate(() => {
        const values: string[] = [];

        document
          .querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
          .forEach((element) => values.push(element.href));

        document
          .querySelectorAll<HTMLMetaElement>(
            'meta[property="og:url"], meta[property="og:image"], meta[name="twitter:image"]'
          )
          .forEach((element) => {
            if (element.content) {
              values.push(element.content);
            }
          });

        document
          .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
          .forEach((element) => {
            if (element.textContent) {
              values.push(element.textContent);
            }
          });

        return values;
      });

      expect(metadataValues.join('\n')).not.toMatch(legacyProductionHostPattern);
    });
  }
});
