export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const isDemoUrl = siteUrl.includes('localhost') || siteUrl.includes('.vercel.app');
export const shouldIndexSite = !isDemoUrl;

export const companyName = 'Qevaryn Systems';
export const brandTagline = 'Software • Automation • Quality • Innovation';
export const networkName = 'Rede Qualidade é Vida';

export const navigationLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Sectores', href: '#sectores' },
  { label: 'Como trabalhamos', href: '#processo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Rede', href: '#rede' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contacto', href: '#contacto' }
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/gabrielsouza80/',
  github: 'https://github.com/gabrielsouza80'
};

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
