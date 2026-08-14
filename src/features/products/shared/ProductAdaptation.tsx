import { useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { ProductConcept, ProductLevelId } from '@/features/products/data/products';

type ProductAdaptationProps = {
  product: ProductConcept;
  levelId: ProductLevelId;
};

/**
 * WEB.1F.8 — "Adaptação à operação" for the generic product journeys.
 *
 * Shows the product's existing use contexts (audience) as compact chips plus a
 * level-aware composition block ("No nível {Nível} a composição pode incluir")
 * derived ONLY from the product's own level data — no combinatorial hardcoding
 * of sector × level blocks.
 */
export function ProductAdaptation({ product, levelId }: ProductAdaptationProps) {
  const level = useMemo(
    () => product.levels.find((item) => item.id === levelId) ?? product.levels[0],
    [levelId, product]
  );

  return (
    <section data-testid="product-adaptation" className="bg-mist py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Adaptação à operação</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Veja como o {product.name} se adapta à sua operação.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            O {product.name} parte da sua realidade e pode incluir as valências que fazem sentido para o seu momento —
            sem criar uma solução separada para cada contexto.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Contextos de utilização</p>
            <h3 className="mt-3 text-xl font-semibold text-navy-950">Quem pode beneficiar.</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
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

          <article
            data-testid="product-adaptation-level"
            className="rounded-[1.35rem] border border-kavtris-blue/30 bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">
              No nível {level.name}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-navy-950">A composição pode incluir.</h3>
            <ul className="mt-5 grid gap-2.5">
              {level.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm leading-6 text-navy-800">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl bg-paper p-4 text-sm leading-6 text-slate-600">
              A composição final é sempre definida de acordo com a sua operação.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
