import type { ContactFormValues } from '@/domain/contact';
import type { ContactEmailProvider } from '@/services/email/email-provider';
import { resendEmailProvider } from '@/services/email/resend';

export async function processContactRequest(
  values: ContactFormValues,
  emailProvider: ContactEmailProvider = resendEmailProvider
) {
  await emailProvider.sendContactNotification(values);
}
