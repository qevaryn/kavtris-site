import {
  CalendarCheck,
  CheckSquare,
  ClipboardList,
  FileText,
  FolderOpen,
  ListTodo,
  MapPin,
  MessageSquare,
  Package,
  ShoppingCart,
  Smartphone,
  User,
  UtensilsCrossed
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductConcept, ProductLevelId } from '@/features/products/data/products';

/**
 * WEB.1F.7 — "product in action" visual storytelling.
 *
 * Each product renders a DIFFERENT operational scene (no shared generic
 * dashboard): a main screen (desktop/board context) + a companion device
 * (phone/tablet context) + the numbered possible-use sequence. Every label is
 * derived from the product's own features — no invented capabilities, no stock
 * photography (UNSUPPORTED_PRODUCT_CLAIMS = 0).
 *
 * The `product-workflow-visual` testid and the flow step strings are kept so
 * the WEB.1F.6 product assertions remain meaningful. Decorative for screen
 * readers: the surrounding page copy carries the real information.
 */

type Scene = {
  icon: LucideIcon;
  caption: string;
  note: string;
};

type InActionConfig = {
  mainTitle: string;
  mainRows: Array<{ icon: LucideIcon; label: string; sub: string }>;
  phoneTitle: string;
  phoneRows: Array<{ label: string; state: string; tone: 'blue' | 'green' | 'sky' }>;
  scenes: Scene[];
};

