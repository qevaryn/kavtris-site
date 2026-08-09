import { problems } from '@/data/problems';
import { IconCard } from '@/components/shared/IconCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { SnapCarousel } from '@/features/legacy/components/SnapCarousel';

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

        <div className="mt-10 sm:hidden">
          <SnapCarousel label="Carrossel de problemas frequentes" testId="problems-carousel" itemCount={problems.length}>
            {problems.map((problem) => (
              <IconCard key={problem.title} icon={problem.icon} title={problem.title} description={problem.description} className="snap-card" />
            ))}
          </SnapCarousel>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-muted">
          A Qevaryn Systems transforma estes sinais em soluções digitais graduais, com foco em organização, controlo e eficiência.
        </p>
      </div>
    </section>
  );
}
