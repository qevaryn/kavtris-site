export interface FieldOpsSectorExample {
  id: string;
  name: string;
  problem: string;
  description: string;
  workflow: string[];
  modules: string[];
  outcome: string;
  mobileState: string;
  dashboardState: string;
}

export interface FieldOpsModuleGroup {
  title: string;
  description: string;
  items: string[];
}

export interface FieldOpsWorkflowStep {
  id: string;
  title: string;
  description: string;
  statusLabel?: string;
}

export interface FieldOpsExperienceView {
  id: 'management' | 'team' | 'process';
  label: string;
  title: string;
  description: string;
}

export interface FieldOpsConfiguration {
  id: 'essential' | 'growth' | 'enterprise';
  name: string;
  audience: string[];
  modules: string[];
  outcome: string;
}

export const fieldOpsProblems = [
  'Serviços organizados por WhatsApp, chamadas ou folhas separadas.',
  'Horários guardados em ficheiros diferentes.',
  'Gestores sem confirmação clara de chegada ao local.',
  'Fotografias e documentos perdidos em conversas.',
  'Dificuldade em provar que um serviço foi concluído.',
  'Chamadas repetidas entre gestão, profissionais e clientes.',
  'Incidentes sem registo centralizado.',
  'Dificuldade em calcular serviços concluídos.',
  'Clientes à espera de atualizações.',
  'Equipas em vários locais sem visibilidade comum.'
];

