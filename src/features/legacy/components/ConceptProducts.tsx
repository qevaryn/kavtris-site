import { conceptProducts } from '@/data/concept-products';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Tag } from '@/components/shared/Tag';

export function ConceptProducts() {
  return (
    <section id="conceitos" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Produtos-conceito"
          title="Ideias demonstrativas que podem ser adaptadas ao negócio."
          subtitle="Estes conceitos mostram formatos possíveis. Não são apresentados como clientes reais nem projetos já entregues."
          align="center"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {conceptProducts.map((product) => (
            <article key={product.name} className="rounded-[1.35rem] border border-borderline bg-paper p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-kavtris-blue">Conceito</p>
              <h3 className="mt-3 text-xl font-bold text-navy-900">{product.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{product.description}</p>
              <p className="mt-4 rounded-2xl border border-kavtris-blue/20 bg-white px-4 py-3 text-xs font-semibold leading-5 text-navy-800">
                Conceito de solução que pode ser adaptado ao negócio.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
