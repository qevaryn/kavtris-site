import { expect, test } from '@playwright/test';

test('homepage social links expose only current public profiles', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(page.locator('#sobre').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(page.locator('#sobre').getByRole('link', { name: /GitHub/ })).toHaveCount(0);
});
