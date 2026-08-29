import { test, expect } from '@playwright/test';

/**
 * Safe web coverage for the authenticated entry points.
 *
 * These tests only observe behaviour that requires no real account:
 *
 * - /conta without a session redirects to /entrar (server-side gate)
 * - /entrar is reachable, rendered, and keyboard-navigable
 * - the auth form exposes a labelled email + password field
 *
 * They never sign in, sign up, or create data. Authenticated happy paths are
 * covered by unit/integration tests against an in-memory PGlite database.
 */

test('unauthenticated /conta redirects to /entrar', async ({ page }) => {
  await page.goto('/conta');
  await expect(page).toHaveURL(/\/entrar/);
});

test('/entrar is reachable and renders the auth form', async ({ page }) => {
  await page.goto('/entrar');

  await expect(page).toHaveURL(/\/entrar/);
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();

  const email = page.getByLabel(/email/i);
  const password = page.getByLabel(/palavra-passe|password/i);
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
});

test('/entrar auth form is keyboard accessible', async ({ page }) => {
  await page.goto('/entrar');

  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();

  // Tabbing cycles through the primary interactive controls without trapping.
  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab');
  }
  await expect(page.locator(':focus')).toBeVisible();
});
