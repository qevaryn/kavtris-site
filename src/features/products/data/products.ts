import type { ProductConcept } from '@/domain/products/types';

export type { ProductConcept, ProductLevel, ProductLevelId, ProductLevelVisualRow, ProductSector } from '@/domain/products/types';

/**
 * WEB.1F.5 — SYSTEM filter taxonomy (system/function-oriented).
 *
 * Filters describe WHAT THE SYSTEM DOES, never the customer's business sector
 * (BUSINESS_SECTOR_FILTERS_IN_SYSTEM_MODE = NO). The mapping below is derived
 * only from the current product definitions — no invented capability fits.
 */
export type ProductFunctionId = 'operations' | 'management' | 'stock' | 'teams' | 'customers';

export const functionalFilters: Array<{ label: string; value: ProductFunctionId | 'all' }> = [
  { label: 'Todos', value: 'all' },
  { label: 'Operações', value: 'operations' },
  { label: 'Gestão', value: 'management' },
  { label: 'Stock e pedidos', value: 'stock' },
  { label: 'Equipas', value: 'teams' },
  { label: 'Clientes', value: 'customers' }
];

/** Maps each existing product slug to the functional categories its description supports. */
export const productFunctionMap: Record<string, ProductFunctionId[]> = {
  fieldops: ['operations', 'teams'],
  'stock-orders': ['stock'],
  'hotel-operations': ['operations', 'teams'],
  'kitchen-sync': ['operations'],
  'qevaryn-ops': ['management'],
  'customer-portal': ['customers']
};

