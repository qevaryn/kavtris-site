import type { ProductConcept, ProductSector } from '@/domain/products/types';

export type { ProductConcept, ProductSector } from '@/domain/products/types';

export const sectorFilters: Array<{ label: string; value: ProductSector | 'all' }> = [
  { label: 'Todos', value: 'all' },
  { label: 'Hotelaria', value: 'hospitality' },
  { label: 'Restauração', value: 'restaurant' },
  { label: 'Retalho', value: 'retail' },
  { label: 'Serviços', value: 'services' },
  { label: 'Equipas externas', value: 'field' },
  { label: 'Gestão', value: 'business' },
  { label: 'Clientes', value: 'customer' }
];

export const products: ProductConcept[] = [
  {
    slug: 'fieldops',
    name: 'Qevaryn FieldOps',
    categoryLabel: 'Equipas externas',
    label: 'Solução adaptável',
    sectors: ['field', 'services', 'business'],
    audience: [
      'empresas de limpeza',
      'manutenção',
      'cuidados domiciliários',
      'instalações técnicas',
      'jardinagem',
      'transportes e entregas'
    ],
    problem: 'Equipas trabalham fora do escritório e a gestão perde visibilidade sobre visitas, tarefas, evidências e estados.',
    description: 'Organize funcionários, serviços, horários, visitas, fotografias, checklists e relatórios num único lugar.',
    shortDescription: 'Organize equipas, serviços, visitas, checklists e relatórios num único sistema.',
    image: '/images/products/qevaryn-fieldops.webp',
    imageAlt: 'Mockup visual do Qevaryn FieldOps com agenda mobile, check-in e estado de serviços externos',
    benefits: ['Serviços acompanhados', 'Evidências centralizadas', 'Menos chamadas', 'Relatórios por cliente'],
    features: [
      'escala de funcionários',
      'atribuição de serviços',
      'moradas de clientes',
      'check-in e check-out',
      'confirmação por QR Code',
      'checklists',
      'fotografias antes e depois',
      'relatórios de incidentes',
      'assinatura do cliente',
      'estado do serviço',
      'painel de gestão',
      'relatórios de serviço'
    ],
    optionalEquipment: ['QR Codes', 'NFC tags', 'telemóveis dos funcionários', 'tablets do cliente'],
    technicalDetails: [
      'dashboard web responsivo',
      'interface mobile-first',
      'suporte offline',
      'perfis e permissões',
      'upload seguro de ficheiros',
      'notificações',
      'integrações por API',
      'histórico de auditoria'
    ],
    mockupType: 'field'
  },
  {
    slug: 'stock-orders',
    name: 'Qevaryn Stock & Orders',
    categoryLabel: 'Retalho',
    label: 'Conceito de solução',
    sectors: ['retail', 'restaurant', 'business'],
    audience: ['mercearias', 'lojas', 'armazéns pequenos', 'restaurantes', 'empresas com produtos ou consumíveis'],
    problem: 'Stock, fornecedores e encomendas ainda são controlados em papel, mensagens ou folhas de cálculo.',
    description: 'Controle produtos, fornecedores, encomendas, quantidades e alertas de reposição num só sistema.',
    shortDescription: 'Controle produtos, fornecedores, encomendas e alertas de stock num só lugar.',
    image: '/images/products/qevaryn-stock-orders.webp',
    imageAlt: 'Mockup visual do Qevaryn Stock & Orders com produtos, alertas de stock e pedido a fornecedor',
    benefits: ['Stock visível', 'Reposição mais organizada', 'Histórico de preços', 'Menos ruturas'],
    features: [
      'catálogo de produtos',
      'quantidades em stock',
      'alertas de stock mínimo',
      'fornecedores',
      'encomendas de compra',
      'histórico de preços',
      'movimentos de produto',
      'registo de artigos danificados',
      'relatórios',
      'múltiplas localizações'
    ],
    optionalEquipment: ['leitores de código de barras', 'QR Codes', 'impressoras existentes', 'tablets', 'balanças existentes'],
    technicalDetails: [
      'painel web de gestão',
      'atualizações mobile de stock',
      'suporte a códigos de barras',
      'permissões por utilizador',
      'relatórios',
      'importação e exportação',
      'integrações com sistemas existentes'
    ],
    mockupType: 'stock'
  },
  {
    slug: 'hotel-operations',
    name: 'Qevaryn Hotel Operations',
    categoryLabel: 'Hotelaria',
    label: 'Solução adaptável',
    sectors: ['hospitality', 'services', 'business'],
    audience: ['hotéis', 'hostels', 'alojamento local', 'turismo', 'apartamentos com serviços'],
    problem: 'Receção, limpeza e manutenção têm dificuldade em partilhar estado de quartos e pedidos internos.',
    description: 'Organize quartos, limpeza, manutenção, pedidos de hóspedes e tarefas da equipa num único sistema.',
    shortDescription: 'Ligue receção, limpeza e manutenção através de uma operação organizada.',
    image: '/images/products/qevaryn-hotel-operations.webp',
    imageAlt: 'Mockup visual do Qevaryn Hotel Operations com estado de quartos, limpeza e manutenção',
    benefits: ['Estado dos quartos claro', 'Pedidos internos acompanhados', 'Prioridades visíveis', 'Histórico operacional'],
    features: [
      'estado dos quartos',
      'tarefas de limpeza',
      'pedidos de manutenção',
      'incidentes de hóspedes',
      'mensagens internas',
      'atribuição de funcionários',
      'níveis de prioridade',
      'histórico de serviços',
      'relatórios operacionais',
      'múltiplas propriedades'
    ],
    technicalDetails: [
      'dashboard web de gestão',
      'interface mobile para funcionários',
      'perfis e permissões',
      'notificações',
      'acesso por propriedade',
      'logs de auditoria',
      'possibilidades de integração com sistemas de reserva'
    ],
    mockupType: 'hotel'
  },
  {
    slug: 'kitchen-sync',
    name: 'Qevaryn KitchenSync',
    categoryLabel: 'Restauração',
    label: 'Conceito de solução',
    sectors: ['restaurant', 'retail', 'services'],
    audience: ['restaurantes', 'cafés', 'takeaway', 'cozinhas', 'empresas de alimentação'],
    problem: 'Pedidos e informações perdem-se entre atendimento, cozinha, preparação e entrega.',
    description: 'Ligue atendimento, cozinha e preparação para que todos acompanhem o estado de cada pedido.',
    shortDescription: 'Acompanhe pedidos entre atendimento, cozinha, preparação e entrega.',
    image: '/images/products/qevaryn-kitchen-sync.webp',
    imageAlt: 'Mockup visual do Qevaryn KitchenSync com fila de pedidos e estados de preparação',
    benefits: ['Fila de pedidos visível', 'Menos informação perdida', 'Prioridades claras', 'Atrasos identificados'],
    features: [
      'fila de pedidos',
      'estado de preparação',
      'ecrã de cozinha',
      'pedidos prioritários',
      'notas internas',
      'estado de entrega',
      'alertas de atraso',
      'reservas',
      'histórico de pedidos',
      'relatórios operacionais'
    ],
    optionalEquipment: ['tablets existentes', 'computadores existentes', 'ecrãs de cozinha', 'impressoras comuns'],
    technicalDetails: [
      'atualizações em tempo real',
      'dashboard web',
      'interface adequada ao toque',
      'perfis de utilizador',
      'notificações',
      'integrações com sistemas de pedidos',
      'histórico de auditoria'
    ],
    mockupType: 'kitchen'
  },
  {
    slug: 'qevaryn-ops',
    name: 'Qevaryn Ops',
    categoryLabel: 'Gestão empresarial',
    label: 'Solução adaptável',
    sectors: ['business', 'services', 'field'],
    audience: ['empresas de qualquer dimensão', 'equipas administrativas', 'operações internas', 'negócios em crescimento'],
    problem: 'Tarefas, aprovações, documentos e pedidos internos estão espalhados por emails, mensagens e folhas.',
    description: 'Organize tarefas, aprovações, documentos, pedidos e indicadores numa plataforma interna.',
    shortDescription: 'Organize tarefas, aprovações, documentos e processos internos.',
    image: '/images/products/qevaryn-ops.webp',
    imageAlt: 'Mockup visual do Qevaryn Ops com tarefas, aprovações, documentos e indicadores internos',
    benefits: ['Responsáveis definidos', 'Aprovações acompanhadas', 'Documentos organizados', 'Indicadores visíveis'],
    features: [
      'tarefas',
      'pedidos internos',
      'fluxos de aprovação',
      'documentos',
      'prazos',
      'responsáveis',
      'notificações',
      'dashboards',
      'relatórios',
      'histórico de atividade'
    ],
    technicalDetails: [
      'plataforma web segura',
      'workflows configuráveis',
      'acesso baseado em perfis',
      'APIs',
      'integrações',
      'logs de auditoria',
      'testes automatizados',
      'documentação',
      'arquitetura escalável'
    ],
    mockupType: 'ops'
  },
  {
    slug: 'customer-portal',
    name: 'Qevaryn Customer Portal',
    categoryLabel: 'Área de cliente',
    label: 'Conceito de solução',
    sectors: ['customer', 'services', 'business'],
    audience: ['serviços', 'clínicas', 'manutenção', 'transportes', 'empresas que atualizam clientes com frequência'],
    problem: 'Clientes ligam ou enviam mensagens repetidas para saber pedidos, serviços, documentos ou pagamentos.',
    description: 'Dê aos clientes uma área protegida para acompanhar pedidos, documentos, pagamentos, mensagens e estado de serviços.',
    shortDescription: 'Dê aos clientes uma área simples para acompanhar pedidos, documentos e mensagens.',
    image: '/images/products/qevaryn-customer-portal.webp',
    imageAlt: 'Mockup visual do Qevaryn Customer Portal com pedidos, documentos e mensagens para clientes',
    benefits: ['Menos contactos repetidos', 'Cliente informado', 'Documentos acessíveis', 'Histórico centralizado'],
    features: [
      'login de cliente',
      'estado de pedidos',
      'acesso a documentos',
      'mensagens',
      'notificações',
      'informação de pagamentos',
      'marcações',
      'pedidos de suporte',
      'histórico do cliente'
    ],
    technicalDetails: [
      'autenticação',
      'permissões por perfil',
      'acesso seguro a documentos',
      'experiência web e mobile',
      'integrações por API',
      'notificações',
      'logs de atividade',
      'controlos orientados ao RGPD'
    ],
    mockupType: 'portal'
  }
];

export const featuredProductSlugs = ['fieldops', 'hotel-operations', 'stock-orders', 'qevaryn-ops'] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return featuredProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is ProductConcept => Boolean(product));
}
