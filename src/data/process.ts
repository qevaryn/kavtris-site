import { CheckCircle2, ClipboardCheck, Compass, FlaskConical, MessageSquareText, Wrench } from 'lucide-react';

export const processSteps = [
  {
    title: 'Conhecer',
    description: 'Compreendemos o produto, o contexto e os riscos.',
    icon: Compass
  },
  {
    title: 'Planear',
    description: 'Definimos prioridades, escopo e estratégia.',
    icon: ClipboardCheck
  },
  {
    title: 'Preparar',
    description: 'Criamos cenários, dados e estruturas de teste.',
    icon: Wrench
  },
  {
    title: 'Testar',
    description: 'Executamos testes e validamos resultados.',
    icon: FlaskConical
  },
  {
    title: 'Comunicar',
    description: 'Entregamos evidências e recomendações claras.',
    icon: MessageSquareText
  },
  {
    title: 'Melhorar',
    description: 'Ajustamos e evoluímos continuamente.',
    icon: CheckCircle2
  }
];
