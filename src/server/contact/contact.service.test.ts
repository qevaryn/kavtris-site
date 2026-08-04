import { describe, expect, it, vi } from 'vitest';
import { processContactRequest } from '@/server/contact/contact.service';
import type { ContactFormValues } from '@/domain/contact';
import type { ContactEmailProvider } from '@/services/email/email-provider';

const validValues: ContactFormValues = {
  name: 'Ana Silva',
  company: 'Empresa Exemplo',
  email: 'ana@example.com',
  phone: '',
  sector: '',
  service: 'Reduzir tarefas manuais',
  productInterest: '',
  currentProcess: '',
  affectedPeople: '',
  contactPreference: '',
  message: 'Quero automatizar tarefas repetitivas e organizar melhor os pedidos da empresa.',
  privacyConsent: true,
  honeypot: ''
};

describe('processContactRequest', () => {
  it('envia a notificação através de um provider neutro', async () => {
    const sendContactNotification = vi.fn().mockResolvedValue({ id: 'email-id' });
    const provider: ContactEmailProvider = { sendContactNotification };

    await processContactRequest(validValues, provider);

    expect(sendContactNotification).toHaveBeenCalledTimes(1);
    expect(sendContactNotification).toHaveBeenCalledWith(validValues);
  });
});
