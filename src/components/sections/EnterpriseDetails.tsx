import { enterpriseDetails } from '@/data/enterprise-details';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export function EnterpriseDetails() {
  return (
    <section id="empresas" className="soft-section-line bg-mist py-16 sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Para diferentes níveis de operação"
          title="Interface simples, processo técnico por trás."
          subtitle="A solução pode começar como uma ferramenta operacional e evoluir para integrações, permissões, documentação, qualidade e suporte quando o negócio precisar."
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {enterpriseDetails.map((group) => (
            <details key={group.title} className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                {group.title}
              </summary>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {group.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-6 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </details>
          ))}
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
