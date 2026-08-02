"use client";

import { useState } from 'react';
import { simpleProcessSteps } from '@/data/simple-process';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProcessTimeline() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="processo" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Como funciona"
          title="Construção por etapas, com linguagem clara."
          subtitle="Começamos pela solução necessária para validar o resultado, sem obrigar o cliente a investir imediatamente num sistema enorme."
          align="center"
        />

        <div className="relative mt-12">
          <div className="absolute left-[7%] right-[7%] top-8 hidden h-px bg-gold-600/40 lg:block" aria-hidden="true" />
          <div className="relative grid gap-4 lg:grid-cols-7">
            {simpleProcessSteps.map((step, index) => {
              const Icon = step.icon;
              const isOpen = openIndex === index;

              return (
                <article key={step.title} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group grid w-full grid-cols-[4rem_1fr] gap-4 rounded-2xl p-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 lg:block lg:text-center"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">0{index + 1}</span>
                      <span className={`grid h-14 w-14 place-items-center rounded-full border transition lg:mx-auto ${isOpen ? 'border-gold-600 bg-navy-900 text-gold-500' : 'border-gold-600/30 bg-white text-gold-600'}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </span>
                    <span>
                      <span className="block text-base font-semibold text-navy-900 lg:mt-4">{step.title}</span>
                      <span className="mt-2 block text-sm leading-6 text-muted">{step.description}</span>
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="mt-2 rounded-2xl border border-borderline bg-paper p-4 text-sm leading-6 text-muted lg:absolute lg:left-1/2 lg:z-10 lg:w-64 lg:-translate-x-1/2 lg:shadow-card">
                      {step.detail}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
