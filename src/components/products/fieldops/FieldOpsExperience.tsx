"use client";

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Camera, ClipboardCheck, Clock, MapPin, UserCheck } from 'lucide-react';
import {
  fieldOpsMobileStates,
  fieldOpsSectors,
  fieldOpsWorkflowSteps
} from '@/data/fieldops';

export function FieldOpsExperience() {
  const [sectorId, setSectorId] = useState(fieldOpsSectors[0].id);
  const [workflowId, setWorkflowId] = useState(fieldOpsWorkflowSteps[0].id);
  const [mobileState, setMobileState] = useState(fieldOpsMobileStates[0]);

  const sector = useMemo(
    () => fieldOpsSectors.find((item) => item.id === sectorId) ?? fieldOpsSectors[0],
    [sectorId]
  );
  const workflowStep = useMemo(
    () => fieldOpsWorkflowSteps.find((item) => item.id === workflowId) ?? fieldOpsWorkflowSteps[0],
    [workflowId]
  );

  return (
    <>
      <section id="setores-fieldops" className="bg-white py-16 sm:py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Para diferentes operações</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Um fluxo FieldOps adaptado ao setor.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Selecione um contexto para ver como o problema, o fluxo e os módulos podem mudar sem transformar isto em produtos separados.
            </p>
          </div>

          <div role="tablist" aria-label="Setores FieldOps" className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
            {fieldOpsSectors.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={sector.id === item.id}
                aria-controls="fieldops-sector-panel"
                onClick={() => setSectorId(item.id)}
                className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                  sector.id === item.id
                    ? 'border-gold-600 bg-gold-600 text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-gold-500 hover:text-gold-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div id="fieldops-sector-panel" role="tabpanel" className="mt-8 grid gap-6 lg:grid-cols-[0.44fr_0.56fr]">
            <article className="min-w-0 rounded-[1.35rem] border border-borderline bg-paper p-6">
              <h3 className="text-2xl font-semibold text-navy-950">{sector.name}</h3>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Problema exemplo</p>
              <p className="mt-2 text-base leading-7 text-slate-700">{sector.problem}</p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Como o fluxo poderia funcionar</p>
              <p className="mt-2 text-base leading-7 text-slate-700">{sector.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {sector.modules.map((module) => (
                  <span key={module} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy-800 shadow-sm">
                    {module}
                  </span>
                ))}
              </div>
            </article>

            <ol className="grid min-w-0 gap-3 sm:grid-cols-2">
              {sector.workflow.map((step, index) => (
                <li key={step} className="rounded-2xl border border-borderline bg-white p-4 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-navy-900">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="como-funciona-fieldops" className="bg-paper py-16 sm:py-20">
        <div className="container-section">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Demonstração visual</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Do planeamento ao relatório final.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Escolha um passo para ver como a interface pode orientar a equipa sem depender de instruções técnicas.
              </p>
            </div>

            <div className="grid min-w-0 gap-6">
              <div className="grid min-w-0 gap-2 sm:grid-cols-2">
                {fieldOpsWorkflowSteps.map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    aria-pressed={workflowStep.id === step.id}
                    onClick={() => setWorkflowId(step.id)}
                    className={`rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                      workflowStep.id === step.id
                        ? 'border-gold-600 bg-navy-950 text-white'
                        : 'border-borderline bg-white text-navy-900 hover:border-gold-500'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-500">{step.statusLabel}</span>
                    <span className="mt-2 block text-sm font-semibold">{step.title}</span>
                  </button>
                ))}
              </div>

              <div className="min-w-0 rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-600">{workflowStep.statusLabel}</p>
                <h3 className="mt-2 text-2xl font-semibold text-navy-950">{workflowStep.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-600">{workflowStep.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <MobileMockup activeState={mobileState} onChange={setMobileState} sectorName={sector.name} />
            <DashboardMockup sectorName={sector.name} dashboardState={sector.dashboardState} />
          </div>
        </div>
      </section>
    </>
  );
}

function MobileMockup({
  activeState,
  onChange,
  sectorName
}: {
  activeState: string;
  onChange: (state: string) => void;
  sectorName: string;
}) {
  return (
    <article className="min-w-0 rounded-[1.8rem] border border-borderline bg-white p-4 shadow-card">
      <div className="min-w-0 rounded-[1.45rem] bg-navy-950 p-4 text-white">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-500">FieldOps Mobile</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[0.68rem] font-semibold text-emerald-200">Offline opcional</span>
        </div>
        <div className="mt-4 flex min-w-0 gap-2 overflow-x-auto pb-2">
          {fieldOpsMobileStates.map((state) => (
            <button
              key={state}
              type="button"
              aria-pressed={activeState === state}
              onClick={() => onChange(state)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                activeState === state ? 'bg-gold-600 text-white' : 'bg-white/10 text-white/75'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
        <div className="mt-4 min-w-0 rounded-2xl bg-white p-4 text-navy-950">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{activeState}</p>
          <h3 className="mt-2 text-lg font-semibold">{sectorName} - serviço de hoje</h3>
          <div className="mt-4 grid gap-3">
            <InfoRow icon={<Clock className="h-4 w-4" />} label="Horário" value="09:30 - 11:00" />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Local" value="Cliente / localização atribuída" />
            <InfoRow icon={<ClipboardCheck className="h-4 w-4" />} label="Checklist" value="4 de 6 pontos preparados" />
            <InfoRow icon={<Camera className="h-4 w-4" />} label="Evidências" value="Fotografias e notas ligadas ao serviço" />
            <InfoRow icon={<UserCheck className="h-4 w-4" />} label="Conclusão" value="Assinatura ou aprovação quando aplicável" />
          </div>
        </div>
      </div>
    </article>
  );
}

function DashboardMockup({ sectorName, dashboardState }: { sectorName: string; dashboardState: string }) {
  return (
    <article className="min-w-0 rounded-[1.8rem] border border-borderline bg-white p-5 shadow-card">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Painel de gestão</p>
          <h3 className="mt-2 text-2xl font-semibold text-navy-950">{dashboardState}</h3>
        </div>
        <span className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">{sectorName}</span>
      </div>
      <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-4">
        {[
          ['Ativos', '12'],
          ['Agendados', '28'],
          ['Incidentes', '3'],
          ['Aprovações', '5']
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper p-4">
            <p className="text-xs font-semibold text-slate-600">{label}</p>
            <p className="mt-1 text-2xl font-bold text-navy-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-borderline">
        {['Serviço ativo', 'Atraso a rever', 'Relatório disponível'].map((item, index) => (
          <div key={item} className="grid min-w-0 grid-cols-[1fr_auto] gap-3 border-b border-borderline px-4 py-3 last:border-b-0">
            <p className="text-sm font-semibold text-navy-900">{item}</p>
            <span className="text-sm text-slate-600">{['Em curso', 'Pendente', 'Concluído'][index]}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-paper p-3">
      <span className="text-gold-600">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600">{label}</p>
        <p className="mt-1 text-sm text-navy-900">{value}</p>
      </div>
    </div>
  );
}
