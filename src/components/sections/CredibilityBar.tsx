import { Tag } from '@/components/ui/Tag';

const credibilityItems = ['Sistemas web', 'Automação', 'APIs', 'Ferramentas internas', 'Dashboards', 'QA Manual', 'Automação de testes'];

export function CredibilityBar() {
  return (
    <section className="border-y border-white/10 bg-navy-900 text-white">
      <div className="container-section py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.22em] text-gold-500 md:text-base">
            Software, automação e qualidade para transformar processos empresariais
          </p>
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 focus-visible:outline-gold-500 lg:flex-wrap lg:overflow-visible" tabIndex={0} aria-label="Competências da Qevaryn Systems">
            {credibilityItems.map((item) => (
              <Tag key={item} tone="gold" className="shrink-0 snap-start">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
