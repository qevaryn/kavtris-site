import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { RevealOnce } from '@/components/shared/RevealOnce';
import { SectionHeading } from '@/components/shared/SectionHeading';

/**
 * WEB.1F.5 — Homepage "Como funciona" customer-path selector.
 *
 * The old five-step technical process section is intentionally removed. This
 * section orients the visitor instead of exploring content:
 *
 *   1. Card A (PRIMARY) — "não sei qual sistema preciso" → business discovery;
 *   2. Card B (SECONDARY) — "já sei o que procuro" → system catalog;
 *   3. Centered technical link — deeper capabilities on /empresas#capacidades.
 *
 * Home orients; Products explores. The business cards/catalog live on their
 * dedicated Products modes and are NOT repeated here.
 */
export function CustomerPathSelector() {
  return (
    <section
      id="como-funciona"
      className="kavtris-ambient-light relative border-t border-navy-900/[0.06] bg-kavtris-light pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24"
    >
      <RevealOnce testId="reveal-como-funciona">
        <div className="container-section">
          <SectionHeading
            className="[&_h2]:font-sans"
            eyebrow="Como funciona"
            title="Comece pelo caminho mais simples para a sua empresa."
            subtitle="Não precisa saber qual tecnologia ou sistema precisa. Escolha a opção que melhor descreve o seu momento."
            align="center"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {/* Card A — PRIMARY: business discovery */}
            <article
              data-testid="home-path-business-primary"
              className="flex flex-col rounded-[1.5rem] border border-kavtris-blue/40 bg-navy-950 p-6 text-white shadow-card sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blueLight">
                Não sei qual sistema preciso
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                Começar pelo meu negócio
              </h3>
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

            {/* Card B — SECONDARY: system catalog */}
            <article
              data-testid="home-path-systems-secondary"
              className="flex flex-col rounded-[1.5rem] border border-borderline bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blue">
                Já sei o que procuro
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight text-navy-950 sm:text-3xl">
                Ver os sistemas
              </h3>
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

          {/* Third path — technical capabilities (visually less dominant). */}
          <div className="mt-8 text-center">
            <Link
              href="/empresas#capacidades"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-kavtris-blue underline-offset-4 transition hover:text-kavtris-blueLight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2"
              data-testid="home-path-technical"
            >
              Ver capacidades mais técnicas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </RevealOnce>
    </section>
  );
}
