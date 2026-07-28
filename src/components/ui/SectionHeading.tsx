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
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800 md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
