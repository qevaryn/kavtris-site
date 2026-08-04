"use client";

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { solutionFinderOptions } from '@/data/solution-finder';
import { getProductBySlug } from '@/data/products';

export function SolutionFinder() {
  const [selectedId, setSelectedId] = useState(solutionFinderOptions[0].id);
  const selected = solutionFinderOptions.find((option) => option.id === selectedId) ?? solutionFinderOptions[0];
  const product = selected.productSlug ? getProductBySlug(selected.productSlug) : undefined;

  return (
    <section id="problemas" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Descobrir solução"
              title="O que pretende melhorar?"
              subtitle="Escolha a dificuldade mais próxima da sua realidade. A resposta mostra um ponto de partida simples, sem transformar a homepage num questionário longo."
            />
            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="group" aria-label="Opções de melhoria">
              {solutionFinderOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected.id === option.id}
                  onClick={() => setSelectedId(option.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                    selected.id === option.id
                      ? 'border-gold-600 bg-navy-950 text-white shadow-card'
                      : 'border-borderline bg-white text-navy-800 hover:border-gold-600/60'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <article className="rounded-[1.5rem] border border-borderline bg-white p-5 shadow-card sm:p-7 lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Solução sugerida</p>
            <h3 className="mt-3 text-2xl font-semibold text-navy-900 sm:text-3xl">{selected.recommendationTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{selected.problem}</p>
            <div className="mt-5 rounded-2xl bg-paper p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <p className="text-sm leading-7 text-navy-800">{selected.recommendationDescription}</p>
              </div>
            </div>

            {product ? (
              <div className="mt-5 rounded-2xl border border-gold-600/20 bg-gold-500/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Produto relacionado</p>
                <p className="mt-2 text-base font-semibold text-navy-900">{product.name}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{product.shortDescription}</p>
              </div>
            ) : null}

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Button href={selected.primaryCtaHref} className="w-full text-navy-950 sm:w-auto">
                {selected.primaryCtaLabel}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              {selected.secondaryCtaHref && selected.secondaryCtaLabel ? (
                <Button href={selected.secondaryCtaHref} variant="ghost" className="w-full border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10 sm:w-auto">
                  {selected.secondaryCtaLabel}
                </Button>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
