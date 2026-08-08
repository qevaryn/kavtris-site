import { describe, expect, it } from 'vitest';
import {
  buildContactEmailSubject,
  buildContactNotificationEmail
} from '@/emails/contact-notification';
import type { ContactFormValues } from '@/domain/contact';

const baseValues: ContactFormValues = {
  name: 'Ana Silva',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '+351 900 000 000',
  sector: 'Serviços',
  service: 'Automação de processos',
  productInterest: 'Qevaryn FieldOps',
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

    expect(email.html).toContain('src="cid:qevaryn-systems-logo"');
    expect(email.html).toContain('Novo pedido comercial');
    expect(email.html).toContain('Integrante da Rede Qualidade é Vida');
    expect(email.html).not.toContain('github.com/gabrielsouza80');
    expect(email.html).toContain('Ana Silva');
    expect(email.html).toContain('Automação de processos');
    expect(email.html).toContain('Qevaryn FieldOps');
    expect(email.html).toContain('+351 900 000 000');
    expect(email.html).toContain('Serviços');
    expect(email.html).toContain('Funcionários');
    expect(email.html).toContain('Hoje a equipa confirma pedidos por mensagem');
    expect(email.html).toContain('Precisamos automatizar fluxos críticos.<br />Há tarefas repetitivas todos os dias.');
    expect(email.html).toContain('https://example.com/contacto');
  });

  it('preserva UTF-8 em subject, HTML e text/plain (conjunto mínimo de acentos)', () => {
    const email = buildContactNotificationEmail({
      ...baseValues,
      service: 'Automação de processos',
      company: 'Organização Gestão',
      currentProcess: 'Configuração de processos com ação imediata.',
      message: 'Não é necessária uma ação imediata. A qualidade é importante.'
    });

    // Words carried by the payload must survive intact into the subject.
    for (const word of ['Automação', 'processos']) {
      expect(email.subject).toContain(word);
    }

    // Payload words must survive intact into both HTML and text/plain.
    const payloadWords = ['Automação', 'Configuração', 'Organização', 'ação', 'Não', 'Gestão', 'processos'];

    for (const word of payloadWords) {
      expect(email.html).toContain(word);
      expect(email.text).toContain(word);
    }

    // Fixed template words with accents must remain intact.
    for (const word of ['através', 'Informações', 'Preferência', 'está difícil', 'afetado']) {
      expect(email.html).toContain(word);
    }
    expect(email.text).toContain('através');

    // Replacement character must never appear in the generated email.
    expect(email.subject).not.toContain('\uFFFD');
    expect(email.html).not.toContain('\uFFFD');
    expect(email.text).not.toContain('\uFFFD');

    // Mozjibake patterns must not appear.
    expect(email.html).not.toContain('Automa??o');
    expect(email.html).not.toContain('Automa\uFFFD\uFFFDo');
  });

  it('declara charset UTF-8 no HTML do email', () => {
    const email = buildContactNotificationEmail(baseValues);

    expect(email.html).toMatch(/<meta\s+charset=["']utf-8["']\s*\/?>/i);
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
    expect(email.text).toContain('Produto de interesse: Qevaryn FieldOps');
    expect(email.text).toContain('Integrante da Rede Qualidade é Vida');
    expect(email.text).toContain('Responder diretamente ao email do cliente: ana@example.com');
  });

  it('gera assunto com serviço e empresa', () => {
    expect(buildContactEmailSubject(baseValues)).toBe('[Novo contacto] Automação de processos — Empresa Exemplo');
  });

  it('gera assunto com nome quando empresa está vazia', () => {
    expect(buildContactEmailSubject({ ...baseValues, company: '' })).toBe('[Novo contacto] Automação de processos — Ana Silva');
  });
});
