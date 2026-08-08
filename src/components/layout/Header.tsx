import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10273A] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8 xl:min-h-[76px]">
        <Link href="/#inicio" className="flex min-w-0 items-center gap-4" aria-label="Qevaryn Systems - início">
          <Logo variant="qevarynWhite" priority />
          <span data-testid="header-network-signature" className="hidden items-center gap-3 border-l border-gold-500/55 pl-4 text-[0.62rem] font-bold uppercase leading-4 tracking-[0.17em] text-white/58 min-[1320px]:inline-flex">
            <span>
              Integrante da
              <span className="block text-white/72">Rede Qualidade é Vida</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-4 min-[1180px]:flex 2xl:gap-5">
          {navigationLinks.map((link) => (
            <Link key={`${link.href}-${link.label}`} href={link.href} className="rounded-sm px-0.5 text-xs font-semibold text-white/84 transition hover:text-gold-500 focus-visible:text-gold-500 2xl:text-[0.82rem]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            href="/#contacto"
            className="hidden border border-gold-400/80 bg-gold-500 px-5 py-2.5 text-navy-950 shadow-[0_10px_26px_rgba(242,182,50,0.28)] transition hover:bg-gold-400 hover:shadow-[0_14px_30px_rgba(242,182,50,0.36)] min-[1180px]:inline-flex"
          >
            Pedir demonstração
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
