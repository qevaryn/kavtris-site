import { test, expect } from '@playwright/test';

test('valida formulário vazio, email inválido e envio com sucesso', async ({ page }) => {
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

  await page.getByLabel('Email').fill('ana@example.com');
  await page.getByRole('button', { name: 'Enviar pedido de análise' }).click();
  await expect(page.getByRole('status')).toHaveText(/Pedido enviado com sucesso/i);
});
