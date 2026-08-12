import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { ProductCatalogClient } from '@/features/catalog/components/responsive/ProductCatalogClient';

export function CatalogPageView() {
  return (
    <>
      <Header />
      <main>
        <section className="overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-kavtris-blueLight">Produtos Qevaryn</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Encontre uma solução próxima da realidade da sua empresa.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
                Explore sistemas para diferentes operações. Cada solução pode começar simples e ser adaptada ao processo, dimensão e necessidades do negócio.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
                As soluções apresentadas são pontos de partida adaptáveis. O escopo final depende do levantamento de cada empresa.
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
          </div>
        </section>
        <ProductCatalogClient />
      </main>
      <Footer />
    </>
  );
}
