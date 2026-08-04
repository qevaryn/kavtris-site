import { test, expect } from '@playwright/test';

const validContactPayload = {
  name: 'Ana',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '',
  sector: '',
  service: 'Reduzir tarefas manuais',
  currentProcess: '',
  affectedPeople: '',
  contactPreference: '',
  message: 'Quero automatizar tarefas repetitivas e organizar melhor os pedidos da empresa.',
  privacyConsent: true,
  honeypot: ''
};

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

test('formulário sem configuração de email não retorna falso sucesso', async ({ request }) => {
  test.skip(Boolean(process.env.BASE_URL), 'Teste negativo de configuração só deve correr contra ambiente local controlado.');

  const response = await request.post('/api/contact', {
    data: validContactPayload,
    headers: {
      'x-forwarded-for': `203.0.113.${test.info().workerIndex + 10}`
    }
  });

  expect(response.status()).toBe(503);
  await expect(response).not.toBeOK();
  await expect(await response.json()).toMatchObject({
    ok: false,
    message: 'O formulário não está configurado para envio neste ambiente.'
  });
});
