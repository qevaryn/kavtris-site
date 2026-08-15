/**
 * WEB.1F.3 — business-discovery categories (Profile B: "I know my business,
 * not the software"). Each category points to EXISTING product concepts only
 * ("pontos de partida adaptáveis") — never to invented business-specific
 * software.
 */
export type BusinessCategoryId =
  | 'barbearias'
  | 'restaurantes'
  | 'hoteis'
  | 'lojas'
  | 'terreno'
  | 'escritorios';

export type BusinessCategory = {
  id: BusinessCategoryId;
  label: string;
  short: string;
  needs: string[];
  productSlugs: string[];
};

/**
 * WEB.1F.8 — business filters. Data-driven mapping (stable category IDs, never
 * fragile display-name matching) that mirrors the system-discovery filter
 * interaction (SYSTEM/BUSINESS PARITY). Default = Todos.
 */
export type BusinessFilterId =
  | 'todos'
  | 'servicos'
  | 'alimentacao'
  | 'alojamento'
  | 'retalho'
  | 'equipas'
  | 'gestao';

export type BusinessFilter = {
  id: BusinessFilterId;
  label: string;
  /** Category ids covered by this filter (all ids for 'todos'). */
  categoryIds: BusinessCategoryId[];
};

export const businessFilters: BusinessFilter[] = [
  {
    id: 'todos',
    label: 'Todos',
    categoryIds: ['barbearias', 'restaurantes', 'hoteis', 'lojas', 'terreno', 'escritorios']
  },
  { id: 'servicos', label: 'Serviços', categoryIds: ['barbearias'] },
  { id: 'alimentacao', label: 'Alimentação', categoryIds: ['restaurantes'] },
  { id: 'alojamento', label: 'Alojamento', categoryIds: ['hoteis'] },
  { id: 'retalho', label: 'Retalho', categoryIds: ['lojas'] },
  { id: 'equipas', label: 'Equipas', categoryIds: ['terreno'] },
  { id: 'gestao', label: 'Gestão', categoryIds: ['escritorios'] }
];

export const businessCategories: BusinessCategory[] = [
  {
    id: 'barbearias',
    label: 'Barbearias e salões',
    short: 'Agenda, clientes, produtos, equipa e organização do dia a dia.',
    needs: ['Agenda', 'Clientes', 'Produtos', 'Equipa'],
    productSlugs: ['customer-portal', 'stock-orders', 'kavtris-ops']
  },
  {
    id: 'restaurantes',
    label: 'Restaurantes',
    short: 'Pedidos, cozinha, stock, equipas e operação.',
    needs: ['Pedidos', 'Cozinha', 'Stock', 'Equipas'],
    productSlugs: ['kitchen-sync', 'stock-orders', 'kavtris-ops']
  },
  {
    id: 'hoteis',
    label: 'Hotéis e alojamento',
    short: 'Reservas, quartos, limpeza, manutenção e comunicação.',
    needs: ['Reservas', 'Quartos', 'Equipa', 'Comunicação'],
    productSlugs: ['hotel-operations', 'customer-portal', 'kavtris-ops']
  },
  {
    id: 'lojas',
    label: 'Lojas e retalho',
    short: 'Stock, encomendas, fornecedores, vendas e equipa.',
    needs: ['Stock', 'Encomendas', 'Fornecedores', 'Vendas'],
    productSlugs: ['stock-orders', 'customer-portal', 'kavtris-ops']
  },
  {
    id: 'terreno',
    label: 'Equipas no terreno',
    short: 'Visitas, rotas, evidências no local e relatórios.',
    needs: ['Visitas', 'Rotas', 'Evidências', 'Relatórios'],
    productSlugs: ['fieldops', 'kavtris-ops']
  },
  {
    id: 'escritorios',
    label: 'Escritórios e gestão',
    short: 'Tarefas, aprovações, documentos e indicadores internos.',
    needs: ['Tarefas', 'Aprovações', 'Documentos', 'Indicadores'],
    productSlugs: ['kavtris-ops', 'customer-portal']
  }
] as const;
