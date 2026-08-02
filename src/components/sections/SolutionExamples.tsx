"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { solutionExamples } from '@/data/solution-examples';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function SolutionExamples() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section id="exemplos" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Exemplos simples"
          title="Primeiro o resultado. Depois os detalhes."
          subtitle="Cada solução começa pelo problema do negócio. As informações técnicas aparecem apenas quando fizer sentido."
          align="center"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutionExamples.map((solution) => {
            const isOpen = openTitle === solution.title;

            return (
              <article key={solution.title} className="rounded-[1.35rem] border border-borderline bg-paper p-5 shadow-sm">
                <p className="text-sm font-extrabold leading-6 text-gold-600">{solution.problem}</p>
                <h3 className="mt-4 text-xl font-semibold text-navy-900">{solution.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{solution.simple}</p>

                <button
                  type="button"
                  className="mt-5 flex min-h-11 w-full items-center justify-between rounded-2xl border border-borderline bg-white px-4 text-sm font-semibold text-navy-800 transition hover:border-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-expanded={isOpen}
                  aria-controls={`technical-${solution.title.replace(/\W+/g, '-').toLowerCase()}`}
                  onClick={() => setOpenTitle(isOpen ? null : solution.title)}
                >
                  {isOpen ? 'Ocultar detalhes técnicos' : 'Ver detalhes técnicos'}
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {isOpen ? (
                  <div id={`technical-${solution.title.replace(/\W+/g, '-').toLowerCase()}`} className="mt-4 rounded-2xl border border-navy-900/10 bg-white p-4">
                    <ul className="grid gap-2 text-sm leading-6 text-muted">
                      {solution.technical.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
