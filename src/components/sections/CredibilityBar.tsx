import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';

export function CredibilityBar() {
  return (
    <section className="border-y border-borderline bg-white" aria-label="Assinatura institucional">
      <div className="container-section py-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="seal" className="shrink-0" />
            <div>
              <p className="text-sm font-semibold text-navy-900">Integrante da Rede Qualidade é Vida</p>
              <p className="mt-1 text-sm leading-6 text-muted">Padrões, responsabilidade e qualidade aplicados em cada projeto.</p>
            </div>
          </div>

          <Link href="/rede-qualidade-e-vida" className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-600 underline-offset-4 hover:underline">
            Conhecer a Rede
          </Link>
        </div>
      </div>
    </section>
  );
}
