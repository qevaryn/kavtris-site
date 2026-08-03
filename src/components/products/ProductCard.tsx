import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, Hotel, PackageSearch, Soup, UserRoundCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ProductConcept } from '@/data/products';

type ProductCardProps = {
  product: ProductConcept;
};

const mockupConfig: Record<
  ProductConcept['mockupType'],
  {
    Icon: LucideIcon;
    accent: string;
    rows: Array<{ label: string; value: string }>;
    panels: string[];
  }
> = {
  field: {
    Icon: ClipboardCheck,
    accent: 'Serviço externo',
    rows: [
      { label: 'Agenda', value: '3 visitas hoje' },
      { label: 'Check-in', value: 'No local' },
      { label: 'Evidências', value: 'Fotos ligadas ao serviço' }
    ],
    panels: ['Checklist', 'Relatório', 'Gestão']
  },
  stock: {
    Icon: PackageSearch,
    accent: 'Stock e encomendas',
    rows: [
      { label: 'Produto', value: 'Stock baixo' },
      { label: 'Fornecedor', value: 'Pedido preparado' },
      { label: 'Movimento', value: 'Entrada registada' }
    ],
    panels: ['Produtos', 'Alertas', 'Fornecedores']
  },
  hotel: {
    Icon: Hotel,
    accent: 'Operação hoteleira',
    rows: [
      { label: 'Quarto 204', value: 'Limpeza em curso' },
      { label: 'Manutenção', value: 'Pedido aberto' },
      { label: 'Receção', value: 'Hóspede informado' }
    ],
    panels: ['Quartos', 'Limpeza', 'Pedidos']
  },
  kitchen: {
    Icon: Soup,
    accent: 'Cozinha e pedidos',
    rows: [
      { label: 'Mesa 12', value: 'Em preparação' },
      { label: 'Takeaway', value: 'Pronto' },
      { label: 'Entrega', value: 'A caminho' }
    ],
    panels: ['Fila', 'Cozinha', 'Entrega']
  },
  ops: {
    Icon: CheckCircle2,
    accent: 'Gestão interna',
    rows: [
      { label: 'Aprovação', value: 'Pendente' },
      { label: 'Documento', value: 'Em revisão' },
      { label: 'Tarefa', value: 'Responsável definido' }
    ],
    panels: ['Tarefas', 'Aprovações', 'Indicadores']
  },
  portal: {
    Icon: UserRoundCheck,
    accent: 'Área de cliente',
    rows: [
      { label: 'Pedido #1482', value: 'Em análise' },
      { label: 'Documento', value: 'Disponível' },
      { label: 'Mensagem', value: 'Cliente informado' }
    ],
    panels: ['Pedidos', 'Documentos', 'Mensagens']
  }
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      data-testid="product-card"
      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <ProductCardVisual product={product} />

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">{product.categoryLabel}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
          <Button href={`/produtos/${product.slug}`} className="w-full sm:w-auto">
            Ver produto
          </Button>
          <Link
            href={`/?produto=${product.slug}#contacto`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition hover:border-gold-500 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            Adaptar à minha empresa
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProductCardVisual({ product }: { product: ProductConcept }) {
  const config = mockupConfig[product.mockupType];
  const Icon = config.Icon;

  return (
    <div className="p-4 pb-0">
      <figure
        aria-label={product.imageAlt}
        data-testid="product-card-visual"
        className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-navy-950 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(242,182,50,0.26),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.09),transparent_45%)]" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-gold-500/20" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-gold-400">Exemplo de interface</p>
              <p className="mt-1 text-sm font-semibold text-white">{config.accent}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/12">
              <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
            </span>
          </div>

          <div className="grid gap-2">
            {config.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[0.75fr_1fr] gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2">
                <span className="text-[0.68rem] font-semibold text-white/58">{row.label}</span>
                <span className="text-[0.7rem] font-semibold text-white">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {config.panels.map((panel, index) => (
              <span key={panel} className="flex min-h-8 flex-1 items-center justify-center rounded-xl bg-white text-[0.66rem] font-bold text-navy-900">
                {index === 0 ? <FileText className="mr-1 h-3.5 w-3.5 text-gold-600" aria-hidden="true" /> : null}
                {panel}
              </span>
            ))}
          </div>
        </div>
      </figure>
    </div>
  );
}
