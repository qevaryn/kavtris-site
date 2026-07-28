import { processSteps } from '@/data/process';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Process() {
  return (
    <section id="processo" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Como trabalhamos" align="center" />

        <div className="relative mt-12">
          <div className="absolute left-[8.333%] right-[8.333%] top-8 hidden h-px bg-gold-600/35 lg:block" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {processSteps.map((step, index) => (
              <article key={step.title} className="relative rounded-2xl border border-borderline bg-paper p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-glow lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="flex items-center justify-center gap-3 lg:flex-col">
                  <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-gold-600/30 bg-white text-gold-600 shadow-sm">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
