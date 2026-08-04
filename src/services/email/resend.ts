import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resend, type Attachment } from 'resend';
import { buildContactNotificationEmail } from '@/emails/contact-notification';
import type { ContactFormValues } from '@/lib/validation';

const requiredEnvKeys = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'RESEND_TO_EMAIL'] as const;
const logoContentId = 'qualidade-e-vida-logo';
const logoFilename = 'qevaryn-systems.png';
type InlineLogoAttachment = Attachment & { contentId: string; inlineContentId: string };

async function readEmailLogo() {
  const logoPath = path.join(process.cwd(), 'public', 'images', 'email-logo.png');

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
  const isMockEnabled = process.env.CONTACT_FORM_MOCK === 'true';
  const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);

  if (isMockEnabled && process.env.NODE_ENV !== 'production') {
    return {
      mode: 'mock',
      id: 'mock-contact-email'
    };
  }

  if (missingKeys.length > 0) {
    throw new Error('CONTACT_EMAIL_NOT_CONFIGURED');
  }

  const apiKey = process.env.RESEND_API_KEY as string;
  const fromEmail = process.env.RESEND_FROM_EMAIL as string;
  const toEmail = process.env.RESEND_TO_EMAIL as string;
  const logoContent = await readEmailLogo();
  const email = buildContactNotificationEmail({
    ...values,
    submittedAt: new Date()
  });

  const resend = new Resend(apiKey);
  const inlineLogoAttachment: InlineLogoAttachment = {
    filename: logoFilename,
    content: logoContent,
    contentType: 'image/png',
    inlineContentId: logoContentId,
    contentId: logoContentId
  };

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
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
