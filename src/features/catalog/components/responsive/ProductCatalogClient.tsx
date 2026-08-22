"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/features/catalog/components/shared/ProductCard';
import { Button } from '@/components/shared/Button';
import {
  functionalFilters,
  productFunctionMap,
  products,
  type ProductFunctionId
} from '@/features/products/data/products';

/**
 * WEB.1F.5 — /produtos SYSTEM MODE (`?modo=sistemas`).
 *
 * This mode renders ONLY system-based discovery — never the business grid.
 *
 *  - Filters describe THE SYSTEM / FUNCTION (OPERATIONS, GESTÃO, STOCK E
 *    PEDIDOS, EQUIPAS, CLIENTES), never the customer's business sector
 *    (BUSINESS_SECTOR_FILTERS_IN_SYSTEM_MODE = NO).
 *  - `← Escolher outra forma de procurar` returns to the /produtos selector.
 *  - A consultant card closes the catalog so it is never a dead end.
 */
export function ProductCatalogClient() {
  const [activeFilter, setActiveFilter] = useState<ProductFunctionId | 'all'>('all');

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products;
    }

    return products.filter((product) => productFunctionMap[product.slug]?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="catalogo" className="bg-paper">
      {/* System mode intro */}
      <div className="overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-kavtris-blueLight">
                Sistemas e soluções
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[2.875rem]">
                Explore diretamente os sistemas disponíveis e encontre o ponto de partida mais próximo do que procura.
              </h1>
            </div>
            <Link
              href="/produtos"
              data-testid="systems-change-search-method"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-kavtris-blueLight hover:bg-kavtris-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Escolher outra forma de procurar
            </Link>
          </div>
        </div>
      </div>

      <div className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
          {/* Functional filters: describe the system/function, not the business. */}
          <div
            role="group"
            aria-label="Filtrar sistemas por função"
            data-testid="catalog-filters"
            className="flex flex-wrap gap-2"
          >
            {functionalFilters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.value)}
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

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {/* System-mode consultant help (the catalog is never a dead end). */}
          <div
            data-testid="systems-consultant"
            className="mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-kavtris-blue/30 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
                Não encontrou o sistema que procura?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Explique o que pretende melhorar. Podemos ajudar a encontrar, adaptar ou definir o próximo passo mais adequado.
              </p>
            </div>
            <Button href="/#contacto" className="shrink-0 text-navy-950">
              Falar com um consultor
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

