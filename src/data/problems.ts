import { AlertTriangle, Clock3, Layers3, Puzzle, ShieldAlert } from 'lucide-react';

export const problems = [
  {
    title: 'Falhas descobertas em produção',
    description: 'Os problemas aparecem apenas depois de a aplicação chegar aos clientes.',
    icon: AlertTriangle
  },
  {
    title: 'Testes sem organização',
    description: 'Faltam cenários, casos de teste, evidências e prioridades bem definidas.',
    icon: Layers3
  },
  {
    title: 'Regressões frequentes',
    description: 'Novas alterações quebram funcionalidades que já funcionavam.',
    icon: ShieldAlert
  },
  {
    title: 'Falta de tempo para testar',
    description: 'A equipa precisa desenvolver e testar tudo ao mesmo tempo.',
    icon: Clock3
  },
  {
    title: 'Automação difícil de manter',
    description: 'Os testes são instáveis, repetitivos ou não possuem uma estrutura clara.',
    icon: Puzzle
  }
];
