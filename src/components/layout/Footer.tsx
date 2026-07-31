import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { brandTagline, companyName, socialLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t-2 border-gold-600 bg-navy-950 text-white">
      <div className="container-section py-9">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-3 lg:items-start">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-white/70">{brandTagline}</p>
            <p className="text-sm text-white/60">Integrante da Rede Qualidade é Vida</p>
          </div>

          <div className="space-y-4 lg:text-center">
            <p className="text-sm leading-7 text-white/75">Software, automação e qualidade para processos empresariais mais organizados.</p>
            <p className="text-xs leading-6 text-white/55">
              A Qevaryn Systems atua como operadora independente, com gestão, contratos e responsabilidades próprias.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-center">
              <Button href={socialLinks.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Gabriel Dias de Souza">
                LinkedIn
              </Button>
              <Button href={socialLinks.github} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Gabriel Dias de Souza">
                GitHub
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-white/70 lg:items-end">
            <Link href="/rede-qualidade-e-vida" className="transition hover:text-white">
              Rede Qualidade é Vida
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Política de Cookies
            </Link>
          </div>
        </div>

        <div className="mt-6 text-sm text-white/65">
          <p>© {new Date().getFullYear()} {companyName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
