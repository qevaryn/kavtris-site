import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { getProductBySlug } from '@/features/products/data/products';

const featuredSlugs = ['fieldops', 'hotel-operations', 'stock-orders'] as const;

export function FeaturedProducts() {
  const featuredProducts = featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<ReturnType<typeof getProductBySlug>> => Boolean(product));

  return (
    <section id="produtos-preview" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Soluções por setor</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Veja exemplos de software que podem ser adaptados ao funcionamento da sua empresa.
            </h2>
          </div>
          <Button href="/produtos" className="w-full sm:w-auto">
            Ver todos os produtos
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.slug} className="flex overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
              <div className="flex w-full flex-col">
                <div className="relative aspect-[16/10] bg-navy-950">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 270px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{product.categoryLabel}</p>
                  <h3 className="mt-3 text-xl font-semibold text-navy-950">{product.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{product.shortDescription}</p>
                  <Link href={`/produtos/${product.slug}`} className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-gold-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
                    Ver produto
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
          <article className="flex rounded-[1.35rem] border border-gold-600/25 bg-navy-950 p-5 text-white shadow-sm">
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">Solução personalizada</p>
              <h3 className="mt-3 text-2xl font-semibold">Precisa de outra solução?</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">
                Conte-nos como a sua empresa funciona e ajudamos a encontrar um ponto de partida.
              </p>
              <Button href="#contacto" className="mt-auto w-full text-navy-950">
                Explique o seu problema
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
