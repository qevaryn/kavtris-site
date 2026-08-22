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
  it('accepts benign Portuguese Unicode and applies optional defaults', () => {
    const result = validateContactRequest({
      name: ' João Gonçalves ',
      company: ' Gestão e Automação ',
      email: 'joao@example.com',
      service: 'Informação necessária',
      message: ' Informação necessária sobre automação e gestão de processos. ',
      privacyConsent: true
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error('Expected validation success');
    }

    expect(result.data).toMatchObject({
      name: 'João Gonçalves',
      company: 'Gestão e Automação',
      phone: '',
      sector: '',
      productInterest: '',
      currentProcess: '',
      affectedPeople: '',
      contactPreference: '',
      honeypot: ''
    });
  });

  it('strips unknown keys from otherwise valid contact data', () => {
    const result = validateContactRequest({
      ...validBody,
      unexpectedAdminFlag: true
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error('Expected validation success');
    }

    expect('unexpectedAdminFlag' in result.data).toBe(false);
  });

  it('accepts message text at the maximum allowed length', () => {
    const result = validateContactRequest({
      ...validBody,
      message: 'M'.repeat(1200)
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      throw new Error('Expected validation success');
    }

    expect(result.data.message).toHaveLength(1200);
  });

  for (const field of ['name', 'email', 'service', 'message'] as const) {
    it(`returns a field error when required field ${field} is missing`, () => {
      const body: Record<string, unknown> = { ...validBody };
      delete body[field];

      const result = validateContactRequest(body);

      expect(result.success).toBe(false);
      if (result.success) {
        throw new Error('Expected validation failure');
      }

      expect(result.issues.fieldErrors[field]).toEqual(expect.arrayContaining([expect.any(String)]));
      expect(JSON.parse(JSON.stringify(result.issues))).toEqual(result.issues);
    });
  }

  for (const [field, value] of [
    ['name', 123],
    ['email', {}],
    ['service', []],
    ['message', []],
    ['privacyConsent', 1]
  ] as const) {
    it(`returns a field error when ${field} has the wrong type`, () => {
      const result = validateContactRequest({
        ...validBody,
        [field]: value
      });

      expect(result.success).toBe(false);
      if (result.success) {
        throw new Error('Expected validation failure');
      }

      expect(result.issues.fieldErrors[field]).toEqual(expect.arrayContaining([expect.any(String)]));
    });
  }

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
