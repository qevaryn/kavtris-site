export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const isDemoUrl = siteUrl.includes('localhost') || siteUrl.includes('.vercel.app');
export const shouldIndexSite = !isDemoUrl;

export const companyName = 'KAVTRIS';
/**
 * BRAND.2E — `companyName` converged to the public corporate brand KAVTRIS.
 * It now feeds the Open Graph `siteName` (layout.tsx) and the email display
 * header/footer (contact-notification.ts), both migrated in BRAND.2E.
 * `publicBrandName` remains as the explicit display-brand constant used by
 * the site footer; both equal KAVTRIS. Product names, technical identifiers,
 * legal entity data and domains are not routed through this constant.
 */
export const publicBrandName = 'KAVTRIS';
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

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
