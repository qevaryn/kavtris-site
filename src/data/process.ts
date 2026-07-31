import { CheckCircle2, ClipboardCheck, Compass, Rocket, SearchCheck, Wrench } from 'lucide-react';

export const processSteps = [
  {
    title: 'Entender o problema',
    description: 'Compreendemos o negócio, o processo atual e a necessidade real.',
    icon: Compass
  },
  {
    title: 'Definir prioridades',
    description: 'Separamos o essencial do desejável para reduzir risco e desperdício.',
    icon: ClipboardCheck
  },
  {
    title: 'Planear o MVP',
    description: 'Desenhamos a primeira versão útil para validar valor rapidamente.',
    icon: Wrench
  },
  {
    title: 'Desenvolver e testar',
    description: 'Construímos, validamos fluxos e tratamos qualidade desde o início.',
    icon: SearchCheck
  },
  {
    title: 'Publicar e acompanhar',
    description: 'Colocamos a solução em uso e acompanhamos comportamento real.',
    icon: Rocket
  },
  {
    title: 'Melhorar continuamente',
    description: 'Evoluímos funcionalidades, integrações, automações e qualidade.',
    icon: CheckCircle2
  }
];
