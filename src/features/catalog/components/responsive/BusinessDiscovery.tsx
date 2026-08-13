"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/components/shared/cn';
import { useReducedMotion } from '@/components/shared/useReducedMotion';
import {
  businessCategories,
  type BusinessCategory
} from '@/features/catalog/data/business-discovery';
import { BusinessVisual } from '@/features/catalog/components/responsive/BusinessVisual';
import { getProductBySlug } from '@/features/products/data/products';

type SelectedId = BusinessCategory['id'] | null;

/**
 * WEB.1F.3 — /produtos two-profile model.
 *
 *  - two-path choice near the top (Profile A → catalog, Profile B → business);
 *  - "Qual é o seu negócio?" discovery cards (plain language, large targets);
 *  - selecting a business type shows only EXISTING adaptable product concepts
 *    with honest "ponto de partida adaptável" copy — no invented fit claims;
 *  - stable query state: /produtos?negocio=barbearias (deep-link friendly);
 *  - reduced motion: instant selection scroll.
 */
export function BusinessDiscovery() {
  const reducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // WEB.1F.3 §38 — stable query state: /produtos?negocio=barbearias preselects
    // the category. Deferred so the effect only schedules external sync.
    const timer = window.setTimeout(() => {
      const fromUrl = new URLSearchParams(window.location.search).get('negocio');
      if (fromUrl && businessCategories.some((category) => category.id === fromUrl)) {
        setSelectedId(fromUrl as BusinessCategory['id']);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const selected = useMemo(
    () => businessCategories.find((category) => category.id === selectedId) ?? null,
    [selectedId]
  );

  const selectCategory = (id: BusinessCategory['id']) => {
    setSelectedId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('negocio', id);
    window.history.replaceState(window.history.state, '', url.toString());

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }, 0);
  };

  return (
    <>
      {/* Step 2 — two-path choice */}
      <section id="negocio" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <SectionHeading
            className="[&_h2]:font-sans"
            eyebrow="Dois caminhos"
            title="Já sabe o que procura, ou prefere começar pelo seu negócio?"
            subtitle="Cada pessoa chega de uma forma diferente. Escolha o caminho que faz mais sentido para si — os dois levam a soluções reais."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="flex flex-col rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Já sabe o que procura</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Veja os nossos sistemas.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore os conceitos de software por setor, diretamente no catálogo de sistemas.
              </p>
              <Button href="#catalogo" className="mt-auto w-full sm:w-auto">
                Ver todos os sistemas
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </article>

            <article className="flex flex-col rounded-[1.35rem] border border-kavtris-blue/25 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Não sabe qual solução precisa</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Comece pelo seu tipo de negócio.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Escolha o contexto da sua empresa e veja pontos de partida que podem fazer sentido.
              </p>
              <Button href="#negocio-cards" variant="outline" className="mt-auto w-full sm:w-auto">
                Encontrar pelo meu negócio
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Step 3 — business discovery */}
      <section id="negocio-cards" className="bg-mist py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <SectionHeading
            className="[&_h2]:font-sans"
            eyebrow="Qual é o seu negócio?"
            title="Descubra sistemas a partir do contexto da sua empresa."
            subtitle="Não precisa saber qual sistema precisa antes de falar connosco. Comece pelo tipo de negócio mais próximo e veja soluções que podem fazer sentido."
          />

          <div className="snap-row mt-8 md:grid md:snap-none md:grid-cols-2 xl:grid-cols-3">
            {businessCategories.map((category) => {
              const isSelected = selectedId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  data-testid={`business-card-${category.id}`}
                  aria-pressed={isSelected}
                  onClick={() => selectCategory(category.id)}
                  className={cn(
                    'snap-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] border bg-white text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-kavtris-blue ring-2 ring-kavtris-blue/40'
                      : 'border-borderline hover:-translate-y-0.5 hover:border-kavtris-blue/50 hover:shadow-card motion-reduce:translate-y-0 motion-reduce:hover:translate-y-0'
                  )}
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-navy-950">
                    <BusinessVisual businessId={category.id} />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="text-lg font-semibold text-navy-950">{category.label}</span>
                    <span className="mt-2 text-sm leading-6 text-slate-600">{category.short}</span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      {category.needs.map((need) => (
                        <span
                          key={need}
                          className="rounded-full border border-navy-200 bg-white px-2.5 py-1 text-xs font-semibold text-navy-800"
                        >
                          {need}
                        </span>
                      ))}
                    </span>
                    <span
                      className={cn(
                        'mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold',
                        isSelected ? 'text-kavtris-blue' : 'text-kavtris-blue group-hover:text-kavtris-blueLight'
                      )}
                    >
                      Ver soluções
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>


          {selected ? (
            <div
              ref={resultsRef}
              data-testid="discovery-results"
              aria-live="polite"
              className="mt-10 scroll-mt-24 rounded-[1.5rem] border border-kavtris-blue/30 bg-navy-950 p-6 text-white shadow-card sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blueLight">Ponto de partida</p>
              <h3 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                Soluções que podem fazer sentido para {selected.label.toLowerCase()}.
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
                Estas soluções podem ser bons pontos de partida. A configuração final depende da realidade da sua empresa.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {selected.productSlugs.map((slug) => {
                  const product = getProductBySlug(slug);
                  if (!product) {
                    return null;
                  }

                  return (
                    <article key={slug} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">
                        {product.categoryLabel}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">{product.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/70">{product.shortDescription}</p>
                      <span className="mt-3 inline-flex w-fit rounded-full border border-kavtris-blueLight/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-kavtris-blueLight">
                        Pode ser adaptado
                      </span>
                      <Link
                        href={`/produtos/${product.slug}`}
                        className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-kavtris-blueLight/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-kavtris-blue hover:border-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                      >
                        Ver produto
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-semibold text-white">Não encontrou algo exatamente igual?</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Não há problema. Explique como o seu negócio funciona e ajudamos a encontrar o melhor ponto de partida.
                  </p>
                </div>
                <Button href="/?tipo=descobrir#contacto" className="shrink-0">
                  Explicar o meu negócio
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

