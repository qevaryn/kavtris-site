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
import { ProductConsultantEscape } from '@/features/products/shared/ProductConsultantEscape';
import { ProductInAction } from '@/features/products/shared/ProductInAction';
import { ProductLevelConfigurator } from '@/features/products/shared/ProductLevelConfigurator';
import { ProductMockup } from '@/features/products/shared/ProductMockup';
import type { ProductConcept } from '@/domain/products/types';

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
 * WEB.1F.7 — data-driven product detail presentation (SHOW FIRST, EXPLAIN
 * SECOND).
 *
 * Storytelling order:
 *   1. product hero (visual-first, short copy)      → strong mockup
 *   2. product in action                            → purpose-built scene
 *   3. visual level configurator                    → Essencial/Crescimento/
 *                                                     Empresarial + live visual
 *   4. short benefits / use context                 → icon + title, chips
 *   5. technical details                            → after the discovery
 *   6. primary next step                            → light surface, no footer blur
 *   7. consultant escape path                       → /#contacto
 *   8. footer
 *
 * Text density is reduced (no long wall of copy before the visitor sees how
 * the product works); every visual derives from the product's own definition.
 */
export function GenericProductPage({ product }: GenericProductPageProps) {
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

        {/* 1 — Product hero: WHAT is it, WHO could use it, WHY it matters. */}
        <section className="bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:px-16">
            <div>
              <p className="inline-flex rounded-full bg-kavtris-blue/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">
                {product.label}
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-5 text-lg leading-8 text-white/78">{product.description}</p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                Este é um exemplo de solução que pode ser adaptado ao funcionamento da sua empresa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/?produto=${product.slug}#contacto`} className="text-navy-950">
                  Adaptar à minha empresa
                </Button>
                <Button href="#produto-em-acao" variant="secondary">
                  Ver em ação
                </Button>
              </div>
            </div>
            <div data-testid="product-hero-visual">
              <ProductMockup product={product} />
            </div>
          </div>
        </section>

        {/* 2 — Product in action: a purpose-built scene per product. */}
        <section id="produto-em-acao" className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Possível utilização</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Veja o {product.name} em ação.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Uma leitura visual de como a solução pode acompanhar o dia a dia. Os passos exatos dependem do
                levantamento e da forma como a sua empresa opera.
              </p>
            </div>
            <div className="mt-8">
              <ProductInAction product={product} />
            </div>
          </div>
        </section>

        {/* 3 — Visual level configurator (shared, data-driven). */}
        <ProductLevelConfigurator product={product} />

        {/* 4 — Short benefits + use context: icon + title, compact chips
            (WEB.1F.7 — no tall text-card stacks, no empty columns). */}
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <article className="rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Benefícios práticos</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Mais simples no dia a dia.</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit, index) => {
                    const Icon = benefitIcons[index % benefitIcons.length];
                    return (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 rounded-2xl border border-borderline bg-white px-4 py-3.5"
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

        {/* 5 — Technical details, positioned AFTER the visual discovery
            (WEB.1F.7: the accordion remains accessible but never dominates the
            commercial discovery journey). */}
        <section className="bg-mist py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            {product.optionalEquipment?.length ? (
              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-navy-950">Equipamento opcional e acessível</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  O software deve ter valor por si só. Estes elementos podem ser usados apenas quando ajudarem a simplificar a operação.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.optionalEquipment.map((item) => (
                    <span key={item} className="rounded-full border border-kavtris-blue/30 bg-kavtris-blue/10 px-3 py-1 text-sm font-medium text-kavtris-blue">
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

        {/* 6 — Next step: a LIGHT product-page surface, clearly NOT the footer.
            The deep-navy footer follows only after this distinct section. */}
        <section className="bg-white pb-14 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <article
              data-testid="product-next-step"
              className="rounded-[1.35rem] border border-kavtris-blue/30 bg-[#EAF1FC] p-6 text-navy-950 shadow-sm sm:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Próximo passo</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">Adaptar à sua empresa.</h2>
                  <p className="mt-4 text-sm leading-7 text-navy-800/80">
                    Começamos por entender o processo atual, definir o essencial e adaptar a solução por fases. Não há preço automático nem promessa de prazo sem levantamento.
                  </p>
                </div>
                <Button href={`/?produto=${product.slug}#contacto`} className="shrink-0 text-navy-950">
                  Adaptar à minha empresa
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </article>
          </div>
        </section>

        {/* 7 — Consultant escape path (never a dead end for unsure visitors). */}
        <ProductConsultantEscape />
      </main>
      <Footer />
    </>
  );
}
