import Image from 'next/image';
import { Tag } from '@/components/shared/Tag';

type ProjectCardProps = {
  title: string;
  flag: string;
  type: string;
  image: string;
  summary: string[];
  technologies: string[];
};

export function ProjectCard({ title, flag, type, image, summary, technologies }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-borderline bg-white shadow-card hover-lift">
      <div className="relative aspect-[16/10] bg-navy-900">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-kavtris-blue/10 px-3 py-1 text-xs font-semibold text-kavtris-blue">{flag}</span>
          <Tag tone="navy">{type}</Tag>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-tight text-navy-800">{title}</h3>
        <ul className="mt-4 grid gap-2 text-sm leading-5 text-muted">
          {summary.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-kavtris-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}
