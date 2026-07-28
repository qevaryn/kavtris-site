export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qualidadeevidatech.pt';

export const companyName = 'Qualidade é Vida Tech';

export const navigationLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Como trabalhamos', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contacto', href: '#contacto' }
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/qualidade-e-vida-tech',
  github: 'https://github.com/qualidade-e-vida-tech'
};

export const contactEmail = process.env.RESEND_TO_EMAIL || 'contacto@qualidadeevidatech.pt';
