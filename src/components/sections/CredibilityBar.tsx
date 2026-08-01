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
        <div className="container-section">
          <div className="grid gap-px py-3 sm:grid-cols-2 lg:grid-cols-5 lg:py-0">
            {serviceStripItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex min-h-20 items-center gap-3 px-4 py-3 ${index === serviceStripItems.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''} lg:border-r lg:border-borderline last:lg:border-r-0`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-600/25 bg-gold-600/10 text-gold-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-extrabold uppercase leading-5 tracking-[0.08em] text-navy-900">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#061728] text-white" aria-label="Assinatura institucional">
        <div className="container-section flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="network" className="shrink-0" />
            <div className="border-t border-gold-500/45 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="text-sm font-semibold text-white">Integrante da Rede Qualidade é Vida</p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/68">Padrões, responsabilidade e qualidade aplicados em cada projeto.</p>
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
