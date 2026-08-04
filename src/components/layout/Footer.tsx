import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/layout/Logo';
import { brandTagline, companyName, socialLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t-2 border-gold-600 bg-navy-950 text-white">
      <div className="container-section py-9">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.1fr_0.9fr_0.75fr] lg:items-start">
          <div className="space-y-4">
            <Logo variant="qevarynWhite" />
            <p className="text-sm text-white/72">{brandTagline}</p>
            <p className="max-w-md text-sm leading-7 text-white/62">Sistemas, automação, integrações e qualidade para processos empresariais mais organizados.</p>
            <div className="flex flex-wrap gap-3">
              <Button href={socialLinks.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Gabriel Dias de Souza">
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5 lg:border-l lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:pl-8">
            <div className="flex items-center gap-4">
              <Logo variant="seal" />
              <div>
                <p className="text-sm font-semibold text-white">Integrante da Rede Qualidade é Vida</p>
                <Link href="/rede-qualidade-e-vida" className="mt-1 inline-flex text-sm font-semibold text-gold-500 underline-offset-4 hover:underline">
                  Conhecer a Rede
                </Link>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/58">
              A Qevaryn Systems atua como operadora independente, com gestão, contratos e responsabilidades próprias.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-white/70 lg:items-end">
            <Link href="/#contacto" className="transition hover:text-white">
              Contacto
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Política de Cookies
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-white/65 md:grid-cols-[1fr_auto] md:items-center">
          <p>Duas marcas. Um propósito. Tecnologia que conecta. Qualidade que transforma.</p>
          <p>© {new Date().getFullYear()} {companyName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
