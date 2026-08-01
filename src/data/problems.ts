import { AlertTriangle, BarChart3, Clock3, Files, Link2Off, MessageSquareWarning, Repeat2, Table2 } from 'lucide-react';

export const problems = [
  {
    title: 'Tarefas repetitivas',
    description: 'Tempo gasto em rotinas manuais que poderiam ser automatizadas.',
    icon: Repeat2
  },
  {
    title: 'Dados espalhados',
    description: 'Informação crítica presa em folhas de cálculo e ficheiros soltos.',
    icon: Table2
  },
  {
    title: 'Sistemas isolados',
    description: 'Ferramentas que não comunicam entre si e obrigam a duplicar trabalho.',
    icon: Link2Off
  },
  {
    title: 'Erros frequentes',
    description: 'Falhas operacionais causadas por processos pouco controlados.',
    icon: AlertTriangle
  },
  {
    title: 'Pouca visibilidade',
    description: 'Dificuldade para acompanhar tarefas, equipas e serviços em tempo real.',
    icon: BarChart3
  },
  {
    title: 'Comunicação dispersa',
    description: 'Processos dependentes de telefonemas, mensagens e confirmações manuais.',
    icon: MessageSquareWarning
  },
  {
    title: 'Software desatualizado',
    description: 'Sistemas existentes que já não acompanham as necessidades do negócio.',
    icon: Files
  },
  {
    title: 'Tempo sem controlo',
    description: 'Decisões atrasadas por falta de informação organizada e acionável.',
    icon: Clock3
  }
];
