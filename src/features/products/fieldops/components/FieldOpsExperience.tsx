"use client";

import type { KeyboardEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { AlertTriangle, Camera, CheckCircle2, ClipboardCheck, Clock, FileText, MapPin, UserCheck } from 'lucide-react';
import {
  fieldOpsConfigurations,
  fieldOpsExperienceViews,
  fieldOpsSectors,
  fieldOpsWorkflowSteps
} from '@/features/products/fieldops/data/fieldops';

type ExperienceId = (typeof fieldOpsExperienceViews)[number]['id'];
type ConfigId = (typeof fieldOpsConfigurations)[number]['id'];

export function FieldOpsExperience() {
  const [experienceId, setExperienceId] = useState<ExperienceId>('management');
  const [sectorId, setSectorId] = useState(fieldOpsSectors[0].id);
  const [configId, setConfigId] = useState<ConfigId>('essential');

  const experience = useMemo(
    () => fieldOpsExperienceViews.find((item) => item.id === experienceId) ?? fieldOpsExperienceViews[0],
    [experienceId]
  );
  const sector = useMemo(
    () => fieldOpsSectors.find((item) => item.id === sectorId) ?? fieldOpsSectors[0],
    [sectorId]
  );
  const configuration = useMemo(
    () => fieldOpsConfigurations.find((item) => item.id === configId) ?? fieldOpsConfigurations[0],
    [configId]
  );

  return (
    <>
      <section id="fieldops-experience" className="bg-paper py-16 sm:py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Demonstração visual</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Veja o FieldOps em funcionamento
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Uma leitura simples para gestão, equipa e processo. Os detalhes finais dependem do fluxo real de cada empresa.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Experiência FieldOps"
            className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap"
            onKeyDown={(event) => handleTabKey(event, fieldOpsExperienceViews.map((item) => item.id), experienceId, setExperienceId, 'experience')}
          >
            {fieldOpsExperienceViews.map((item) => (
              <button
                id={`experience-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                aria-selected={experience.id === item.id}
                aria-controls={`experience-panel-${item.id}`}
                tabIndex={experience.id === item.id ? 0 : -1}
                onClick={() => setExperienceId(item.id)}
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                  experience.id === item.id
                    ? 'border-gold-600 bg-gold-600 text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-gold-500 hover:text-gold-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div id={`experience-panel-${experience.id}`} role="tabpanel" aria-labelledby={`experience-tab-${experience.id}`} className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
              <div className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-navy-950">{experience.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">{experience.description}</p>
              </div>
              {experience.id === 'management' && <ManagementView sectorName={sector.name} dashboardState={sector.dashboardState} />}
              {experience.id === 'team' && <TeamView sectorName={sector.name} />}
              {experience.id === 'process' && <ProcessView />}
            </div>
          </div>
        </div>
      </section>

      <section id="fieldops-setores" className="bg-white py-16 sm:py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Adaptação por setor</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Veja como o FieldOps se adapta à sua operação
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              O mesmo produto pode começar por fluxos diferentes, sem criar uma solução separada para cada setor.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Setores FieldOps"
            className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap"
            onKeyDown={(event) => handleTabKey(event, fieldOpsSectors.map((item) => item.id), sectorId, setSectorId, 'sector')}
          >
            {fieldOpsSectors.map((item) => (
              <button
                id={`sector-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                aria-selected={sector.id === item.id}
                aria-controls={`sector-panel-${item.id}`}
                tabIndex={sector.id === item.id ? 0 : -1}
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

          <div id={`sector-panel-${sector.id}`} role="tabpanel" aria-labelledby={`sector-tab-${sector.id}`} className="mt-8 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
            <article className="rounded-[1.35rem] border border-borderline bg-paper p-6">
              <h3 className="text-2xl font-semibold text-navy-950">{sector.name}</h3>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Problema operacional</p>
              <p className="mt-2 text-base leading-7 text-slate-700">{sector.problem}</p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Resultado prático</p>
              <p className="mt-2 text-base leading-7 text-slate-700">{sector.outcome}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {sector.modules.map((module) => (
                  <span key={module} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy-800 shadow-sm">
                    {module}
                  </span>
                ))}
              </div>
            </article>

            <ol className="grid gap-3 sm:grid-cols-2">
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

      <section id="fieldops-evolucao" className="bg-paper py-16 sm:py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Evolução por fases</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Comece com o essencial e evolua
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Estas configurações são exemplos e não representam pacotes fechados ou preços fixos.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Configurações FieldOps"
            className="mt-8 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap"
            onKeyDown={(event) => handleTabKey(event, fieldOpsConfigurations.map((item) => item.id), configId, setConfigId, 'config')}
          >
            {fieldOpsConfigurations.map((item) => (
              <button
                id={`config-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                aria-selected={configuration.id === item.id}
                aria-controls={`config-panel-${item.id}`}
                tabIndex={configuration.id === item.id ? 0 : -1}
                onClick={() => setConfigId(item.id)}
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
                  configuration.id === item.id
                    ? 'border-gold-600 bg-navy-950 text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-gold-500 hover:text-gold-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div id={`config-panel-${configuration.id}`} role="tabpanel" aria-labelledby={`config-tab-${configuration.id}`} className="mt-8 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
            <article className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-navy-950">{configuration.name}</h3>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Adequado para</p>
              <ul className="mt-3 grid gap-2">
                {configuration.audience.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-paper p-4 text-sm font-semibold leading-6 text-navy-900">{configuration.outcome}</p>
            </article>

            <div className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Módulos possíveis</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {configuration.modules.map((module) => (
                  <span key={module} className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">
                    {module}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-borderline pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Adoção</p>
                <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                  {['Entender a operação', 'Prototipar o primeiro fluxo', 'Desenvolver e testar', 'Lançar e evoluir'].map((step, index) => (
                    <li key={step} className="rounded-2xl bg-paper p-4 text-sm font-semibold text-navy-900">
                      <span className="mr-2 text-gold-700">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  O primeiro projeto pode começar por uma única equipa, serviço ou localização.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ManagementView({ sectorName, dashboardState }: { sectorName: string; dashboardState: string }) {
  const stats = [
    ['Ativos', '12'],
    ['Agendados', '28'],
    ['Atrasados', '2'],
    ['Incidentes', '3'],
    ['Aprovações', '5']
  ];

  return (
    <article className="min-w-0 rounded-[1.8rem] border border-borderline bg-white p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Painel de gestão</p>
          <h3 className="mt-2 text-2xl font-semibold text-navy-950">{dashboardState}</h3>
        </div>
        <span className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">{sectorName}</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-paper p-4">
            <p className="text-xs font-semibold text-slate-600">{label}</p>
            <p className="mt-1 text-2xl font-bold text-navy-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ['Serviço ativo', 'Em curso', Clock],
          ['Relatório disponível', 'Concluído', FileText],
          ['Incidente a rever', 'Pendente', AlertTriangle],
          ['Cliente ou local', 'Filtrado por equipa', MapPin]
        ].map(([title, status, Icon]) => (
          <div key={title as string} className="flex items-center gap-3 rounded-2xl border border-borderline p-4">
            <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-navy-900">{title as string}</p>
              <p className="text-sm text-slate-600">{status as string}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TeamView({ sectorName }: { sectorName: string }) {
  return (
    <article className="mx-auto w-full max-w-md rounded-[1.8rem] border border-borderline bg-white p-4 shadow-card lg:mx-0">
      <div className="rounded-[1.45rem] bg-navy-950 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-500">FieldOps Mobile</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[0.68rem] font-semibold text-emerald-200">Offline opcional</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 text-navy-950">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">Agenda de hoje</p>
          <h3 className="mt-2 text-lg font-semibold">{sectorName} - serviço atribuído</h3>
          <div className="mt-4 grid gap-3">
            <InfoRow icon={<Clock className="h-4 w-4" />} label="Horário" value="09:30 - 11:00" />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Local" value="Cliente / localização atribuída" />
            <InfoRow icon={<ClipboardCheck className="h-4 w-4" />} label="Checklist" value="Pontos preparados para execução" />
            <InfoRow icon={<Camera className="h-4 w-4" />} label="Evidências" value="Fotografias e notas ligadas ao serviço" />
            <InfoRow icon={<AlertTriangle className="h-4 w-4" />} label="Incidente" value="Registo quando algo precisa de revisão" />
            <InfoRow icon={<UserCheck className="h-4 w-4" />} label="Conclusão" value="Confirmação ou check-out quando aplicável" />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProcessView() {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {fieldOpsWorkflowSteps.map((step, index) => (
        <li key={step.id} className="rounded-2xl border border-borderline bg-white p-4 shadow-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600 text-sm font-bold text-white">
            {index + 1}
          </span>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-gold-700">{step.statusLabel}</p>
          <h3 className="mt-1 text-base font-semibold text-navy-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
        </li>
      ))}
    </ol>
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

function handleTabKey<T extends string>(
  event: KeyboardEvent<HTMLDivElement>,
  ids: T[],
  activeId: T,
  onChange: (id: T) => void,
  group: 'experience' | 'sector' | 'config'
) {
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    return;
  }

  event.preventDefault();
  const currentIndex = ids.indexOf(activeId);
  const nextIndex =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? ids.length - 1
        : event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? (currentIndex + 1) % ids.length
          : (currentIndex - 1 + ids.length) % ids.length;
  const nextId = ids[nextIndex];
  onChange(nextId);
  window.requestAnimationFrame(() => {
    document.getElementById(`${group}-tab-${nextId}`)?.focus();
  });
}
