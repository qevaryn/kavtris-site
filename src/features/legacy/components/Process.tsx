import { processSteps } from '@/data/process';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Process() {
  return (
    <section id="processo" className="soft-section-line bg-mist py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Começamos pelo que precisa ser validado primeiro"
          subtitle="Começamos pela solução necessária para validar o resultado, sem obrigar o cliente a investir imediatamente num sistema enorme."
          align="center"
        />

        <div className="relative mt-12">
          <div className="absolute left-[8.333%] right-[8.333%] top-8 hidden h-px bg-kavtris-blue/45 lg:block" />
          <div className="relative grid gap-0 lg:grid-cols-6 lg:gap-5">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-7 last:pb-0 lg:block lg:pb-0 lg:text-center">
                {index < processSteps.length - 1 ? <span className="absolute left-8 top-16 h-[calc(100%-4rem)] w-px bg-kavtris-blue/40 lg:hidden" aria-hidden="true" /> : null}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-kavtris-blue">0{index + 1}</span>
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-kavtris-blue/30 bg-white text-kavtris-blue shadow-sm lg:h-16 lg:w-16">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-navy-800 lg:mt-4">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-muted">
          Cada projeto pode ser estruturado por escopo fechado, fases, acompanhamento mensal ou suporte contínuo, conforme o diagnóstico e a maturidade da solução.
        </p>
      </div>
    </section>
  );
}
