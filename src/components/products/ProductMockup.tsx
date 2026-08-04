import { CheckCircle2, ClipboardList, FileText, MessageSquare, Package, UserCheck } from 'lucide-react';
import type { ProductConcept } from '@/data/products';

type ProductMockupProps = {
  product: ProductConcept;
  compact?: boolean;
};

const mockupRows: Record<ProductConcept['mockupType'], Array<{ label: string; value: string; tone: string }>> = {
  field: [
    { label: 'Visita 08:30', value: 'Check-in feito', tone: 'bg-emerald-500' },
    { label: 'Checklist', value: '12/14 pontos', tone: 'bg-gold-500' },
    { label: 'Relatório', value: 'Com fotografia', tone: 'bg-sky-500' }
  ],
  stock: [
    { label: 'Arroz 5 kg', value: 'Stock baixo', tone: 'bg-gold-500' },
    { label: 'Fornecedor', value: 'Pedido criado', tone: 'bg-emerald-500' },
    { label: 'Loja norte', value: '42 unidades', tone: 'bg-sky-500' }
  ],
  hotel: [
    { label: 'Quarto 204', value: 'Limpeza em curso', tone: 'bg-gold-500' },
    { label: 'Manutenção', value: 'Prioridade média', tone: 'bg-sky-500' },
    { label: 'Receção', value: 'Pedido registado', tone: 'bg-emerald-500' }
  ],
  kitchen: [
    { label: 'Mesa 12', value: 'Em preparação', tone: 'bg-gold-500' },
    { label: 'Takeaway', value: 'Pronto', tone: 'bg-emerald-500' },
    { label: 'Entrega', value: 'A confirmar', tone: 'bg-sky-500' }
  ],
  ops: [
    { label: 'Aprovação', value: 'Pendente', tone: 'bg-gold-500' },
    { label: 'Documento', value: 'Revisto', tone: 'bg-emerald-500' },
    { label: 'Indicador', value: 'Atualizado', tone: 'bg-sky-500' }
  ],
  portal: [
    { label: 'Pedido #1482', value: 'Em análise', tone: 'bg-gold-500' },
    { label: 'Documento', value: 'Disponível', tone: 'bg-emerald-500' },
    { label: 'Mensagem', value: 'Cliente informado', tone: 'bg-sky-500' }
  ]
};

const icons = [ClipboardList, UserCheck, Package, MessageSquare, FileText, CheckCircle2];

export function ProductMockup({ product, compact = false }: ProductMockupProps) {
  const rows = mockupRows[product.mockupType];

  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-navy-950 p-4 text-white shadow-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(242,182,50,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-500">Exemplo de interface</p>
            <p className="mt-1 text-sm font-semibold text-white">{product.name}</p>
          </div>
          <span className="rounded-full border border-gold-500/30 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-200">
            Demo
          </span>
        </div>

        <div className={`mt-5 grid gap-3 ${compact ? '' : 'sm:grid-cols-[0.8fr_1fr]'}`}>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
            <div className="mb-3 h-2 w-20 rounded-full bg-gold-500/70" />
            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row.label} className="rounded-xl border border-white/10 bg-navy-900/80 p-3">
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

          <div className="rounded-2xl border border-white/10 bg-white p-3 text-navy-900">
            <div className="flex items-center justify-between">
              <div className="h-2 w-24 rounded-full bg-navy-200" />
              <div className="h-7 w-7 rounded-full bg-gold-500/20" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feature, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <div key={feature} className="rounded-xl border border-slate-200 bg-paper p-3">
                    <Icon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    <p className="mt-2 text-[0.7rem] font-semibold leading-4 text-navy-900">{feature}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 h-16 rounded-xl bg-gradient-to-r from-gold-500/20 via-navy-100 to-gold-500/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
