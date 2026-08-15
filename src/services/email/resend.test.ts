import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { sendContactEmail } from '@/services/email/resend';
import type { ContactFormValues } from '@/domain/contact';

const sendMock = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn(function Resend() {
    return {
      emails: {
        send: sendMock
      }
    };
  })
}));

const validValues: ContactFormValues = {
  name: 'Ana Silva',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '',
  sector: 'Serviços',
  service: 'Automação de processos',
  productInterest: '',
  currentProcess: 'Hoje a equipa organiza pedidos por mensagens e folhas de cálculo.',
  affectedPeople: 'Funcionários',
  contactPreference: 'Email',
  message: 'Mensagem suficientemente longa para validar o envio do formulário.',
  privacyConsent: true,
  honeypot: ''
};

const originalEnv = process.env;

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env = {
      ...originalEnv,
      NODE_ENV: 'test',
      RESEND_API_KEY: 'test-api-key',
      RESEND_FROM_EMAIL: 'KAVTRIS <from@example.com>',
      RESEND_TO_EMAIL: 'destinatario@example.com',
      CONTACT_FORM_MOCK: 'false'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('mantém a logomarca do email disponível no repositório', () => {
    expect(existsSync(path.join(process.cwd(), 'public', 'brand', 'kavtris', 'kavtris-wordmark-dark.png'))).toBe(true);
  });

  it('envia para RESEND_TO_EMAIL, usa replyTo do cliente e attachment inline', async () => {
    sendMock.mockResolvedValue({ data: { id: 'email-id' }, error: null });

    await sendContactEmail(validValues);

    expect(sendMock).toHaveBeenCalledTimes(1);
    const payload = sendMock.mock.calls[0][0];

    expect(payload.to).toBe('destinatario@example.com');
    expect(payload.replyTo).toBe('ana@example.com');
    expect(payload.subject).toBe('[Novo contacto] Automação de processos — Empresa Exemplo');
    expect(payload.html).toContain('cid:kavtris-logo');
    expect(payload.text).toContain('Responder diretamente ao email do cliente');
    expect(payload.attachments).toEqual([
      expect.objectContaining({
        filename: 'kavtris-wordmark-dark.png',
        contentType: 'image/png',
        contentId: 'kavtris-logo',
        inlineContentId: 'kavtris-logo'
      })
    ]);
    expect(payload.attachments[0].content).toBeInstanceOf(Buffer);
  });

  it('mock explícito não envia email real', async () => {
    process.env.CONTACT_FORM_MOCK = 'true';

    await expect(sendContactEmail(validValues)).resolves.toMatchObject({
      mode: 'mock',
      id: 'mock-contact-email'
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('produção sem configuração retorna erro', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    delete process.env.RESEND_API_KEY;

    await expect(sendContactEmail(validValues)).rejects.toThrow('CONTACT_EMAIL_NOT_CONFIGURED');
    expect(sendMock).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  it('imagem inexistente gera erro e não falso sucesso', async () => {
    const cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue('C:\\caminho-inexistente-para-email-logo');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(sendContactEmail(validValues)).rejects.toThrow('CONTACT_EMAIL_ASSET_NOT_CONFIGURED');
    expect(sendMock).not.toHaveBeenCalled();

    cwdSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
