import { industries } from '@/data/industries';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';

export function Industries() {
  return (
    <section id="sectores" className="soft-section-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Sectores iniciais"
          title="Tecnologia aplicada a problemas reais"
          subtitle="A Qevaryn Systems começa por mercados onde sistemas simples, bem pensados e evolutivos podem reduzir trabalho manual rapidamente."
          align="center"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <article key={industry.title} className="hover-lift rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{industry.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{industry.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {industry.examples.map((example) => <Tag key={example}>{example}</Tag>)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
