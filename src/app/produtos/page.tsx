import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ProductCatalogClient } from '@/components/products/ProductCatalogClient';
import { siteUrl } from '@/lib/constants';

const title = 'Produtos e Soluções de Software | Qevaryn Systems';
const description =
  'Explore soluções de software para hotelaria, restauração, retalho, serviços, equipas externas e gestão empresarial.';
const canonicalPath = '/produtos';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalPath
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: `${siteUrl}${canonicalPath}`,
    siteName: 'Qevaryn Systems',
    title,
    description,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Catálogo de produtos Qevaryn Systems'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/twitter-image.png']
  }
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-center lg:px-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold-500">Produtos Qevaryn</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Soluções de software adaptadas ao funcionamento de cada empresa.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
                Explore exemplos de sistemas para diferentes setores. Cada solução pode ser ajustada ao tamanho, processo e necessidade do seu negócio.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
                Não são produtos fechados com preço fixo. São pontos de partida para conversar sobre o que a sua operação realmente precisa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#catalogo" className="text-navy-950">
                  Explorar soluções
                </Button>
                <Button href="/#contacto" variant="secondary">
                  Explique o seu problema
                </Button>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Como usar o catálogo</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Escolha um setor ou problema parecido com o seu.',
                  'Veja o que a solução poderia organizar.',
                  'Abra os detalhes técnicos se precisar de mais profundidade.',
                  'Peça uma versão adaptada à sua empresa.'
                ].map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-navy-900/70 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-600 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/75">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-white p-4 text-navy-900">
                <p className="text-sm font-semibold">Soluções adaptáveis</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Da ferramenta interna simples a uma plataforma com integrações, permissões e suporte.
                </p>
                <ArrowRight className="mt-4 h-5 w-5 text-gold-600" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
        <ProductCatalogClient />
      </main>
      <Footer />
    </>
  );
}
