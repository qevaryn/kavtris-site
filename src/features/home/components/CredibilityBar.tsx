"use client";

import { Bot, CircleCheck, Code2, LifeBuoy, PlugZap } from 'lucide-react';
import { LoopingTicker } from '@/components/shared/LoopingTicker';

const serviceStripItems = [
  { title: 'Reduzir tarefas manuais', subtitle: 'Automação inteligente', icon: Bot },
  { title: 'Evitar falhas e melhorar processos', subtitle: 'Qualidade e conformidade', icon: CircleCheck },
  { title: 'Sistemas para computador e telemóvel', subtitle: 'Web e mobile', icon: Code2 },
  { title: 'Ligar as ferramentas da empresa', subtitle: 'Integrações e APIs', icon: PlugZap },
  { title: 'Suporte, correções e melhorias', subtitle: 'Suporte e evolução', icon: LifeBuoy }
];

export function CredibilityBar() {
  return (
    <section className="border-y border-borderline bg-white py-2" aria-label="Serviços principais">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <LoopingTicker
          ariaLabel="Serviços principais"
          items={serviceStripItems}
          durationSeconds={32}
          testId="services-ticker"
          viewportClassName="py-1"
          itemClassName="min-w-[17.5rem]"
          renderItem={(item) => {
            const Icon = item.icon;

            return (
              <article className="flex min-h-[4.25rem] items-center gap-2.5 rounded-2xl border border-borderline bg-white px-4 py-3 shadow-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gold-600">
                  <Icon className="h-5 w-5 stroke-[1.7]" aria-hidden="true" />
                </span>
                <p className="text-left text-[0.69rem] font-extrabold uppercase leading-4 tracking-[0.05em] text-navy-900">
                  {item.title}
                  <span className="mt-0.5 block text-[0.62rem] font-semibold normal-case tracking-normal text-muted">{item.subtitle}</span>
                </p>
              </article>
            );
          }}
        />
      </div>
    </section>
  );
}
