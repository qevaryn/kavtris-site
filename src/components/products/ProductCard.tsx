import Link from 'next/link';
import { ArrowRight, Boxes, ClipboardCheck, Hotel, PackageSearch, Soup, UserRoundCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ProductConcept } from '@/data/products';
import { ProductMockup } from '@/components/products/ProductMockup';

type ProductCardProps = {
  product: ProductConcept;
};

export function ProductCard({ product }: ProductCardProps) {
  const Icon = productIcons[product.mockupType];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-gold-500/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
            {product.label}
          </span>
          <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-navy-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
      </div>

      <div className="px-5">
        <ProductMockup product={product} compact />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="rounded-2xl bg-paper p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">Problema que resolve</p>
          <p className="mt-2 text-sm leading-6 text-navy-800">{product.problem}</p>
        </div>

        <ul className="mt-4 grid gap-2 text-sm text-slate-600">
          {product.benefits.slice(0, 4).map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {benefit}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Este é um exemplo de solução que pode ser adaptado ao funcionamento da sua empresa.
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
          <Button href={`/produtos/${product.slug}`} className="w-full sm:w-auto">
            Ver solução
          </Button>
          <Link
            href={`/?produto=${product.slug}#contacto`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            Adaptar à minha empresa
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const productIcons = {
  field: ClipboardCheck,
  stock: PackageSearch,
  hotel: Hotel,
  kitchen: Soup,
  ops: Boxes,
  portal: UserRoundCheck
} as const;
