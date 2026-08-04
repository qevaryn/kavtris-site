"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/features/catalog/components/ProductCard';
import { Button } from '@/components/shared/Button';
import { products, sectorFilters, type ProductSector } from '@/features/products/data/products';

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

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          {activeFilter === 'all' ? (
            <article
              data-testid="custom-solution-card"
              className="flex min-h-[26rem] flex-col justify-between rounded-[1.35rem] border border-gold-500/30 bg-navy-950 p-6 text-white shadow-card"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">Solução personalizada</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Não encontrou uma solução parecida?</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Explique-nos o problema. A solução pode ser criada a partir do funcionamento real da sua empresa.
                </p>
              </div>
              <Link
                href="/?tipo=personalizada#contacto"
                className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Falar sobre uma solução personalizada
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ) : null}
        </div>

        <section className="mt-12 rounded-[1.5rem] border border-borderline bg-white p-6 shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Próximo passo</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Ainda não sabe qual solução escolher?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Conte-nos como a empresa trabalha e onde estão as principais dificuldades.
            </p>
          </div>
          <Button href="/#contacto" className="mt-6 text-navy-950 lg:mt-0">
            Explique o seu problema
          </Button>
        </section>
      </div>
    </section>
  );
}
