"use client";

import { RevealOnce } from '@/components/shared/RevealOnce';

/**
 * WEB.1E — THE MEANING BEHIND KAVTRIS (institutional signature section).
 *
 * KAVTRIS is NOT an acronym. The seven words are symbolic brand principles
 * associated with each letter — never a literal expansion or etymology.
 * English principle is prominent; the Portuguese line is short and secondary.
 *
 * Desktop: one coherent horizontal brand system (seven related principles).
 * Mobile: a horizontally scrollable snap track (no autoplay; all seven
 * reachable by touch/swipe/keyboard). Reveal uses the existing one-time
 * RevealOnce architecture; letters resolve left-to-right with a small stagger.
 */

const kavtrisPrinciples = [
  { letter: 'K', english: 'Knowledge', pt: 'Conhecimento que orienta.' },
  { letter: 'A', english: 'Adaptability', pt: 'Adaptamo-nos à realidade.' },
  { letter: 'V', english: 'Vision', pt: 'Visão com propósito.' },
  { letter: 'T', english: 'Trust', pt: 'Confiança em cada etapa.' },
  { letter: 'R', english: 'Results', pt: 'Resultados que importam.' },
  { letter: 'I', english: 'Innovation', pt: 'Inovação com utilidade.' },
  { letter: 'S', english: 'Simplicity', pt: 'Simples para funcionar.' }
];

export function MeaningBehindKavtris() {
  return (
    <section
      id="significado"
      className="kavtris-ambient border-y border-white/5 bg-kavtris-dark py-16 sm:py-20 lg:py-24"
      aria-labelledby="significado-titulo"
    >
      <RevealOnce testId="reveal-significado" className="kavtris-reveal--duration-short container-section">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-kavtris-blueLight">A marca</p>
          <h2
            id="significado-titulo"
            className="mt-3 font-display text-[2rem] leading-tight text-white uppercase md:text-[2.65rem]"
          >
            The meaning behind KAVTRIS
          </h2>
          <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-kavtris-blue" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Sete princípios que representam a forma como criamos tecnologia.
          </p>
        </div>

        {/* Mobile / tablet — horizontal snap track (no autoplay; swipe + keyboard). */}
        <div
          className="snap-row mt-10 lg:hidden"
          role="region"
          aria-label="Princípios da marca KAVTRIS"
          tabIndex={0}
          data-testid="kavtris-principles-track"
        >
          {kavtrisPrinciples.map((principle, index) => (
            <article
              key={principle.letter}
              className="kavtris-principle snap-card w-[72%] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:w-[55%]"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <p className="font-sans text-4xl font-bold text-kavtris-blueLight">{principle.letter}</p>
              <p className="mt-2 text-base font-semibold text-white">{principle.english}</p>
              <p className="mt-1.5 text-sm leading-6 text-white/55">{principle.pt}</p>
            </article>
          ))}
        </div>

        {/* Desktop — one engineered horizontal brand system. */}
        <div className="relative mt-12 hidden lg:block" data-testid="kavtris-principles-grid">
          {/* Restrained connecting line echoing the Hero's directed path. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-7 gap-4" aria-label="Princípios da marca KAVTRIS">
            {kavtrisPrinciples.map((principle, index) => (
              <li key={principle.letter} className="kavtris-principle relative text-center" style={{ animationDelay: `${index * 45}ms` }}>
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.03] font-sans text-2xl font-bold text-kavtris-blueLight">
                  {principle.letter}
                </span>
                <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white">{principle.english}</p>
                <p className="mx-auto mt-1.5 max-w-[11rem] text-xs leading-5 text-white/50">{principle.pt}</p>
              </li>
            ))}
          </ol>
        </div>
      </RevealOnce>
    </section>
  );
}
