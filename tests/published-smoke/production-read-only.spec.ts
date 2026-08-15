import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/produtos',
  '/produtos?modo=negocio',
  '/produtos?modo=sistemas',
  '/empresas',
  '/sobre',
  '/produtos/fieldops',
  '/produtos/stock-orders',
  '/produtos/hotel-operations',
  '/produtos/kitchen-sync',
  '/produtos/kavtris-ops',
  '/produtos/customer-portal',
  '/#contacto'
] as const;

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile390', width: 390, height: 844 },
  { name: 'mobile320', width: 320, height: 900 }
] as const;

test.describe('published production smoke is read-only', () => {
  test('public routes load without first-party mutations or horizontal overflow', async ({ page, baseURL }) => {
    const origin = new URL(baseURL ?? 'http://127.0.0.1:3000').origin;
    const mutations: Array<{ method: string; url: string }> = [];
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('request', (request) => {
      const method = request.method();
      const url = request.url();
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && url.startsWith(origin)) {
        mutations.push({ method, url });
      }
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const route of routes) {
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${route} should return HTTP 200 at ${viewport.name}`).toBe(200);
        await expect(page.locator('body')).toContainText('KAVTRIS');

        const overflow = await page.evaluate(() =>
          Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)
        );
        expect(overflow, `${route} should not overflow horizontally at ${viewport.name}`).toBeLessThanOrEqual(1);
      }
    }

    expect(mutations, 'published smoke must not send first-party mutating requests').toEqual([]);
    expect(mutations.filter((entry) => entry.url.includes('/api/contact')), 'API contact POSTs must stay at zero').toEqual([]);
    expect(pageErrors, 'published smoke should not hit page errors').toEqual([]);
    expect(consoleErrors, 'published smoke should not hit console errors').toEqual([]);
  });
});
