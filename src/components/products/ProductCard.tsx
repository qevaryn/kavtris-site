import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ProductConcept } from '@/data/products';

type ProductCardProps = {
  product: ProductConcept;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      data-testid="product-card"
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <figure
        data-testid="product-card-visual"
        className="relative aspect-[16/10] overflow-hidden bg-navy-950"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </figure>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{product.categoryLabel}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
          <Button href={`/produtos/${product.slug}`} className="w-full sm:w-auto">
            Ver produto
          </Button>
          <Link
            href={`/?produto=${product.slug}#contacto`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Adaptar à minha empresa
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
