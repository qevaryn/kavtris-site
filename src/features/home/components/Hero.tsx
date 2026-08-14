import { Button } from '@/components/shared/Button';
import { HeroVisual } from '@/features/home/components/HeroVisual';

export function Hero() {
  return (
    <section id="inicio" className="kavtris-ambient relative overflow-hidden bg-kavtris-dark text-white">
      <div className="absolute inset-0 bg-hero-grid bg-[size:72px_72px] opacity-[0.07]" aria-hidden="true" />
      <div
        className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_70%_45%,rgba(6,90,253,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(1,6,25,0.98),rgba(1,6,25,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1280px] items-start gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-10 lg:py-16 xl:gap-14">
        {/* WEB.1F.1 - redundant brand eyebrow removed: the Hero now starts with
            the main value proposition (brand identifiers live in the Header). */}
        <div className="max-w-[42rem]">
          <h1 className="font-sans text-[clamp(1.85rem,6.6vw,2.95rem)] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[clamp(2.1rem,5.4vw,3.1rem)]">
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
            {/* WEB.1F.5 — the Hero primary CTA opens the simplified customer-path
                selector (HERO_PRIMARY_DESTINATION = /#como-funciona). */}
            <Button href="#como-funciona" className="min-h-11 w-full bg-kavtris-blue px-6 text-white shadow-[0_14px_30px_rgba(6,90,253,0.28)] hover:bg-[#0B5EFF] sm:w-auto">
              Ver como funciona
            </Button>
            <Button href="#contacto" variant="secondary" className="min-h-11 w-full border border-white/25 bg-transparent px-6 hover:border-kavtris-blueLight hover:bg-kavtris-blue/10 sm:w-auto">
              Falar com a KAVTRIS
            </Button>
          </div>
        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}