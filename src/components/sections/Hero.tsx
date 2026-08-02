import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#03182B] text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:70px_70px] opacity-[0.12]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-3/5 bg-[radial-gradient(circle_at_65%_46%,rgba(242,182,50,0.2),transparent_42%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(3,24,43,0.98),rgba(3,24,43,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[560px] max-w-[1180px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.52fr_0.48fr] lg:gap-12 lg:py-16">
        <div className="max-w-[43rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-2 text-xs font-semibold text-white/64 sm:text-sm">Software • Automation • Quality • Innovation</p>

          <h1 className="mt-7 max-w-[42rem] font-sans text-[clamp(2.65rem,10vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white lg:text-[4.35rem] xl:text-[4.85rem]">
            <span className="block">Transformamos tarefas complicadas em</span>
            <span className="block text-gold-500">sistemas simples de utilizar.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/78">
            Criamos soluções web e mobile para organizar processos, poupar tempo e ajudar empresas a trabalhar melhor.
          </p>
          <p className="mt-4 max-w-xl rounded-2xl border border-gold-500/25 bg-gold-500/10 px-4 py-3 text-sm font-semibold leading-6 text-white">
            Não precisa perceber de tecnologia. Conte-nos como a sua empresa funciona e onde estão as dificuldades.
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#simulador" className="min-h-11 w-full px-6 text-navy-950 sm:w-auto">
              Explique o seu problema
            </Button>
            <Button href="#exemplos" variant="secondary" className="min-h-11 w-full border border-white/25 bg-transparent px-6 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto">
              Veja exemplos simples
            </Button>
          </div>
        </div>

        <div className="relative min-h-[420px]" data-testid="hero-brand-visual">
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/12 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-md p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/qevaryn-symbol.png"
                alt="Símbolo Qevaryn Systems"
                width={760}
                height={760}
                priority
                sizes="72px"
                className="h-16 w-16 object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Exemplo visual</p>
                <h2 className="mt-1 text-xl font-bold text-white">Sistema simples de acompanhar</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ['Pedido recebido', 'Cliente explicou a necessidade'],
                ['Responsável definido', 'A equipa sabe quem acompanha'],
                ['Tarefa acompanhada', 'Estado visível para todos'],
                ['Cliente informado', 'Menos chamadas repetidas'],
                ['Relatório atualizado', 'Gestão acompanha o trabalho']
              ].map(([title, text], index) => (
                <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#03182B] p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 text-sm font-bold text-navy-950">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
