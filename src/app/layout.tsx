import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { companyName, siteUrl } from '@/lib/constants';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Qualidade é Vida Tech | QA e Automação de Testes',
    template: '%s | Qualidade é Vida Tech'
  },
  description:
    'Serviços de QA Manual, automação de testes, melhoria de processos e qualidade de software para empresas e equipas de desenvolvimento.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: siteUrl,
    siteName: companyName,
    title: 'Qualidade é Vida Tech | QA e Automação de Testes',
    description:
      'Serviços de QA Manual, automação de testes, melhoria de processos e qualidade de software para empresas e equipas de desenvolvimento.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-paper font-sans text-navy-800 antialiased">
        {children}
      </body>
    </html>
  );
}
