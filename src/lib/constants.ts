export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const isDemoUrl = siteUrl.includes('localhost') || siteUrl.includes('.vercel.app');
export const shouldIndexSite = !isDemoUrl;

export const companyName = 'Qevaryn Systems';
export const brandTagline = 'Software • Automation • Quality • Innovation';
export const networkName = 'Rede Qualidade é Vida';

export const navigationLinks = [
  { label: 'Soluções', href: '/#problemas' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Para empresas', href: '/#empresas' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/#contacto' }
  // O link "Planos" (/#planos) entra apenas no PR 3, quando a secção existir.
];

export const socialLinks = {
  github: 'https://github.com/gabrielsouza80'
};

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
