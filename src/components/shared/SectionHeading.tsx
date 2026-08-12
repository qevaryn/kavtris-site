import { cn } from '@/components/shared/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', tone = 'light', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className={cn('text-xs font-semibold uppercase tracking-[0.24em]', tone === 'dark' ? 'text-kavtris-blueLight' : 'text-kavtris-blue')}>{eyebrow}</p> : null}
      <h2 className={cn('mt-3 font-display text-[2rem] leading-tight md:text-[2.65rem]', tone === 'dark' ? 'text-white' : 'text-navy-800')}>{title}</h2>
      <span className={cn('mt-4 block h-1 w-14 rounded-full bg-kavtris-blue', align === 'center' && 'mx-auto')} aria-hidden="true" />
      {subtitle ? <p className={cn('mt-5 text-base leading-8 md:text-lg', tone === 'dark' ? 'text-white/68' : 'text-muted')}>{subtitle}</p> : null}
    </div>
  );
}
