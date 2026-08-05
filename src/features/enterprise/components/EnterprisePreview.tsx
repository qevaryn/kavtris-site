"use client";

import { Code2, LifeBuoy, ShieldCheck, TestTube2 } from 'lucide-react';
import { LoopingTicker } from '@/components/shared/LoopingTicker';
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

const enterpriseCapabilities = ['Segurança', 'Permissões', 'Integrações', 'Auditoria', 'Escalabilidade', 'Automação', 'Suporte', 'Evolução'] as const;

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

        <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-2 min-[1360px]:grid-cols-4" data-testid="enterprise-capabilities-desktop-grid">
          {enterprisePillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article key={pillar.title} className="rounded-[1.1rem] border border-borderline bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3 text-left">
                  <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span className="text-sm font-semibold text-navy-900">{pillar.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-borderline bg-white px-3 py-3 shadow-sm sm:px-4 lg:hidden" data-testid="enterprise-capabilities-mobile-ticker-wrapper">
          <LoopingTicker
            ariaLabel="Capacidades técnicas"
            items={enterpriseCapabilities}
            durationSeconds={30}
            testId="enterprise-capabilities-ticker"
            viewportClassName="py-1"
            itemClassName="min-w-[12rem]"
            renderItem={(capability) => (
              <span className="inline-flex min-h-10 items-center justify-center rounded-full border border-navy-950/10 bg-mist px-4 py-2 text-sm font-semibold text-navy-900">
                {capability}
              </span>
            )}
          />
        </div>

        <div className="mt-7 grid gap-3 lg:hidden" data-testid="enterprise-capabilities-mobile-details">
          {enterprisePillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <details key={pillar.title} className="rounded-[1.1rem] border border-borderline bg-white p-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-3 text-left">
                  <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span className="text-sm font-semibold text-navy-900">{pillar.title}</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.description}</p>
              </details>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/empresas" variant="ghost" className="border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
            Ver capacidades técnicas
          </Button>
        </div>
      </div>
    </section>
  );
}
