import {
  AppWindow,
  CalendarDays,
  CircleHelp,
  ClipboardList,
  MessageSquareWarning,
  RefreshCw,
  ShoppingCart,
  UsersRound
} from 'lucide-react';

export const businessProblems = [
  {
    id: 'manual',
    icon: RefreshCw,
    label: 'Tenho muitas tarefas manuais',
    short: 'A equipa repete os mesmos passos todos os dias.',
    title: 'Automatizar tarefas repetitivas',
    explanation:
      'Criamos um sistema que recebe informações, verifica regras, avisa responsáveis e atualiza relatórios automaticamente.',
    benefits: ['Menos trabalho manual', 'Menos erros', 'Avisos automáticos', 'Informação centralizada'],
    example: ['Dados recebidos', 'Regra verificada', 'Responsável avisado', 'Relatório atualizado']
  },
  {
    id: 'communication',
    icon: MessageSquareWarning,
    label: 'As equipas não comunicam bem',
    short: 'Informações importantes não chegam ao setor certo.',
    title: 'Ligar equipas e setores',
    explanation:
      'Criamos um fluxo onde cada setor recebe a informação certa, no momento certo, com estado e responsabilidade definidos.',
    benefits: ['Estado visível', 'Responsável definido', 'Histórico', 'Menos mensagens perdidas'],
    example: ['Pedido registado', 'Setor notificado', 'Resposta acompanhada', 'Cliente informado']
  },
  {
    id: 'clients',
    icon: UsersRound,
    label: 'Quero acompanhar melhor os clientes',
    short: 'É difícil saber o que cada cliente pediu ou precisa.',
    title: 'Acompanhar cada cliente',
    explanation:
      'Criamos uma área onde a empresa vê pedidos, contactos, documentos e próximos passos de cada cliente.',
    benefits: ['Histórico do cliente', 'Pedidos organizados', 'Lembretes', 'Visão comercial'],
    example: ['Cliente identificado', 'Pedido aberto', 'Próximo passo definido', 'Histórico guardado']
  },
  {
    id: 'orders',
    icon: ClipboardList,
    label: 'Preciso organizar pedidos e serviços',
    short: 'Pedidos ficam espalhados em mensagens, chamadas e folhas.',
    title: 'Organizar pedidos e serviços',
    explanation:
      'Todos acompanham o pedido, o responsável, o prazo e o estado atual num único lugar.',
    benefits: ['Pedidos centralizados', 'Prazos visíveis', 'Prioridades claras', 'Relatórios'],
    example: ['Pedido recebido', 'Responsável definido', 'Prazo registado', 'Estado atualizado']
  },
  {
    id: 'app',
    icon: AppWindow,
    label: 'Quero uma aplicação para os meus clientes',
    short: 'O cliente precisa pedir, acompanhar ou consultar informação.',
    title: 'Criar uma área simples para clientes',
    explanation:
      'O cliente pode pedir serviços, acompanhar o estado, consultar documentos e receber avisos pelo computador ou telemóvel.',
    benefits: ['Área protegida', 'Notificações', 'Documentos', 'Atendimento mais rápido'],
    example: ['Cliente entra', 'Pedido criado', 'Documento partilhado', 'Aviso enviado']
  },
  {
    id: 'booking',
    icon: CalendarDays,
    label: 'Quero organizar reservas e marcações',
    short: 'Agendas, horários e alterações são difíceis de controlar.',
    title: 'Gerir reservas sem confusão',
    explanation:
      'Criamos uma agenda online para clientes e um painel de gestão para confirmações, alterações e disponibilidade.',
    benefits: ['Agenda online', 'Confirmações', 'Lembretes', 'Menos chamadas'],
    example: ['Horário escolhido', 'Reserva confirmada', 'Equipa avisada', 'Lembrete enviado']
  },
  {
    id: 'sales',
    icon: ShoppingCart,
    label: 'Preciso melhorar as vendas',
    short: 'Contactos, propostas e oportunidades perdem-se no dia a dia.',
    title: 'Organizar o acompanhamento comercial',
    explanation:
      'Criamos uma visão simples de contactos, oportunidades, propostas e próximos passos para vender com mais controlo.',
    benefits: ['Funil visível', 'Próximos passos', 'Contactos organizados', 'Relatórios'],
    example: ['Contacto registado', 'Proposta enviada', 'Seguimento marcado', 'Venda acompanhada']
  },
  {
    id: 'unknown',
    icon: CircleHelp,
    label: 'Não sei exatamente do que preciso',
    short: 'Existe um problema, mas ainda não há nome técnico para a solução.',
    title: 'Descobrir a solução certa',
    explanation:
      'Não há problema. Primeiro entendemos como a sua empresa trabalha e onde se perde tempo. Depois mostramos uma solução simples para validar.',
    benefits: ['Conversa simples', 'Mapeamento do processo', 'Protótipo', 'Decisão por etapas'],
    example: ['Rotina explicada', 'Dificuldades mapeadas', 'Solução desenhada', 'Primeiro passo definido']
  }
] as const;

export type BusinessProblemId = (typeof businessProblems)[number]['id'];
