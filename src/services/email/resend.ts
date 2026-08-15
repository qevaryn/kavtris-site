import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resend, type Attachment } from 'resend';
import { buildContactNotificationEmail } from '@/emails/contact-notification';
import { getContactEmailEnv } from '@/config/server-env';
import type { ContactFormValues } from '@/domain/contact';
import type { ContactEmailProvider } from '@/services/email/email-provider';

// The CID identifier remains the legacy technical id (fully internal; shared
// only with the email HTML template and tests). It is intentionally not
// renamed for cosmetic namespace cleanliness (BRAND.2E §21 option A). The
// visible asset content is now the KAVTRIS wordmark.
const logoContentId = 'kavtris-logo';
const logoFilename = 'kavtris-wordmark-dark.png';
type InlineLogoAttachment = Attachment & { contentId: string; inlineContentId: string };

async function readEmailLogo() {
  const logoPath = path.join(process.cwd(), 'public', 'brand', 'kavtris', 'kavtris-wordmark-dark.png');

  try {
    return await readFile(logoPath);
  } catch (error) {
    console.error('Contact email logo is missing or unreadable.', {
      code: error instanceof Error && 'code' in error ? (error as NodeJS.ErrnoException).code : 'UNKNOWN'
    });
    throw new Error('CONTACT_EMAIL_ASSET_NOT_CONFIGURED');
  }
}

export async function sendContactEmail(values: ContactFormValues) {
  const emailEnv = getContactEmailEnv();

  if (emailEnv.isMockEnabled) {
    return {
      mode: 'mock',
      id: 'mock-contact-email'
    };
  }

  if (emailEnv.missingKeys.length > 0) {
    throw new Error('CONTACT_EMAIL_NOT_CONFIGURED');
  }

  const logoContent = await readEmailLogo();
  const email = buildContactNotificationEmail({
    ...values,
    submittedAt: new Date()
  });

  const resend = new Resend(emailEnv.apiKey as string);
  const inlineLogoAttachment: InlineLogoAttachment = {
    filename: logoFilename,
    content: logoContent,
    contentType: 'image/png',
    inlineContentId: logoContentId,
    contentId: logoContentId
  };

  const { data, error } = await resend.emails.send({
    from: emailEnv.fromEmail as string,
    to: emailEnv.toEmail as string,
    replyTo: values.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
    attachments: [inlineLogoAttachment]
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const resendEmailProvider: ContactEmailProvider = {
  sendContactNotification: sendContactEmail
};
