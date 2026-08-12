import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { ProductMockup } from '@/features/products/shared/ProductMockup';
import type { ProductConcept } from '@/domain/products/types';

type GenericProductPageProps = {
  product: ProductConcept;
};

export function GenericProductPage({ product }: GenericProductPageProps) {
  return (
    <>
      <Header />
      <main className="bg-paper">
        <section className="bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:px-16">
            <div>
              <Link href="/produtos" className="inline-flex items-center gap-2 text-sm font-semibold text-kavtris-blueLight underline-offset-4 hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar aos produtos
              </Link>
              <p className="mt-6 inline-flex rounded-full bg-kavtris-blue/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">
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
                <Button href="#detalhes" variant="secondary">
                  Ver detalhes técnicos
                </Button>
              </div>
            </div>
            <ProductMockup product={product} />
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-5 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:px-16">
            <aside className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Para quem pode servir</p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                {product.audience.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="grid gap-6">
              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-navy-950">Problema de negócio</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{product.problem}</p>
              </article>

              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-navy-950">Como poderia funcionar</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={feature} className="rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-navy-800">
                      {feature}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-navy-950">Benefícios práticos</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2 text-sm leading-6 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kavtris-blue" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>

              {product.optionalEquipment?.length ? (
                <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
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

              <details id="detalhes" className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <summary className="cursor-pointer text-2xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2">
                  Ver detalhes técnicos
                </summary>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.technicalDetails.map((detail) => (
                    <li key={detail} className="rounded-2xl bg-navy-950 px-4 py-3 text-sm font-medium text-white/78">
                      {detail}
                    </li>
                  ))}
                </ul>
              </details>

              <article className="rounded-[1.35rem] border border-kavtris-blue/25 bg-navy-950 p-6 text-white shadow-sm">
                <h2 className="text-2xl font-semibold">Próximo passo</h2>
                <p className="mt-4 text-sm leading-7 text-white/70">
                  Começamos por entender o processo atual, definir o essencial e adaptar a solução por fases. Não há preço automático nem promessa de prazo sem levantamento.
                </p>
                <div className="mt-6">
                  <Button href={`/?produto=${product.slug}#contacto`} className="text-navy-950">
                    Adaptar à minha empresa
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
