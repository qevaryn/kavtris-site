import { services } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Tag } from '@/components/ui/Tag';

export function Services() {
  const [manual, automation, structure, analysis, continuous] = services;

  return (
    <section id="servicos" className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Serviços"
          subtitle="Qualidade adaptada ao contexto, aos riscos e aos objetivos de cada projeto."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <ServiceCard icon={manual.icon} title={manual.title} description={manual.description} tags={manual.tags} />

          <ServiceCard icon={automation.icon} title={automation.title} description={automation.description}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {automation.approaches?.map((approach) => (
                <div key={approach.title} className="rounded-2xl border border-borderline bg-paper p-3">
                  <p className="text-sm font-semibold text-navy-800">{approach.title}</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-600">
                    {approach.points.slice(0, 3).map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full bg-gold-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {automation.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ServiceCard>

          <ServiceCard icon={structure.icon} title={structure.title} description={structure.description} tags={structure.tags} />
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-6 lg:grid-cols-2">
          <ServiceCard icon={analysis.icon} title={analysis.title} description={analysis.description} tags={analysis.tags} />
          <ServiceCard icon={continuous.icon} title={continuous.title} description={continuous.description} tags={continuous.tags} />
        </div>
      </div>
    </section>
  );
}
