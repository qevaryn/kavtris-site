import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { companyName, shouldIndexSite, siteUrl } from '@/lib/constants';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Qevaryn Systems | Sistemas Web, Automação e Qualidade de Software',
    template: '%s | Qevaryn Systems'
  },
  description:
    'Desenvolvimento de sistemas web, automação de processos, integrações, aplicações empresariais e qualidade de software para empresas em Portugal.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: siteUrl,
    siteName: companyName,
    title: 'Qevaryn Systems | Sistemas Web, Automação e Qualidade de Software',
    description:
      'Desenvolvimento de sistemas web, automação de processos, integrações, aplicações empresariais e qualidade de software para empresas em Portugal.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Qevaryn Systems - Sistemas Web, Automação e Qualidade de Software'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qevaryn Systems | Sistemas Web, Automação e Qualidade de Software',
    description:
      'Desenvolvimento de sistemas web, automação de processos, integrações, aplicações empresariais e qualidade de software para empresas em Portugal.',
    images: ['/twitter-image.png']
  },
  robots: {
    index: shouldIndexSite,
    follow: shouldIndexSite
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-PT" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans text-navy-800 antialiased">
        {children}
      </body>
    </html>
  );
}
