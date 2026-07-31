import Image from 'next/image';
import Link from 'next/link';
import { networkPrinciples } from '@/data/network';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'Rede Qualidade é Vida',
  description:
    'Visão institucional da Rede Qualidade é Vida e relação independente da Qevaryn Systems como operadora tecnológica.'
};

export default function NetworkPage() {
  return (
    <main className="bg-paper">
      <section className="bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-section">
          <Image
            src="/images/qualidade-e-vida-systems-logo.png"
            alt="Rede Qualidade é Vida"
            width={680}
            height={155}
            priority
            sizes="(max-width: 768px) 220px, 300px"
            className="h-auto w-[220px] object-contain md:w-[300px]"
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">Rede Qualidade é Vida</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Empresas independentes, ligadas por valores e padrões comuns de qualidade.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
            A rede foi pensada para aproximar iniciativas empresariais juridicamente e financeiramente independentes, com oportunidades voluntárias de cooperação e uma cultura comum de organização, confiança e melhoria contínua.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-section">
          <SectionHeading
            title="Como a rede deve ser entendida"
            subtitle="A marca institucional não substitui contratos, responsabilidades ou gestão das empresas operadoras."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {networkPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article key={principle.title} className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-gold-600" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold text-navy-900">{principle.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-[1.35rem] border border-borderline bg-white p-6 text-sm leading-7 text-muted shadow-sm">
            <p>A rede não deve ser entendida como uma única empresa operacional. Cada participante deverá ter administração, contratos e responsabilidades próprias.</p>
            <p className="mt-4">Não existe mistura automática de patrimónios. Projetos conjuntos dependerão de contratos próprios e definição clara de responsabilidades.</p>
            <p className="mt-4">A Qevaryn Systems atua como operadora tecnológica independente ligada a esta identidade institucional.</p>
            <p className="mt-4 rounded-2xl bg-paper p-4 font-medium text-navy-900">
              A estrutura jurídica e contratual da rede encontra-se em desenvolvimento e deverá ser validada por profissionais especializados em Portugal.
            </p>
          </div>

          <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-gold-600 underline-offset-4 hover:underline">
            Voltar à Qevaryn Systems
          </Link>
        </div>
      </section>
    </main>
  );
}
