import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/components/ui/cn';

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  children?: ReactNode;
  className?: string;
};

export function ServiceCard({ icon: Icon, title, description, tags, children, className }: ServiceCardProps) {
  return (
    <article className={cn('rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow', className)}>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-600/10 text-gold-600 ring-1 ring-gold-600/15">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold leading-snug text-navy-800">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>

      {children ? <div className="mt-5">{children}</div> : null}

      {tags?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </article>
  );
}
