import { Bot, Code2, Gauge, GitBranch, LayoutDashboard, PlugZap, ShieldCheck } from 'lucide-react';

export const services = [
  {
    title: 'Sistemas e aplicações web',
    description:
      'Sistemas personalizados para gerir clientes, equipas, serviços, operações, reservas, pedidos e informação empresarial.',
    tags: ['Portais', 'Backoffice', 'Aplicações', 'Operações'],
    icon: Code2
  },
  {
    title: 'Automação de processos',
    description:
      'Automação de tarefas repetitivas, notificações, relatórios, fluxos de aprovação e movimentação de dados.',
    tags: ['Fluxos', 'Relatórios', 'Alertas', 'Aprovações'],
    icon: Bot,
    approaches: [
      {
        title: 'Processos internos',
        points: ['Tarefas repetitivas', 'Aprovações', 'Notificações', 'Relatórios']
      },
      {
        title: 'Qualidade e testes',
        points: ['Playwright', 'Robot Framework', 'API', 'Regressão']
      }
    ]
  },
  {
    title: 'Ferramentas internas e painéis',
    description:
      'Dashboards, backoffices, portais administrativos e sistemas de acompanhamento em tempo real.',
    tags: ['Dashboards', 'Admin', 'Controlo', 'Indicadores'],
    icon: LayoutDashboard
  },
  {
    title: 'Integrações e APIs',
    description:
      'Ligação entre plataformas, sistemas externos, serviços de pagamento, bases de dados e ferramentas empresariais.',
    tags: ['APIs', 'Dados', 'Pagamentos', 'Sistemas'],
    icon: PlugZap
  },
  {
    title: 'QA e qualidade de software',
    description:
      'Testes manuais, exploratórios, automação, testes de API, regressão, análise de requisitos e prevenção de falhas.',
    tags: ['QA Manual', 'Automação', 'API', 'Requisitos'],
    icon: ShieldCheck
  },
  {
    title: 'MVPs e protótipos digitais',
    description:
      'Criação de versões iniciais de produtos para validar uma ideia antes de realizar um investimento maior.',
    tags: ['MVP', 'Protótipo', 'Validação', 'Produto'],
    icon: GitBranch
  },
  {
    title: 'Manutenção e melhoria contínua',
    description:
      'Suporte, evolução e melhoria de sistemas existentes com foco em estabilidade, organização e crescimento gradual.',
    tags: ['Suporte', 'Evolução', 'Correções', 'Melhorias'],
    icon: Gauge
  }
];
