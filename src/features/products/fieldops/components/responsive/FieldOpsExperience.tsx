"use client";

import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FieldOpsManagementDashboard } from '@/features/products/fieldops/components/desktop/FieldOpsManagementDashboard';
import { FieldOpsEmployeeMobileView } from '@/features/products/fieldops/components/mobile/FieldOpsEmployeeMobileView';
import { FieldOpsProcessWorkflow } from '@/features/products/fieldops/components/responsive/FieldOpsProcessWorkflow';
import {
  fieldOpsConfigurations,
  fieldOpsExperienceViews,
  fieldOpsSectors
} from '@/features/products/fieldops/data/fieldops';

type ExperienceId = (typeof fieldOpsExperienceViews)[number]['id'];
type ConfigId = (typeof fieldOpsConfigurations)[number]['id'];

export function FieldOpsExperience() {
  // Keep all selectors in this orchestrator so desktop and mobile product views share the same state.
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Demonstração visual</p>
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
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 ${
                  experience.id === item.id
                    ? 'border-kavtris-blue bg-kavtris-blue text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-kavtris-blue hover:text-kavtris-blue'
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
              {experience.id === 'management' && <FieldOpsManagementDashboard sectorName={sector.name} dashboardState={sector.dashboardState} />}
              {experience.id === 'team' && <FieldOpsEmployeeMobileView sectorName={sector.name} />}
              {experience.id === 'process' && <FieldOpsProcessWorkflow />}
            </div>
          </div>
        </div>
      </section>

      <section id="fieldops-setores" className="bg-white py-16 sm:py-20">
        <div className="container-section">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Adaptação por setor</p>
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
                className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 ${
                  sector.id === item.id
                    ? 'border-kavtris-blue bg-kavtris-blue text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-kavtris-blue hover:text-kavtris-blue'
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
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kavtris-blue text-sm font-bold text-white">
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Evolução por fases</p>
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
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 ${
                  configuration.id === item.id
                    ? 'border-kavtris-blue bg-navy-950 text-white'
                    : 'border-borderline bg-white text-navy-800 hover:border-kavtris-blue hover:text-kavtris-blue'
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
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
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
                      <span className="mr-2 text-kavtris-blue">{index + 1}.</span>
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
