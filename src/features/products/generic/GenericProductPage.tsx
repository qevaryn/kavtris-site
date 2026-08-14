import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import { ProductMockup } from '@/features/products/shared/ProductMockup';
import { ProductWorkflow } from '@/features/products/shared/ProductWorkflow';
import type { ProductConcept } from '@/domain/products/types';

type GenericProductPageProps = {
  product: ProductConcept;
};

/**
 * WEB.1F.6 — data-driven product detail presentation.
 *
 * Storytelling sequence: hero → product-specific visual → how it could work
 * (workflow) → business problem → features/benefits → who it can serve →
 * technical details → clear next step. The prominent "← Voltar aos produtos"
 * link is REMOVED (PRODUCT_BACK_LINK_REMOVED); global navigation and browser
 * history already provide navigation context, so the page opens with
 * confidence in the product itself.
 *
 * Every visual is derived from the product's own definition — no invented
 * capabilities, no stock photography.
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
                <Button href="#como-funcionaria" variant="secondary">
                  Ver como funciona
                </Button>
              </div>
            </div>
            <div data-testid="product-hero-visual">
              <ProductMockup product={product} />
            </div>
          </div>
        </section>

        {/* 2 — How it could work: purpose-built product workflow visual. */}
        <section id="como-funcionaria" className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Como poderia funcionar</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Um fluxo simples, visível para todos.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                O percurso abaixo ilustra uma possível utilização do {product.name}. Os passos exatos dependem do levantamento e da forma como a sua empresa opera.
              </p>
            </div>
            <div className="mt-8">
              <ProductWorkflow product={product} />
            </div>
          </div>
        </section>

        {/* 3 — Business problem + how the product responds. */}
        <section className="bg-mist py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">O problema que resolve</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Onde costuma doer.</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">{product.problem}</p>
              </article>
              <article className="rounded-[1.35rem] border border-kavtris-blue/25 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">O que propõe</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">Um ponto de partida organizado.</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {product.description} As funcionalidades podem começar pelo essencial e crescer com a operação.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 4 — Features + benefits/audience (balanced two-column composition:
            no tall empty card next to stacked cards). */}
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
              <article className="rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Funcionalidades possíveis</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">O que poderia incluir.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Cada funcionalidade pode ser priorizada em fases, começando pelo essencial.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={feature} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-navy-800">
                      {feature}
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-6">
                <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Benefícios práticos</p>
                  <ul className="mt-4 grid gap-3">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2 text-sm leading-6 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Para quem pode servir</p>
                  <ul className="mt-4 grid gap-3">
                    {product.audience.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-navy-800">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 5 — Optional equipment + technical details accordion. */}
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
      </main>
      <Footer />
    </>
  );
}