export const fieldOpsSectors: FieldOpsSectorExample[] = [
  {
    id: 'limpeza',
    name: 'Limpeza',
    problem: 'Serviços recorrentes dependem de mensagens, fotografias soltas e confirmações manuais.',
    description: 'A equipa recebe a localização, confirma presença, segue checklist, regista evidências e gera relatório.',
    workflow: [
      'Localização recebida',
      'Check-in',
      'Checklist',
      'Fotografias',
      'Incidente se necessário',
      'Confirmação',
      'Relatório'
    ],
    modules: ['serviços recorrentes', 'checklists', 'fotografias', 'assinatura', 'relatórios'],
    outcome: 'Serviços recorrentes ficam mais fáceis de acompanhar e comprovar.',
    mobileState: 'Checklist de limpeza',
    dashboardState: 'Serviços por cliente'
  },
  {
    id: 'manutencao',
    name: 'Manutenção',
    problem: 'Técnicos precisam consultar ordens, histórico, materiais e aprovações sem perder informação.',
    description: 'O técnico recebe a ordem, confirma chegada, regista diagnóstico, materiais, evidências e fecho.',
    workflow: [
      'Ordem recebida',
      'Histórico consultado',
      'Chegada confirmada',
      'Diagnóstico',
      'Materiais registados',
      'Evidências',
      'Conclusão'
    ],
    modules: ['ordens de serviço', 'materiais', 'aprovações', 'histórico técnico', 'evidências'],
    outcome: 'Ordens, materiais, histórico e evidências ficam ligados ao mesmo serviço.',
    mobileState: 'Ordem de manutenção',
    dashboardState: 'Aprovações pendentes'
  },
  {
    id: 'hotelaria',
    name: 'Hotelaria',
    problem: 'Receção, limpeza e manutenção precisam partilhar estado de quartos, áreas e pedidos internos.',
    description: 'Tarefas são atribuídas, o estado muda em tempo real e supervisores aprovam antes de libertar a área.',
    workflow: [
      'Tarefa criada',
      'Tarefa atribuída',
      'Em execução',
      'Checklist',
      'Incidente',
      'Aprovação',
      'Área disponível'
    ],
    modules: ['quartos', 'áreas comuns', 'supervisão', 'prioridades', 'histórico'],
    outcome: 'Receção, limpeza e manutenção acompanham o mesmo estado operacional.',
    mobileState: 'Tarefa de quarto',
    dashboardState: 'Estado de quartos'
  },
  {
    id: 'cuidados',
    name: 'Cuidados domiciliários',
    problem: 'Visitas domiciliárias exigem registo organizado sem transformar o software em ferramenta clínica regulada.',
    description: 'O profissional segue a agenda, confirma visita, regista observações operacionais e disponibiliza relatório autorizado.',
    workflow: [
      'Visita agendada',
      'Chegada confirmada',
      'Rotina acompanhada',
      'Observações',
      'Incidente',
      'Conclusão',
      'Relatório'
    ],
    modules: ['agenda', 'visitas', 'observações', 'incidentes', 'acesso autorizado'],
    outcome: 'Visitas e observações operacionais ficam disponíveis para utilizadores autorizados.',
    mobileState: 'Visita agendada',
    dashboardState: 'Relatórios de visitas'
  },
  {
    id: 'instalacoes',
    name: 'Instalações técnicas',
    problem: 'Equipas precisam seguir ordens, materiais, evidências e aprovações em instalações feitas fora da empresa.',
    description: 'O técnico recebe a instalação, confirma chegada, segue instruções, regista materiais e fecha com evidências.',
    workflow: [
      'Técnico recebe a instalação',
      'Confirma chegada ao local',
      'Consulta instruções e materiais',
      'Executa checklist técnica',
      'Regista materiais usados',
      'Envia fotografias ou notas',
      'Solicita aprovação se necessário',
      'Fecha a instalação'
    ],
    modules: ['instalações', 'materiais', 'checklists técnicas', 'aprovações', 'evidências'],
    outcome: 'Instalações fora da empresa ganham instruções, evidências e fecho mais claros.',
    mobileState: 'Instalação atribuída',
    dashboardState: 'Instalações por estado'
  },
  {
    id: 'inspecao',
    name: 'Equipas de inspeção',
    problem: 'Inspeções em vários locais geram formulários, fotografias e ocorrências difíceis de consolidar.',
    description: 'A equipa segue um roteiro de inspeção, regista conformidades, anexa evidências e envia relatório para revisão.',
    workflow: [
      'Inspeção criada por local',
      'Responsável atribuído',
      'Roteiro de pontos aberto',
      'Conformidades registadas',
      'Fotografias anexadas',
      'Ocorrências classificadas',
      'Supervisor revê o relatório',
      'Histórico fica disponível'
    ],
    modules: ['roteiros', 'formulários', 'fotografias', 'ocorrências', 'relatórios'],
    outcome: 'Formulários, ocorrências e evidências ficam consolidados para revisão.',
    mobileState: 'Roteiro de inspeção',
    dashboardState: 'Inspeções e ocorrências'
  },
  {
    id: 'transportes',
    name: 'Transportes e entregas',
    problem: 'Rotas, paragens, comprovativos e incidentes precisam ficar ligados ao serviço correto.',
    description: 'O motorista segue a rota, regista paragens, envia comprovativos e fecha o relatório operacional.',
    workflow: [
      'Rota atribuída',
      'Partida',
      'Paragens',
      'Prova de entrega',
      'Incidente',
      'Assinatura',
      'Conclusão',
      'Relatório'
    ],
    modules: ['rotas', 'paragens', 'comprovativos', 'assinaturas', 'relatórios'],
    outcome: 'Rotas e entregas ficam ligadas a comprovativos e relatórios operacionais.',
    mobileState: 'Rota em curso',
    dashboardState: 'Rotas e paragens'
  },
  {
    id: 'multi-local',
    name: 'Operações com vários locais',
    problem: 'Supervisores acompanham equipas, serviços e aprovações em diferentes unidades ou regiões.',
    description: 'A operação começa por uma equipa ou localização e evolui para permissões, filtros e relatórios por área.',
    workflow: [
      'Serviços criados por localização',
      'Equipas atribuídas por região',
      'Supervisores acompanham estado',
      'Incidentes são escalados',
      'Aprovações ficam registadas',
      'Relatórios por unidade',
      'Gestão consulta indicadores'
    ],
    modules: ['múltiplas localizações', 'supervisores', 'permissões', 'aprovações', 'indicadores'],
    outcome: 'Supervisores acompanham várias unidades sem perder a visão por localização.',
    mobileState: 'Serviço por localização',
    dashboardState: 'Operação multi-local'
  }
];

