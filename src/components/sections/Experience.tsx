import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { socialLinks } from '@/lib/constants';

export function Experience() {
  return (
    <section id="experiencia" className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experiência aplicada em projetos"
          subtitle="Os nomes dos clientes e detalhes internos são preservados por motivos de confidencialidade."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-sm leading-7 text-slate-600">Laboratório técnico e projetos de estudo disponíveis no GitHub</p>
          <Button href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="Ver GitHub de Gabriel Dias de Souza">
            Ver GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
