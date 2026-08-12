import type { Metadata } from 'next';
import { AboutPageView } from '@/features/about/AboutPageView';
import { siteUrl } from '@/lib/constants';

const title = 'Sobre a KAVTRIS';
const description =
  'História da KAVTRIS: origem, percurso em qualidade de software, valores, fundador e relação institucional com a Rede Qualidade é Vida.';
const canonicalPath = '/sobre';

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
        alt: 'Sobre a KAVTRIS'
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

export default function AboutPage() {
  return <AboutPageView />;
}
