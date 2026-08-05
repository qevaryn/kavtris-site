import { expect, test } from '@playwright/test';

test('LinkedIn pessoal aparece apenas no fundador da página sobre', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);
  await expect(page.getByRole('contentinfo').getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);
  await expect(page.locator('#sobre').getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);

  await page.goto('/sobre');

  const founderCard = page.getByTestId('about-founder-card');
  const founderLinkedIn = founderCard.getByRole('link', { name: 'Ver perfil profissional no LinkedIn' });
  await expect(founderLinkedIn).toHaveCount(1);
  await expect(founderLinkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(founderLinkedIn).toHaveAttribute('target', '_blank');
  await expect(founderLinkedIn).toHaveAttribute('rel', /noopener/);
  await expect(page.getByRole('link', { name: /LinkedIn/i })).toHaveCount(1);
});
