import { expect, test } from '@playwright/test';

test('homepage social links expose only current public profiles', async ({ page }) => {
  await page.goto('/');

  const footerLinkedIn = page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/ });
  const allLinkedInLinks = page.getByRole('link', { name: /LinkedIn/ });

  await expect(footerLinkedIn).toHaveCount(1);
  await expect(footerLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(allLinkedInLinks).toHaveCount(1);
  await expect(page.locator('#sobre').getByRole('link', { name: /LinkedIn/ })).toHaveCount(0);
  await expect(page.locator('#sobre').getByRole('link', { name: /GitHub/ })).toHaveCount(0);
});
