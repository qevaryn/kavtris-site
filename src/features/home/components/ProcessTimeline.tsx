"use client";

import { ClipboardCheck, Layers3, Rocket, Search } from 'lucide-react';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { SectionHeading } from '@/components/shared/SectionHeading';

const processSteps = [
  {
    title: 'Entender',
    description: 'Conhecemos o problema, a operação e as pessoas envolvidas.',
    icon: Search
  },
  {
    title: 'Prototipar',
    description: 'Mostramos uma versão navegável antes do desenvolvimento completo.',
    icon: Layers3
  },
  {
    title: 'Construir e testar',
    description: 'Desenvolvemos primeiro o essencial e validamos o funcionamento.',
    icon: ClipboardCheck
  },
  {
    title: 'Lançar e acompanhar',
    description: 'Colocamos a solução em funcionamento e evoluímos quando necessário.',
    icon: Rocket
  }
];

export function ProcessTimeline() {
  return (
    <section id="processo" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <SectionHeading
          eyebrow="Como funciona"
          title="Um processo simples para chegar à solução certa."
          subtitle="Começamos pelo essencial, validamos com clareza e evoluímos conforme a operação precisar."
          align="center"
        />

        <AccessibleCarousel
          ariaLabel="Passos do processo"
          testId="process-carousel"
          className="mt-10"
          motionMode="featured-step"
          items={processSteps}
          itemClassName="basis-[89%] sm:basis-[74%] md:basis-[52%] lg:basis-[34%] xl:basis-[32%]"
          autoplayMs={2000}
          interactionPauseMs={2000}
          showCounter
          getItemLabel={(step, index) => `Passo ${index + 1}: ${step.title}`}
          renderItem={(step, context) => {
            const Icon = step.icon;

            return (
              <article className="h-full rounded-[1.25rem] border border-borderline bg-paper p-5 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">0{context.index + 1}</p>
                <span className="mx-auto mt-3 grid h-14 w-14 place-items-center rounded-full border border-gold-600/30 bg-white text-gold-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </article>
            );
          }}
        />
      </div>
    </section>
  );
}
