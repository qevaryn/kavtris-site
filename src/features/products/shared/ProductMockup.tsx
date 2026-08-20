import { CheckCircle2, ClipboardList, FileText, MessageSquare, Package, UserCheck } from 'lucide-react';
import type { ProductConcept } from '@/features/products/data/products';

type ProductMockupProps = {
  product: ProductConcept;
  compact?: boolean;
};

const mockupRows: Record<ProductConcept['mockupType'], Array<{ label: string; value: string; tone: string }>> = {
  field: [
    { label: 'Visita 08:30', value: 'Check-in feito', tone: 'bg-emerald-500' },
    { label: 'Checklist', value: '12/14 pontos', tone: 'bg-kavtris-blue' },
    { label: 'Relatório', value: 'Com fotografia', tone: 'bg-sky-500' }
  ],
  stock: [
    { label: 'Arroz 5 kg', value: 'Stock baixo', tone: 'bg-kavtris-blue' },
    { label: 'Fornecedor', value: 'Pedido criado', tone: 'bg-emerald-500' },
    { label: 'Loja norte', value: '42 unidades', tone: 'bg-sky-500' }
  ],
  hotel: [
    { label: 'Quarto 204', value: 'Limpeza em curso', tone: 'bg-kavtris-blue' },
    { label: 'Manutenção', value: 'Prioridade média', tone: 'bg-sky-500' },
    { label: 'Receção', value: 'Pedido registado', tone: 'bg-emerald-500' }
  ],
  kitchen: [
    { label: 'Mesa 12', value: 'Em preparação', tone: 'bg-kavtris-blue' },
    { label: 'Takeaway', value: 'Pronto', tone: 'bg-emerald-500' },
    { label: 'Entrega', value: 'A confirmar', tone: 'bg-sky-500' }
  ],
  ops: [
    { label: 'Aprovação', value: 'Pendente', tone: 'bg-kavtris-blue' },
    { label: 'Documento', value: 'Revisto', tone: 'bg-emerald-500' },
    { label: 'Indicador', value: 'Atualizado', tone: 'bg-sky-500' }
  ],
  portal: [
    { label: 'Pedido #1482', value: 'Em análise', tone: 'bg-kavtris-blue' },
    { label: 'Documento', value: 'Disponível', tone: 'bg-emerald-500' },
    { label: 'Mensagem', value: 'Cliente informado', tone: 'bg-sky-500' }
  ]
};

const icons = [ClipboardList, UserCheck, Package, MessageSquare, FileText, CheckCircle2];

/**
 * WEB.1F.6 — product hero mockup. A clearly-labelled, non-functional "Exemplo
 * de interface" illustration: browser chrome + product-specific operational
 * rows + a feature grid. Content is derived only from the product's own
 * definition (mockupType rows + features). Decorative for screen readers.
 */
export function ProductMockup({ product, compact = false }: ProductMockupProps) {
  const rows = mockupRows[product.mockupType];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-navy-950 p-3 text-white shadow-card"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,90,253,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative">
        {/* Browser chrome — the mockup reads as an application window, not a generic panel. */}
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

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-kavtris-blueLight">Exemplo de interface</p>
            <p className="mt-1 text-sm font-semibold text-white">{product.name}</p>
          </div>
        </div>

        <div className={`mt-4 grid gap-2.5 ${compact ? '' : 'sm:grid-cols-[0.8fr_1fr]'}`}>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-2.5">
            <div className="mb-2.5 h-2 w-20 rounded-full bg-kavtris-blue/70" />
            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.label} className="rounded-xl border border-white/10 bg-navy-900/80 p-2.5">
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${row.tone}`} />
                    <div>
                      <p className="text-xs font-semibold text-white">{row.label}</p>
                      <p className="mt-1 text-xs text-white/60">{row.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white p-2.5 text-navy-900">
            <div className="flex items-center justify-between">
              <div className="h-2 w-24 rounded-full bg-navy-200" />
              <div className="h-7 w-7 rounded-full bg-kavtris-blue/20" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feature, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div key={feature} className="rounded-xl border border-slate-200 bg-paper p-2.5">
                    <Icon className="h-4 w-4 text-kavtris-blue" aria-hidden="true" />
                    <p className="mt-2 text-[0.7rem] font-semibold leading-4 text-navy-900">{feature}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 h-14 rounded-xl bg-gradient-to-r from-kavtris-blue/20 via-navy-100 to-kavtris-blue/10" />
          </div>
        </div>

        {/* Live status strip — reinforces that the mockup depicts an operating state. */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy-900/80 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${rows[0]?.tone ?? 'bg-kavtris-blue'}`} />
            <p className="truncate text-xs font-semibold text-white">{rows[0]?.label}</p>
          </div>
          <p className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-kavtris-blueLight">Estado atualizado</p>
        </div>
      </div>
    </div>
  );
}
