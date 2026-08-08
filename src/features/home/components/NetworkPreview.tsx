import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/layout/Logo';

export function NetworkPreview() {
  return (
    <section id="rede" className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-section">
        <article className="rounded-[1.45rem] border border-borderline bg-paper p-5 shadow-sm sm:p-7 lg:p-8" data-testid="network-preview">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Rede Qualidade é Vida</p>
              <h2 className="mt-3 font-display text-[1.8rem] leading-tight text-navy-800 sm:text-[2.15rem]">
                Tecnologia integrada a uma rede criada para servir melhor.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                A Qevaryn Systems é a empresa operadora de tecnologia integrante da Rede Qualidade é Vida, que liga diferentes iniciativas através do
                mesmo compromisso com qualidade, responsabilidade e respeito pelas pessoas.
              </p>
              <div className="mt-5">
                <Button href="/rede-qualidade-e-vida" className="w-full sm:w-auto">
                  Conhecer a Rede
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-gold-600/20 bg-white px-4 py-3 lg:min-w-[15rem]">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-600">Rede Qualidade é Vida</p>
              <div className="mt-2">
                <Logo variant="network" className="max-w-[150px]" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
