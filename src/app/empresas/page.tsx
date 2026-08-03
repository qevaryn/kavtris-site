import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Wrench, ClipboardCheck, LifeBuoy, FileText } from 'lucide-react';
import { enterpriseDetails } from '@/data/enterprise-details';
import { Button } from '@/components/ui/Button';
import { siteUrl } from '@/lib/constants';

const title = 'Para Empresas | Qevaryn Systems';
const description =
  'Informações técnicas e comerciais sobre segurança, desenvolvimento, qualidade, suporte, integrações e contratação de soluções Qevaryn Systems.';
const canonicalPath = '/empresas';

const icons = [ShieldCheck, Wrench, ClipboardCheck, LifeBuoy, FileText];

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
    siteName: 'Qevaryn Systems',
    title,
    description,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Qevaryn Systems - informações para empresas'
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
  return (
    <main className="bg-paper">
      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-section">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">Para empresas e equipas técnicas</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Soluções simples de utilizar, com processo técnico por trás.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
            A primeira conversa começa pelo problema do negócio. Quando o projeto exige mais detalhe, a Qevaryn organiza requisitos, segurança, arquitetura, qualidade, suporte e documentação de forma transparente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#contacto" className="text-navy-950">
              Explique o seu problema
            </Button>
            <Button href="/#empresas" variant="secondary">
              Voltar à secção
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-section">
          <div className="grid gap-5 lg:grid-cols-2">
            {enterpriseDetails.map((group, index) => {
              const Icon = icons[index] ?? FileText;

              return (
                <article key={group.title} className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-gold-600" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold text-navy-900">{group.title}</h2>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {group.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-6 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[1.35rem] border border-borderline bg-white p-6 text-sm leading-7 text-muted shadow-sm">
            <h2 className="text-xl font-semibold text-navy-900">Clareza antes de prometer</h2>
            <p className="mt-4">
              Prazos, níveis de suporte, propriedade do código, documentação, responsabilidades e continuidade devem ser definidos de acordo com o escopo e o contrato de cada projeto.
            </p>
            <p className="mt-4">
              A Qevaryn pode criar software independente ou ligado a equipamentos acessíveis, como QR Codes, NFC, tablets, leitores de código de barras, impressoras comuns, câmaras, sensores simples e equipamentos já existentes no cliente.
            </p>
            <p className="mt-4 font-medium text-navy-900">
              A empresa não está posicionada como fabricante de máquinas industriais ou equipamentos complexos nesta fase.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-sm font-semibold text-gold-700 underline-offset-4 hover:underline">
              Voltar à página inicial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
