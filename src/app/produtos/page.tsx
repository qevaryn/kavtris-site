import type { Metadata } from 'next';
import { CatalogPageView } from '@/features/catalog/CatalogPageView';
import { siteUrl } from '@/lib/constants';

const title = 'Produtos e Soluções de Software';
const description =
  'Explore soluções de software para hotelaria, restauração, retalho, serviços, equipas externas e gestão empresarial.';
const canonicalPath = '/produtos';

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
        alt: 'Catálogo de produtos KAVTRIS'
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

export default function ProductsPage() {
  return <CatalogPageView />;
}
