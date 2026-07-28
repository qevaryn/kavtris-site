import { Resend } from 'resend';
import { companyName, siteUrl } from '@/lib/constants';
import type { ContactFormValues } from '@/lib/validation';

const requiredEnvKeys = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'RESEND_TO_EMAIL'] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

  const resend = new Resend(apiKey);
  const subject = `${companyName} - novo pedido de análise`;
  const safeValues = {
    name: escapeHtml(values.name),
    company: escapeHtml(values.company),
    email: escapeHtml(values.email),
    service: escapeHtml(values.service),
    timeline: escapeHtml(values.timeline),
    message: escapeHtml(values.message).replace(/\n/g, '<br />')
  };
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0A1B30">
      <h1>Novo pedido de análise</h1>
      <p><strong>Nome:</strong> ${safeValues.name}</p>
      <p><strong>Empresa:</strong> ${safeValues.company}</p>
      <p><strong>Email:</strong> ${safeValues.email}</p>
      <p><strong>Serviço:</strong> ${safeValues.service}</p>
      <p><strong>Prazo:</strong> ${safeValues.timeline}</p>
      <p><strong>Mensagem:</strong><br />${safeValues.message}</p>
      <p style="margin-top:24px;color:#5B6470">Enviado através de ${siteUrl}</p>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: values.email,
    subject,
    html
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
