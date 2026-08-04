import { test, expect } from '@playwright/test';

test('valida formulário vazio, email inválido e envio com sucesso interceptado', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Não precisa chegar com uma solução pronta.' })).toBeVisible();
  await expect(page.locator('#contacto').getByText('Operadora da Qualidade é Vida')).toBeVisible();

  await page.getByRole('button', { name: 'Enviar explicação' }).click();
  await expect(page.getByText('Indique o seu nome.')).toBeVisible();

  await page.getByRole('textbox', { name: 'Nome' }).fill('Ana');
  await page.getByRole('textbox', { name: 'Empresa' }).fill('Empresa Exemplo');
  await page.getByRole('textbox', { name: 'Email' }).fill('email-invalido');
  await page.getByRole('textbox', { name: /Telefone/ }).fill('+351 900 000 000');
  await page.getByLabel('Produto ou problema').selectOption({ label: 'Reduzir tarefas manuais' });
  await page.locator('textarea#message').fill('Quero automatizar tarefas repetitivas e organizar melhor os pedidos da empresa.');
  await page.getByLabel('Li e aceito a Política de Privacidade.').check();
  await page.getByRole('button', { name: 'Enviar explicação' }).click();
  await expect(page.getByText('Indique um email válido.')).toBeVisible();

  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true })
    });
  });

  await page.getByLabel('Email').fill('ana@example.com');
  await page.getByRole('button', { name: 'Enviar explicação' }).click();
  await expect(page.getByRole('status')).toHaveText(/Pedido enviado com sucesso/i);
});

test('contacto preserva intenção de solução personalizada', async ({ page }) => {
  await page.goto('/?tipo=personalizada#contacto');

  await expect(page.locator('#contacto')).toBeInViewport();
  await expect(page.getByLabel('Produto ou problema')).toHaveValue('Solução personalizada / outro problema');
  await expect(page.getByLabel(/Produto de interesse/)).toContainText('Ainda não sei qual solução preciso');
});
