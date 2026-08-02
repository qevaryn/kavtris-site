import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';

export function Experience() {
  return (
    <section id="experiencia" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <div className="rounded-[1.6rem] bg-paper p-5 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Projetos"
            title="Experiência que sustenta a nossa forma de trabalhar"
            subtitle="A experiência comprovada apresentada aqui está relacionada com qualidade de software, testes, automação, análise, processos e projetos internacionais. Os nomes dos clientes e detalhes internos são preservados por confidencialidade."
          />

          <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <div className="snap-row" data-testid="projects-carousel" tabIndex={0} aria-label="Carrossel de projetos profissionais">
              {projects.map((project) => (
                <div key={project.title} className="snap-card">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
              {projects.map((project, index) => (
                <span key={project.title} className={`h-1.5 rounded-full ${index === 0 ? 'w-6 bg-gold-600' : 'w-1.5 bg-navy-800/20'}`} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center text-center">
            <p className="max-w-2xl text-sm leading-7 text-muted">
              Esta experiência sustenta a abordagem da Qevaryn Systems, enquanto as novas soluções digitais são oferecidas de forma gradual e ajustada a cada diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
