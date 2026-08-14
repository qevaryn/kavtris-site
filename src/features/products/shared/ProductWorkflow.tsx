import type { ProductConcept } from '@/features/products/data/products';

/**
 * WEB.1F.6 — purpose-built product workflow visual.
 *
 * A non-functional illustrative flow ("possível fluxo de utilização") shown on
 * every product detail page so the visitor can SEE how the product could work,
 * instead of only reading feature lists. Steps are derived exclusively from
 * concepts already present in each product's own definition — no invented
 * capabilities (UNSUPPORTED_FEATURE_CLAIMS = NO).
 *
 * Decorative for screen readers (the surrounding page carries the meaningful
 * product copy).
 */

const workflowSteps: Record<ProductConcept['mockupType'], string[]> = {
  field: ['Serviço agendado', 'Equipa atribuída', 'Check-in no local', 'Checklist e evidências', 'Relatório concluído'],
  stock: ['Produto registado', 'Stock atualizado', 'Alerta de reposição', 'Encomenda ao fornecedor', 'Entrada registada'],
  hotel: ['Quarto atribuído', 'Tarefa de limpeza', 'Pedido interno', 'Estado atualizado', 'Histórico registado'],
  kitchen: ['Pedido recebido', 'Em preparação', 'Pronto', 'Entrega', 'Concluído'],
  ops: ['Pedido criado', 'Responsável atribuído', 'Aprovação', 'Documento anexado', 'Concluído'],
  portal: ['Login do cliente', 'Pedido consultado', 'Documento disponível', 'Mensagem', 'Pagamento informado']
};

export function ProductWorkflow({ product }: { product: ProductConcept }) {
  const steps = workflowSteps[product.mockupType];

  return (
    <div
      data-testid="product-workflow-visual"
      aria-hidden="true"
      className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">
          Possível fluxo de utilização
        </p>
        <span className="rounded-full border border-navy-200 bg-paper px-3 py-1 text-xs font-semibold text-navy-700">
          Exemplo de funcionamento
        </span>
      </div>

      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-3 lg:flex-col lg:gap-0">
            {/* Connector line on desktop between numbered nodes. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[1.15rem] top-10 h-[calc(100%+1.5rem)] w-px bg-kavtris-blue/25 lg:left-[calc(50%+1.15rem)] lg:top-[1.15rem] lg:h-px lg:w-[calc(100%-2.3rem)]"
              />
            ) : null}
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-kavtris-blue/40 bg-[#EAF1FC] text-sm font-bold text-kavtris-blue">
              {index + 1}
            </span>
            <p className="pt-1.5 text-sm font-semibold leading-5 text-navy-950 lg:mt-3 lg:pt-0">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}