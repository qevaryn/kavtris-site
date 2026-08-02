import { ClipboardCheck, Compass, Layers3, Rocket, Search, ShieldCheck, Wrench } from 'lucide-react';

export const simpleProcessSteps = [
  {
    title: 'Conversa inicial',
    description: 'Entendemos o problema e como a empresa funciona.',
    detail: 'A primeira conversa evita linguagem técnica desnecessária e procura perceber rotinas, pessoas envolvidas e dificuldades reais.',
    icon: Search
  },
  {
    title: 'Organização da ideia',
    description: 'Mapeamos utilizadores, tarefas e prioridades.',
    detail: 'Transformamos a conversa em fluxos simples, prioridades e decisões que ajudam a reduzir risco antes do desenvolvimento.',
    icon: Compass
  },
  {
    title: 'Protótipo',
    description: 'Mostramos uma versão navegável antes do desenvolvimento completo.',
    detail: 'O protótipo ajuda o cliente a visualizar a solução e corrigir o rumo cedo, antes de investir numa construção maior.',
    icon: Layers3
  },
  {
    title: 'Construção por etapas',
    description: 'Começamos pelo essencial.',
    detail: 'A solução cresce por fases, com entregas úteis e validação contínua do que realmente traz valor.',
    icon: Wrench
  },
  {
    title: 'Testes',
    description: 'Verificamos se a solução funciona e é fácil de utilizar.',
    detail: 'Aplicamos critérios de aceitação, testes manuais, validações funcionais e automação quando fizer sentido.',
    icon: ShieldCheck
  },
  {
    title: 'Lançamento',
    description: 'Colocamos a solução em funcionamento.',
    detail: 'A publicação considera dados, acessos, operação, orientação aos utilizadores e acompanhamento inicial.',
    icon: Rocket
  },
  {
    title: 'Acompanhamento',
    description: 'Corrigimos, mantemos e evoluímos o produto.',
    detail: 'Depois do lançamento, o produto pode receber melhorias, suporte, monitorização e novas funcionalidades.',
    icon: ClipboardCheck
  }
] as const;
