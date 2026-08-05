import Image from 'next/image';
import { Button } from '@/components/shared/Button';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#03182B] text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:70px_70px] opacity-[0.12]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-3/5 bg-[radial-gradient(circle_at_65%_46%,rgba(242,182,50,0.2),transparent_42%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(3,24,43,0.98),rgba(3,24,43,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1180px] items-start gap-6 px-5 py-7 sm:gap-8 sm:px-8 sm:py-9 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-10 lg:py-10 xl:gap-12">
        <div className="max-w-[42rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-2 text-xs font-semibold text-white/64 sm:text-sm">Software • Automation • Quality • Innovation</p>

          <h1 className="mt-5 max-w-[38rem] text-[clamp(1.75rem,7vw,2.75rem)] font-extrabold leading-[1.03] tracking-tight text-white sm:text-[clamp(2rem,6vw,2.85rem)] lg:text-[2.45rem]">
            Sistemas simples para organizar e automatizar a sua empresa.
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-white/78 sm:text-base">
            Escolha um produto por assinatura ou fale connosco sobre uma solução personalizada para o funcionamento da sua equipa.
          </p>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#problemas" className="min-h-11 w-full px-6 text-navy-950 sm:w-auto">
              Encontrar uma solução
            </Button>
            <Button href="/produtos" variant="secondary" className="min-h-11 w-full border border-white/25 bg-transparent px-6 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto">
              Ver produtos
            </Button>
          </div>
        </div>

        <div className="relative min-h-[165px] sm:min-h-[205px] lg:min-h-[330px]" data-testid="hero-brand-visual">
          <div className="absolute left-1/2 top-[45%] h-[min(60vw,20rem)] w-[min(60vw,20rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/14 blur-3xl lg:left-[61%] lg:top-1/2 lg:h-[min(72vw,27rem)] lg:w-[min(72vw,27rem)]" aria-hidden="true" />
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

          <div className="absolute left-1/2 top-[46%] w-[min(41vw,8.9rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(39vw,10.5rem)] lg:left-[61%] lg:top-1/2 lg:w-[25rem] xl:w-[29rem]">
            <Image
              src="/images/qevaryn-symbol.png"
              alt="Símbolo Qevaryn Systems"
              width={760}
              height={760}
              priority
              sizes="(max-width: 430px) 144px, (max-width: 768px) 176px, (max-width: 1280px) 400px, 464px"
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
