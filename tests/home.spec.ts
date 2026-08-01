import { test, expect } from '@playwright/test';

test('carrega a homepage', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Tecnologia que conecta processos, pessoas e resultados/i })).toBeVisible();
  await expect(page.locator('p', { hasText: 'Painel Operacional' }).filter({ visible: true }).first()).toBeVisible();
  await expect(page).toHaveTitle(/Qevaryn Systems \| Sistemas Web, Automação e Qualidade de Software/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Desenvolvimento de sistemas web/);
  await expect(page.getByLabel('Assinatura institucional').getByText('Integrante da Rede Qualidade é Vida')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Duas marcas. Um propósito.' })).toBeVisible();
});
