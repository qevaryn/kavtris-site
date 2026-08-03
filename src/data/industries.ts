import { BriefcaseBusiness, Building2, Hotel, Store, Truck } from 'lucide-react';

export const industries = [
  {
    title: 'Hotelaria, alojamento e restauração',
    description: 'Sistemas para reservas, pedidos, comunicação interna, estados, tarefas e acompanhamento de clientes.',
    examples: ['reservas', 'pedidos', 'quartos e mesas', 'comunicação interna'],
    icon: Hotel
  },
  {
    title: 'Lojas, mercados e comércio',
    description: 'Ferramentas para stock, encomendas, fornecedores, tarefas internas, notificações e relatórios simples.',
    examples: ['stock', 'encomendas', 'fornecedores', 'vendas'],
    icon: Store
  },
  {
    title: 'Serviços, clínicas e oficinas',
    description: 'Soluções para marcações, clientes, equipas, histórico, documentos e serviços realizados.',
    examples: ['marcações', 'clientes', 'histórico', 'documentos'],
    icon: BriefcaseBusiness
  },
  {
    title: 'Equipas externas e operações móveis',
    description: 'Aplicações para visitas, rotas, check-in, formulários, fotografias, assinaturas e relatórios.',
    examples: ['rotas', 'check-in', 'formulários', 'relatórios'],
    icon: Truck
  },
  {
    title: 'PME e empresas em crescimento',
    description: 'Plataformas internas, áreas de cliente, permissões, integrações, relatórios e automações por fases.',
    examples: ['portais', 'permissões', 'integrações', 'automação'],
    icon: Store
  },
  {
    title: 'Empresas maiores e equipas técnicas',
    description: 'Apoio em requisitos, arquitetura, APIs, QA, documentação, monitorização, suporte e evolução.',
    examples: ['arquitetura', 'APIs', 'QA', 'suporte'],
    icon: Building2
  }
];
