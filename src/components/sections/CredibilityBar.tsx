import { Tag } from '@/components/ui/Tag';

const credibilityItems = ['QA Manual', 'Automação Web', 'Testes Funcionais', 'Testes Exploratórios', 'Regressão', 'BDD', 'Data-Driven Testing'];

export function CredibilityBar() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.22em] text-gold-500 md:text-base">
            Experiência em projetos internacionais de viagens, seguros e serviços fiscais
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {credibilityItems.map((item) => (
              <Tag key={item} tone="gold" className="shrink-0">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
