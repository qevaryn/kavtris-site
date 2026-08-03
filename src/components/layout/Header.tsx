import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10273A] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8 xl:min-h-[76px]">
        <Link href="#inicio" className="flex min-w-0 items-center gap-4" aria-label="Qevaryn Systems - início">
          <Logo variant="qevarynWhite" priority />
          <span data-testid="header-network-signature" className="hidden items-center gap-3 border-l border-gold-500/55 pl-4 text-[0.62rem] font-bold uppercase leading-4 tracking-[0.17em] text-white/58 min-[1320px]:inline-flex">
            <span>
              Operadora da
              <span className="block text-white/72">Qualidade é Vida</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-3 min-[1180px]:flex 2xl:gap-4">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-sm bg-[#10273A] px-0.5 text-[0.72rem] font-semibold text-white transition hover:text-gold-500 2xl:text-xs">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/#contacto" className="px-4 py-2 text-navy-950 min-[1180px]:hidden" aria-label="Explique o seu problema">
            Explicar
          </Button>
          <Button href="/#contacto" className="hidden px-5 py-2.5 text-navy-950 min-[1180px]:inline-flex">
            Explique o seu problema
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
