'use client';

import type { KeyboardEvent } from 'react';
import { useMemo } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { cn } from '@/components/shared/cn';
import type { ProductConcept, ProductLevelId } from '@/features/products/data/products';
import { ProductLevelMockup } from '@/features/products/shared/ProductLevelMockup';

type ProductLevelConfiguratorProps = {
  product: ProductConcept;
  /** Page-level selected level — single source of truth (WEB.1F.8). */
  levelId: ProductLevelId;
  onLevelChange: (levelId: ProductLevelId) => void;
};

/**
 * WEB.1F.7/8 — shared visual product-level configurator.
 *
 * Since WEB.1F.8 the configurator is CONTROLLED: the selected level lives at
 * page level (SINGLE_SOURCE_OF_TRUTH_FOR_LEVEL = YES) and is passed down, so
 * the configurator, evolution, adaptation, demonstration, summary and CTAs all
 * derive from the same state.
 *
 * The selected level (default: Essencial — start with what is necessary and
 * evolve) changes:
 *
 *   - the radio-like option state (aria-checked + border/bg/indicator);
 *   - the product visual (ProductLevelMockup, keyed by level → the 240ms
 *     `product-level-switch` animation, motion-safe);
 *   - the selected-level summary strip;
 *   - the adaptation CTA label ("Adaptar o {Nível} à minha empresa").
 *
 * Levels are adoption/configuration levels — never prices or plans
 * (PRICING_ADDED = NO). Keyboard navigation works (arrow keys / Home / End).
 */
export function ProductLevelConfigurator({ product, levelId, onLevelChange }: ProductLevelConfiguratorProps) {
  const level = useMemo(
    () => product.levels.find((item) => item.id === levelId) ?? product.levels[0],
    [levelId, product]
  );

  const moveSelection = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const ids = product.levels.map((item) => item.id);
    const currentIndex = ids.indexOf(levelId);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? ids.length - 1
          : event.key === 'ArrowRight' || event.key === 'ArrowDown'
            ? (currentIndex + 1) % ids.length
            : (currentIndex - 1 + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    onLevelChange(nextId);
    window.requestAnimationFrame(() => {
      document.getElementById(`product-level-option-${nextId}`)?.focus();
    });
  };

  return (
    <section data-testid="product-level-configurator" className="bg-mist py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">
            Como a solução pode começar e evoluir
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Configure o ponto de partida mais próximo.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            O {product.name} não é um pacote fechado. Escolha um nível para ver como a composição pode crescer — o
            resultado final é sempre adaptado à sua operação.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* Selected-level visual — re-keyed so the level switch is visible. */}
          <div
            key={level.id}
            className="min-w-0 motion-safe:animate-[product-level-switch_240ms_ease-out]"
            data-testid="product-level-visual-stage"
          >
            <ProductLevelMockup product={product} level={level} />
          </div>

          {/* Level selector panel */}
          <aside
            aria-label={`Níveis de configuração do ${product.name}`}
            className="min-w-0 rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Nível da solução</p>
            <div
              role="radiogroup"
              aria-label="Nível da solução"
              className="mt-4 grid gap-3"
              onKeyDown={moveSelection}
            >
              {product.levels.map((item) => {
                const isSelected = item.id === levelId;
                return (
                  <button
                    id={`product-level-option-${item.id}`}
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    data-testid={`product-level-option-${item.id}`}
                    onClick={() => onLevelChange(item.id)}
                    className={cn(
                      'flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2',
                      isSelected
                        ? 'border-kavtris-blue bg-[#F0F6FF] ring-2 ring-kavtris-blue/40'
                        : 'border-borderline bg-white hover:border-kavtris-blue/50'
                    )}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="text-base font-semibold text-navy-950">{item.name}</span>
                      <CheckCircle2
                        className={cn('h-5 w-5 shrink-0', isSelected ? 'text-kavtris-blue' : 'text-slate-300')}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-6 text-slate-600">{item.tagline}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-borderline pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">
                {level.name} selecionado
              </p>
              <ul className="mt-4 grid gap-2.5">
                {level.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm leading-6 text-navy-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-paper p-4 text-sm leading-6 text-slate-600">
                A composição final é definida de acordo com a sua operação.
              </p>
              <Button
                href={`/?produto=${product.slug}#contacto`}
                className="mt-6 w-full text-navy-950"
                data-testid="product-level-cta"
              >
                Adaptar o {level.name} à minha empresa
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </aside>
        </div>

        {/* Selected-level summary — easy to scan, no giant comparison table. */}
        <div
          data-testid="product-level-summary"
          className="mt-6 rounded-[1.35rem] border border-kavtris-blue/30 bg-[#EAF1FC] px-5 py-5 text-navy-950 shadow-sm sm:px-6"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-base font-semibold">{level.name} selecionado</span>
            <span aria-hidden="true" className="hidden text-navy-400 sm:inline">
              ·
            </span>
            <ul className="flex flex-wrap gap-2">
              {level.highlights.map((highlight) => (
                <li key={highlight} className="rounded-full border border-navy-200 bg-white px-3 py-1 text-xs font-semibold text-navy-800">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-sm leading-6 text-navy-800/80">
            A composição final é definida de acordo com a sua operação — sem preços automáticos.
          </p>
        </div>
      </div>
    </section>
  );
}
