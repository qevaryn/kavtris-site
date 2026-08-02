import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#03182B] text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:70px_70px] opacity-[0.12]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-3/5 bg-[radial-gradient(circle_at_65%_46%,rgba(242,182,50,0.2),transparent_42%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(3,24,43,0.98),rgba(3,24,43,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[500px] max-w-[1280px] items-center gap-8 px-5 py-10 sm:px-8 md:min-h-[540px] lg:grid-cols-[0.54fr_0.46fr] lg:gap-10 lg:py-12">
        <div className="max-w-[42rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-gold-500">Qevaryn Systems</p>
          <p className="mt-2 text-xs font-semibold text-white/64 sm:text-sm">Software • Automation • Quality • Innovation</p>

          <h1 className="mt-7 max-w-[42rem] font-sans text-[clamp(2.35rem,10vw,2.85rem)] font-extrabold uppercase leading-[0.96] tracking-normal text-white md:text-[3.55rem] xl:text-[3.65rem]">
            <span className="block lg:whitespace-nowrap">Tecnologia que conecta</span>
            <span className="block lg:whitespace-nowrap">Processos. Pessoas.</span>
            <span className="block text-gold-500">Resultados.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/74 sm:text-base">
            Soluções de software, automação e qualidade para empresas que procuram eficiência, desempenho e inovação.
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#solucoes" className="min-h-12 w-full px-7 text-navy-950 sm:w-auto">
              Nossas soluções
            </Button>
            <Button href="#contacto" variant="secondary" className="min-h-12 w-full border border-white/25 bg-transparent px-7 hover:border-gold-500 hover:bg-gold-500/10 sm:w-auto">
              Fale com um especialista
            </Button>
          </div>
        </div>

        <div className="relative min-h-[270px] md:min-h-[330px] lg:min-h-[430px]" data-testid="hero-brand-visual">
          <div className="absolute left-[49%] top-1/2 h-[min(72vw,27rem)] w-[min(72vw,27rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/12 blur-3xl" aria-hidden="true" />
          <svg className="absolute inset-y-2 right-0 h-[96%] w-full text-gold-500/58" viewBox="0 0 680 460" fill="none" aria-hidden="true">
            <path d="M42 120H208L252 164H356" stroke="currentColor" strokeWidth="1.25" />
            <path d="M82 198H252L298 152H500" stroke="currentColor" strokeWidth="1.25" />
            <path d="M62 316H220L270 366H562" stroke="currentColor" strokeWidth="1.25" />
            <path d="M360 76H484L532 124H650" stroke="currentColor" strokeWidth="1.25" />
            <path d="M388 236H524L572 188H670" stroke="currentColor" strokeWidth="1.25" />
            <path d="M396 386H536L586 430H670" stroke="currentColor" strokeWidth="1.25" />
            {[356, 500, 562, 650, 670, 670].map((x, index) => (
              <circle key={x + index} cx={x} cy={[164, 152, 366, 124, 188, 430][index]} r="4.2" fill="currentColor" />
            ))}
          </svg>

          <div className="absolute left-[51%] top-1/2 h-[min(76vw,26.5rem)] w-[min(76vw,26.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/16 bg-navy-950/30 shadow-[0_0_110px_rgba(217,154,22,0.18)]" aria-hidden="true" />
          <Image
            src="/images/qevaryn-symbol.png"
            alt="Símbolo Qevaryn Systems"
            width={282}
            height={282}
            priority
            sizes="(max-width: 768px) 250px, 420px"
            className="absolute left-[51%] top-1/2 h-auto w-[min(68vw,17rem)] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)] md:w-[21rem] lg:w-[23.75rem] xl:w-[25.25rem]"
          />
          <div className="absolute right-8 top-14 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_24px_rgba(242,182,50,0.9)]" aria-hidden="true" />
          <div className="absolute bottom-20 left-8 h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_20px_rgba(242,182,50,0.85)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
