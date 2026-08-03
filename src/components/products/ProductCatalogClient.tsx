"use client";

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { products, sectorFilters, type ProductSector } from '@/data/products';

export function ProductCatalogClient() {
  const [activeFilter, setActiveFilter] = useState<ProductSector | 'all'>('all');

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products;
    }

    return products.filter((product) => product.sectors.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="catalogo" className="bg-paper py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Catálogo visual</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Exemplos de software por setor
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Filtre por área para ver conceitos que podem começar simples e evoluir para uma plataforma mais completa.
          </p>
        </div>

        <div
          className="-mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          aria-label="Filtros de setores"
        >
          {sectorFilters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.value)}
                className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-gold-600 bg-gold-600 text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-gold-500 hover:text-gold-700'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
