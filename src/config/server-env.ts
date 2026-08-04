const contactEmailEnvKeys = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'RESEND_TO_EMAIL'] as const;

export type ContactEmailEnv = {
  isMockEnabled: boolean;
  missingKeys: string[];
  apiKey?: string;
  fromEmail?: string;
  toEmail?: string;
};

export function getContactEmailEnv(env = process.env): ContactEmailEnv {
  const missingKeys = contactEmailEnvKeys.filter((key) => !env[key]);

  return {
    isMockEnabled: env.CONTACT_FORM_MOCK === 'true' && env.NODE_ENV !== 'production',
    missingKeys,
    apiKey: env.RESEND_API_KEY,
    fromEmail: env.RESEND_FROM_EMAIL,
    toEmail: env.RESEND_TO_EMAIL
  };
}
