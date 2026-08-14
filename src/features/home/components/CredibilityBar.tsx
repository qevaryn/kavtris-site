"use client";

import { Bot, CircleCheck, Code2, Compass, Cpu, LifeBuoy, PlugZap, TrendingUp } from 'lucide-react';
import { LoopingTicker } from '@/components/shared/LoopingTicker';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

/**
 * WEB.1B — CREDIBILITY_BAR / VALUE_PROPOSITION_LOOP inventory.
 *
 * Only real application content. No invented certifications, statistics,
 * customer counts, awards or accreditations (CREDIBILITY_LOOP_PRESERVED).
 *
 * Items 1–3 are the owner-approved value pillars that previously lived in the
 * Hero (Consultoria ativa / Tecnologia adaptável / Resultados reais); items
 * 4–8 are the existing service strip items. All were already defined in the
 * application — none are new claims.
 */
const credibilityItems = [
  { title: 'Consultoria ativa', subtitle: 'Identificamos oportunidades antes de vender software.', icon: Compass },
  { title: 'Tecnologia adaptável', subtitle: 'Partimos do que já funciona e ajustamos à sua operação.', icon: Cpu },
  { title: 'Resultados reais', subtitle: 'Medimos o impacto e evoluímos com a sua empresa.', icon: TrendingUp },
  { title: 'Reduzir tarefas manuais', subtitle: 'Automação inteligente', icon: Bot },
  { title: 'Evitar falhas e melhorar processos', subtitle: 'Qualidade e conformidade', icon: CircleCheck },
  { title: 'Sistemas para computador e telemóvel', subtitle: 'Web e mobile', icon: Code2 },
  { title: 'Ligar as ferramentas da empresa', subtitle: 'Integrações e APIs', icon: PlugZap },
  { title: 'Suporte, correções e melhorias', subtitle: 'Suporte e evolução', icon: LifeBuoy }
];

export function CredibilityBar() {
  const reducedMotion = useReducedMotion();

  const staticContent = (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="services-static-grid">
      {credibilityItems.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title} className="panel-dark flex min-h-[6rem] items-center gap-3 rounded-2xl border border-white/10 px-5 py-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-kavtris-blueLight">
              <Icon className="h-5 w-5 stroke-[1.7]" aria-hidden="true" />
            </span>
            <p className="text-left text-[0.78rem] font-extrabold uppercase leading-5 tracking-[0.05em] text-white">
              {item.title}
              <span className="mt-0.5 block text-[0.7rem] font-semibold normal-case leading-[1.45] tracking-normal text-white/60">{item.subtitle}</span>
            </p>
          </article>
        );
      })}
    </div>
  );

  return (
    <section className="kavtris-ambient border-y border-white/5 bg-kavtris-dark py-3" aria-label="Como a KAVTRIS trabalha e no que pode confiar">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        {reducedMotion ? (
          <div data-testid="services-static-reduced">{staticContent}</div>
        ) : (
          <LoopingTicker
            ariaLabel="Como a KAVTRIS trabalha e no que pode confiar"
            items={credibilityItems}
            testId="services-ticker"
            viewportClassName="py-1.5"
            itemClassName="w-[19rem] sm:w-[21rem]"
            edgeFadeClassName="from-[#010619]"
            renderItem={(item) => {
              const Icon = item.icon;

              return (
                <article className="panel-dark flex min-h-[6rem] items-center gap-3 rounded-2xl border border-white/10 px-5 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-kavtris-blueLight">
                    <Icon className="h-5 w-5 stroke-[1.7]" aria-hidden="true" />
                  </span>
                  <p className="text-left text-[0.78rem] font-extrabold uppercase leading-5 tracking-[0.05em] text-white">
                    {item.title}
                    <span className="mt-0.5 block text-[0.7rem] font-semibold normal-case leading-[1.45] tracking-normal text-white/60">{item.subtitle}</span>
                  </p>
                </article>
              );
            }}
          />
        )}
      </div>
    </section>
  );
}
