export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const isDemoUrl = siteUrl.includes('localhost') || siteUrl.includes('.vercel.app');
export const shouldIndexSite = !isDemoUrl;

export const companyName = 'Qevaryn Systems';
/**
 * BRAND.2D — narrowly scoped public display brand value.
 * `companyName` is intentionally left unchanged because it also feeds
 * email identity (contact-notification.ts) and Open Graph `siteName`
 * (layout.tsx), both governed by BRAND.2E. This constant isolates the
 * visible corporate display brand without touching SEO/email surfaces.
 * BRAND_2E_DEPENDENCY: later phases should decide whether `companyName`
 * itself converges to KAVTRIS.
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
