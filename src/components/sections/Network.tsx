import Image from 'next/image';
import { networkPrinciples } from '@/data/network';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Network() {
  return (
    <section id="rede" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <div className="grid gap-8 rounded-[1.5rem] border border-borderline bg-paper p-6 shadow-sm md:p-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
          <div>
            <Image
              src="/images/qualidade-e-vida-systems-logo.png"
              alt="Rede Qualidade é Vida"
              width={680}
              height={155}
              sizes="(max-width: 768px) 190px, 240px"
              className="h-auto w-[190px] object-contain md:w-[240px]"
            />
            <p className="mt-5 rounded-full border border-gold-600/20 bg-white px-4 py-2 text-sm font-semibold text-gold-600">
              Integrante da Rede Qualidade é Vida
            </p>
          </div>

          <div>
            <SectionHeading
              eyebrow="Rede Qualidade é Vida"
              title="Tecnologia independente, ligada a um padrão comum de qualidade"
              subtitle="A Qevaryn Systems é uma empresa de tecnologia independente e integra o projeto institucional Rede Qualidade é Vida. A rede foi pensada para unir empresas juridicamente e financeiramente independentes através de valores, padrões de qualidade e oportunidades voluntárias de cooperação."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {networkPrinciples.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div key={principle.title} className="rounded-2xl border border-borderline bg-white p-4">
                    <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-navy-900">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button href="/rede-qualidade-e-vida">
                Conhecer a Rede Qualidade é Vida
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
