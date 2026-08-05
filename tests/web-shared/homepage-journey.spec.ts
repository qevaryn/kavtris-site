import { test, expect } from '@playwright/test';

test('homepage usa uma jornada curta de descoberta, produtos, processo e confiança', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('Qevaryn Systems').first()).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'O que pretende melhorar?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Ainda não sei' })).toBeVisible();

  await page.getByRole('button', { name: 'Gerir equipas externas' }).click();
  const finder = page.locator('#problemas');
  await expect(finder.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(finder.getByText('Organize serviços, visitas, checklists, evidências e relatórios num único sistema.')).toBeVisible();
  await expect(finder.getByRole('link', { name: /Ver como funciona/ })).toHaveAttribute('href', '/produtos/fieldops');
  await expect(finder.getByRole('link', { name: 'Falar sobre esta solução' })).toHaveAttribute('href', '/?produto=fieldops#contacto');

  await page.getByRole('button', { name: 'Ainda não sei' }).click();
  await expect(page.getByText(/Não há problema\. Conte-nos como a sua empresa funciona/i)).toBeVisible();
  await expect(finder.getByRole('link', { name: 'Explique o seu problema' })).toHaveAttribute('href', '#contacto');

  const preview = page.locator('#produtos-preview');
  await expect(preview.getByRole('heading', { name: 'Qevaryn FieldOps' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Qevaryn Hotel Operations' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Qevaryn Stock & Orders' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'Precisa de outra solução?' })).toBeVisible();
  await expect(preview.getByRole('link', { name: 'Ver produto' })).toHaveCount(3);

  await expect(page.getByRole('heading', { name: 'Um processo simples para chegar à solução certa.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Prototipar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Construir e testar' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lançar e acompanhar' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Interface simples, processo técnico por trás.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Segurança e acessos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ver informações para empresas' })).toHaveAttribute('href', '/empresas');

  await expect(page.getByRole('heading', { name: 'Experiência e responsabilidade por trás da Qevaryn.' })).toBeVisible();
  await expect(page.locator('#sobre').getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/gabrielsouza80/');
  await expect(page.locator('#sobre').getByRole('link', { name: /GitHub/ })).toHaveCount(0);

  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Veja um exemplo sem precisar entender termos técnicos.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'CareFlow' })).toHaveCount(0);
});