export const products: ProductConcept[] = [
  {
    slug: 'fieldops',
    name: 'FieldOps',
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
    imageAlt: 'Mockup visual do FieldOps com agenda mobile, check-in e estado de serviços externos',
    catalogImage: '/images/products/fieldops/fieldops-catalog-v1.webp',
    catalogImageAlt:
      'Interface do FieldOps com agenda de serviços, profissionais, locais e estados num computador, acompanhada por check-in, checklist e evidências num telemóvel.',
    heroImage: '/images/products/qevaryn-fieldops.webp',
    heroImageAlt: 'Mockup visual do FieldOps com agenda mobile, check-in e estado de serviços externos',
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
    mockupType: 'field',
    // WEB.1F.7 — adoption/configuration levels (not pricing plans). Highlights
    // follow the FieldOps-specific configuration data already present in
    // src/features/products/fieldops/data/fieldops.ts; tiles come from this
    // product's own feature list. Final composition is always adapted.
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: serviços, equipa e registos básicos.',
        highlights: ['clientes e localizações', 'serviços e horários', 'checklists', 'fotografias e relatórios'],
        visual: {
          focusLabel: 'Agenda de serviços',
          rows: [
            { label: 'Visita 08:30', value: 'Check-in feito', tone: 'green' },
            { label: 'Checklist', value: '12/14 pontos', tone: 'blue' },
            { label: 'Relatório', value: 'Com fotografia', tone: 'sky' }
          ],
          tiles: ['atribuição de serviços', 'checklists', 'fotografias antes e depois', 'relatórios de serviço'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais organização: perfis, aprovações e acesso do cliente.',
        highlights: ['perfis e permissões', 'aprovações e incidentes', 'acesso do cliente', 'notificações e QR Code'],
        visual: {
          focusLabel: 'Visitas do dia',
          rows: [
            { label: 'Visita 14:15', value: 'Em aprovação', tone: 'sky' },
            { label: 'Incidente', value: 'Registo criado', tone: 'blue' },
            { label: 'Cliente', value: 'Notificado', tone: 'green' }
          ],
          tiles: [
            'confirmação por QR Code',
            'relatórios de incidentes',
            'assinatura do cliente',
            'estado do serviço',
            'painel de gestão',
            'escala de funcionários'
          ],
          statusLabel: 'Notificações ativas',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Maior escala: localizações, integrações e controlo.',
        highlights: ['múltiplas localizações', 'APIs e integrações', 'histórico de auditoria', 'suporte e rollout por fases'],
        visual: {
          focusLabel: 'Visão consolidada',
          rows: [
            { label: 'Localização norte', value: '6 visitas hoje', tone: 'blue' },
            { label: 'Integração', value: 'API ativa', tone: 'green' },
            { label: 'Auditoria', value: 'Registo completo', tone: 'sky' }
          ],
          tiles: [
            'moradas de clientes',
            'check-in e check-out',
            'escala de funcionários',
            'painel de gestão',
            'relatórios de serviço',
            'estado do serviço'
          ],
          statusLabel: 'Monitorização ativa',
          showIntegration: true
        }
      }
    ]
  },
  {
    slug: 'stock-orders',
    name: 'Stock & Orders',
    categoryLabel: 'Retalho',
    label: 'Conceito de solução',
    sectors: ['retail', 'restaurant', 'business'],
    audience: ['mercearias', 'lojas', 'armazéns pequenos', 'restaurantes', 'empresas com produtos ou consumíveis'],
    problem: 'Stock, fornecedores e encomendas ainda são controlados em papel, mensagens ou folhas de cálculo.',
    description: 'Controle produtos, fornecedores, encomendas, quantidades e alertas de reposição num só sistema.',
    shortDescription: 'Controle produtos, fornecedores, encomendas e alertas de stock num só lugar.',
    image: '/images/products/qevaryn-stock-orders.webp',
    imageAlt: 'Mockup visual do Stock & Orders com produtos, alertas de stock e pedido a fornecedor',
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
    mockupType: 'stock',
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: produtos, quantidades e alertas.',
        highlights: ['catálogo de produtos', 'quantidades em stock', 'alertas de stock mínimo', 'fornecedores'],
        visual: {
          focusLabel: 'Controlo de stock',
          rows: [
            { label: 'Arroz 5 kg', value: 'Stock baixo', tone: 'blue' },
            { label: 'Encomenda', value: 'Pedido criado', tone: 'green' },
            { label: 'Loja norte', value: '42 unidades', tone: 'sky' }
          ],
          tiles: ['catálogo de produtos', 'quantidades em stock', 'alertas de stock mínimo', 'fornecedores'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais organização: encomendas, preços e movimentos.',
        highlights: ['encomendas de compra', 'histórico de preços', 'movimentos de produto', 'relatórios'],
        visual: {
          focusLabel: 'Movimentos e encomendas',
          rows: [
            { label: 'Encomenda #1042', value: 'Entrada agendada', tone: 'sky' },
            { label: 'Preço', value: 'Histórico atualizado', tone: 'blue' },
            { label: 'Movimento', value: 'Registado', tone: 'green' }
          ],
          tiles: [
            'encomendas de compra',
            'histórico de preços',
            'movimentos de produto',
            'registo de artigos danificados',
            'relatórios',
            'fornecedores'
          ],
          statusLabel: 'Alertas monitorizados',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Maior escala: localizações, permissões e integrações.',
        highlights: ['múltiplas localizações', 'permissões por utilizador', 'importação e exportação', 'integrações com sistemas existentes'],
        visual: {
          focusLabel: 'Operação consolidada',
          rows: [
            { label: 'Localização sul', value: '128 produtos', tone: 'blue' },
            { label: 'Integração', value: 'Sistema ativo', tone: 'green' },
            { label: 'Relatório', value: 'Consolidado', tone: 'sky' }
          ],
          tiles: [
            'múltiplas localizações',
            'relatórios',
            'movimentos de produto',
            'quantidades em stock',
            'encomendas de compra',
            'catálogo de produtos'
          ],
          statusLabel: 'Monitorização ativa',
          showIntegration: true
        }
      }
    ]
  },
  {
    slug: 'hotel-operations',
    name: 'Hotel Operations',
    categoryLabel: 'Hotelaria',
    label: 'Solução adaptável',
    sectors: ['hospitality', 'services', 'business'],
    audience: ['hotéis', 'hostels', 'alojamento local', 'turismo', 'apartamentos com serviços'],
    problem: 'Receção, limpeza e manutenção têm dificuldade em partilhar estado de quartos e pedidos internos.',
    description: 'Organize quartos, limpeza, manutenção, pedidos de hóspedes e tarefas da equipa num único sistema.',
    shortDescription: 'Ligue receção, limpeza e manutenção através de uma operação organizada.',
    image: '/images/products/qevaryn-hotel-operations.webp',
    imageAlt: 'Mockup visual do Hotel Operations com estado de quartos, limpeza e manutenção',
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
    mockupType: 'hotel',
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: quartos, limpeza e prioridades.',
        highlights: ['estado dos quartos', 'tarefas de limpeza', 'atribuição de funcionários', 'níveis de prioridade'],
        visual: {
          focusLabel: 'Estado dos quartos',
          rows: [
            { label: 'Quarto 204', value: 'Limpeza em curso', tone: 'blue' },
            { label: 'Quarto 108', value: 'Disponível', tone: 'green' },
            { label: 'Tarefa', value: 'Atribuída', tone: 'sky' }
          ],
          tiles: ['estado dos quartos', 'tarefas de limpeza', 'atribuição de funcionários', 'níveis de prioridade'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais operação: manutenção, incidentes e mensagens.',
        highlights: ['pedidos de manutenção', 'incidentes de hóspedes', 'mensagens internas', 'histórico de serviços'],
        visual: {
          focusLabel: 'Pedidos e mensagens',
          rows: [
            { label: 'Manutenção', value: 'Prioridade média', tone: 'sky' },
            { label: 'Incidente', value: 'Registo criado', tone: 'blue' },
            { label: 'Mensagem', value: 'Equipa informada', tone: 'green' }
          ],
          tiles: [
            'pedidos de manutenção',
            'incidentes de hóspedes',
            'mensagens internas',
            'histórico de serviços',
            'estado dos quartos',
            'tarefas de limpeza'
          ],
          statusLabel: 'Equipa notificada',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Maior escala: propriedades, relatórios e integrações.',
        highlights: ['múltiplas propriedades', 'relatórios operacionais', 'acesso por propriedade', 'integração com sistemas de reserva'],
        visual: {
          focusLabel: 'Operação multi-propriedade',
          rows: [
            { label: 'Propriedade A', value: '24 quartos', tone: 'blue' },
            { label: 'Relatório', value: 'Consolidado', tone: 'sky' },
            { label: 'Reserva', value: 'Sincronizada', tone: 'green' }
          ],
          tiles: [
            'múltiplas propriedades',
            'relatórios operacionais',
            'estado dos quartos',
            'pedidos de manutenção',
            'incidentes de hóspedes',
            'histórico de serviços'
          ],
          statusLabel: 'Integração ativa',
          showIntegration: true
        }
      }
    ]
  },
  {
    slug: 'kitchen-sync',
    name: 'KitchenSync',
    categoryLabel: 'Restauração',
    label: 'Conceito de solução',
    sectors: ['restaurant', 'retail', 'services'],
    audience: ['restaurantes', 'cafés', 'takeaway', 'cozinhas', 'empresas de alimentação'],
    problem: 'Pedidos e informações perdem-se entre atendimento, cozinha, preparação e entrega.',
    description: 'Ligue atendimento, cozinha e preparação para que todos acompanhem o estado de cada pedido.',
    shortDescription: 'Acompanhe pedidos entre atendimento, cozinha, preparação e entrega.',
    image: '/images/products/qevaryn-kitchen-sync.webp',
    imageAlt: 'Mockup visual do KitchenSync com fila de pedidos e estados de preparação',
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
    mockupType: 'kitchen',
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: fila, preparação e notas.',
        highlights: ['fila de pedidos', 'estado de preparação', 'notas internas', 'pedidos prioritários'],
        visual: {
          focusLabel: 'Fila de pedidos',
          rows: [
            { label: 'Mesa 12', value: 'Em preparação', tone: 'blue' },
            { label: 'Takeaway', value: 'Pronto', tone: 'green' },
            { label: 'Nota', value: 'Alergénio', tone: 'sky' }
          ],
          tiles: ['fila de pedidos', 'estado de preparação', 'notas internas', 'pedidos prioritários'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais ritmo: ecrã de cozinha, entregas e alertas.',
        highlights: ['ecrã de cozinha', 'estado de entrega', 'alertas de atraso', 'reservas'],
        visual: {
          focusLabel: 'Cozinha e entregas',
          rows: [
            { label: 'Ecrã cozinha', value: '6 pedidos', tone: 'blue' },
            { label: 'Entrega', value: 'Em rota', tone: 'sky' },
            { label: 'Reserva', value: 'Confirmada', tone: 'green' }
          ],
          tiles: [
            'ecrã de cozinha',
            'estado de entrega',
            'alertas de atraso',
            'reservas',
            'fila de pedidos',
            'pedidos prioritários'
          ],
          statusLabel: 'Alertas ativos',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Maior escala: histórico, relatórios e integrações.',
        highlights: ['histórico de pedidos', 'relatórios operacionais', 'integrações com sistemas de pedidos', 'histórico de auditoria'],
        visual: {
          focusLabel: 'Operação consolidada',
          rows: [
            { label: 'Histórico', value: 'Pedidos organizados', tone: 'sky' },
            { label: 'Relatório', value: 'Consolidado', tone: 'blue' },
            { label: 'Integração', value: 'Pedidos sincronizados', tone: 'green' }
          ],
          tiles: [
            'histórico de pedidos',
            'relatórios operacionais',
            'fila de pedidos',
            'estado de preparação',
            'alertas de atraso',
            'reservas'
          ],
          statusLabel: 'Integração ativa',
          showIntegration: true
        }
      }
    ]
  },
  {
    slug: 'qevaryn-ops',
    name: 'Ops',
    categoryLabel: 'Gestão empresarial',
    label: 'Solução adaptável',
    sectors: ['business', 'services', 'field'],
    audience: ['empresas de qualquer dimensão', 'equipas administrativas', 'operações internas', 'negócios em crescimento'],
    problem: 'Tarefas, aprovações, documentos e pedidos internos estão espalhados por emails, mensagens e folhas.',
    description: 'Organize tarefas, aprovações, documentos, pedidos e indicadores numa plataforma interna.',
    shortDescription: 'Organize tarefas, aprovações, documentos e processos internos.',
    image: '/images/products/qevaryn-ops/qevaryn-ops-catalog-v1.webp',
    imageAlt:
      'Interface do Ops num portátil, com aprovações pendentes, responsáveis, prazos, documentos recentes e fluxo de aprovação.',
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
    mockupType: 'ops',
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: tarefas, pedidos e responsáveis.',
        highlights: ['tarefas', 'pedidos internos', 'prazos', 'responsáveis'],
        visual: {
          focusLabel: 'Pedidos internos',
          rows: [
            { label: 'Pedido #142', value: 'Em análise', tone: 'blue' },
            { label: 'Tarefa', value: 'Responsável atribuído', tone: 'sky' },
            { label: 'Prazo', value: 'Para amanhã', tone: 'green' }
          ],
          tiles: ['tarefas', 'pedidos internos', 'prazos', 'responsáveis'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais controlo: aprovações, documentos e dashboards.',
        highlights: ['fluxos de aprovação', 'documentos', 'notificações', 'dashboards'],
        visual: {
          focusLabel: 'Aprovações e documentos',
          rows: [
            { label: 'Aprovação', value: 'Pendente', tone: 'blue' },
            { label: 'Documento', value: 'Revisto', tone: 'green' },
            { label: 'Dashboard', value: 'Atualizado', tone: 'sky' }
          ],
          tiles: ['fluxos de aprovação', 'documentos', 'notificações', 'dashboards', 'tarefas', 'prazos'],
          statusLabel: 'Notificações ativas',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Maior escala: perfis, workflows e integrações.',
        highlights: ['relatórios', 'histórico de atividade', 'workflows configuráveis', 'APIs e integrações'],
        visual: {
          focusLabel: 'Operação consolidada',
          rows: [
            { label: 'Workflow', value: 'Configurado', tone: 'blue' },
            { label: 'Auditoria', value: 'Registo completo', tone: 'sky' },
            { label: 'Integração', value: 'API ativa', tone: 'green' }
          ],
          tiles: ['relatórios', 'histórico de atividade', 'fluxos de aprovação', 'documentos', 'dashboards', 'pedidos internos'],
          statusLabel: 'Integração ativa',
          showIntegration: true
        }
      }
    ]
  },
  {
    slug: 'customer-portal',
    name: 'Customer Portal',
    categoryLabel: 'Área de cliente',
    label: 'Conceito de solução',
    sectors: ['customer', 'services', 'business'],
    audience: ['serviços', 'clínicas', 'manutenção', 'transportes', 'empresas que atualizam clientes com frequência'],
    problem: 'Clientes ligam ou enviam mensagens repetidas para saber pedidos, serviços, documentos ou pagamentos.',
    description: 'Dê aos clientes uma área protegida para acompanhar pedidos, documentos, pagamentos, mensagens e estado de serviços.',
    shortDescription: 'Dê aos clientes uma área simples para acompanhar pedidos, documentos e mensagens.',
    image: '/images/products/qevaryn-customer-portal.webp',
    imageAlt: 'Mockup visual do Customer Portal com pedidos, documentos e mensagens para clientes',
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
    mockupType: 'portal',
    levels: [
      {
        id: 'essential',
        name: 'Essencial',
        tagline: 'Começar pelo essencial: pedidos, documentos e mensagens.',
        highlights: ['login de cliente', 'estado de pedidos', 'acesso a documentos', 'mensagens'],
        visual: {
          focusLabel: 'Área do cliente',
          rows: [
            { label: 'Pedido #1482', value: 'Em análise', tone: 'blue' },
            { label: 'Documento', value: 'Disponível', tone: 'green' },
            { label: 'Mensagem', value: 'Cliente informado', tone: 'sky' }
          ],
          tiles: ['login de cliente', 'estado de pedidos', 'acesso a documentos', 'mensagens'],
          statusLabel: 'Estado atualizado',
          showIntegration: false
        }
      },
      {
        id: 'growth',
        name: 'Crescimento',
        tagline: 'Mais acompanhamento: notificações, pagamentos e marcações.',
        highlights: ['notificações', 'informação de pagamentos', 'marcações', 'pedidos de suporte'],
        visual: {
          focusLabel: 'Acompanhamento do cliente',
          rows: [
            { label: 'Pagamento', value: 'Informação atualizada', tone: 'sky' },
            { label: 'Marcação', value: 'Confirmada', tone: 'green' },
            { label: 'Suporte', value: 'Pedido registado', tone: 'blue' }
          ],
          tiles: ['notificações', 'informação de pagamentos', 'marcações', 'pedidos de suporte', 'estado de pedidos', 'acesso a documentos'],
          statusLabel: 'Notificações ativas',
          showIntegration: false
        }
      },
      {
        id: 'enterprise',
        name: 'Empresarial',
        tagline: 'Mais escala: histórico, perfis e integrações.',
        highlights: ['histórico do cliente', 'permissões por perfil', 'integrações por API', 'logs de atividade'],
        visual: {
          focusLabel: 'Visão consolidada',
          rows: [
            { label: 'Histórico', value: 'Cliente completo', tone: 'sky' },
            { label: 'Perfil', value: 'Permissões ativas', tone: 'blue' },
            { label: 'Integração', value: 'API ativa', tone: 'green' }
          ],
          tiles: ['histórico do cliente', 'estado de pedidos', 'acesso a documentos', 'mensagens', 'pedidos de suporte', 'notificações'],
          statusLabel: 'Integração ativa',
          showIntegration: true
        }
      }
    ]
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
