import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';

/**
 * WEB.1F.7 — consultant escape path on every product page.
 *
 * Catches the visitor who is unsure (B: the system may be adaptable without
 * them realizing it; C: they genuinely need another solution). Clearly a
 * SECONDARY action — it never competes with the primary "Adaptar à minha
 * empresa" CTA. Route is the globally established /#contacto.
 */
export function ProductConsultantEscape() {
  return (
    <section
      data-testid="product-consultant-escape"
      aria-label="Precisa de ajuda a escolher"
      className="bg-mist py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-kavtris-blue">Ainda com dúvidas?</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy-950 sm:text-3xl">
            Não encontrou exatamente o que precisa?
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Talvez esta solução possa ser adaptada ou combinada de outra forma. Conte-nos como funciona a sua operação.
          </p>
          <Button href="/#contacto" variant="outlineStrong" className="mt-7">
            Falar com um consultor
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
