"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/components/shared/cn';
import { useReducedMotion } from '@/components/shared/useReducedMotion';
import { useKavtrisNavigation } from '@/components/shared/NavigationHistoryProvider';
import {
  businessCategories,
  businessFilters,
  type BusinessCategory,
  type BusinessFilterId
} from '@/features/catalog/data/business-discovery';
import { BusinessVisual } from '@/features/catalog/components/responsive/BusinessVisual';
import { getProductBySlug } from '@/features/products/data/products';

type SelectedId = BusinessCategory['id'] | null;

/**
 * WEB.1F.5 — /produtos BUSINESS MODE (`?modo=negocio`).
 *
 * This mode renders ONLY business-based discovery — never the system catalog.
 * The old two-path choice section moved to the /produtos default selector.
 *
 *  - Canonical state: /produtos?modo=negocio#tipos-de-negocio
 *  - Starting point:  /produtos?modo=negocio&negocio=<id>
 *  - `✕ Fechar` and `← Voltar aos tipos de negócio` share ONE behavior
 *    (DISCOVERY_CLOSE_ACTION = DISCOVERY_BACK_TO_BUSINESS_ACTION): close the
 *    panel, clear the selected business, KEEP `modo=negocio`, land back at
 *    #tipos-de-negocio and restore the originating card (scroll + focus).
 *    Closing never leaves Products (DISCOVERY_CLOSE_RETURNS_HOME = NO).
 *  - Category switching replaces the same contextual session (no history spam).
 *  - Deep links / refresh stay consistent (URL is the source of truth).
 *  - Consultant help exists both on the business grid and inside the panel.
 */
