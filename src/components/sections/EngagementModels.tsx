import { engagementModels } from '@/data/engagement-models';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function EngagementModels() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Modelo de trabalho"
          title="Escolha um formato compatível com o momento do negócio"
          subtitle="Não publicamos preços fixos sem diagnóstico. O formato depende do escopo, risco, prioridade e nível de acompanhamento necessário."
          align="center"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {engagementModels.map((model) => {
            const Icon = model.icon;

            return (
              <article key={model.title} className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-gold-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy-900">{model.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{model.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
