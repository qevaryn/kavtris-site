"use client";

import { Code2, LifeBuoy, ShieldCheck, TestTube2, type LucideIcon } from 'lucide-react';
import { AccessibleCarousel } from '@/components/shared/AccessibleCarousel';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/shared/Button';

const enterprisePillars: Array<{ title: string; description: string; icon: LucideIcon }> = [
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

function CapabilityCard({ pillar }: { pillar: (typeof enterprisePillars)[number] }) {
  const Icon = pillar.icon;

  return (
    <article className="panel-dark panel-dark-hover h-full rounded-[1.1rem] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-3 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-kavtris-blue/30 bg-white/[0.04] text-kavtris-blueLight">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-white">{pillar.title}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/60">{pillar.description}</p>
    </article>
  );
}

/**
 * WEB.1B — Engineering behind it.
 *
 * Desktop (lg+): the owner-approved structured presentation — left column with
 * title + supporting copy + CTA, right column with a capability grid.
 * Mobile/tablet (<lg): the protected infinite carousel is preserved
 * (ENGINEERING_MOBILE_CAROUSEL_PRESERVED). Both variants consume the SAME
 * `enterprisePillars` data source — no duplicated business content.
 */
export function EnterpriseDetails() {
  return (
    <section id="empresas" className="kavtris-ambient border-y border-white/5 bg-[#030A1A] py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        {/* Mobile / tablet — protected infinite carousel */}
        <div className="lg:hidden">
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
            itemClassName="basis-[89%] sm:basis-[72%] md:basis-[54%]"
            autoplayMs={2000}
            interactionPauseMs={2000}
            getItemLabel={(pillar) => pillar.title}
            renderItem={(pillar) => <CapabilityCard pillar={pillar} />}
          />

          <div className="mt-8 flex justify-center">
            <Button href="/empresas" variant="secondary" className="border border-white/15 bg-transparent text-white hover:bg-kavtris-blue/10">
              Ver capacidades técnicas
            </Button>
          </div>
        </div>

        {/* Desktop — approved structured grid */}
        <div className="hidden items-start gap-14 lg:grid lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading className="[&_h2]:font-sans"
              tone="dark"
              eyebrow="Engenharia por trás"
              title="Simples para usar. Engenharia por trás."
              subtitle="O cliente sente simplicidade; nós tratamos da complexidade. Segurança, integrações, qualidade, suporte e documentação organizam o rigor técnico de cada projeto."
            />
            <div className="mt-8">
              <Button href="/empresas" variant="secondary" className="border border-white/15 bg-transparent text-white hover:bg-kavtris-blue/10">
                Ver capacidades técnicas
              </Button>
            </div>
          </div>

          <div data-testid="enterprise-capabilities-grid" className="grid gap-4 sm:grid-cols-2">
            {enterprisePillars.map((pillar) => (
              <CapabilityCard key={pillar.title} pillar={pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
