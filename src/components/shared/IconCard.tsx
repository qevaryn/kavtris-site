import type { LucideIcon } from 'lucide-react';
import { cn } from '@/components/shared/cn';

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function IconCard({ icon: Icon, title, description, className }: IconCardProps) {
  return (
    <article className={cn('group relative overflow-hidden rounded-2xl border border-borderline bg-white p-5 shadow-sm hover-lift', className)}>
      <span className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-navy-900/80" aria-hidden="true" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-600/10 text-gold-600 ring-1 ring-gold-600/15 transition group-hover:bg-gold-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-navy-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </article>
  );
}
