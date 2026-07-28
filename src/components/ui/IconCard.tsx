import type { LucideIcon } from 'lucide-react';
import { cn } from '@/components/ui/cn';

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function IconCard({ icon: Icon, title, description, className }: IconCardProps) {
  return (
    <article className={cn('group rounded-2xl border border-borderline bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-glow', className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-600/10 text-gold-600 transition group-hover:bg-gold-600 group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-navy-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
