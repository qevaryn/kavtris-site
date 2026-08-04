import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow } from '../shared/helpers/overflow';

test('mobile FieldOps has no horizontal overflow and keeps the team view usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto('/produtos/fieldops');

  await expectNoHorizontalOverflow(page);
  await expect(page.getByRole('heading', { name: /Organize equipas externas/i })).toBeVisible();
  await page.getByRole('tab', { name: 'Equipa', exact: true }).click();
  await expect(page.getByText('FieldOps Mobile')).toBeVisible();
});
