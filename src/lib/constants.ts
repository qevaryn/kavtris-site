const normalizeSiteUrl = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim().replace(/\/+$/, '');

  if (!trimmedValue) {
    return undefined;
  }

  return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
};

export const resolveSiteUrl = (environment: Partial<NodeJS.ProcessEnv> = process.env) =>
  normalizeSiteUrl(environment.NEXT_PUBLIC_SITE_URL)
  || normalizeSiteUrl(environment.VERCEL_PROJECT_PRODUCTION_URL)
  || normalizeSiteUrl(environment.VERCEL_URL)
  || 'http://localhost:3000';

export const siteUrl = resolveSiteUrl();

export const isDemoUrl = siteUrl.includes('localhost') || siteUrl.includes('.vercel.app');
export const isPreLaunch = true;
export const shouldIndexSite = false;

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
  // WEB.1F.5: "Como funciona" replaces "Como trabalhamos" (customer-path selector
  // on the simplified Home); "Engenharia" replaces "Serviços" (the /empresas
  // route now publicly signals deeper technical capabilities).
  { label: 'Início', href: '/#inicio' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Engenharia', href: '/empresas' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/#contacto' }
];

export const contactEmail = process.env.RESEND_TO_EMAIL || '';