const inAction: Record<ProductConcept['mockupType'], InActionConfig> = {
  field: {
    mainTitle: 'Painel de gestão',
    mainRows: [
      { icon: CalendarCheck, label: 'Agenda de serviços', sub: 'visitas do dia' },
      { icon: User, label: 'Equipa atribuída', sub: 'funcionários por local' },
      { icon: MapPin, label: 'Localizações', sub: 'moradas de clientes' },
      { icon: FileText, label: 'Relatórios por cliente', sub: 'histórico organizado' }
    ],
    phoneTitle: 'Técnico no terreno',
    phoneRows: [
      { label: 'Check-in', state: 'presença confirmada', tone: 'green' },
      { label: 'Checklist', state: '12/14 pontos', tone: 'blue' },
      { label: 'Fotografia', state: 'evidência registada', tone: 'sky' }
    ],
    scenes: [
      { icon: CalendarCheck, caption: 'Serviço agendado', note: 'visita planeada' },
      { icon: User, caption: 'Equipa atribuída', note: 'responsável definido' },
      { icon: Smartphone, caption: 'Check-in no local', note: 'presença confirmada' },
      { icon: CheckSquare, caption: 'Checklist e evidências', note: 'registo completo' },
      { icon: FileText, caption: 'Relatório concluído', note: 'histórico pronto' }
    ]
  },
  stock: {
    mainTitle: 'Painel de stock',
    mainRows: [
      { icon: Package, label: 'Produtos registados', sub: 'catálogo atualizado' },
      { icon: ClipboardList, label: 'Alertas de stock mínimo', sub: 'reposição sinalizada' },
      { icon: ShoppingCart, label: 'Encomendas a fornecedores', sub: 'pedidos de compra' },
      { icon: ListTodo, label: 'Movimentos', sub: 'entradas e saídas' }
    ],
    phoneTitle: 'Atualização em loja',
    phoneRows: [
      { label: 'Stock', state: 'quantidade atualizada', tone: 'green' },
      { label: 'Encomenda', state: 'pedido criado', tone: 'blue' },
      { label: 'Entrada', state: 'movimento registado', tone: 'sky' }
    ],
    scenes: [
      { icon: Package, caption: 'Produto registado', note: 'catálogo base' },
      { icon: ClipboardList, caption: 'Stock atualizado', note: 'quantidades em dia' },
      { icon: ListTodo, caption: 'Alerta de reposição', note: 'mínimo atingido' },
      { icon: ShoppingCart, caption: 'Encomenda ao fornecedor', note: 'pedido de compra' },
      { icon: Package, caption: 'Entrada registada', note: 'movimento concluído' }
    ]
  },
  hotel: {
    mainTitle: 'Estado dos quartos',
    mainRows: [
      { icon: FolderOpen, label: 'Quartos', sub: 'estado em tempo real' },
      { icon: CheckSquare, label: 'Tarefas de limpeza', sub: 'atribuídas à equipa' },
      { icon: ClipboardList, label: 'Pedidos de manutenção', sub: 'prioridade definida' },
      { icon: MessageSquare, label: 'Mensagens internas', sub: 'equipa informada' }
    ],
    phoneTitle: 'Equipa no piso',
    phoneRows: [
      { label: 'Tarefa', state: 'atribuída', tone: 'blue' },
      { label: 'Estado', state: 'limpeza em curso', tone: 'sky' },
      { label: 'Incidente', state: 'registo criado', tone: 'green' }
    ],
    scenes: [
      { icon: FolderOpen, caption: 'Quarto atribuído', note: 'estado definido' },
      { icon: CheckSquare, caption: 'Tarefa de limpeza', note: 'equipa notificada' },
      { icon: ClipboardList, caption: 'Pedido interno', note: 'manutenção ou serviço' },
      { icon: MessageSquare, caption: 'Estado atualizado', note: 'equipa em sintonia' },
      { icon: FileText, caption: 'Histórico registado', note: 'serviços documentados' }
    ]
  },
  kitchen: {
    mainTitle: 'Ecrã de cozinha',
    mainRows: [
      { icon: UtensilsCrossed, label: 'Fila de pedidos', sub: 'ordem de chegada' },
      { icon: ClipboardList, label: 'Estado de preparação', sub: 'de cada pedido' },
      { icon: ListTodo, label: 'Pedidos prioritários', sub: 'destaque quando necessário' },
      { icon: Smartphone, label: 'Alertas de atraso', sub: 'sinalizados a tempo' }
    ],
    phoneTitle: 'Atendimento',
    phoneRows: [
      { label: 'Pedido', state: 'enviado para cozinha', tone: 'blue' },
      { label: 'Nota interna', state: 'alergénio registado', tone: 'sky' },
      { label: 'Pronto', state: 'para entrega', tone: 'green' }
    ],
    scenes: [
      { icon: UtensilsCrossed, caption: 'Pedido recebido', note: 'fila atualizada' },
      { icon: ClipboardList, caption: 'Em preparação', note: 'estado visível' },
      { icon: CheckSquare, caption: 'Pronto', note: 'atenção sinalizada' },
      { icon: Smartphone, caption: 'Entrega', note: 'saída registada' },
      { icon: FileText, caption: 'Concluído', note: 'histórico guardado' }
    ]
  },
  ops: {
    mainTitle: 'Painel interno',
    mainRows: [
      { icon: ListTodo, label: 'Pedidos internos', sub: 'solicitações da equipa' },
      { icon: ClipboardList, label: 'Fluxos de aprovação', sub: 'responsáveis definidos' },
      { icon: FileText, label: 'Documentos', sub: 'centralizados' },
      { icon: CalendarCheck, label: 'Prazos', sub: 'visíveis por tarefa' }
    ],
    phoneTitle: 'Aprovação rápida',
    phoneRows: [
      { label: 'Pedido', state: 'a aguardar aprovação', tone: 'blue' },
      { label: 'Documento', state: 'revisto', tone: 'sky' },
      { label: 'Aprovação', state: 'concedida', tone: 'green' }
    ],
    scenes: [
      { icon: ListTodo, caption: 'Pedido criado', note: 'solicitação interna' },
      { icon: User, caption: 'Responsável atribuído', note: 'dono definido' },
      { icon: ClipboardList, caption: 'Aprovação', note: 'fluxo cumprido' },
      { icon: FileText, caption: 'Documento anexado', note: 'contexto reunido' },
      { icon: CheckSquare, caption: 'Concluído', note: 'atividade registada' }
    ]
  },
  portal: {
    mainTitle: 'Console da empresa',
    mainRows: [
      { icon: FolderOpen, label: 'Pedidos dos clientes', sub: 'estado acompanhado' },
      { icon: FileText, label: 'Documentos publicados', sub: 'acesso seguro' },
      { icon: MessageSquare, label: 'Mensagens', sub: 'clientes informados' },
      { icon: CalendarCheck, label: 'Atualizações', sub: 'notificações enviadas' }
    ],
    phoneTitle: 'Área do cliente',
    phoneRows: [
      { label: 'Pedido #1482', state: 'em análise', tone: 'blue' },
      { label: 'Documento', state: 'disponível', tone: 'green' },
      { label: 'Estado', state: 'cliente informado', tone: 'sky' }
    ],
    scenes: [
      { icon: Smartphone, caption: 'Login do cliente', note: 'área protegida' },
      { icon: FolderOpen, caption: 'Pedido consultado', note: 'estado visível' },
      { icon: FileText, caption: 'Documento disponível', note: 'acesso organizado' },
      { icon: MessageSquare, caption: 'Mensagem', note: 'sem chamadas repetidas' },
      { icon: CalendarCheck, caption: 'Pagamento informado', note: 'cliente acompanha' }
    ]
  }
};

