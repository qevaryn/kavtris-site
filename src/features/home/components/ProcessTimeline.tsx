"use client";

import { Lightbulb, Rocket, Search, TrendingUp, Users } from 'lucide-react';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { RevealOnce } from '@/components/shared/RevealOnce';
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
    <section id="processo" className="kavtris-ambient-light relative bg-kavtris-light pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
      {/* WEB.1C — deliberate dark → light transition (soft tonal fade from the
          CredibilityBar above; architectural, no wave/blob/glow). */}
      <div
        aria-hidden="true"
        data-testid="processo-dark-light-transition"
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-kavtris-dark/30 to-transparent"
      />
      {/* WEB.1D — whole-section reveal once (HOW_WE_WORK_WHOLE_REVEAL = YES). */}
      <RevealOnce testId="reveal-processo">
        <div className="container-section">
          <SectionHeading className="[&_h2]:font-sans"
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
          tone="light"
          items={processSteps}
          itemClassName="basis-[89%] sm:basis-[74%] md:basis-[52%] lg:basis-[34%] xl:basis-[32%]"
          autoplayMs={2000}
          interactionPauseMs={2000}
          showCounter
          counterClassName="text-muted"
          getItemLabel={(step, index) => `Passo ${index + 1}: ${step.title}`}
          renderItem={(step, context) => {
            const Icon = step.icon;

            return (
              <article
                className={[
                  'panel-light panel-light-hover h-full rounded-[1.25rem] border p-5 text-left',
                  context.isActive
                    ? 'border-kavtris-blue/55 shadow-[0_10px_32px_rgba(6,90,253,0.14)]'
                    : 'border-navy-900/10'
                ].join(' ')}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blue">0{context.index + 1}</p>
                <span className="mt-3 grid h-14 w-14 place-items-center rounded-lg border border-kavtris-blue/25 bg-kavtris-blue/5 text-kavtris-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </article>
            );
          }}
          />
        </div>
      </RevealOnce>
    </section>
  );
}
