"use client";

import { Code2, LifeBuoy, ShieldCheck, TestTube2 } from 'lucide-react';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/shared/Button';

const enterprisePillars = [
  {
    title: 'Segurança e acessos',
    description: 'Perfis, permissões e proteção de dados conforme o risco do projeto.',
    icon: ShieldCheck
  },
  {
    title: 'Qualidade e testes',
    description: 'Critérios claros, validação manual e automação quando fizer sentido.',
    icon: TestTube2
  },
  {
    title: 'Integrações e arquitetura',
    description: 'Soluções preparadas para comunicar com ferramentas existentes e evoluir.',
    icon: Code2
  },
  {
    title: 'Suporte e continuidade',
    description: 'Manutenção, documentação e acompanhamento definidos conforme o projeto.',
    icon: LifeBuoy
  }
];

export function EnterpriseDetails() {
  return (
    <section id="empresas" className="border-y border-white/5 bg-[#030A1A] py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <SectionHeading className="[&_h2]:font-sans"
          tone="dark"
          eyebrow="Engenharia por trás"
          title="Simples para usar. Engenharia por trás."
          subtitle="O cliente sente simplicidade; nós tratamos da complexidade. Segurança, integrações, qualidade, suporte e documentação organizam o rigor técnico de cada projeto."
          align="center"
        />

        <AccessibleCarousel
          ariaLabel="Capacidades técnicas para empresas"
          testId="enterprise-capabilities-carousel"
          className="mt-8"
          motionMode="featured-step"
          items={enterprisePillars}
          itemClassName="basis-[89%] sm:basis-[72%] md:basis-[54%] lg:basis-[34%] xl:basis-[32%]"
          autoplayMs={2000}
          interactionPauseMs={2000}
          getItemLabel={(pillar) => pillar.title}
          renderItem={(pillar) => {
            const Icon = pillar.icon;

            return (
              <article className="rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-3 text-left">
                  <Icon className="h-5 w-5 shrink-0 text-kavtris-blueLight" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">{pillar.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/60">{pillar.description}</p>
              </article>
            );
          }}
        />

        <div className="mt-8 flex justify-center">
          <Button href="/empresas" variant="secondary" className="border border-white/15 bg-transparent text-white hover:bg-kavtris-blue/10">
            Ver capacidades técnicas
          </Button>
        </div>
      </div>
    </section>
  );
}