const phoneTone: Record<InActionConfig['phoneRows'][number]['tone'], string> = {
  blue: 'bg-kavtris-blue',
  green: 'bg-emerald-500',
  sky: 'bg-sky-500'
};


export function ProductInAction({ product, levelId }: { product: ProductConcept; levelId?: ProductLevelId }) {
  const config = inAction[product.mockupType];
  // WEB.1F.8 — the demonstration reacts to the page-level selected level: the
  // companion device and the level badge derive from the level's own visual
  // data (DEMONSTRATION_LEVEL_AWARE = YES), not just a subtitle.
  const level = levelId ? product.levels.find((item) => item.id === levelId) : undefined;
  const phoneRows = level
    ? level.visual.rows.map((row) => ({ label: row.label, state: row.value, tone: row.tone }))
    : config.phoneRows;

  return (
    <div
      data-testid="product-in-action"
      aria-hidden="true"
      className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8"
    >
      <div data-testid="product-workflow-visual">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        {/* Main device — the operational context that dominates this product. */}
        <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-paper">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </span>
            <p className="ml-1 truncate text-xs font-semibold text-navy-800">{config.mainTitle}</p>
          </div>
          <div className="grid gap-2.5 p-4 sm:grid-cols-2">
            {config.mainRows.map((row) => (
              <div key={row.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-kavtris-blue" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-navy-900">{row.label}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Companion device — the mobile/customer-facing side of the same story. */}
        <div className="mx-auto flex w-full max-w-[300px] flex-col lg:max-w-none">
          <div className="flex-1 overflow-hidden rounded-[1.4rem] border border-slate-200 bg-navy-950 p-3.5 text-white shadow-card">
            <div className="flex items-center justify-between px-1 pt-1">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-kavtris-blueLight">
                {config.phoneTitle}
              </p>
              <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/80">
                {level ? `Nível ${level.name}` : 'Mobile'}
              </span>
            </div>
            <div className="mt-4 space-y-2.5">
              {phoneRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${phoneTone[row.tone]}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{row.label}</p>
                    <p className="mt-0.5 truncate text-xs text-white/60">{row.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Possible-use sequence — the numbered flow (kept for continuity). */}
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {config.scenes.map((scene, index) => (
          <li key={scene.caption} className="relative flex gap-3 lg:flex-col lg:gap-0">
            {index < config.scenes.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[1.15rem] top-10 h-[calc(100%+1rem)] w-px bg-kavtris-blue/25 lg:left-[calc(50%+1.15rem)] lg:top-[1.15rem] lg:h-px lg:w-[calc(100%-2.3rem)]"
              />
            ) : null}
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-kavtris-blue/40 bg-[#EAF1FC] text-sm font-bold text-kavtris-blue">
              {index + 1}
            </span>
            <div className="pt-1 lg:mt-3 lg:pt-0">
              <scene.icon className="h-4 w-4 text-kavtris-blue" aria-hidden="true" />
              <p className="mt-1 text-sm font-semibold leading-5 text-navy-950">{scene.caption}</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">{scene.note}</p>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}

