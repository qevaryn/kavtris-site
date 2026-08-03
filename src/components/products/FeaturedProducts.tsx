import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/data/products';

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section id="produtos-preview" className="bg-white py-16 sm:py-20 lg:py-24">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
