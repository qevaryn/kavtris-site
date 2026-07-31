import { BriefcaseBusiness, Coffee, Rocket, Store } from 'lucide-react';

export const industries = [
  {
    title: 'Restaurantes e comércio local',
    description: 'Ferramentas para encomendas, reservas, menus digitais, pedidos, administração e fidelização.',
    examples: ['encomendas online', 'reservas', 'menus digitais', 'painéis administrativos'],
    icon: Coffee
  },
  {
    title: 'Empresas de serviços',
    description: 'Soluções para clientes, marcações, equipas, escalas, relatórios e acompanhamento operacional.',
    examples: ['clientes', 'marcações', 'equipas', 'serviços realizados'],
    icon: BriefcaseBusiness
  },
  {
    title: 'Startups e empresas de software',
    description: 'Apoio em QA, automação de testes, releases, requisitos, manutenção e melhoria de processos.',
    examples: ['QA', 'automação de testes', 'releases', 'requisitos'],
    icon: Rocket
  },
  {
    title: 'Pequenas e médias empresas',
    description: 'Substituição de folhas de cálculo por sistemas internos, relatórios e integrações graduais.',
    examples: ['ferramentas internas', 'relatórios', 'integrações', 'automação'],
    icon: Store
  }
];
