type HeroProofRow = {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'sky';
};

type HeroVisualProps = {
  productName: string;
  categoryLabel: string;
  summary: string;
  focusLabel: string;
  rows: HeroProofRow[];
  statusLabel: string;
};

const rowTone: Record<HeroProofRow['tone'], string> = {
  blue: 'bg-kavtris-blue/10 text-kavtris-blueLight',
  green: 'bg-emerald-400/10 text-emerald-200',
  sky: 'bg-sky-400/10 text-sky-200'
};

/**
 * Product Theatre T1 — governed first-party Product proof.
 *
 * This replaces the previous logo-only hero decoration with a static,
 * readable FieldOps operational surface derived from existing authoritative
 * Product data. No video, canvas, WebGL, perpetual animation, or new media
 * request is introduced. The same semantic content is available at every
 * viewport and under reduced motion.
 */
export function HeroVisual({
  productName,
  categoryLabel,
  summary,
  focusLabel,
  rows,
  statusLabel
}: HeroVisualProps) {
  return (
    <figure
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
      data-testid="hero-brand-visual"
      aria-labelledby="hero-product-proof-title"
      aria-describedby="hero-product-proof-summary"
    >
      <div
        data-testid="hero-product-proof"
        className="relative overflow-hidden rounded-[1.65rem] border border-white/[0.12] bg-[#07101F] p-4 shadow-[0_28px_70px_rgba(0,0,0,0.34)] sm:p-5 lg:p-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(61,123,255,0.16),transparent_35%)]" aria-hidden="true" />

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-kavtris-blueLight">Produto em ação</p>
              <p id="hero-product-proof-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {productName}
              </p>
            </div>
            <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/75">
              {categoryLabel}
            </span>
          </div>

          <p id="hero-product-proof-summary" className="mt-3 max-w-[34rem] text-sm leading-6 text-white/[0.65]">
            {summary}
          </p>

          <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-[#0B1728] p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/[0.45]">Visão operacional</p>
                <p className="mt-1 text-sm font-semibold text-white">{focusLabel}</p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-200">
                {statusLabel}
              </span>
            </div>

            <div className="mt-3 grid gap-2.5">
              {rows.map((row) => (
                <div
                  key={`${row.label}-${row.value}`}
                  className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-3"
                >
                  <p className="min-w-0 text-sm font-medium text-white/[0.78]">{row.label}</p>
                  <span className={`rounded-lg px-2.5 py-1 text-right text-xs font-semibold ${rowTone[row.tone]}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2" aria-label="Fluxo exemplificativo FieldOps">
            {['Serviço', 'Check-in', 'Evidência', 'Relatório'].map((step, index) => (
              <div key={step} className="min-w-0">
                <div className="flex items-center" aria-hidden="true">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-kavtris-blue/40 bg-kavtris-blue/10 text-[0.65rem] font-bold text-kavtris-blueLight">
                    {index + 1}
                  </span>
                  {index < 3 ? <span className="h-px min-w-0 flex-1 bg-white/[0.12]" /> : null}
                </div>
                <p className="mt-1.5 truncate text-[0.68rem] font-medium text-white/[0.55]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Exemplo público e sintético do FieldOps, mostrando uma agenda de serviços com estados operacionais suportados
        pela definição atual do produto.
      </figcaption>
    </figure>
  );
}
