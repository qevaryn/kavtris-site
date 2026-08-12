import type { ContactFormValues } from '@/domain/contact';
import { brandTagline, companyName, siteUrl } from '@/lib/constants';

const emailSubjectPrefix = 'Re: Pedido — KAVTRIS';

export type ContactNotificationInput = ContactFormValues & {
  submittedAt?: Date;
  origin?: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDisplayValue(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : 'Não informada';
}

function formatSubmittedAt(date = new Date()) {
  return new Intl.DateTimeFormat('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Lisbon'
  }).format(date);
}

function buildMailto(email: string) {
  const params = new URLSearchParams({ subject: emailSubjectPrefix });
  return `mailto:${encodeURIComponent(email)}?${params.toString()}`;
}

export function buildContactEmailSubject(values: Pick<ContactFormValues, 'service' | 'company' | 'name'>) {
  const recipientLabel = formatDisplayValue(values.company) === 'Não informada' ? values.name : values.company;
  return `[Novo contacto] ${values.service} — ${recipientLabel}`;
}

export function buildContactNotificationEmail(input: ContactNotificationInput) {
  const submittedAt = formatSubmittedAt(input.submittedAt);
  const origin = input.origin || siteUrl;
  const company = formatDisplayValue(input.company);
  const mailto = buildMailto(input.email);
  const safe = {
    name: escapeHtml(input.name),
    company: escapeHtml(company),
    email: escapeHtml(input.email),
    phone: escapeHtml(formatDisplayValue(input.phone)),
    sector: escapeHtml(input.sector),
    service: escapeHtml(input.service),
    productInterest: escapeHtml(formatDisplayValue(input.productInterest)),
    currentProcess: escapeHtml(input.currentProcess).replace(/\n/g, '<br />'),
    affectedPeople: escapeHtml(input.affectedPeople),
    contactPreference: escapeHtml(input.contactPreference),
    message: escapeHtml(input.message).replace(/\n/g, '<br />'),
    submittedAt: escapeHtml(submittedAt),
    origin: escapeHtml(origin),
    mailto: escapeHtml(mailto)
  };

  const html = `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#F3F4F6;color:#0A1B30;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#F3F4F6;margin:0;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;border-collapse:collapse;">
            <tr>
              <td style="background:#031426;padding:28px 32px 22px 32px;border-radius:18px 18px 0 0;">
                <img src="cid:qevaryn-systems-logo" width="280" alt="KAVTRIS" style="display:block;width:280px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;" />
                <div style="height:2px;width:96px;background:#065AFD;margin:20px 0 14px 0;"></div>
                <p style="margin:0;color:#3D7BFF;font-size:12px;line-height:18px;letter-spacing:1.8px;text-transform:uppercase;font-weight:700;">Novo contacto através do site</p>
              </td>
            </tr>
            <tr>
              <td style="background:#FFFFFF;padding:32px;border-left:1px solid #E6E7E8;border-right:1px solid #E6E7E8;">
                <h1 style="margin:0 0 10px 0;color:#0A1B30;font-size:26px;line-height:34px;font-family:Georgia,'Times New Roman',serif;">Novo pedido comercial</h1>
                <p style="margin:0 0 24px 0;color:#4B5563;font-size:15px;line-height:24px;">Um potencial cliente enviou um pedido através do formulário da KAVTRIS.</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 28px 0;">
                  <tr>
                    <td style="padding:12px;background:#FBF7ED;border:1px solid #EAD7AE;border-radius:12px;">
                      <p style="margin:0 0 4px 0;color:#7A4E00;font-size:12px;font-weight:700;text-transform:uppercase;">Tipo de necessidade</p>
                      <p style="margin:0;color:#0A1B30;font-size:15px;line-height:22px;font-weight:700;">${safe.service}</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px;background:#F8F8F6;border:1px solid #E6E7E8;border-radius:12px;">
                      <p style="margin:0 0 4px 0;color:#4B5563;font-size:12px;font-weight:700;text-transform:uppercase;">Produto de interesse</p>
                      <p style="margin:0;color:#0A1B30;font-size:15px;line-height:22px;">${safe.productInterest}</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px;background:#F8F8F6;border:1px solid #E6E7E8;border-radius:12px;">
                      <p style="margin:0 0 4px 0;color:#4B5563;font-size:12px;font-weight:700;text-transform:uppercase;">Empresa</p>
                      <p style="margin:0;color:#0A1B30;font-size:15px;line-height:22px;">${safe.company}</p>
                    </td>
                  </tr>
                  <tr><td style="height:10px;"></td></tr>
                  <tr>
                    <td style="padding:12px;background:#F8F8F6;border:1px solid #E6E7E8;border-radius:12px;">
                      <p style="margin:0 0 4px 0;color:#4B5563;font-size:12px;font-weight:700;text-transform:uppercase;">Setor</p>
                      <p style="margin:0;color:#0A1B30;font-size:15px;line-height:22px;">${safe.sector}</p>
                    </td>
                  </tr>
                </table>

                <h2 style="margin:0 0 12px 0;color:#0A1B30;font-size:18px;line-height:26px;">Dados do contacto</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                  <tr>
                    <td style="padding:10px 0;color:#4B5563;font-size:14px;width:130px;">Nome:</td>
                    <td style="padding:10px 0;color:#0A1B30;font-size:14px;font-weight:700;">${safe.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#4B5563;font-size:14px;">Empresa:</td>
                    <td style="padding:10px 0;color:#0A1B30;font-size:14px;">${safe.company}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#4B5563;font-size:14px;">Email:</td>
                    <td style="padding:10px 0;color:#0A1B30;font-size:14px;"><a href="mailto:${safe.email}" style="color:#7A4E00;text-decoration:underline;">${safe.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#4B5563;font-size:14px;">Telefone:</td>
                    <td style="padding:10px 0;color:#0A1B30;font-size:14px;">${safe.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#4B5563;font-size:14px;">Preferência:</td>
                    <td style="padding:10px 0;color:#0A1B30;font-size:14px;">${safe.contactPreference}</td>
                  </tr>
                </table>

                <h2 style="margin:0 0 12px 0;color:#0A1B30;font-size:18px;line-height:26px;">Como funciona atualmente</h2>
                <div style="background:#F8F8F6;border-left:4px solid #D99A16;padding:18px 18px;margin-bottom:22px;color:#0A1B30;font-size:15px;line-height:24px;">
                  ${safe.currentProcess}
                </div>

                <h2 style="margin:0 0 12px 0;color:#0A1B30;font-size:18px;line-height:26px;">O que está difícil</h2>
                <div style="background:#F8F8F6;border-left:4px solid #D99A16;padding:18px 18px;margin-bottom:28px;color:#0A1B30;font-size:15px;line-height:24px;">
                  ${safe.message}
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:26px;">
                  <tr>
                    <td style="border-radius:999px;background:#065AFD;">
                      <a href="${safe.mailto}" style="display:inline-block;padding:13px 20px;color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;border-radius:999px;">Responder ao potencial cliente</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 28px 0;color:#4B5563;font-size:13px;line-height:20px;">Se o botão não funcionar, responda para: <a href="mailto:${safe.email}" style="color:#065AFD;text-decoration:underline;">${safe.email}</a></p>

                <h2 style="margin:0 0 12px 0;color:#0A1B30;font-size:16px;line-height:24px;">Informações do pedido</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#F8F8F6;border:1px solid #E6E7E8;">
                  <tr><td style="padding:10px 14px;color:#4B5563;font-size:13px;">Data e hora:</td><td style="padding:10px 14px;color:#0A1B30;font-size:13px;">${safe.submittedAt} (Europe/Lisbon)</td></tr>
                  <tr><td style="padding:10px 14px;color:#4B5563;font-size:13px;">Página de origem:</td><td style="padding:10px 14px;color:#0A1B30;font-size:13px;">${safe.origin}</td></tr>
                  <tr><td style="padding:10px 14px;color:#4B5563;font-size:13px;">Tipo de necessidade:</td><td style="padding:10px 14px;color:#0A1B30;font-size:13px;">${safe.service}</td></tr>
                  <tr><td style="padding:10px 14px;color:#4B5563;font-size:13px;">Quem é afetado:</td><td style="padding:10px 14px;color:#0A1B30;font-size:13px;">${safe.affectedPeople}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#031426;padding:24px 32px;border-radius:0 0 18px 18px;color:#FFFFFF;">
                <p style="margin:0 0 6px 0;font-size:16px;line-height:24px;font-weight:700;">${companyName}</p>
                <p style="margin:0 0 12px 0;color:#D1D5DB;font-size:13px;line-height:20px;">${brandTagline}</p>
                <p style="margin:0 0 14px 0;color:#3D7BFF;font-size:13px;line-height:20px;">Integrante da Rede Qualidade é Vida</p>
                <p style="margin:0;color:#9CA3AF;font-size:12px;line-height:18px;">Esta mensagem foi gerada automaticamente através do formulário de contacto do site.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    'Novo pedido comercial',
    '',
    'Um potencial cliente enviou um pedido através do formulário da KAVTRIS.',
    '',
    `Nome: ${input.name}`,
    `Empresa: ${company}`,
    `Email: ${input.email}`,
    `Telefone: ${formatDisplayValue(input.phone)}`,
    `Setor: ${input.sector}`,
    `Tipo de necessidade: ${input.service}`,
    `Produto de interesse: ${formatDisplayValue(input.productInterest)}`,
    `Quem é afetado: ${input.affectedPeople}`,
    `Melhor forma de contacto: ${input.contactPreference}`,
    '',
    'Como funciona atualmente:',
    input.currentProcess,
    '',
    'O que está difícil:',
    input.message,
    '',
    `Data do pedido: ${submittedAt} (Europe/Lisbon)`,
    `Página de origem: ${origin}`,
    '',
    `Responder diretamente ao email do cliente: ${input.email}`,
    '',
    `${companyName} — ${brandTagline}`,
    'Integrante da Rede Qualidade é Vida',
    'Esta mensagem foi gerada automaticamente através do formulário de contacto do site.'
  ].join('\n');

  return {
    subject: buildContactEmailSubject(input),
    html,
    text
  };
}
