'use client';

import type { KeyboardEvent } from 'react';
import { useMemo } from 'react';
import {
  fieldOpsConfigurations,
  fieldOpsSectors
} from '@/features/products/fieldops/data/fieldops';
import type { ProductLevelId } from '@/features/products/data/products';

export type FieldOpsSectorId = (typeof fieldOpsSectors)[number]['id'];

type FieldOpsSectorAdaptationProps = {
  levelId: ProductLevelId;
  sectorId: FieldOpsSectorId;
  onSectorChange: (sectorId: FieldOpsSectorId) => void;
};

/**
 * WEB.1F.8 — FieldOps "ADAPTAÇÃO POR SETOR" (journey slot 4).
 *
 * The sector selection is page-level (shared with the demonstration). The
 * panel also knows the page-level selected level via a data-driven
 * "Configuração {Nível}" line — no sector × level combinatorial blocks.
 */
export function FieldOpsSectorAdaptation({ levelId, sectorId, onSectorChange }: FieldOpsSectorAdaptationProps) {
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
    const ids = fieldOpsSectors.map((item) => item.id);
    const currentIndex = ids.indexOf(sectorId);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? ids.length - 1
          : event.key === 'ArrowRight' || event.key === 'ArrowDown'
            ? (currentIndex + 1) % ids.length
            : (currentIndex - 1 + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    onSectorChange(nextId);
    window.requestAnimationFrame(() => {
      document.getElementById(`sector-tab-${nextId}`)?.focus();
    });
  };

  return (
    <section data-testid="fieldops-adaptation" className="bg-mist py-16 sm:py-20">
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
          onKeyDown={onTabKey}
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
              onClick={() => onSectorChange(item.id)}
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
          <article className="rounded-[1.35rem] border border-borderline bg-white p-6">
            <h3 className="text-2xl font-semibold text-navy-950">{sector.name}</h3>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Problema operacional</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{sector.problem}</p>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-slate-600">Resultado prático</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{sector.outcome}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {sector.modules.map((module) => (
                <span key={module} className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-navy-800">
                  {module}
                </span>
              ))}
            </div>
            {/* WEB.1F.8 — the adaptation section also knows the page level. */}
            <div
              data-testid="fieldops-adaptation-level"
              className="mt-5 rounded-2xl border border-kavtris-blue/25 bg-[#EAF1FC] p-4 text-sm leading-6 text-navy-900"
            >
              <span className="font-semibold text-kavtris-blue">Configuração {configuration.name}:</span>{' '}
              {configuration.outcome}
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
  );
}
