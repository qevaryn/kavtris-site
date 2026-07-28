import { test, expect } from '@playwright/test';

const validContactPayload = {
  name: 'Ana',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  service: 'QA Manual e Análise',
  timeline: 'Imediato',
  message: 'Quero melhorar a qualidade do meu produto com um processo claro e sustentável.',
  privacyConsent: true,
  honeypot: ''
};

test('valida formulário vazio, email inválido e envio com sucesso interceptado', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Enviar pedido de análise' }).click();
  await expect(page.getByText('Indique o seu nome.')).toBeVisible();

  await page.getByLabel('Nome').fill('Ana');
  await page.getByLabel('Empresa').fill('Empresa Exemplo');
  await page.getByLabel('Email').fill('email-invalido');
  await page.getByLabel('Prazo desejado').selectOption({ label: 'Imediato' });
  await page.getByLabel('Serviço pretendido').selectOption({ label: 'QA Manual e Análise' });
  await page.getByLabel('Descrição do projeto').fill('Quero melhorar a qualidade do meu produto com um processo claro e sustentável.');
  await page.getByLabel('Li e aceito a Política de Privacidade.').check();
  await page.getByRole('button', { name: 'Enviar pedido de análise' }).click();
  await expect(page.getByText('Indique um email válido.')).toBeVisible();

  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true })
    });
  });

  await page.getByLabel('Email').fill('ana@example.com');
  await page.getByRole('button', { name: 'Enviar pedido de análise' }).click();
  await expect(page.getByRole('status')).toHaveText(/Pedido enviado com sucesso/i);
});

test('formulário sem configuração de email não retorna falso sucesso', async ({ request }) => {
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
