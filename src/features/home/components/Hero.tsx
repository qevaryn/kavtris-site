import Image from 'next/image';
import { Button } from '@/components/shared/Button';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#03182B] text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:70px_70px] opacity-[0.12]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-3/5 bg-[radial-gradient(circle_at_65%_46%,rgba(242,182,50,0.2),transparent_42%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(3,24,43,0.98),rgba(3,24,43,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[430px] max-w-[1180px] items-center gap-8 px-5 py-9 sm:px-8 md:min-h-[470px] lg:min-h-[390px] lg:grid-cols-[0.49fr_0.51fr] lg:items-start lg:gap-10 lg:py-6 xl:gap-12">
        <div className="max-w-[39rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-2 text-xs font-semibold text-white/64 sm:text-sm">Software • Automation • Quality • Innovation</p>

          <h1 className="mt-6 max-w-[37rem] font-sans text-[clamp(2rem,8.5vw,2.45rem)] font-extrabold uppercase leading-[0.98] tracking-normal text-white md:text-[2.65rem] lg:text-[1.92rem] xl:text-[2.12rem] 2xl:text-[2.22rem]">
            <span className="block lg:whitespace-nowrap">Transformamos tarefas</span>
            <span className="block lg:whitespace-nowrap">complicadas em</span>
            <span className="block lg:whitespace-nowrap">
              <span className="text-gold-500">sistemas simples de utilizar.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/74">
            Criamos software adaptado à operação de cada empresa, desde ferramentas simples até plataformas completas. Não precisa perceber de tecnologia. Explique-nos como a sua empresa funciona e onde estão as dificuldades.
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#contacto" className="min-h-11 w-full px-6 text-navy-950 sm:w-auto">
              Explique o seu problema
            </Button>
            <Button href="/produtos" variant="secondary" className="min-h-11 w-full border border-white/25 bg-transparent px-6 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto">
              Ver soluções
            </Button>
          </div>
        </div>

        <div className="relative min-h-[250px] md:min-h-[310px] lg:min-h-[370px]" data-testid="hero-brand-visual">
          <div className="absolute left-[61%] top-[36%] h-[min(72vw,27rem)] w-[min(72vw,27rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/14 blur-3xl md:top-1/2" aria-hidden="true" />
          <svg className="absolute inset-y-0 right-0 h-full w-full text-gold-500/68" viewBox="0 0 720 460" fill="none" aria-hidden="true">
            <path d="M24 118H188L232 162H336" stroke="currentColor" strokeWidth="1.35" />
            <path d="M68 200H240L292 148H484" stroke="currentColor" strokeWidth="1.35" />
            <path d="M44 318H214L262 366H544" stroke="currentColor" strokeWidth="1.35" />
            <path d="M370 70H500L552 122H704" stroke="currentColor" strokeWidth="1.35" />
            <path d="M380 156H512L560 204H708" stroke="currentColor" strokeWidth="1.35" />
            <path d="M392 248H538L590 196H716" stroke="currentColor" strokeWidth="1.35" />
            <path d="M382 382H536L590 430H714" stroke="currentColor" strokeWidth="1.35" />
            {[336, 484, 544, 704, 708, 716, 714].map((x, index) => (
              <circle key={x + index} cx={x} cy={[162, 148, 366, 122, 204, 196, 430][index]} r="4.2" fill="currentColor" />
            ))}
            {[116, 648, 672].map((x, index) => (
              <circle key={`glow-${x}`} cx={x} cy={[346, 88, 314][index]} r="3.2" fill="currentColor" opacity="0.95" />
            ))}
          </svg>

          <div className="absolute left-[61%] top-[36%] w-[min(50vw,12rem)] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[21rem] lg:w-[28.5rem] xl:w-[31rem]">
            <Image
              src="/images/qevaryn-symbol.png"
              alt="Símbolo Qevaryn Systems"
              width={760}
              height={760}
              priority
              sizes="(max-width: 768px) 192px, (max-width: 1280px) 456px, 496px"
              className="h-auto w-full object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)]"
            />
          </div>
          <div className="absolute right-8 top-14 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_24px_rgba(242,182,50,0.9)]" aria-hidden="true" />
          <div className="absolute bottom-20 left-8 h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(242,182,50,0.85)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
