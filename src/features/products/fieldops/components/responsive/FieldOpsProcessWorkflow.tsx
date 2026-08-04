import { fieldOpsWorkflowSteps } from '@/features/products/fieldops/data/fieldops';

export function FieldOpsProcessWorkflow() {
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
