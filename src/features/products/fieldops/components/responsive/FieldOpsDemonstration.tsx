'use client';

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
import type { ProductLevelId } from '@/features/products/data/products';
import type { FieldOpsSectorId } from '@/features/products/fieldops/components/responsive/FieldOpsSectorAdaptation';

type ExperienceId = (typeof fieldOpsExperienceViews)[number]['id'];

type FieldOpsDemonstrationProps = {
  levelId: ProductLevelId;
  sectorId: FieldOpsSectorId;
};

/**
 * WEB.1F.8 — FieldOps "DEMONSTRAÇÃO VISUAL" (journey slot 5).
 *
 * The experience tabs (Gestão/Equipa/Processo) are local interaction, while
 * the configuration panel derives from the PAGE-LEVEL `levelId` — switching
 * level on the page changes the demo's modules/audience/outcome visibly
 * (DEMONSTRATION_LEVEL_AWARE = YES). The old duplicate level tablist is gone.
 */
export function FieldOpsDemonstration({ levelId, sectorId }: FieldOpsDemonstrationProps) {
  const [experienceId, setExperienceId] = useState<ExperienceId>('management');
  const experience = useMemo(
    () => fieldOpsExperienceViews.find((item) => item.id === experienceId) ?? fieldOpsExperienceViews[0],
    [experienceId]
  );
  const sector = useMemo(
    () => fieldOpsSectors.find((item) => item.id === sectorId) ?? fieldOpsSectors[0],
    [sectorId]
  );
  const configuration = useMemo(
    () => fieldOpsConfigurations.find((item) => item.id === levelId) ?? fieldOpsConfigurations[0],
    [levelId]
  );

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const ids = fieldOpsExperienceViews.map((item) => item.id);
    const currentIndex = ids.indexOf(experienceId);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? ids.length - 1
          : event.key === 'ArrowRight' || event.key === 'ArrowDown'
            ? (currentIndex + 1) % ids.length
            : (currentIndex - 1 + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    setExperienceId(nextId);
    window.requestAnimationFrame(() => {
      document.getElementById(`experience-tab-${nextId}`)?.focus();
    });
  };

  return (
    <section id="fieldops-experience" data-testid="fieldops-demonstration" className="bg-paper py-14 sm:py-16">
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
          className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap"
          onKeyDown={onTabKey}
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

        <div id={`experience-panel-${experience.id}`} role="tabpanel" aria-labelledby={`experience-tab-${experience.id}`} className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
              <h3 className="text-2xl font-semibold text-navy-950">{experience.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-600">{experience.description}</p>
            </div>
            {experience.id === 'management' && <FieldOpsManagementDashboard sectorName={sector.name} dashboardState={sector.dashboardState} />}
            {experience.id === 'team' && <FieldOpsEmployeeMobileView sectorName={sector.name} />}
            {experience.id === 'process' && <FieldOpsProcessWorkflow />}
          </div>
        </div>

        {/* Level-aware configuration panel inside the demo (WEB.1F.8). */}
        <div
          data-testid="fieldops-demo-config"
          className="mt-6 rounded-[1.35rem] border border-kavtris-blue/30 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-kavtris-blue">
              Nível {configuration.name}
            </p>
            <span className="rounded-full bg-[#F0F6FF] px-3 py-1 text-xs font-semibold text-navy-900">
              {configuration.audience.length} perfis · {configuration.modules.length} módulos
            </span>
          </div>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Adequado para</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {configuration.audience.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Módulos possíveis</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {configuration.modules.map((module) => (
              <span key={module} className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">
                {module}
              </span>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-[#EAF1FC] p-3 text-sm font-semibold leading-6 text-navy-900">
            {configuration.outcome}
          </p>
        </div>
      </div>
    </section>
  );
}
