import { Bot, FileSearch, Gauge, Layers3, PlaySquare } from 'lucide-react';

export const services = [
  {
    title: 'QA Manual e Análise',
    description:
      'Testes funcionais, exploratórios e de regressão para identificar falhas, riscos e problemas na experiência do utilizador.',
    tags: ['Funcional', 'Exploratório', 'Regressão', 'Evidências'],
    icon: FileSearch
  },
  {
    title: 'Automação de Testes Web, Mobile e API',
    description:
      'Automação dos principais fluxos para reduzir tarefas repetitivas e aumentar a confiança nas entregas.',
    tags: ['Web', 'API', 'Mobile'],
    icon: PlaySquare,
    approaches: [
      {
        title: 'Playwright + TypeScript',
        points: ['End-to-end', 'Múltiplos navegadores', 'Page Object Model', 'CI/CD']
      },
      {
        title: 'Robot Framework + Python',
        points: ['Automação funcional', 'Keywords reutilizáveis', 'SeleniumLibrary', 'Data-Driven Testing']
      }
    ]
  },
  {
    title: 'Estruturação e Melhoria de QA',
    description:
      'Organização do processo de qualidade, testes, documentação, prioridades e estratégia de regressão.',
    tags: ['Processos', 'Estratégia', 'Métricas', 'Documentação'],
    icon: Layers3
  },
  {
    title: 'Análise de Requisitos e Experiência do Utilizador',
    description:
      'Revisão de requisitos, fluxos e interfaces para prevenir ambiguidades, retrabalho e dificuldades de utilização.',
    tags: ['Requisitos', 'User Stories', 'Critérios de Aceitação', 'UX Funcional'],
    icon: Bot
  },
  {
    title: 'QA Contínuo',
    description:
      'Acompanhamento recorrente da qualidade durante novas funcionalidades, releases e regressões.',
    tags: ['Releases', 'Regressão', 'Manutenção', 'Feedback'],
    icon: Gauge
  }
];
