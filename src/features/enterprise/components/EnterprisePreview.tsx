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
    <section id="empresas" className="soft-section-line bg-mist py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <SectionHeading
          eyebrow="Para empresas e equipas técnicas"
          title="Interface simples, processo técnico por trás."
          subtitle="A homepage mostra o essencial. Quando o projeto exige mais rigor, organizamos segurança, integrações, qualidade, suporte e documentação com mais detalhe."
          align="center"
        />

        <AccessibleCarousel
          ariaLabel="Capacidades técnicas para empresas"
          testId="enterprise-capabilities-carousel"
          className="mt-8"
          motionMode="featured-step"
          items={enterprisePillars}
          itemClassName="basis-[85%] sm:basis-[76%] md:basis-[60%] lg:basis-[52%] xl:basis-[48%]"
          autoplayMs={2000}
          interactionPauseMs={2000}
          getItemLabel={(pillar) => pillar.title}
          renderItem={(pillar) => {
            const Icon = pillar.icon;

            return (
              <article className="rounded-[1.1rem] border border-borderline bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3 text-left">
                  <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span className="text-sm font-semibold text-navy-900">{pillar.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.description}</p>
              </article>
            );
          }}
        />

        <div className="mt-8 flex justify-center">
          <Button href="/empresas" variant="ghost" className="border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
            Ver capacidades técnicas
          </Button>
        </div>
      </div>
    </section>
  );
}
