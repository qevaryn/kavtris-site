export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

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
  linkedin: 'https://www.linkedin.com/in/gabrielsouza80/',
  github: 'https://github.com/gabrielsouza80'
};

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
