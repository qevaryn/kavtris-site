import type { CommercialClarityItem, EnterpriseCapabilityGroup, EnterprisePillar } from '@/domain/enterprise/types';

export type { CommercialClarityItem, EnterpriseCapabilityGroup, EnterprisePillar } from '@/domain/enterprise/types';

export const enterpriseFitScenarios = [
  'Ainda usa várias folhas de Excel para controlar a operação.',
  'Os sistemas da empresa não comunicam entre si.',
  'A equipa repete tarefas manuais todos os dias.',
  'O software existente não acompanha o processo real.',
  'Precisa integrar sistemas diferentes.',
  'A empresa cresceu e o processo atual já não acompanha.',
  'Falta visibilidade sobre o que acontece na operação.',
  'Existe muito retrabalho ou informação duplicada.'
] as const;

export const enterpriseFoundations: EnterprisePillar[] = [
  {
    id: 'requirements',
    title: 'Descoberta e requisitos',
    description: 'Mapeamos utilizadores, fluxos, regras, riscos e critérios de aceitação antes de construir.'
  },
  {
    id: 'security',
    title: 'Segurança e acessos',
    description: 'Definimos autenticação, perfis, permissões e acesso aos dados conforme o projeto.'
  },
  {
    id: 'quality',
    title: 'Qualidade e testes',
    description: 'Validamos o comportamento com critérios claros, testes manuais e automação quando fizer sentido.'
  },
  {
    id: 'continuity',
    title: 'Documentação e continuidade',
    description: 'Documentamos decisões, operação e transição conforme o escopo acordado.'
  }
];

export const enterpriseCapabilities: EnterpriseCapabilityGroup[] = [
  {
    id: 'applications',
    title: 'Aplicações',
    description: 'Interfaces adequadas ao uso interno, ao cliente e ao contexto operacional.',
    items: ['sistemas web responsivos', 'interfaces mobile-first', 'plataformas internas', 'portais de cliente', 'PWA opcional', 'aplicação nativa conforme escopo']
  },
  {
    id: 'architecture',
    title: 'Arquitetura e dados',
    description: 'Base técnica definida de acordo com a dimensão, risco e evolução prevista.',
    items: ['arquitetura modular', 'bases de dados', 'armazenamento de ficheiros', 'deploy conforme necessidade', 'separação de responsabilidades', 'escala conforme requisitos validados']
  },
  {
    id: 'integrations',
    title: 'Integrações',
    description: 'Ligações com ferramentas existentes quando forem necessárias e viáveis.',
    items: ['APIs', 'sistemas de negócio existentes', 'provedores de identidade', 'calendários', 'ferramentas de relatórios', 'pagamentos quando contratualmente necessário', 'plataformas externas conforme viabilidade']
  },
  {
    id: 'security',
    title: 'Segurança e privacidade',
    description: 'Controlos definidos pelo risco, pelos dados tratados e pelo contexto de acesso.',
    items: ['autenticação', 'perfis e permissões', 'revisão de acessos', 'histórico de atividade', 'ficheiros seguros', 'minimização de dados', 'desenho orientado ao RGPD', 'controlos baseados em risco']
  },
  {
    id: 'quality',
    title: 'Qualidade de software',
    description: 'Validação progressiva para reduzir falhas e alinhar entregas com critérios definidos.',
    items: ['critérios de aceitação', 'testes manuais', 'testes automatizados', 'testes de API', 'testes E2E', 'regressão', 'gestão de defeitos', 'validação de release']
  },
  {
    id: 'operation',
    title: 'Operação',
    description: 'Acompanhamento técnico definido conforme criticidade e contrato.',
    items: ['logs', 'monitorização quando aplicável', 'backups definidos por escopo', 'planeamento de recuperação', 'tratamento de incidentes', 'manutenção', 'documentação', 'planos de suporte']
  }
];

export const enterpriseDeliveryStages: EnterprisePillar[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Entender negócio, utilizadores, sistemas existentes e riscos antes de fechar o caminho.'
  },
  {
    id: 'prototype',
    title: 'Protótipo e escopo',
    description: 'Validar fluxos, prioridades e a primeira entrega antes de avançar para construção completa.'
  },
  {
    id: 'build',
    title: 'Construção e testes',
    description: 'Desenvolver por etapas e verificar critérios de aceitação com testes adequados ao projeto.'
  },
  {
    id: 'launch',
    title: 'Lançamento e evolução',
    description: 'Colocar em funcionamento, acompanhar e evoluir conforme o modelo acordado.'
  }
];

export const enterpriseGovernanceItems = [
  'responsabilidades',
  'decisões',
  'prioridades',
  'controlo de versões',
  'aprovações',
  'gestão de mudanças',
  'documentação'
] as const;

export const commercialClarityItems: CommercialClarityItem[] = [
  {
    id: 'scope',
    title: 'Escopo',
    description: 'O que será incluído, excluído e entregue em cada fase.'
  },
  {
    id: 'ownership',
    title: 'Propriedade e licenciamento',
    description: 'Propriedade do código, componentes de terceiros e licenciamento são definidos em contrato.'
  },
  {
    id: 'hosting',
    title: 'Alojamento e dados',
    description: 'Responsabilidade pelo alojamento, localização dos dados e ambientes é definida conforme a solução.'
  },
  {
    id: 'support',
    title: 'Suporte',
    description: 'Canais, prioridades e expectativas de resposta são acordados para o projeto.'
  },
  {
    id: 'transition',
    title: 'Transição',
    description: 'Documentação, transferência de conhecimento e condições de transição são definidas quando aplicável.'
  }
];
