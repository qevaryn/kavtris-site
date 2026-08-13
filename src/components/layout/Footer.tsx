import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { brandTagline, publicBrandName } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t-2 border-kavtris-blue bg-navy-950 text-white">
      <div className="container-section py-10">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.1fr_0.9fr_0.75fr] lg:items-start">
          <div className="space-y-4">
            <Logo variant="qevarynWhite" />
            <p className="text-sm text-white/72">{brandTagline}</p>
            <p className="max-w-md text-sm leading-7 text-white/62">Sistemas, automação, integrações e qualidade para processos empresariais mais organizados.</p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5 lg:border-l lg:border-y-0 lg:border-r-0 lg:bg-transparent lg:pl-8">
            <div className="flex items-center gap-4">
              <Logo variant="seal" />
              <div>
                <p className="text-sm font-semibold text-white">Integrante da Rede Qualidade é Vida</p>
                <Link href="/rede-qualidade-e-vida" className="mt-1 inline-flex text-sm font-semibold text-kavtris-blueLight underline-offset-4 hover:underline">
                  Conhecer a Rede
                </Link>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/58">
              A KAVTRIS atua como operadora independente, com gestão, contratos e responsabilidades próprias.
            </p>
          </div>

          <div className="grid gap-x-6 gap-y-3.5 text-sm text-white/70 sm:grid-cols-2 lg:flex lg:flex-col lg:items-end">
            <Link href="/sobre" className="transition hover:text-white">
              Sobre
            </Link>
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

        <div className="mt-8 grid gap-3 text-sm text-white/65 md:grid-cols-[1fr_auto] md:items-center">
          <p>Duas marcas. Um propósito. Tecnologia que conecta. Qualidade que transforma.</p>
          <p>© {new Date().getFullYear()} {publicBrandName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
