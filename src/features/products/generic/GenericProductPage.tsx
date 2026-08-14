'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  FileStack,
  FolderOpen,
  MessageSquare,
  Package,
  ShieldCheck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import { ProductAdaptation } from '@/features/products/shared/ProductAdaptation';
import { ProductConsultantEscape } from '@/features/products/shared/ProductConsultantEscape';
import { ProductEvolution } from '@/features/products/shared/ProductEvolution';
import { ProductInAction } from '@/features/products/shared/ProductInAction';
import { ProductLevelConfigurator } from '@/features/products/shared/ProductLevelConfigurator';
import { ProductMockup } from '@/features/products/shared/ProductMockup';
import type { ProductConcept, ProductLevelId } from '@/domain/products/types';

type GenericProductPageProps = {
  product: ProductConcept;
};

const benefitIcons: LucideIcon[] = [
  CheckCircle2,
  Bell,
  FolderOpen,
  FileStack,
  Clock3,
  ShieldCheck,
  Building2,
  MessageSquare,
  Package
];

/**
 * WEB.1F.8 — shared product-detail journey (SHOW FIRST, EXPLAIN SECOND).
 *
 * Order: Hero → Configurator → Evolução por fases → Adaptação à operação →
 * Demonstração visual → Benefícios/apoio → Detalhes técnicos → Escape de
 * consultor → footer. `selectedLevel` is page-level state (single source of
 * truth) and drives the hero CTA, configurator, evolution, adaptation,
 * demonstration, summary and adaptation CTAs — all in sync.
 */
export function GenericProductPage({ product }: GenericProductPageProps) {
  const [levelId, setLevelId] = useState<ProductLevelId>('essential');
  const level = useMemo(
    () => product.levels.find((item) => item.id === levelId) ?? product.levels[0],
    [levelId, product]
  );

  return (
    <>
      <Header />
      <main className="bg-paper">
        {/* WEB.1F.4 — explicit Back/Forward (fallback Produtos for product detail). */}
        <div className="border-b border-navy-900/5 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-3 sm:px-8 lg:px-16">
            <ContextBackForwardControls fallbackHref="/produtos" />
          </div>
        </div>

        {/* 1 — Product hero: strong visual, short copy, level-aware CTAs. */}
        <section className="bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:px-16">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-kavtris-blue/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">
                {product.label}
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-5 text-lg leading-8 text-white/78">{product.description}</p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Este é um exemplo de solução que pode ser adaptado ao funcionamento da sua empresa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  href={`/?produto=${product.slug}#contacto`}
                  data-testid="hero-adapt-cta"
                  className="text-navy-950"
                >
                  Adaptar o {level.name} à minha empresa
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="#demonstracao" variant="secondary">
                  Ver como funciona
                </Button>
                <Link
                  href="/#contacto"
                  data-testid="hero-doubt-cta"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-white/72 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  Tirar uma dúvida
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-testid="product-hero-visual">
              <ProductMockup product={product} />
            </div>
          </div>
        </section>

        {/* 2 — Visual level configurator (page-level state). */}
        <ProductLevelConfigurator product={product} levelId={levelId} onLevelChange={setLevelId} />

        {/* 3 — Evolution by phases (reacts to the selected level). */}
        <ProductEvolution product={product} levelId={levelId} />

        {/* 4 — Adaptation to the operation (reacts to the selected level). */}
        <ProductAdaptation product={product} levelId={levelId} />

        {/* 5 — Visual demonstration (reacts to the selected level). */}
        <section id="demonstracao" className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Demonstração visual</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Veja o {product.name} em funcionamento.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Uma leitura visual de como a solução pode acompanhar o dia a dia. Os passos exatos dependem do
                levantamento e da forma como a sua empresa opera.
              </p>
            </div>
            <div className="mt-8">
              <ProductInAction product={product} levelId={levelId} />
            </div>
          </div>
        </section>

        {/* 6 — Short benefits + use context: icon + title, compact chips. */}
        <section className="bg-paper py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Benefícios práticos</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Mais simples no dia a dia.</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit, index) => {
                    const Icon = benefitIcons[index % benefitIcons.length];
                    return (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 rounded-2xl border border-borderline bg-paper px-4 py-3.5"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                        <span className="text-sm font-semibold leading-5 text-navy-900">{benefit}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>

              <div className="grid gap-6">
                <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">O problema que resolve</p>
                  <p className="mt-4 text-base leading-8 text-slate-700">{product.problem}</p>
                </article>
                <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Para quem pode servir</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {product.audience.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-navy-200 bg-paper px-3.5 py-1.5 text-sm font-semibold text-navy-800"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 7 — Technical details (after the visual discovery journey). */}
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            {product.optionalEquipment?.length ? (
              <article className="rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-navy-950">Equipamento opcional e acessível</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O software deve ter valor por si só. Estes elementos podem ser usados apenas quando ajudarem a simplificar a operação.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.optionalEquipment.map((item) => (
                    <span key={item} className="rounded-full border border-kavtris-blue/30 bg-kavtris-blue/10 px-3 py-1 text-sm font-medium text-navy-900">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ) : null}

            <details
              id="detalhes"
              className="group mt-6 rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm open:border-kavtris-blue/40 sm:p-8"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-2xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2">
                Ver detalhes técnicos
                <ArrowRight
                  className="h-5 w-5 shrink-0 rotate-90 text-kavtris-blue transition-transform group-open:rotate-[270deg]"
                  aria-hidden="true"
                />
              </summary>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.technicalDetails.map((detail) => (
                  <li key={detail} className="rounded-2xl bg-navy-950 px-4 py-3 text-sm font-medium text-white/78">
                    {detail}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        {/* 8 — Consultant escape path (never a dead end for unsure visitors). */}
        <ProductConsultantEscape />
      </main>
      <Footer />
    </>
  );
}
