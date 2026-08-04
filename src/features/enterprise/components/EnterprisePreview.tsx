import { Code2, LifeBuoy, ShieldCheck, TestTube2 } from 'lucide-react';
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {enterprisePillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article key={pillar.title} className="rounded-[1.25rem] border border-borderline bg-white p-5 shadow-sm">
                <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-navy-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/empresas" variant="ghost" className="border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
            Ver informações para empresas
          </Button>
        </div>
      </div>
    </section>
  );
}
