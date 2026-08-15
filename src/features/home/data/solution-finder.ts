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

export const homepageSolutionFinderOptionIds = ['manual-work', 'field', 'stock', 'customers'] as const;

export const solutionFinderOptions: SolutionFinderOption[] = [
  {
    id: 'orders',
    label: 'Organizar pedidos',
    problem: 'Pedidos chegam por mensagens, folhas ou chamadas e acabam por se perder.',
    recommendationTitle: 'Sistema de gestão de pedidos',
    recommendationDescription: 'Centralize pedidos, responsáveis, prazos, estados e histórico para que a equipa saiba o que fazer a seguir.',
    productSlug: 'kavtris-ops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/kavtris-ops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=kavtris-ops#contacto'
  },
  {
    id: 'manual-work',
    label: 'Centralizar operações',
    problem: 'A operação está espalhada por mensagens, folhas e tarefas soltas.',
    recommendationTitle: 'Plataforma para centralizar operações',
    recommendationDescription: 'Junte tarefas, estados e informação num único ponto para reduzir dispersão e acelerar a equipa.',
    productSlug: 'kavtris-ops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/kavtris-ops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=kavtris-ops#contacto'
  },
  {
    id: 'customers',
    label: 'Melhorar atendimento ao cliente',
    problem: 'Os clientes pedem atualizações porque a informação não está num sítio claro.',
    recommendationTitle: 'Portal para atendimento mais claro',
    recommendationDescription: 'Dê aos clientes uma área simples para consultar pedidos, documentos, mensagens e estados sem repetir tarefas.',
    productSlug: 'customer-portal',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/customer-portal',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=customer-portal#contacto'
  },
  {
    id: 'field',
    label: 'Organizar equipas externas',
    problem: 'A gestão perde visibilidade quando as equipas trabalham fora do escritório.',
    recommendationTitle: 'FieldOps',
    recommendationDescription: 'Organize serviços, visitas, checklists, evidências e relatórios num único sistema.',
    productSlug: 'fieldops',
    primaryCtaLabel: 'Ver como funciona',
    primaryCtaHref: '/produtos/fieldops',
    secondaryCtaLabel: 'Falar sobre esta solução',
    secondaryCtaHref: '/?produto=fieldops#contacto'
  },
  {
    id: 'stock',
    label: 'Controlar stock e pedidos',
    problem: 'Produtos, fornecedores e reposições estão espalhados por papel, mensagens ou folhas de cálculo.',
    recommendationTitle: 'Stock & Orders',
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

export const homepageSolutionFinderOptions = homepageSolutionFinderOptionIds
  .map((id) => solutionFinderOptions.find((option) => option.id === id))
  .filter((option): option is SolutionFinderOption => Boolean(option));
