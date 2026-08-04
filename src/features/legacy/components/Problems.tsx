import { problems } from '@/data/problems';
import { IconCard } from '@/components/shared/IconCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Problems() {
  return (
    <section className="soft-section-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Problemas que resolvemos"
          title="Quando as ferramentas atuais deixam de acompanhar o negócio"
          subtitle="Processos manuais, dados dispersos e sistemas desconectados tornam o crescimento mais difícil do que deveria."
          align="center"
        />

        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <IconCard key={problem.title} icon={problem.icon} title={problem.title} description={problem.description} />
          ))}
        </div>

        <div className="mt-10 sm:hidden" aria-label="Problemas frequentes">
          <div className="snap-row" data-testid="problems-carousel" tabIndex={0} aria-label="Carrossel de problemas frequentes">
            {problems.map((problem) => (
              <IconCard key={problem.title} icon={problem.icon} title={problem.title} description={problem.description} className="snap-card" />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
            {problems.map((problem, index) => (
              <span key={problem.title} className={`h-1.5 rounded-full ${index === 0 ? 'w-6 bg-gold-600' : 'w-1.5 bg-navy-800/20'}`} />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-muted">
          A Qevaryn Systems transforma estes sinais em soluções digitais graduais, com foco em organização, controlo e eficiência.
        </p>
      </div>
    </section>
  );
}
