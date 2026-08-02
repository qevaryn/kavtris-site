export const productDemos = [
  {
    id: 'orders',
    label: 'Organizar pedidos',
    eyebrow: 'Exemplo de solução',
    title: 'Pedidos e serviços num único fluxo',
    text: 'Cada pedido fica registado com responsável, prazo, estado e histórico.',
    flow: ['Pedido recebido', 'Responsável definido', 'Prazo registado', 'Cliente informado', 'Relatório disponível'],
    benefits: ['Menos mensagens perdidas', 'Equipa alinhada', 'Estado visível'],
    technical: ['Aplicação web responsiva', 'Perfis e permissões', 'Notificações', 'Histórico de alterações']
  },
  {
    id: 'booking',
    label: 'Reservas e marcações',
    eyebrow: 'Demonstração de produto',
    title: 'Agenda simples para clientes e equipa',
    text: 'O cliente escolhe um horário e a equipa acompanha confirmações, alterações e disponibilidade.',
    flow: ['Horário escolhido', 'Reserva confirmada', 'Equipa avisada', 'Lembrete enviado', 'Agenda atualizada'],
    benefits: ['Menos chamadas', 'Confirmações claras', 'Agenda organizada'],
    technical: ['Calendário integrado', 'Regras de disponibilidade', 'Alertas', 'Painel administrativo']
  },
  {
    id: 'clients',
    label: 'Acompanhar clientes',
    eyebrow: 'Exemplo de solução',
    title: 'Área de cliente com acompanhamento',
    text: 'Clientes consultam pedidos, documentos e mensagens sem depender de chamadas constantes.',
    flow: ['Cliente entra', 'Pedido consultado', 'Documento recebido', 'Mensagem enviada', 'Histórico guardado'],
    benefits: ['Mais transparência', 'Menos dúvidas repetidas', 'Atendimento centralizado'],
    technical: ['Autenticação', 'Área protegida', 'Documentos', 'Integrações externas']
  },
  {
    id: 'field',
    label: 'Equipa externa',
    eyebrow: 'Demonstração de produto',
    title: 'Operação acompanhada fora da empresa',
    text: 'A equipa vê tarefas, confirma presença, preenche formulários e envia evidências.',
    flow: ['Rota recebida', 'Check-in feito', 'Formulário preenchido', 'Fotografia enviada', 'Gestão acompanha'],
    benefits: ['Menos papel', 'Mais controlo', 'Evidências organizadas'],
    technical: ['Aplicação mobile', 'Modo offline', 'Upload de ficheiros', 'Sincronização']
  },
  {
    id: 'sales',
    label: 'Vendas',
    eyebrow: 'Exemplo de solução',
    title: 'Acompanhamento comercial claro',
    text: 'Contactos, oportunidades, propostas e próximos passos ficam organizados.',
    flow: ['Contacto registado', 'Proposta enviada', 'Seguimento marcado', 'Estado atualizado', 'Relatório criado'],
    benefits: ['Funil visível', 'Menos oportunidades perdidas', 'Próximos passos claros'],
    technical: ['CRM personalizado', 'Permissões', 'Relatórios', 'Automação de lembretes']
  },
  {
    id: 'communication',
    label: 'Comunicação entre setores',
    eyebrow: 'Demonstração de produto',
    title: 'Informação certa para o setor certo',
    text: 'Cada área recebe tarefas e avisos conforme o estado do processo.',
    flow: ['Solicitação criada', 'Setor notificado', 'Tarefa aceite', 'Estado partilhado', 'Processo encerrado'],
    benefits: ['Menos ruído', 'Responsáveis claros', 'Histórico completo'],
    technical: ['Fluxos configuráveis', 'Notificações', 'Auditoria', 'Integrações']
  }
] as const;

export type ProductDemoId = (typeof productDemos)[number]['id'];
