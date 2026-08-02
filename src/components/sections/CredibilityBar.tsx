import Link from 'next/link';
import { Bot, CircleCheck, Code2, LifeBuoy, PlugZap } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

const serviceStripItems = [
  { title: 'Automação inteligente', icon: Bot },
  { title: 'Qualidade e conformidade', icon: CircleCheck },
  { title: 'Sistemas web e mobile', icon: Code2 },
  { title: 'Integrações e APIs', icon: PlugZap },
  { title: 'Suporte e evolução', icon: LifeBuoy }
];

export function CredibilityBar() {
  return (
    <>
      <section className="border-y border-borderline bg-white" aria-label="Serviços principais">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[76px] gap-px py-2 sm:grid-cols-2 lg:grid-cols-5 lg:py-0">
            {serviceStripItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex min-h-[4rem] items-center justify-center gap-2.5 px-3 py-2 text-center ${index === serviceStripItems.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''} lg:border-r lg:border-borderline last:lg:border-r-0`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gold-600">
                    <Icon className="h-5 w-5 stroke-[1.7]" aria-hidden="true" />
                  </span>
                  <p className="max-w-[9rem] text-[0.65rem] font-extrabold uppercase leading-4 tracking-[0.05em] text-navy-900">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#061728] text-white" aria-label="Assinatura institucional">
        <div className="mx-auto flex min-h-[94px] max-w-[1180px] flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
            <div>
              <p className="mb-1 text-[0.68rem] font-semibold text-white/70">Integrante da Rede</p>
              <Logo variant="network" className="shrink-0" />
            </div>
            <div className="border-t border-gold-500/45 pt-4 md:min-h-14 md:border-l md:border-t-0 md:pl-7 md:pt-0">
              <p className="max-w-lg text-base font-semibold leading-6 text-white">
                Padrões, excelência e confiança
                <span className="block text-white/74">que impulsionam o seu negócio.</span>
              </p>
            </div>
          </div>

          <Link href="/rede-qualidade-e-vida" className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-500 underline-offset-4 hover:underline">
            Conhecer a Rede
          </Link>
        </div>
      </section>
    </>
  );
}
