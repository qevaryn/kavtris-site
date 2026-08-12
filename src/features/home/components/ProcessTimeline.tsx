"use client";

import { Lightbulb, Rocket, Search, TrendingUp, Users } from 'lucide-react';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { SectionHeading } from '@/components/shared/SectionHeading';

const processSteps = [
  {
    title: 'Identificar',
    description: 'Encontramos oportunidades de melhoria no funcionamento da sua operação.',
    icon: Search
  },
  {
    title: 'Entender',
    description: 'Compreendemos o contexto, os desafios e os objetivos do negócio.',
    icon: Users
  },
  {
    title: 'Propor',
    description: 'Selecionamos, adaptamos ou desenhamos a tecnologia certa.',
    icon: Lightbulb
  },
  {
    title: 'Implementar',
    description: 'Integramos a solução com o mínimo de perturbação na operação.',
    icon: Rocket
  },
  {
    title: 'Evoluir',
    description: 'Medimos resultados e melhoramos continuamente.',
    icon: TrendingUp
  }
];

export function ProcessTimeline() {
  return (
    <section id="processo" className="bg-[#030A1A] py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <SectionHeading className="[&_h2]:font-sans"
          tone="dark"
          eyebrow="Como trabalhamos"
          title="Do diagnóstico à solução, sem complicação."
          subtitle="Um processo consultivo e claro para entregar tecnologia que realmente faz a diferença — sem exigir que a sua empresa diagnostique o próprio problema."
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
          counterClassName="text-white/60"
          getItemLabel={(step, index) => `Passo ${index + 1}: ${step.title}`}
          renderItem={(step, context) => {
            const Icon = step.icon;

            return (
              <article className="h-full rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 text-left shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blueLight">0{context.index + 1}</p>
                <span className="mt-3 grid h-14 w-14 place-items-center rounded-lg border border-kavtris-blue/35 bg-white/[0.04] text-kavtris-blueLight">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{step.description}</p>
              </article>
            );
          }}
        />
      </div>
    </section>
  );
}
