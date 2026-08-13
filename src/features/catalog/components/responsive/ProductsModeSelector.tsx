import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';

/**
 * WEB.1F.5 — /produtos default entry: the two-choice mode selector.
 *
 * When the visitor lands on /produtos without a valid `?modo=`, the main
 * Products content is intentionally NOT shown yet (no business cards, no
 * catalog). The customer chooses their path first — this is an onboarding
 * gate, not a lock: header/footer/back navigation remain fully available.
 *
 *   Card A (PRIMARY) — business discovery: /produtos?modo=negocio#tipos-de-negocio
 *   Card B (SECONDARY) — system catalog:  /produtos?modo=sistemas#catalogo
 */
export function ProductsModeSelector() {
  return (
    <section className="overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-kavtris-blueLight">
            Produtos e soluções
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Como prefere começar?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">
            Escolha a forma mais simples de encontrar um ponto de partida para a sua empresa.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* PRIMARY — I don't know which system I need */}
          <article
            data-testid="products-mode-business-primary"
            className="flex flex-col rounded-[1.5rem] border border-kavtris-blue/40 bg-white/5 p-6 shadow-card sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A5C9FF]">
              Não sei qual sistema preciso
            </p>
            <h2 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
              Começar pelo meu negócio
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
              Escolha o tipo de empresa que mais se aproxima da sua e veja sistemas que podem servir como ponto de partida.
            </p>
            <Button
              href="/produtos?modo=negocio#tipos-de-negocio"
              className="mt-auto w-full bg-kavtris-blue text-white shadow-glow hover:bg-[#0B5EFF] sm:mt-8 sm:w-auto"
            >
              Escolher pelo meu negócio
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </article>

          {/* SECONDARY — I know what I'm looking for */}
          <article
            data-testid="products-mode-systems-secondary"
            className="flex flex-col rounded-[1.5rem] border border-borderline bg-white p-6 text-navy-950 shadow-sm sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blue">
              Já sei o que procuro
            </p>
            <h2 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
              Ver os sistemas
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Explore diretamente os sistemas e soluções da KAVTRIS.
            </p>
            <Button
              href="/produtos?modo=sistemas#catalogo"
              variant="outline"
              className="mt-auto w-full sm:mt-8 sm:w-auto"
            >
              Ver todos os sistemas
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}
