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
  // WEB.1F.4: explicit "Início" as the first navigation item — clicking the logo
  // may already return Home, but that should not be an implicit assumption.
  { label: 'Início', href: '/#inicio' },
  { label: 'Como trabalhamos', href: '/#como-trabalhamos' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Serviços', href: '/empresas' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/#contacto' }
];

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
