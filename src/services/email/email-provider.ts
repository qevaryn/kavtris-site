import type { ContactFormValues } from '@/domain/contact';

export type ContactEmailResult =
  | {
      mode: 'mock';
      id: string;
    }
  | unknown;

export interface ContactEmailProvider {
  sendContactNotification(values: ContactFormValues): Promise<ContactEmailResult>;
}
