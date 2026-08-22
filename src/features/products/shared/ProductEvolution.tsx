import { CheckCircle2, Sparkles } from 'lucide-react';
import type { ProductConcept, ProductLevelId } from '@/features/products/data/products';
import { cn } from '@/components/shared/cn';

type ProductEvolutionProps = {
  product: ProductConcept;
  levelId: ProductLevelId;
};

/**
 * WEB.1F.8 — "Evolução por fases". The adoption levels are an evolution, not
 * three unrelated products: previous capabilities never disappear. The CURRENT
 * level is visually emphasized (border + ring + check + "Nível atual" badge)
 * and reacts to the page-level `selectedLevel` state.
 */
export function ProductEvolution({ product, levelId }: ProductEvolutionProps) {
  return (
    <section data-testid="product-evolution" className="bg-white py-14 sm:py-16 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Evolução por fases</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Comece com o essencial e evolua.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            O {product.name} não é substituído entre níveis — cresce. O nível selecionado marca onde a sua empresa pode
            começar; as capacidades anteriores continuam disponíveis.
          </p>
        </div>

        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {product.levels.map((level, index) => {
            const isSelected = level.id === levelId;
            return (
              <li
                key={level.id}
                data-testid={`product-evolution-phase-${level.id}`}
                aria-current={isSelected ? 'step' : undefined}
                className={cn(
                  'relative flex flex-col rounded-[1.35rem] border p-5 shadow-sm transition sm:p-6',
                  isSelected
                    ? 'border-kavtris-blue bg-[#F0F6FF] ring-2 ring-kavtris-blue/40'
                    : 'border-borderline bg-white'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'grid h-9 w-9 place-items-center rounded-full border text-sm font-bold',
                      isSelected ? 'border-kavtris-blue bg-kavtris-blue text-white' : 'border-kavtris-blue/40 bg-[#EAF1FC] text-kavtris-blue'
                    )}
                  >
                    {index + 1}
                  </span>
                  {isSelected ? (
                    <span
                      data-testid="product-evolution-current"
                      className="inline-flex items-center gap-1.5 rounded-full bg-kavtris-blue/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-navy-900"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-kavtris-blue" aria-hidden="true" />
                      Nível atual
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-navy-950">{level.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{level.tagline}</p>

                <ul className="mt-4 grid gap-2.5">
                  {level.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm leading-6 text-navy-800">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
