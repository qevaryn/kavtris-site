import type { Metadata } from 'next';
import { EnterprisePageView } from '@/features/enterprise/EnterprisePageView';
import { siteUrl } from '@/lib/constants';

const title = 'Engenharia e Tecnologia para Empresas';
const description =
  'Tecnologia adaptada à realidade da sua empresa. A KAVTRIS identifica oportunidades, adapta soluções existentes ou desenvolve a tecnologia necessária para melhorar processos reais.';
const canonicalPath = '/empresas';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalPath
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: `${siteUrl}${canonicalPath}`,
    siteName: 'KAVTRIS',
    title,
    description,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'KAVTRIS - informações para empresas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/twitter-image.png']
  }
};

export default function CompaniesPage() {
  return <EnterprisePageView />;
}
