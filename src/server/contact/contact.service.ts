import { sendContactEmail } from '@/services/email/resend';
import type { ContactFormValues } from '@/domain/contact/contracts';

export async function processContactRequest(values: ContactFormValues) {
  await sendContactEmail(values);
}
