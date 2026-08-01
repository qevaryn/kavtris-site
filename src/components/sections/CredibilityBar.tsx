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
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[92px] gap-px py-3 sm:grid-cols-2 lg:grid-cols-5 lg:py-0">
            {serviceStripItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex min-h-[4.75rem] items-center justify-center gap-3 px-3 py-3 text-center ${index === serviceStripItems.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''} lg:border-r lg:border-borderline last:lg:border-r-0`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gold-600">
                    <Icon className="h-6 w-6 stroke-[1.7]" aria-hidden="true" />
                  </span>
                  <p className="max-w-[9rem] text-[0.7rem] font-extrabold uppercase leading-4 tracking-[0.05em] text-navy-900 sm:text-xs">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#061728] text-white" aria-label="Assinatura institucional">
        <div className="mx-auto flex min-h-[116px] max-w-[1280px] flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div>
              <p className="mb-1 text-[0.68rem] font-semibold text-white/70">Integrante da Rede</p>
              <Logo variant="network" className="shrink-0" />
            </div>
            <div className="border-t border-gold-500/45 pt-4 md:min-h-16 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="max-w-lg text-lg font-semibold leading-7 text-white">
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
