import { describe, expect, it } from 'vitest';
import {
  buildContactEmailSubject,
  buildContactNotificationEmail
} from '@/emails/contact-notification';
import type { ContactFormValues } from '@/lib/validation';

const baseValues: ContactFormValues = {
  name: 'Ana Silva',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '+351 900 000 000',
  sector: 'Serviços',
  service: 'Automação de processos',
  currentProcess: 'Hoje a equipa confirma pedidos por mensagem e atualiza uma folha manualmente.',
  affectedPeople: 'Funcionários',
  contactPreference: 'Email',
  message: 'Precisamos automatizar fluxos críticos.\nHá tarefas repetitivas todos os dias.',
  privacyConsent: true,
  honeypot: ''
};

describe('contact notification email template', () => {
  it('gera HTML com logomarca CID e dados principais', () => {
    const email = buildContactNotificationEmail({
      ...baseValues,
      submittedAt: new Date('2026-07-28T13:35:00.000Z'),
      origin: 'https://example.com/contacto'
    });

    expect(email.html).toContain('src="cid:qualidade-e-vida-logo"');
    expect(email.html).toContain('Novo pedido comercial');
    expect(email.html).toContain('Ana Silva');
    expect(email.html).toContain('Automação de processos');
    expect(email.html).toContain('+351 900 000 000');
    expect(email.html).toContain('Serviços');
    expect(email.html).toContain('Funcionários');
    expect(email.html).toContain('Hoje a equipa confirma pedidos por mensagem');
    expect(email.html).toContain('Precisamos automatizar fluxos críticos.<br />Há tarefas repetitivas todos os dias.');
    expect(email.html).toContain('https://example.com/contacto');
  });

  it('escapa conteúdo HTML malicioso', () => {
    const email = buildContactNotificationEmail({
      ...baseValues,
      name: '<img src=x onerror=alert(1)>',
      company: '<script>alert(1)</script>',
      currentProcess: '<b>processo</b>',
      message: '<script>alert("xss")</script><b>texto</b>'
    });

    expect(email.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(email.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(email.html).toContain('&lt;b&gt;processo&lt;/b&gt;');
    expect(email.html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;b&gt;texto&lt;/b&gt;');
    expect(email.html).not.toContain('<script>alert');
  });

  it('gera versão text/plain', () => {
    const email = buildContactNotificationEmail(baseValues);

    expect(email.text).toContain('Novo pedido comercial');
    expect(email.text).toContain('Nome: Ana Silva');
    expect(email.text).toContain('Empresa: Empresa Exemplo');
    expect(email.text).toContain('Email: ana@example.com');
    expect(email.text).toContain('Responder diretamente ao email do cliente: ana@example.com');
  });

  it('gera assunto com serviço e empresa', () => {
    expect(buildContactEmailSubject(baseValues)).toBe('[Novo contacto] Automação de processos — Empresa Exemplo');
  });

  it('gera assunto com nome quando empresa está vazia', () => {
    expect(buildContactEmailSubject({ ...baseValues, company: '' })).toBe('[Novo contacto] Automação de processos — Ana Silva');
  });
});
