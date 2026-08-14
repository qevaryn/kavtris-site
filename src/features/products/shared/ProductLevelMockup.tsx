import { CheckCircle2, Plug } from 'lucide-react';
import type { ProductConcept, ProductLevel } from '@/features/products/data/products';

type ProductLevelMockupProps = {
  product: ProductConcept;
  level: ProductLevel;
};

const toneDot: Record<ProductLevel['visual']['rows'][number]['tone'], string> = {
  blue: 'bg-kavtris-blue',
  green: 'bg-emerald-500',
  sky: 'bg-sky-500'
};

/**
 * WEB.1F.7 — level-specific product visual.
 *
 * The selected configuration level drives a VISIBLY different interface
 * composition (LEVEL_VISUAL_ACTUALLY_CHANGES = YES): the operational rows, the
 * surfaced module tiles, the live-status line and (on the Empresarial level)
 * an integrations bar all change. Every string comes from the product's own
 * level definition, which is derived only from supported capabilities.
 *
 * Decorative for screen readers — the page's real product copy (level options,
 * highlights and summary) carries the meaning.
 */
export function ProductLevelMockup({ product, level }: ProductLevelMockupProps) {
  const { visual } = level;
  const tiles = visual.tiles.slice(0, 6);

  return (
    <div
      data-testid="product-level-visual"
      data-product-level={level.id}
      aria-hidden="true"
      className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-navy-950 p-4 text-white shadow-card sm:p-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,90,253,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative">
        {/* Browser chrome */}
        <div className="flex items-center gap-2.5">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <div className="min-w-0 flex-1 truncate rounded-full border border-white/10 bg-navy-900/80 px-3 py-1 text-[0.65rem] font-semibold text-white/55">
            app.kavtris.pt/{product.mockupType}
          </div>
          <span className="shrink-0 rounded-full border border-kavtris-blue/30 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-kavtris-blueLight">
            Demo
          </span>
        </div>

        {/* Level header — the selected level is unmistakable even in the visual. */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-kavtris-blueLight">
              Exemplo de interface
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{product.name}</p>
          </div>
          <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">
            Nível {level.name}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[0.85fr_1fr]">
          {/* Operational rows for this level */}
          <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="h-2 w-20 rounded-full bg-kavtris-blue/70" />
              <span className="truncate rounded-full bg-kavtris-blue/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-kavtris-blueLight">
                {visual.focusLabel}
              </span>
            </div>
            <div className="space-y-2">
              {visual.rows.map((row) => (
                <div key={row.label} className="rounded-xl border border-white/10 bg-navy-900/80 p-3">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${toneDot[row.tone]}`} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">{row.label}</p>
                      <p className="mt-1 truncate text-xs text-white/60">{row.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module tiles surfaced at this level */}
          <div className="rounded-2xl border border-white/10 bg-white p-3 text-navy-900">
            <div className="flex items-center justify-between">
              <div className="h-2 w-24 rounded-full bg-navy-200" />
              <span className="rounded-full bg-kavtris-blue/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-navy-900">
                {tiles.length} módulos
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {tiles.map((tile) => (
                <div key={tile} className="rounded-xl border border-slate-200 bg-paper p-3">
                  <CheckCircle2 className="h-4 w-4 text-kavtris-blue" aria-hidden="true" />
                  <p className="mt-2 text-[0.7rem] font-semibold leading-4 text-navy-900">{tile}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations bar — only where the product/level supports it. */}
        {visual.showIntegration ? (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-kavtris-blue/25 bg-kavtris-blue/10 px-4 py-3">
            <Plug className="h-4 w-4 shrink-0 text-kavtris-blueLight" aria-hidden="true" />
            <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white">
              Integrações por API com sistemas existentes
            </p>
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-emerald-300">
              Ativa
            </span>
          </div>
        ) : null}

        {/* Live status strip */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy-900/80 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${toneDot[visual.rows[0]?.tone ?? 'blue']}`} />
            <p className="truncate text-xs font-semibold text-white">{visual.rows[0]?.label}</p>
          </div>
          <p className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-kavtris-blueLight">
            {visual.statusLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
