import { cn } from '@/components/ui/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">{title}</h2>
      <span className={cn('mt-4 block h-1 w-14 rounded-full bg-gold-600', align === 'center' && 'mx-auto')} aria-hidden="true" />
      {subtitle ? <p className="mt-5 text-base leading-8 text-muted md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