export const fieldOpsExperienceViews: FieldOpsExperienceView[] = [
  {
    id: 'management',
    label: 'Gestão',
    title: 'Painel para acompanhar serviços e prioridades',
    description: 'A gestão vê serviços ativos, atrasos, incidentes, aprovações pendentes e relatórios sem procurar informação em mensagens soltas.'
  },
  {
    id: 'team',
    label: 'Equipa',
    title: 'Experiência mobile para quem executa o serviço',
    description: 'O profissional consulta a agenda, abre a tarefa, confirma presença, segue checklist, envia evidências e conclui o serviço no telemóvel.'
  },
  {
    id: 'process',
    label: 'Processo',
    title: 'Do planeamento ao relatório final',
    description: 'O serviço passa por uma sequência clara, desde a criação até à validação e consulta do relatório.'
  }
];

export const fieldOpsWorkflowSteps: FieldOpsWorkflowStep[] = [
  { id: 'created', title: 'Serviço criado', description: 'A gestão regista o serviço, cliente, localização, instruções e prioridade.', statusLabel: 'Planeado' },
  { id: 'assigned', title: 'Profissional atribuído', description: 'A tarefa é atribuída à pessoa ou equipa responsável, com horário e contexto.', statusLabel: 'Atribuído' },
  { id: 'confirmed', title: 'Horário confirmado', description: 'A equipa vê o serviço do dia e confirma que tem a informação necessária.', statusLabel: 'Confirmado' },
  { id: 'checkin', title: 'Check-in realizado', description: 'O profissional confirma presença no local, com registo de utilizador e hora.', statusLabel: 'No local' },
  { id: 'checklist', title: 'Checklist preenchido', description: 'Os pontos do serviço são marcados para reduzir esquecimentos e padronizar a execução.', statusLabel: 'Em execução' },
  { id: 'evidence', title: 'Evidências enviadas', description: 'Fotografias, notas, incidentes ou materiais ficam associados ao serviço correto.', statusLabel: 'Com evidência' },
  { id: 'approval', title: 'Cliente ou supervisor confirma', description: 'Quando fizer sentido, uma pessoa autorizada confirma ou aprova o serviço.', statusLabel: 'Em validação' },
  { id: 'report', title: 'Relatório disponível', description: 'A gestão consulta o histórico e prepara relatórios sem procurar mensagens soltas.', statusLabel: 'Concluído' }
];

export const fieldOpsMobileStates = [
  'Agenda',
  'Serviço',
  'Checklist',
  'Evidências',
  'Conclusão'
];

export const fieldOpsModules: FieldOpsModuleGroup[] = [
  {
    title: 'Operação base',
    description: 'Estrutura essencial para organizar clientes, equipas, locais e serviços.',
    items: ['empresas', 'clientes', 'localizações', 'funcionários', 'serviços', 'horários', 'estados']
  },
  {
    title: 'Execução no terreno',
    description: 'Ferramentas para o profissional executar e registar o serviço.',
    items: ['check-in e check-out', 'checklists', 'fotografias', 'formulários', 'assinaturas', 'incidentes']
  },
  {
    title: 'Gestão',
    description: 'Visibilidade para acompanhar serviços, aprovações, histórico e indicadores.',
    items: ['dashboards', 'relatórios', 'filtros', 'aprovações', 'histórico de serviços', 'indicadores operacionais']
  },
  {
    title: 'Comunicação',
    description: 'Atualizações para reduzir chamadas repetidas e melhorar acompanhamento.',
    items: ['notificações', 'mensagens internas', 'atualizações de serviço', 'notificações ao cliente']
  },
  {
    title: 'Materiais',
    description: 'Registos quando a execução envolve materiais, equipamento ou substituições.',
    items: ['materiais usados', 'equipamentos', 'pedidos de stock', 'relatórios de itens danificados']
  },
  {
    title: 'Integrações',
    description: 'Ligações opcionais com sistemas existentes quando o escopo justificar.',
    items: ['sistemas do cliente', 'faturação', 'calendários', 'mapas', 'identidade', 'relatórios']
  }
];

