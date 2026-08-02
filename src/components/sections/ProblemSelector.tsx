"use client";

import { useMemo, useState } from 'react';
import { businessProblems, type BusinessProblemId } from '@/data/business-problems';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProblemSelector() {
  const [activeId, setActiveId] = useState<BusinessProblemId>('manual');
  const active = useMemo(() => businessProblems.find((problem) => problem.id === activeId) ?? businessProblems[0], [activeId]);

  return (
    <section id="problemas" className="soft-section-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Comece pelo problema"
          title="O que está a dificultar o seu negócio?"
          subtitle="Escolha uma situação. A Qevaryn traduz o problema para uma solução simples, sem exigir que conheça termos técnicos."
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Problemas frequentes">
          {businessProblems.map((problem) => {
            const Icon = problem.icon;
            const isActive = activeId === problem.id;

            return (
              <button
                key={problem.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(problem.id)}
                className={`group min-h-[13rem] rounded-[1.35rem] border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                  isActive ? 'border-gold-600 shadow-card' : 'border-borderline'
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${isActive ? 'bg-navy-900 text-gold-500' : 'bg-mist text-gold-600'}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-base font-semibold leading-snug text-navy-900">{problem.label}</span>
                <span className="mt-3 block text-sm leading-6 text-muted">{problem.short}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[1.6rem] border border-navy-900/15 bg-navy-950 text-white shadow-card lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-500">Solução simples</p>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{active.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">{active.explanation}</p>
            <div className="mt-6">
              <Button href="#simulador" className="text-navy-950">
                Continuar a partir deste problema
              </Button>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#08223A] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold text-white">Benefícios esperados</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {active.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82">
                  {benefit}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-gold-500/25 bg-[#03182B] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Exemplo visual</p>
              <ol className="mt-4 grid gap-3">
                {active.example.map((item, index) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/78">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
