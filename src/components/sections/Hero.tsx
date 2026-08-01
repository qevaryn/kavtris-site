import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#020D19] text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:76px_76px] opacity-[0.16]" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle_at_0%_42%,rgba(217,154,22,0.16),transparent_48%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_68%_45%,rgba(217,154,22,0.2),transparent_46%)]" aria-hidden="true" />

      <div className="container-section relative grid min-h-[600px] items-center gap-10 py-14 md:py-16 lg:min-h-[640px] lg:grid-cols-[0.52fr_0.48fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-3 text-sm font-semibold text-white/68">Software • Automation • Quality • Innovation</p>

          <h1 className="mt-7 max-w-3xl font-sans text-[clamp(2.35rem,10vw,2.85rem)] font-extrabold uppercase leading-[0.98] tracking-normal text-white md:text-[4rem] xl:text-[4.45rem]">
            Tecnologia que conecta
            <span className="block">processos. Pessoas.</span>
            <span className="block text-gold-500">Resultados.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/76 md:text-lg">
            Desenvolvemos soluções de software, automação e qualidade para empresas que procuram mais organização, eficiência e controlo dos seus processos.
          </p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#solucoes" className="min-h-12 w-full px-7 text-navy-950 sm:w-auto">
              Nossas soluções
            </Button>
            <Button href="#contacto" variant="secondary" className="min-h-12 w-full border border-white/25 bg-transparent px-7 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto">
              Fale com um especialista
            </Button>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[470px]" data-testid="hero-brand-visual">
          <div className="absolute inset-0 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
          <svg className="absolute inset-y-4 right-0 h-[92%] w-full text-gold-500/60" viewBox="0 0 640 520" fill="none" aria-hidden="true">
            <path d="M80 102H208L244 138H358" stroke="currentColor" strokeWidth="1.4" />
            <path d="M126 190H250L292 148H442" stroke="currentColor" strokeWidth="1.4" />
            <path d="M92 320H236L282 366H510" stroke="currentColor" strokeWidth="1.4" />
            <path d="M350 84H462L510 132H612" stroke="currentColor" strokeWidth="1.4" />
            <path d="M390 244H506L552 198H626" stroke="currentColor" strokeWidth="1.4" />
            <path d="M418 416H520L566 462H628" stroke="currentColor" strokeWidth="1.4" />
            {[358, 442, 510, 612, 626, 628].map((x, index) => (
              <circle key={x} cx={x} cy={[138, 148, 366, 132, 198, 462][index]} r="4.5" fill="currentColor" />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 h-[min(76vw,25rem)] w-[min(76vw,25rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/20 bg-navy-950/40 shadow-[0_0_120px_rgba(217,154,22,0.18)]" aria-hidden="true" />
          <Image
            src="/images/qevaryn-symbol.png"
            alt="Símbolo Qevaryn Systems"
            width={282}
            height={282}
            priority
            sizes="(max-width: 768px) 260px, 380px"
            className="absolute left-1/2 top-1/2 h-auto w-[min(70vw,18rem)] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.48)] md:w-[22rem] xl:w-[24rem]"
          />
          <div className="absolute right-7 top-16 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_24px_rgba(242,182,50,0.9)]" aria-hidden="true" />
          <div className="absolute bottom-20 left-10 h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(242,182,50,0.85)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
