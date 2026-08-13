import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { BrandDescriptor } from '@/components/shared/BrandDescriptor';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10273A] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8 xl:min-h-[76px]">
        <Link href="/#inicio" className="flex min-w-0 items-center gap-4" aria-label="KAVTRIS - início">
          <span className="flex flex-col">
            <Logo variant="qevarynWhite" priority />
            {/* WEB.1E — contextual descriptor: MASTER BRAND = KAVTRIS; the
                descriptor is HTML/CSS copy, never baked into the logo asset. */}
            <BrandDescriptor className="mt-1 min-[1180px]:mt-1.5" />
          </span>
          <span data-testid="header-network-signature" className="hidden items-center gap-3 border-l border-kavtris-blue/55 pl-4 text-[0.62rem] font-bold uppercase leading-4 tracking-[0.17em] text-white/58 min-[1320px]:inline-flex">
            <span>
              Integrante da
              <span className="block text-white/72">Rede Qualidade é Vida</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-4 min-[1180px]:flex 2xl:gap-5">
          {navigationLinks.map((link) => (
            <Link key={`${link.href}-${link.label}`} href={link.href} className="rounded-sm px-0.5 text-[13px] font-semibold text-white/84 transition hover:text-kavtris-blueLight focus-visible:text-kavtris-blueLight 2xl:text-sm">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            href="/#contacto"
            className="hidden border border-kavtris-blueLight/80 bg-kavtris-blue px-5 py-2.5 text-white shadow-[0_10px_26px_rgba(6,90,253,0.28)] transition hover:border-kavtris-blueLight hover:bg-[#0B5EFF] hover:shadow-[0_14px_30px_rgba(6,90,253,0.36)] min-[1180px]:inline-flex"
          >
            Pedir demonstração
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
