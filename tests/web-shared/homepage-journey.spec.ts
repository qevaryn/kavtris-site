import { test, expect } from '@playwright/test';

test('homepage usa a jornada simplificada: hero → credibilidade → como funciona → rede → contacto → meaning', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('banner').getByLabel(/KAVTRIS — Technology & Consulting/i)).toBeVisible();
  await expect(page.getByText('Qualidade é Vida Tech')).toHaveCount(0);

  // Hero e credibilidade.
  await expect(page.getByRole('heading', { name: /Tecnologia que/ })).toBeVisible();
  await expect(page.locator('#inicio').getByRole('link', { name: 'Ver como funciona' })).toHaveAttribute('href', '#como-funciona');
  await expect(page.getByTestId('services-ticker').getByText('Reduzir tarefas manuais').first()).toBeVisible();

  // Como funciona: seletor de caminho do cliente (exatamente dois cartões;
  // WEB.1F.6 removeu o terceiro caminho técnico).
  const comoFunciona = page.locator('#como-funciona');
  await expect(comoFunciona.getByRole('heading', { name: 'Comece pelo caminho mais simples para a sua empresa.' })).toBeVisible();

  const businessPath = comoFunciona.getByTestId('home-path-business-primary');
  await expect(businessPath.getByRole('heading', { name: 'Começar pelo meu negócio' })).toBeVisible();
  await expect(businessPath.getByRole('link', { name: 'Escolher pelo meu negócio' })).toHaveAttribute(
    'href',
    '/produtos?modo=negocio#tipos-de-negocio'
  );

  const systemsPath = comoFunciona.getByTestId('home-path-systems-secondary');
  await expect(systemsPath.getByRole('heading', { name: 'Ver os sistemas' })).toBeVisible();
  await expect(systemsPath.getByRole('link', { name: 'Ver todos os sistemas' })).toHaveAttribute(
    'href',
    '/produtos?modo=sistemas#catalogo'
  );

  await expect(comoFunciona.getByTestId('home-path-technical')).toHaveCount(0);
  await expect(comoFunciona.getByText('Ver capacidades mais técnicas')).toHaveCount(0);

  // Rede Qualidade é Vida.
  const networkPreview = page.locator('#rede');
  await expect(networkPreview.getByText('Rede Qualidade é Vida').first()).toBeVisible();
  await expect(networkPreview.getByRole('heading', { name: 'Tecnologia integrada a uma rede criada para servir melhor.' })).toBeVisible();
  await expect(networkPreview.getByRole('link', { name: 'Conhecer a Rede' })).toHaveAttribute('href', '/rede-qualidade-e-vida');
  await expect(networkPreview.getByRole('link', { name: /LinkedIn/i })).toHaveCount(0);

  // Contacto e Meaning.
  await expect(page.locator('#contacto').getByRole('heading', { name: 'Não precisa chegar com uma solução pronta.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /meaning behind/i })).toBeVisible();

  // Secções antigas removidas por decisão do dono.
  await expect(page.getByRole('heading', { name: 'Do diagnóstico à solução, sem complicação.' })).toHaveCount(0);
  await expect(page.getByTestId('featured-products-carousel')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Simples para usar. Engenharia por trás.' })).toHaveCount(0);
  await expect(page.locator('#empresas')).toHaveCount(0);

  // Nenhum resíduo das jornadas antigas.
  await expect(page.getByRole('heading', { name: 'Primeiro o resultado. Depois os detalhes.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Veja um exemplo sem precisar entender termos técnicos.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Responda sobre o negócio. Nós traduzimos para tecnologia.' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'CareFlow' })).toHaveCount(0);
});

