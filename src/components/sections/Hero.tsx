"use client";

import { useState } from 'react';
import { Activity, CheckCircle2, ChevronDown, GitBranch, PlugZap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

const metrics = [
  { label: 'Projetos', value: 'MVP' },
  { label: 'Automações', value: 'Fluxos' },
  { label: 'Integrações', value: 'APIs' },
  { label: 'Qualidade', value: 'QA' }
];

const activities = [
  'Pedido recebido e classificado',
  'Integração preparada para validação',
  'Fluxo crítico marcado para teste'
];

const systems = ['Portal', 'API', 'Backoffice', 'Relatórios', 'QA'];

export function Hero() {
  const [mobileTab, setMobileTab] = useState<'operations' | 'quality'>('operations');
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:72px_72px] opacity-30" />
      <svg className="absolute left-0 top-24 hidden h-[420px] w-52 text-gold-600/45 lg:block" viewBox="0 0 210 420" fill="none" aria-hidden="true">
        <path d="M0 28H48L76 56H128" stroke="currentColor" />
        <path d="M0 88H35L64 117H120" stroke="currentColor" />
        <path d="M0 164H58L88 134H148" stroke="currentColor" />
        <path d="M0 252H46L84 290H154" stroke="currentColor" />
        <path d="M0 336H38L72 302H132" stroke="currentColor" />
        {[128, 120, 148, 154, 132].map((x, index) => (
          <circle key={index} cx={x} cy={[56, 117, 134, 290, 302][index]} r="4" fill="currentColor" />
        ))}
      </svg>
      <svg className="absolute right-0 top-24 hidden h-[420px] w-52 scale-x-[-1] text-gold-600/45 lg:block" viewBox="0 0 210 420" fill="none" aria-hidden="true">
        <path d="M0 28H48L76 56H128" stroke="currentColor" />
        <path d="M0 88H35L64 117H120" stroke="currentColor" />
        <path d="M0 164H58L88 134H148" stroke="currentColor" />
        <path d="M0 252H46L84 290H154" stroke="currentColor" />
        <path d="M0 336H38L72 302H132" stroke="currentColor" />
        {[128, 120, 148, 154, 132].map((x, index) => (
          <circle key={index} cx={x} cy={[56, 117, 134, 290, 302][index]} r="4" fill="currentColor" />
        ))}
      </svg>

      <div className="container-wide relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-20 xl:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-2 text-sm font-medium text-white/68">Software • Automation • Quality • Innovation</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,9vw,3rem)] leading-[1.03] tracking-tight md:text-[3.8rem] xl:text-[4.25rem]">
            Tecnologia que conecta processos, pessoas e <span className="text-gold-500">resultados</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
            Desenvolvemos aplicações web, ferramentas internas, automações, integrações, APIs e soluções de qualidade de software para empresas que precisam trabalhar com mais organização, controlo e eficiência.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#contacto" className="min-h-12 w-full sm:w-auto">Falar sobre um projeto</Button>
            <Button href="#solucoes" variant="secondary" className="min-h-12 w-full sm:w-auto">
              Conhecer as soluções
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-10">
            {['Web Apps', 'Automação', 'APIs', 'Dashboards', 'QA'].map((tag) => (
              <Tag key={tag} tone="gold">
                {tag}
              </Tag>
            ))}
          </div>

          <p className="mt-6 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72">
            Integrante da Rede Qualidade é Vida
          </p>
        </div>

        <div className="relative lg:self-center">
          <div className="hidden overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-2xl backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold-500">Painel Operacional</p>
                <p className="mt-1 text-sm text-white/65">Demonstração visual ilustrativa</p>
              </div>
              <div className="rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-500">Sistemas em controlo</div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.9fr]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-navy-900/80 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/50">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Fluxos da operação</span>
                    <span>Mapa ilustrativo</span>
                  </div>
                  <svg viewBox="0 0 360 150" className="mt-4 h-40 w-full" role="img" aria-label="Fluxo ilustrativo de sistemas, integrações e qualidade">
                    <path d="M42 76H138M222 76H318M180 42V110" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
                    {[
                      [42, 76, 'Sistema'],
                      [180, 42, 'API'],
                      [180, 110, 'QA'],
                      [318, 76, 'Painel']
                    ].map(([x, y, label]) => (
                      <g key={String(label)}>
                        <circle cx={Number(x)} cy={Number(y)} r="28" fill="#071F35" stroke="#F2B632" strokeWidth="2" />
                        <text x={Number(x)} y={Number(y) + 4} fill="#FFFFFF" fontSize="12" textAnchor="middle">{label}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <p className="text-sm font-medium text-white">Estado dos sistemas</p>
                  <div className="mt-4 space-y-3">
                    {systems.map((system, index) => (
                      <div key={system} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm">
                        <span className="text-white/72">{system}</span>
                        <span className={index < 3 ? 'text-emerald-300' : 'text-gold-500'}>{index < 3 ? 'Ativo' : 'A validar'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-navy-900/85 p-4">
                  <p className="text-sm font-medium text-white">Atividade recente</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    {activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 shadow-2xl backdrop-blur-sm lg:hidden" data-testid="dashboard-mobile">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">Painel Operacional</p>
                <p className="mt-1 text-sm text-white/65">Demonstração visual</p>
              </div>
              <Activity className="h-6 w-6 text-gold-500" aria-hidden="true" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-navy-900/85 p-3">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-white/50">{metric.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 rounded-full border border-white/10 bg-navy-900/75 p-1" role="tablist" aria-label="Visualização operacional">
              <button
                type="button"
                role="tab"
                aria-selected={mobileTab === 'operations'}
                aria-controls="dashboard-operations"
                className={`min-h-10 rounded-full text-sm font-semibold transition ${mobileTab === 'operations' ? 'bg-gold-600 text-white' : 'text-white/70'}`}
                onClick={() => setMobileTab('operations')}
              >
                Operação
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mobileTab === 'quality'}
                aria-controls="dashboard-quality"
                className={`min-h-10 rounded-full text-sm font-semibold transition ${mobileTab === 'quality' ? 'bg-gold-600 text-white' : 'text-white/70'}`}
                onClick={() => setMobileTab('quality')}
              >
                Qualidade
              </button>
            </div>

            <div id={mobileTab === 'operations' ? 'dashboard-operations' : 'dashboard-quality'} role="tabpanel" className="mt-4 rounded-2xl border border-white/10 bg-navy-900/85 p-4">
              {mobileTab === 'operations' ? (
                <div className="grid gap-3">
                  {systems.slice(0, 4).map((system) => (
                    <div key={system} className="flex items-center gap-3 text-sm text-white/75">
                      <PlugZap className="h-4 w-4 text-gold-500" aria-hidden="true" />
                      {system}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3">
                  {['Requisitos revistos', 'Fluxos testados', 'Falhas priorizadas'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                      <GitBranch className="h-4 w-4 text-gold-500" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="mt-4 flex min-h-11 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white"
              aria-expanded={showDetails}
              aria-controls="dashboard-mobile-details"
              onClick={() => setShowDetails((value) => !value)}
            >
              Ver atividade ilustrativa
              <ChevronDown className={`h-4 w-4 transition ${showDetails ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {showDetails ? (
              <div id="dashboard-mobile-details" className="mt-3 grid gap-2 rounded-2xl border border-white/10 bg-navy-900/85 p-4 text-sm text-white/70">
                {activities.map((activity) => <span key={activity}>{activity}</span>)}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
