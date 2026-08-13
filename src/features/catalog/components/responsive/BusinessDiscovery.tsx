"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/components/shared/cn';
import { useReducedMotion } from '@/components/shared/useReducedMotion';
import { useKavtrisNavigation } from '@/components/shared/NavigationHistoryProvider';
import {
  businessCategories,
  type BusinessCategory
} from '@/features/catalog/data/business-discovery';
import { BusinessVisual } from '@/features/catalog/components/responsive/BusinessVisual';
import { getProductBySlug } from '@/features/products/data/products';

type SelectedId = BusinessCategory['id'] | null;

/**
 * WEB.1F.4 — /produtos business discovery with contextual panel UX.
 *
 *  - Two-path priority inverted (owner decision): "Não sabe qual solução
 *    precisa?" is PRIMARY; "Já sabe o que procura?" is SECONDARY.
 *  - The discovery result is a CONTEXTUAL PANEL (not a separate tab): it has an
 *    explicit `✕ Fechar`, an explicit `← Voltar aos tipos de negócio`, and
 *    closes on Escape — always restoring the originating business card
 *    (scroll + focus) and cleaning the `?negocio=` URL state.
 *  - Only one panel at a time; switching category replaces the same panel
 *    (replaceState — DISCOVERY_HISTORY_NOT_SPAMMED).
 *  - Deep-link support preserved: /produtos?negocio=barbearias.
 *  - Subtle open animation (~220ms), immediate under reduced motion.
 */
export function BusinessDiscovery() {
  const reducedMotion = useReducedMotion();
  const { pushNavigation, replaceNavigation, back, canGoBack, canBackToProductsGrid, restoreFocus } =
    useKavtrisNavigation();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Direct deep-link state (refresh-safe): /produtos?negocio=barbearias.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const fromUrl = new URLSearchParams(window.location.search).get('negocio');
      if (fromUrl && businessCategories.some((category) => category.id === fromUrl)) {
        setSelectedId(fromUrl as BusinessCategory['id']);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Mirror native Back/Forward into the selected state (browser history is the
  // canonical source of truth for the discovery context).
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = new URLSearchParams(window.location.search).get('negocio');
      if (fromUrl && businessCategories.some((category) => category.id === fromUrl)) {
        setSelectedId(fromUrl as BusinessCategory['id']);
      } else {
        setSelectedId(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selected = useMemo(
    () => businessCategories.find((category) => category.id === selectedId) ?? null,
    [selectedId]
  );

  const openDiscovery = useCallback(
    (id: BusinessCategory['id']) => {
      const url = new URL(window.location.href);
      url.searchParams.set('negocio', id);
      const isAlreadyOpen = selectedId !== null;

      if (isAlreadyOpen) {
        // Same contextual panel, new category: replace, do not spam history.
        replaceNavigation({ url: url.toString(), focusKey: `business-card-${id}` });
        setSelectedId(id);
        return;
      }

      // First open: record the origin card on the current (grid) entry so that
      // back/X restores it, then push ONE discovery history entry.
      replaceNavigation({ url: window.location.href, focusKey: `business-card-${id}` });
      pushNavigation({ url: url.toString(), kind: 'discovery', focusKey: `business-card-${id}` });
      setSelectedId(id);

      window.setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 0);
    },
    [selectedId, pushNavigation, replaceNavigation, reducedMotion]
  );

  const closeDiscovery = useCallback(() => {
    const id = selectedId;
    if (!id) {
      return;
    }

    // The previous journal entry is the recorded products grid (regardless of
    // how this panel was re-opened — click, forward, or refresh): pop it.
    if (canBackToProductsGrid() && canGoBack) {
      // Popping the discovery entry returns to the recorded grid entry; the
      // provider restores the origin card (scroll + focus).
      back();
      return;
    }

    // Deep-link / no grid entry: replace in place and restore manually.
    const url = new URL(window.location.href);
    url.searchParams.delete('negocio');
    replaceNavigation({ url: url.toString(), focusKey: `business-card-${id}` });
    setSelectedId(null);
    restoreFocus(`business-card-${id}`, { scroll: true });
  }, [selectedId, canBackToProductsGrid, canGoBack, back, replaceNavigation, restoreFocus]);

  // Escape closes an active discovery panel with the same restoration.
  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDiscovery();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedId, closeDiscovery]);

  return (
    <>
      {/* Step 2 — two-path choice (WEB.1F.4: business discovery PRIMARY) */}
      <section id="negocio" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <SectionHeading
            className="[&_h2]:font-sans"
            eyebrow="Dois caminhos"
            title="Comece por onde for mais fácil para si."
            subtitle="A maioria dos negócios começa pelo tipo de atividade. Se já sabe exatamente o que procura, também pode ir direto aos sistemas."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {/* PRIMARY — business discovery */}
            <article
              data-testid="path-business-primary"
              className="flex flex-col rounded-[1.35rem] border border-kavtris-blue/40 bg-navy-950 p-6 text-white shadow-card sm:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blueLight">Não sabe qual solução precisa?</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Comece pelo seu tipo de negócio.</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">
                Escolha o contexto da sua empresa e veja pontos de partida que podem fazer sentido.
              </p>
              <Button href="#negocio-cards" className="mt-auto w-full sm:w-auto">
                Começar pelo meu negócio
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </article>

            {/* SECONDARY — system catalog */}
            <article
              data-testid="path-catalog-secondary"
              className="flex flex-col rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Já sabe o que procura?</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Veja os nossos sistemas.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore os conceitos de software por setor, diretamente no catálogo de sistemas.
              </p>
              <Button href="#catalogo" variant="outline" className="mt-auto w-full sm:w-auto">
                Ver todos os sistemas
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
                  id={`business-card-${category.id}`}
                  type="button"
                  data-testid={`business-card-${category.id}`}
                  aria-pressed={isSelected}
                  onClick={() => openDiscovery(category.id)}
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
              aria-labelledby="discovery-panel-title"
              className="mt-10 scroll-mt-24 rounded-[1.5rem] border border-kavtris-blue/30 bg-navy-950 p-6 text-white shadow-card motion-safe:animate-[discovery-panel-in_220ms_ease-out] sm:p-8"
            >
              {/* Contextual panel header with explicit close affordances */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A5C9FF]">Ponto de partida</p>
                  <h3 id="discovery-panel-title" className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                    Soluções que podem fazer sentido para {selected.label.toLowerCase()}.
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    data-testid="discovery-back-to-business"
                    onClick={closeDiscovery}
                    aria-label="Voltar aos tipos de negócio"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blueLight focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Voltar aos tipos de negócio
                  </button>
                  <button
                    type="button"
                    data-testid="discovery-close"
                    onClick={closeDiscovery}
                    aria-label="Fechar e voltar aos tipos de negócio"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-red-500/40 bg-white/5 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Fechar
                  </button>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72">
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
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#A5C9FF]">
                        {product.categoryLabel}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">{product.name}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/70">{product.shortDescription}</p>
                      <span className="mt-3 inline-flex w-fit rounded-full border border-[#A5C9FF]/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#A5C9FF]">
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

