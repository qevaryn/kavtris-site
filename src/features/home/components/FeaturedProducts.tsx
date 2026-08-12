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
    <section id="produtos-preview" className="kavtris-ambient bg-kavtris-dark py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blueLight">Produtos e soluções</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Tecnologias que adaptamos para o seu negócio.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              As soluções existentes são pontos de partida adaptáveis à sua operação. Não precisa escolher sozinho o
              software perfeito — analisamos o contexto e propomos o melhor caminho.
            </p>
          </div>
          <Button href="/produtos" className="hidden w-full border border-kavtris-blue/50 bg-transparent text-white hover:bg-kavtris-blue/10 sm:w-auto md:inline-flex">
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
              <article className="panel-dark panel-dark-hover flex h-full overflow-hidden rounded-[1.35rem] border border-white/10">
                <div className="flex w-full flex-col">
                  <div className="relative aspect-[16/10] bg-[#040B1C]">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1380px) 32vw, (min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kavtris-blueLight">{item.categoryLabel}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{item.shortDescription}</p>
                    <Link
                      href={`/produtos/${item.slug}`}
                      className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-kavtris-blue/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blueLight focus-visible:ring-offset-2 focus-visible:ring-offset-kavtris-dark"
                    >
                      Ver produto
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <article className="panel-dark flex h-full rounded-[1.35rem] border border-kavtris-blue/30 p-5 text-white">
                <div className="flex w-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kavtris-blueLight">Solução personalizada</p>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{item.description}</p>
                  <Button href="#contacto" className="mt-auto w-full">
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
