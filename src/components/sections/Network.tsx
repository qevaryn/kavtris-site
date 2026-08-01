import { ArrowDown, ArrowRight, BadgeCheck, Building2, Handshake, ShieldCheck } from 'lucide-react';
import { networkPrinciples } from '@/data/network';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';

const relationshipSteps = [
  'Rede Qualidade é Vida',
  'padrões e propósito',
  'Qevaryn Systems',
  'soluções e entregas'
];

export function Network() {
  return (
    <>
      <section id="rede" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">Hierarquia das marcas</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-navy-900 md:text-5xl">Duas marcas. Um propósito.</h2>
            <p className="mt-4 text-base leading-8 text-muted md:text-lg">Tecnologia que conecta. Qualidade que transforma.</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.34fr_1fr] lg:items-stretch">
            <article className="rounded-[1.5rem] border border-borderline bg-paper p-6 shadow-sm">
              <div className="flex min-h-20 items-center">
                <Logo variant="network" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Marca institucional</p>
              <h3 className="mt-3 text-xl font-semibold text-navy-900">Rede Qualidade é Vida</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Representa valores, padrões, confiança, responsabilidade, reputação e cooperação entre empresas independentes.
              </p>
            </article>

            <div className="rounded-[1.5rem] border border-gold-600/25 bg-navy-950 p-5 text-white shadow-sm">
              <ol className="grid gap-3">
                {relationshipSteps.map((step, index) => (
                  <li key={step} className="grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold">
                      {step}
                    </div>
                    {index < relationshipSteps.length - 1 ? (
                      <>
                        <ArrowDown className="mx-auto h-5 w-5 text-gold-500 lg:hidden" aria-hidden="true" />
                        <ArrowRight className="mx-auto hidden h-5 w-5 rotate-90 text-gold-500 lg:block" aria-hidden="true" />
                      </>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <article className="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-card">
              <div className="flex min-h-20 items-center">
                <Logo />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Empresa operadora de tecnologia</p>
              <h3 className="mt-3 text-xl font-semibold text-navy-900">Qevaryn Systems</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                Desenvolve sistemas, aplicações web, automações, integrações, QA, suporte e mantém a relação comercial com os clientes.
              </p>
            </article>
          </div>

          <div className="mt-8 rounded-[1.35rem] border border-borderline bg-paper p-5 text-sm leading-7 text-muted">
            A Qevaryn Systems mantém gestão, contratos e responsabilidades próprios, enquanto integra os padrões institucionais da Rede Qualidade é Vida.
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {networkPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article key={principle.title} className="rounded-[1.2rem] border border-borderline bg-white p-5 shadow-sm">
                  <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold text-navy-900">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8">
            <Button href="/rede-qualidade-e-vida">Conhecer a Rede Qualidade é Vida</Button>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white" aria-label="Assinatura conjunta">
        <div className="container-section flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-9 w-9 text-gold-500" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-500">Duas marcas. Um propósito.</p>
              <p className="mt-1 text-base text-white/78">Tecnologia que conecta. Qualidade que transforma.</p>
            </div>
          </div>
          <div className="flex gap-3 text-white/55" aria-hidden="true">
            <Building2 className="h-5 w-5" />
            <BadgeCheck className="h-5 w-5" />
            <Handshake className="h-5 w-5" />
          </div>
        </div>
      </section>
    </>
  );
}
