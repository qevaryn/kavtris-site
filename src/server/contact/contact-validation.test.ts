import { describe, expect, it } from 'vitest';
import { validateContactRequest } from './contact-validation';

const validBody = {
  name: 'Ana Silva',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '',
  sector: 'Serviços',
  service: 'Automação de processos',
  productInterest: '',
  currentProcess: 'Hoje a equipa organiza pedidos por mensagens.',
  affectedPeople: 'Funcionários',
  contactPreference: 'Email',
  message: 'Mensagem suficientemente longa para validar o pedido.',
  privacyConsent: true,
  honeypot: ''
};

describe('validateContactRequest', () => {
  it('returns serializable field errors for invalid email', () => {
    const result = validateContactRequest({
      ...validBody,
      email: 'ana@example.com\r\nBcc: attacker@example.com'
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error('Expected validation failure');
    }

    expect(result.issues.formErrors).toEqual(expect.any(Array));
    expect(result.issues.fieldErrors).toEqual(expect.any(Object));
    expect(result.issues.fieldErrors.email).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(result.issues).not.toBeInstanceOf(Error);
  });

  it('returns serializable field errors for privacy consent false', () => {
    const result = validateContactRequest({
      ...validBody,
      privacyConsent: false
    });

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error('Expected validation failure');
    }

    expect(result.issues.formErrors).toEqual(expect.any(Array));
    expect(result.issues.fieldErrors.privacyConsent).toEqual(expect.arrayContaining([expect.any(String)]));
  });

  it('returns form errors for primitive bodies without exposing Zod error objects', () => {
    const result = validateContactRequest('contact');

    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error('Expected validation failure');
    }

    expect(result.issues.formErrors).toEqual(expect.arrayContaining([expect.any(String)]));
    expect(result.issues.fieldErrors).toEqual({});
    expect(result.issues).not.toBeInstanceOf(Error);
    expect(JSON.parse(JSON.stringify(result.issues))).toEqual(result.issues);
  });
});
