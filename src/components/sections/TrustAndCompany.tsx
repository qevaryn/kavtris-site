import Image from 'next/image';
import { Award, BadgeCheck, Globe2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { socialLinks } from '@/lib/constants';

const trustPoints = [
  {
    title: 'QA e automação',
    description: 'Experiência aplicada em qualidade de software, testes, requisitos e validação.',
    icon: ShieldCheck
  },
  {
    title: 'Projetos internacionais',
    description: 'Vivência em ambientes de software com processos, equipas e responsabilidade técnica.',
    icon: Globe2
  },
  {
    title: 'Rede Qualidade é Vida',
    description: 'Ligação institucional a padrões de clareza, responsabilidade e melhoria contínua.',
    icon: BadgeCheck
  }
];

export function TrustAndCompany() {
  return (
    <section id="sobre" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <div className="grid gap-6 rounded-[1.6rem] border border-borderline bg-paper p-5 shadow-sm sm:p-8 lg:grid-cols-[0.42fr_0.58fr] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Confiança</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">
              Experiência e responsabilidade por trás da Qevaryn.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              A Qevaryn Systems combina visão de produto, processos, qualidade e automação para criar software adaptado à operação real de cada empresa.
            </p>
          </div>

          <div className="grid gap-5">
            <article data-testid="founder-card" className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-borderline bg-navy-950 text-white shadow-sm" data-testid="founder-photo">
                  <Image
                    src="/images/gabriel.webp"
                    alt="Gabriel Dias de Souza, QA Engineer e fundador da Qevaryn Systems"
                    fill
                    sizes="80px"
                    className="object-cover object-[50%_28%]"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Fundador</p>
                  <h3 className="mt-2 text-xl font-semibold text-navy-900">Gabriel Dias de Souza</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    QA Engineer com experiência em testes, automação, análise de requisitos e projetos internacionais de software.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2" aria-label="LinkedIn de Gabriel Dias de Souza">
                  LinkedIn
                </Button>
                <Button href="/rede-qualidade-e-vida" variant="ghost" className="border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
                  Conhecer a Rede
                </Button>
              </div>
            </article>

            <div className="grid gap-4 md:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <article key={point.title} className="rounded-[1.2rem] border border-borderline bg-white p-4 shadow-sm">
                    <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-navy-900">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{point.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="flex items-center gap-4 rounded-[1.25rem] border border-gold-600/20 bg-white p-4">
              <Award className="h-8 w-8 shrink-0 text-gold-600" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900">Duas marcas. Um propósito.</p>
                <p className="mt-1 text-sm leading-6 text-muted">A Qevaryn atua como operadora independente ligada à Rede Qualidade é Vida.</p>
              </div>
              <div className="ml-auto hidden shrink-0 sm:block">
                <Logo variant="seal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
