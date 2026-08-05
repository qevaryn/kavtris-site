"use client";

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { homepageSolutionFinderOptions } from '@/features/home/data/solution-finder';
import { getProductBySlug } from '@/features/products/data/products';
import type { SolutionFinderOption } from '@/features/home/data/solution-finder';

export function SolutionFinder() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = homepageSolutionFinderOptions.find((option) => option.id === selectedId) ?? null;

  return (
    <section id="problemas" className="bg-paper py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <SectionHeading
          eyebrow="Descobrir solução"
          title="O que pretende melhorar?"
          subtitle="Quatro intenções rápidas para chegar a uma direção clara sem transformar a homepage num questionário longo."
        />

        <div className="mt-7 lg:hidden">
          <div role="group" aria-label="Opções de melhoria" className="grid gap-3">
            {homepageSolutionFinderOptions.map((option) => {
              const isSelected = selected?.id === option.id;
              const panelId = `solution-option-panel-${option.id}`;

              return (
                <article key={option.id} className="overflow-hidden rounded-2xl border border-borderline bg-white shadow-sm">
                  <button
                    id={`solution-option-button-${option.id}`}
                    type="button"
                    aria-pressed={isSelected}
                    aria-expanded={isSelected}
                    aria-controls={panelId}
                    onClick={() => setSelectedId((currentId) => (currentId === option.id ? null : option.id))}
                    className={
                      `flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold leading-5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                        isSelected ? 'bg-navy-950 text-white' : 'text-navy-900 hover:bg-gold-500/10'
                      }`
                    }
                  >
                    <span>{option.label}</span>
                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-gold-500' : 'bg-navy-900/20'}`} aria-hidden="true" />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={`solution-option-button-${option.id}`}
                    hidden={!isSelected}
                    data-testid={panelId}
                    className="border-t border-borderline bg-paper/60"
                  >
                    <div className="p-4">
                      <RecommendationContent option={option} compact />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-borderline bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-semibold text-navy-900">Ainda não sabe o que precisa?</p>
            <Button href="#contacto" variant="ghost" className="mt-3 min-h-11 w-full border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
              Explique o seu problema
            </Button>
          </div>
        </div>

        <div className="mt-7 hidden gap-7 lg:grid lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div>
            <div className="grid gap-2" role="group" aria-label="Opções de melhoria">
              {homepageSolutionFinderOptions.map((option) => {
                const isSelected = selected?.id === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId((currentId) => (currentId === option.id ? null : option.id))}
                    className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold leading-5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                      isSelected
                        ? 'border-gold-600 bg-navy-950 text-white shadow-card'
                        : 'border-borderline bg-white text-navy-800 hover:border-gold-600/60'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-borderline bg-white px-4 py-4 shadow-sm">
              <p className="text-sm font-semibold text-navy-900">Ainda não sabe o que precisa?</p>
              <Button href="#contacto" variant="ghost" className="mt-3 min-h-11 w-full border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10 sm:w-auto">
                Explique o seu problema
              </Button>
            </div>
          </div>

          <article className="rounded-[1.5rem] border border-borderline bg-white p-6 shadow-card lg:sticky lg:top-28" data-testid="solution-desktop-result">
            {selected ? <RecommendationContent option={selected} /> : <NeutralRecommendationContent />}
          </article>
        </div>
      </div>
    </section>
  );
}

function NeutralRecommendationContent() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Descobrir solução</p>
      <h3 className="mt-3 text-xl font-semibold text-navy-900 sm:text-2xl">Escolha uma opção para ver a recomendação.</h3>
      <p className="mt-3 text-sm leading-7 text-muted">
        Selecione uma intenção ao lado para ver um produto sugerido e o melhor próximo passo para a sua equipa.
      </p>

      <div className="mt-5 rounded-2xl border border-borderline bg-paper/60 p-4">
        <p className="text-sm leading-7 text-muted">Preferir ajuda direta também funciona. Podemos orientar sem compromisso.</p>
      </div>

      <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
        <Button href="#contacto" className="w-full text-navy-950 sm:w-auto">
          Falar sobre o meu contexto
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}

function RecommendationContent({ option, compact = false }: { option: SolutionFinderOption; compact?: boolean }) {
  const product = option.productSlug ? getProductBySlug(option.productSlug) : undefined;

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Solução sugerida</p>
      <h3 className="mt-3 text-xl font-semibold text-navy-900 sm:text-2xl">{option.recommendationTitle}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{option.recommendationDescription}</p>

      <div className="mt-4 flex gap-3 rounded-2xl border border-borderline bg-white p-4">
        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">Produto relacionado</p>
          {product ? (
            <>
              <p className="mt-2 text-base font-semibold text-navy-900">{product.name}</p>
              {!compact ? <p className="mt-1 text-sm leading-6 text-muted">{product.shortDescription}</p> : null}
            </>
          ) : (
            <p className="mt-2 text-sm leading-6 text-navy-800">Escolha uma intenção para ver o ponto de partida mais próximo.</p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
        <Button href={option.primaryCtaHref} className="w-full text-navy-950 sm:w-auto">
          {option.primaryCtaLabel}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
        {option.secondaryCtaHref && option.secondaryCtaLabel ? (
          <Button href={option.secondaryCtaHref} variant="ghost" className="w-full border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10 sm:w-auto">
            {option.secondaryCtaLabel}
          </Button>
        ) : null}
      </div>
    </>
  );
}
