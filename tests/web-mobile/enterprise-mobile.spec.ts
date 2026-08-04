import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

test('mobile enterprise page has no horizontal overflow and keeps accordions usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/empresas');

  await expectNoHorizontalOverflow(page);
  await expect(page.getByRole('heading', { name: /Software claro para operações/i })).toBeVisible();
  await expect(page.locator('#capacidades').locator('summary').first()).toBeVisible();
});
