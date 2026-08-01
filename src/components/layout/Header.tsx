import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071A2B]/95 text-white backdrop-blur supports-[backdrop-filter]:bg-[#071A2B]/90">
      <div className="container-wide flex min-h-[72px] items-center justify-between gap-4 py-2 xl:min-h-[78px]">
        <Link href="#inicio" className="flex min-w-0 items-center gap-4" aria-label="Qevaryn Systems - início">
          <Logo priority />
          <span data-testid="header-network-signature" className="hidden items-center gap-3 border-l border-gold-500/45 pl-4 text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.18em] text-white/54 min-[1360px]:inline-flex">
            <span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" />
            Integrante da Rede Qualidade é Vida
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-4 min-[1180px]:flex 2xl:gap-5">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs font-semibold text-white/72 transition hover:text-white 2xl:text-sm">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contacto" className="px-4 py-2 min-[1180px]:hidden" aria-label="Falar sobre um projeto">
            Projeto
          </Button>
          <Button href="#contacto" className="hidden px-5 py-2.5 text-navy-950 min-[1180px]:inline-flex">
            Falar sobre um projeto
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
