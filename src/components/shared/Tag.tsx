import type { ReactNode } from 'react';
import { cn } from '@/components/shared/cn';

type TagProps = {
  children: ReactNode;
  className?: string;
  tone?: 'gold' | 'light' | 'navy';
};

export function Tag({ children, className, tone = 'light' }: TagProps) {
  const tones = {
    gold: 'bg-kavtris-blue/10 text-kavtris-blueLight ring-kavtris-blue/20',
    light: 'bg-white text-slate-700 ring-borderline',
    navy: 'bg-navy-950 text-white ring-navy-900'
  };

  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1', tones[tone], className)}>{children}</span>;
}
