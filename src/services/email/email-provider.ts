import type { ContactFormValues } from '@/domain/contact';

export type ContactEmailResult =
  | {
      mode: 'mock';
      id: string;
    }
  | unknown;

/**
 * Provider-neutral email boundary used by server contact orchestration.
 * Resend-specific request types must stay in the Resend implementation.
 */
export interface ContactEmailProvider {
  sendContactNotification(values: ContactFormValues): Promise<ContactEmailResult>;
}
