"use client";

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { Button } from '@/components/shared/Button';
import { getProductBySlug } from '@/features/products/data/products';

const featuredSlugs = ['fieldops', 'hotel-operations', 'stock-orders'] as const;

type ProductCarouselItem =
  | {
      type: 'product';
      slug: string;
      categoryLabel: string;
      name: string;
      shortDescription: string;
      image: string;
      imageAlt: string;
    }
  | {
      type: 'custom';
      title: string;
      description: string;
    };

export function FeaturedProducts() {
  const featuredProducts = featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is NonNullable<ReturnType<typeof getProductBySlug>> => Boolean(product));

  const carouselItems: ProductCarouselItem[] = [
    ...featuredProducts.map((product) => ({
      type: 'product' as const,
      slug: product.slug,
      categoryLabel: product.categoryLabel,
      name: product.name,
      shortDescription: product.shortDescription,
      image: product.catalogImage ?? product.image,
      imageAlt: product.catalogImageAlt ?? product.imageAlt
    })),
    {
      type: 'custom',
      title: 'Solução personalizada para o seu contexto',
      description: 'Conte-nos como a sua empresa funciona e ajudamos a encontrar um ponto de partida.'
    }
  ];

  return (
    <section id="produtos-preview" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Soluções por setor</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Veja exemplos de software que podem ser adaptados ao funcionamento da sua empresa.
            </h2>
          </div>
          <Button href="/produtos" className="hidden w-full sm:w-auto md:inline-flex">
            Ver todos os produtos
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <AccessibleCarousel
          ariaLabel="Produtos em destaque"
          testId="featured-products-carousel"
          className="mt-8"
          motionMode="featured-step"
          items={carouselItems}
          itemClassName="basis-[89%] sm:basis-[72%] md:basis-[54%] lg:basis-[34%] xl:basis-[32%]"
          viewportClassName="-mx-1 px-1"
          autoplayMs={2000}
          interactionPauseMs={2000}
          getItemLabel={(item) => (item.type === 'product' ? item.name : item.title)}
          renderItem={(item) =>
            item.type === 'product' ? (
              <article className="flex h-full overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                <div className="flex w-full flex-col">
                  <div className="relative aspect-[16/10] bg-navy-950">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1380px) 32vw, (min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kavtris-blue">{item.categoryLabel}</p>
                    <h3 className="mt-3 text-xl font-semibold text-navy-950">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.shortDescription}</p>
                    <Link href={`/produtos/${item.slug}`} className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-kavtris-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2">
                      Ver produto
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <article className="flex h-full rounded-[1.35rem] border border-kavtris-blue/25 bg-navy-950 p-5 text-white shadow-sm">
                <div className="flex w-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kavtris-blueLight">Solução personalizada</p>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{item.description}</p>
                  <Button href="#contacto" className="mt-auto w-full text-navy-950">
                    Explique o seu problema
                  </Button>
                </div>
              </article>
            )
          }
        />

        <div className="mt-5 flex flex-col gap-3 md:hidden">
          <Button href="/produtos" className="w-full">
            Ver todos os produtos
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