export const fieldOpsConfigurations: FieldOpsConfiguration[] = [
  {
    id: 'essential',
    name: 'Essencial',
    audience: ['profissionais independentes', 'pequenas equipas', 'organização inicial'],
    modules: ['clientes', 'localizações', 'serviços', 'horários', 'checklists', 'fotografias', 'relatórios básicos'],
    outcome: 'Organizar serviços e reduzir informação perdida.'
  },
  {
    id: 'growth',
    name: 'Crescimento',
    audience: ['vários funcionários', 'clientes recorrentes', 'supervisores', 'serviços repetidos'],
    modules: ['perfis', 'permissões', 'aprovações', 'incidentes', 'acesso de cliente', 'notificações', 'QR Code ou NFC', 'relatórios avançados'],
    outcome: 'Acompanhar equipas e manter responsabilidades mais claras.'
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    audience: ['múltiplas localizações', 'departamentos', 'equipas maiores', 'sistemas existentes'],
    modules: ['permissões avançadas', 'APIs', 'integrações', 'histórico de auditoria', 'monitorização', 'documentação', 'plano de suporte', 'rollout por fases'],
    outcome: 'Integrar a operação e criar controlo adequado à escala do negócio.'
  }
];

export const fieldOpsBenefits = [
  'informação num único lugar',
  'responsabilidades mais claras',
  'serviços mais fáceis de acompanhar',
  'menos mensagens perdidas',
  'evidências ligadas ao serviço correto',
  'relatórios preparados com menos esforço',
  'melhor comunicação entre campo e gestão',
  'histórico mais claro',
  'acompanhamento mais simples para clientes',
  'maior visibilidade operacional'
];

export const fieldOpsTechnicalGroups: FieldOpsModuleGroup[] = [
  {
    title: 'Aplicação',
    description: 'Experiência adaptada ao uso no escritório e no terreno.',
    items: ['aplicação web responsiva', 'experiência mobile-first', 'PWA opcional', 'aplicação nativa conforme escopo', 'suporte offline quando necessário']
  },
  {
    title: 'Segurança',
    description: 'Controlos definidos de acordo com risco, utilizadores e dados tratados.',
    items: ['autenticação', 'perfis e permissões', 'separação por cliente e localização', 'histórico de atividade', 'ficheiros seguros', 'revisão de acessos', 'desenho orientado ao RGPD']
  },
  {
    title: 'Arquitetura',
    description: 'Base técnica ajustada à dimensão e integrações do projeto.',
    items: ['arquitetura modular', 'APIs', 'integrações', 'bases de dados', 'armazenamento de ficheiros', 'deploy escalável conforme necessidade']
  },
  {
    title: 'Qualidade',
    description: 'Validação do comportamento antes e depois do lançamento.',
    items: ['critérios de aceitação', 'testes manuais', 'testes automatizados', 'testes de API', 'testes E2E', 'regressão', 'validação de release']
  },
  {
    title: 'Operação',
    description: 'Acompanhamento definido pelo contrato e criticidade da operação.',
    items: ['monitorização', 'backups', 'planeamento de recuperação', 'logs', 'tratamento de incidentes', 'manutenção', 'documentação', 'planos de suporte']
  }
];

export const fieldOpsImplementationSteps = [
  'Entender a operação',
  'Mapear serviços e utilizadores',
  'Escolher o primeiro fluxo',
  'Criar o protótipo',
  'Validar com a equipa',
  'Desenvolver por etapas',
  'Testar',
  'Lançar e acompanhar'
];