export function BusinessDiscovery() {
  const reducedMotion = useReducedMotion();
  const { pushNavigation, replaceNavigation, back, canGoBack, canBackToProductsGrid, restoreFocus } =
    useKavtrisNavigation();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  // WEB.1F.8 — business filter (mirrors system discovery). Local UI state only:
  // no URL history entries, default = Todos.
  const [activeFilter, setActiveFilter] = useState<BusinessFilterId>('todos');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Direct deep-link state (refresh-safe): /produtos?modo=negocio&negocio=barbearias.
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

  // WEB.1F.8 — categories visible under the active business filter.
  const visibleCategories = useMemo(() => {
    const filter = businessFilters.find((item) => item.id === activeFilter) ?? businessFilters[0];
    return businessCategories.filter((category) => filter.categoryIds.includes(category.id));
  }, [activeFilter]);

  // WEB.1F.8 — filter change. If the open point-of-start becomes hidden by the
  // new filter, reset it cleanly (no incoherent visible state, no stale
  // `negocio=` in the URL). If it remains visible, the selection may stay.
  const changeFilter = useCallback(
    (filterId: BusinessFilterId) => {
      const filter = businessFilters.find((item) => item.id === filterId);
      setActiveFilter(filterId);
      if (selectedId && filter && !filter.categoryIds.includes(selectedId)) {
        const url = new URL(window.location.href);
        url.searchParams.delete('negocio');
        url.hash = 'tipos-de-negocio';
        replaceNavigation({ url: url.toString() });
        setSelectedId(null);
      }
    },
    [selectedId, replaceNavigation]
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
      // back/X restores it, then push ONE discovery history entry. The grid
      // entry is normalized to the canonical business URL
      // (/produtos?modo=negocio#tipos-de-negocio) so the contextual close
      // always lands on the same stable state.
      const gridUrl = new URL(window.location.href);
      gridUrl.hash = 'tipos-de-negocio';
      replaceNavigation({ url: gridUrl.toString(), focusKey: `business-card-${id}` });
      pushNavigation({ url: url.toString(), kind: 'discovery', focusKey: `business-card-${id}` });
      setSelectedId(id);
    },
    [selectedId, pushNavigation, replaceNavigation]
  );

  // WEB.1F.6 — EVERY valid business selection scrolls to the point-of-start
  // region, not just the first one. This effect runs AFTER the new content has
  // been committed (React effects run post-render), so no brittle timeout is
  // needed. It covers:
  //   - first click (panel opens)          — YES
  //   - switching business while open      — YES
  //   - previous panel left open           — YES
  //   - after close and reopen             — YES
  //   - browser Back/Forward into a panel  — YES
  //   - direct deep-link entry             — YES
  // It never runs when the panel closes (selectedId → null).
  useEffect(() => {
    if (!selectedId) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedId, reducedMotion]);


  const closeDiscovery = useCallback(() => {
    const id = selectedId;
    if (!id) {
      return;
    }

    // The previous journal entry is the recorded products business grid: pop it
    // (the provider restores the origin card scroll + focus).
    if (canBackToProductsGrid() && canGoBack) {
      back();
      return;
    }

    // Deep-link / no grid entry: replace in place and restore manually. The
    // URL keeps `modo=negocio` and lands back on the canonical business anchor.
    const url = new URL(window.location.href);
    url.searchParams.delete('negocio');
    url.hash = 'tipos-de-negocio';
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
      {/* Business mode hero — business-first, no technical language. */}
      <section className="overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-kavtris-blueLight">
                Produtos e soluções
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Descubra sistemas a partir do contexto da sua empresa.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
                Não precisa saber qual sistema precisa antes de falar connosco. Comece pelo tipo de negócio mais próximo e veja soluções que podem fazer sentido.
              </p>
              {/* WEB.1F.8 — restrained hero action: jump to the selection grid. */}
              <Link
                href="#tipos-de-negocio"
                data-testid="business-hero-cta"
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-kavtris-blueLight hover:bg-kavtris-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Ver tipos de negócio
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business discovery grid */}
      <section id="tipos-de-negocio" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              className="[&_h2]:font-sans"
              eyebrow="Qual é o seu negócio?"
              title="Encontre o ponto de partida mais próximo."
              subtitle="Escolha o contexto que mais se aproxima da sua operação."
            />
            <Link
              href="/produtos"
              data-testid="business-change-search-method"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-kavtris-blue hover:text-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Escolher outra forma de procurar
            </Link>
          </div>


          {/* WEB.1F.8 — business filters (parity with system discovery). */}
          <div
            role="group"
            aria-label="Filtrar tipos de negócio"
            data-testid="business-filters"
            className="mt-8 flex flex-wrap gap-2"
          >
            {businessFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  data-testid={`business-filter-${filter.id}`}
                  aria-pressed={isActive}
                  onClick={() => changeFilter(filter.id)}
                  className={[
                    'min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2',
                    isActive
                      ? 'border-kavtris-blue bg-kavtris-blue text-white shadow-sm'
                      : 'border-navy-900/15 bg-white text-navy-800 hover:border-kavtris-blue hover:text-kavtris-blue'
                  ].join(' ')}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="snap-row mt-8 md:grid md:snap-none md:grid-cols-2 xl:grid-cols-3">
            {visibleCategories.map((category) => {
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
                      ? 'border-kavtris-blue bg-[#F0F6FF] ring-2 ring-kavtris-blue/40'
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
                        isSelected
                          ? 'text-kavtris-blue'
                          : 'text-kavtris-blue group-hover:text-kavtris-blueLight'
                      )}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          Ponto de partida aberto
                        </>
                      ) : (
                        <>
                          Ver ponto de partida
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Business-grid consultant help (never a dead end). */}
          <div
            data-testid="business-help-consultant"
            className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-kavtris-blue/30 bg-paper p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-navy-950">
                Não encontrou o seu tipo de negócio?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Não precisa escolher sozinho. Conte-nos como a sua empresa funciona e ajudamos a encontrar um bom ponto de partida.
              </p>
            </div>
            <Button href="/#contacto" className="shrink-0 text-navy-950">
              Falar com um consultor
            </Button>
          </div>

          {selected ? (
            <div
              ref={resultsRef}
              data-testid="discovery-results"
              aria-labelledby="discovery-panel-title"
              className="mt-10 scroll-mt-24 rounded-[1.5rem] border border-kavtris-blue/30 bg-navy-950 p-6 text-white shadow-card motion-safe:animate-[discovery-panel-in_220ms_ease-out] sm:p-8"
            >
              {/* WEB.1F.6 — the keyed content re-animates (opacity + slight
                  rise, 240ms, motion-safe) on EVERY business switch so the
                  visitor clearly sees that a NEW starting point was loaded. */}
              <div
                key={selected.id}
                data-testid="discovery-panel-content"
                className="motion-safe:animate-[point-of-start-switch_240ms_ease-out]"
              >
                {/* Contextual panel header with explicit close affordances */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A5C9FF]">Ponto de partida</p>
                  <h3 id="discovery-panel-title" className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                    Ponto de partida para {selected.label}.
                  </h3>
                </div>
                {/* WEB.1F.6 — clearly separated controls (no collision): a
                    wider gap and visually distinct actions. Wraps on mobile
                    without horizontal overflow.
                    WEB.1F.7 — the two actions are now clearly independent
                    controls: a generous gap and distinct visual weights
                    (Voltar = navigation; Fechar = secondary/destructive exit). */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                Estas soluções podem servir como ponto de partida e ser adaptadas à realidade da sua empresa.
              </p>

              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {selected.productSlugs.map((slug) => {
                  const product = getProductBySlug(slug);
                  if (!product) {
                    return null;
                  }

                  return (
                    <article
                      key={slug}
                      className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#A5C9FF]">
                        {product.categoryLabel}
                      </p>
                      <h4 className="mt-3 text-lg font-semibold text-white">{product.name}</h4>
                      <p className="mt-4 text-sm leading-6 text-white/70">{product.shortDescription}</p>
                      {/* WEB.1F.7 — the "Pode ser adaptado" badge gets its own
                          rhythm: it no longer collides with the CTA below. */}
                      <span className="mt-6 inline-flex w-fit rounded-full border border-[#A5C9FF]/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#A5C9FF]">
                        Pode ser adaptado
                      </span>
                      <div className="mt-auto pt-6">
                        <Link
                          href={`/produtos/${product.slug}`}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-kavtris-blueLight/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-kavtris-blue hover:border-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                        >
                          Ver produto
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Starting-point consultant help (the panel is never a dead end).
                  WEB.1F.7 — clearly independent fallback action: more separation
                  from the product cards and a stronger boundary so it never
                  reads as a fourth product card or a glued button. */}
              <div
                data-testid="starting-point-consultant"
                className="mt-9 flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div>
                  <p className="text-base font-semibold text-white">Nenhuma destas opções parece certa?</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Um consultor pode conhecer melhor a sua operação e orientar o próximo passo.
                  </p>
                </div>
                <Button href="/#contacto" className="shrink-0">
                  Falar com um consultor
                </Button>
              </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

