export interface SolutionFinderOption {
  id: string;
  label: string;
  problem: string;
  recommendationTitle: string;
  recommendationDescription: string;
  productSlug?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export const solutionFinderOptions: SolutionFinderOption[] = [
  {
    id: 'orders',
    label: 'Organizar pedidos',
    problem: 'Pedidos chegam por mensagens, folhas ou chamadas e acabam por se perder.',
    recommendationTitle: 'Sistema de gestão de pedidos',
    recommendationDescription: 'Centralize pedidos, responsáveis, prazos, estados e histórico para que a equipa saiba o que fazer a seguir.',
    productSlug: 'qevaryn-ops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/qevaryn-ops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=qevaryn-ops#contacto'
  },
  {
    id: 'manual-work',
    label: 'Reduzir tarefas manuais',
    problem: 'A equipa repete tarefas que poderiam ser organizadas ou automatizadas.',
    recommendationTitle: 'Automação e plataforma interna',
    recommendationDescription: 'Criamos fluxos simples para reduzir repetição, evitar esquecimentos e deixar a informação mais organizada.',
    productSlug: 'qevaryn-ops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/qevaryn-ops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=qevaryn-ops#contacto'
  },
  {
    id: 'customers',
    label: 'Acompanhar clientes',
    problem: 'Clientes pedem atualizações porque não conseguem acompanhar pedidos, documentos ou serviços.',
    recommendationTitle: 'Qevaryn Customer Portal',
    recommendationDescription: 'Dê aos clientes uma área simples para consultar pedidos, documentos, mensagens e estados sem depender de chamadas repetidas.',
    productSlug: 'customer-portal',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/customer-portal',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=customer-portal#contacto'
  },
  {
    id: 'field',
    label: 'Gerir equipas externas',
    problem: 'A gestão perde visibilidade quando as equipas trabalham fora do escritório.',
    recommendationTitle: 'Qevaryn FieldOps',
    recommendationDescription: 'Organize serviços, visitas, checklists, evidências e relatórios num único sistema.',
    productSlug: 'fieldops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/fieldops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=fieldops#contacto'
  },
  {
    id: 'stock',
    label: 'Controlar stock',
    problem: 'Produtos, fornecedores e reposições estão espalhados por papel, mensagens ou folhas de cálculo.',
    recommendationTitle: 'Qevaryn Stock & Orders',
    recommendationDescription: 'Controle produtos, fornecedores, encomendas e alertas de stock num só lugar.',
    productSlug: 'stock-orders',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/stock-orders',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=stock-orders#contacto'
  },
  {
    id: 'bookings',
    label: 'Organizar reservas',
    problem: 'Reservas, horários e confirmações exigem demasiadas mensagens manuais.',
    recommendationTitle: 'Sistema de reservas e acompanhamento',
    recommendationDescription: 'Estruture marcações, disponibilidade, confirmações e avisos para reduzir confusão no atendimento.',
    productSlug: 'hotel-operations',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/hotel-operations',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=hotel-operations#contacto'
  },
  {
    id: 'communication',
    label: 'Melhorar comunicação entre setores',
    problem: 'Informação perde-se entre atendimento, operação, preparação, gestão ou suporte.',
    recommendationTitle: 'Fluxos conectados por software',
    recommendationDescription: 'Organize estados, responsáveis, notificações e histórico para que cada setor veja a informação certa.',
    productSlug: 'kitchen-sync',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/kitchen-sync',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=kitchen-sync#contacto'
  },
  {
    id: 'unknown',
    label: 'Ainda não sei',
    problem: 'Sabe que algo está a dificultar o trabalho, mas ainda não sabe qual sistema pedir.',
    recommendationTitle: 'Começar pela conversa certa',
    recommendationDescription: 'Não há problema. Conte-nos como a sua empresa funciona e ajudamos a identificar o melhor ponto de partida.',
    primaryCtaLabel: 'Explique o seu problema',
    primaryCtaHref: '#contacto',
    secondaryCtaLabel: 'Ver exemplos de soluções',
    secondaryCtaHref: '/produtos'
  }
];
