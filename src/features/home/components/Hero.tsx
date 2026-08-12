import { Button } from '@/components/shared/Button';
import { HeroVisual } from '@/features/home/components/HeroVisual';

const microPillars = [
  { title: 'Consultoria ativa', detail: 'Identificamos oportunidades antes de vender software.' },
  { title: 'Tecnologia adaptável', detail: 'Partimos do que já funciona e ajustamos à sua operação.' },
  { title: 'Resultados reais', detail: 'Medimos o impacto e evoluímos com a sua empresa.' }
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-kavtris-dark text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:72px_72px] opacity-[0.07]" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_70%_45%,rgba(6,90,253,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(1,6,25,0.98),rgba(1,6,25,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1180px] items-start gap-6 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:gap-10 lg:py-16 xl:gap-14">
        <div className="max-w-[42rem]">
          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-kavtris-blueLight">KAVTRIS</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-sm">
            Software · Automação · Engenharia · Qualidade
          </p>

          <h1 className="mt-6 font-sans text-[clamp(1.85rem,6.6vw,2.95rem)] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[clamp(2.1rem,5.4vw,3.1rem)]">
            Tecnologia que
            <span className="mt-2 block">encontra oportunidades.</span>
            <span className="mt-2 block">Simplifica operações.</span>
            <span className="mt-2 block text-kavtris-blueLight">Gera resultados.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
            A KAVTRIS combina consultoria, engenharia e tecnologia para identificar oportunidades, adaptar soluções e
            tornar processos mais eficientes — em empresas de diferentes dimensões.
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="#processo" className="min-h-11 w-full bg-kavtris-blue px-6 text-white shadow-[0_14px_30px_rgba(6,90,253,0.28)] hover:bg-[#0B5EFF] sm:w-auto">
              Conhecer soluções
            </Button>
            <Button href="#contacto" variant="secondary" className="min-h-11 w-full border border-white/25 bg-transparent px-6 hover:border-kavtris-blueLight hover:bg-kavtris-blue/10 sm:w-auto">
              Falar com a KAVTRIS
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-4">
            {microPillars.map((pillar) => (
              <li key={pillar.title} className="text-left">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">{pillar.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{pillar.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
