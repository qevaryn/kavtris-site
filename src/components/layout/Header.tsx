import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy-950/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy-950/90">
      <div className="container-wide flex min-h-[68px] items-center justify-between gap-4 py-3 xl:min-h-[76px]">
        <Link href="#inicio" className="flex min-w-0 items-center" aria-label="Qevaryn Systems - início">
          <Logo priority />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-5 xl:flex 2xl:gap-6">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/75 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contacto" className="px-4 py-2 xl:hidden" aria-label="Falar sobre um projeto">
            Projeto
          </Button>
          <Button href="#contacto" className="hidden xl:inline-flex">
            Falar sobre um projeto
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
