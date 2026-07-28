import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { navigationLinks } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-navy-950/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex min-w-0 items-center" aria-label="Qualidade é Vida Tech - início">
          <Logo priority />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/75 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contacto" className="px-4 py-2 md:hidden" aria-label="Pedir uma análise">
            Análise
          </Button>
          <Button href="#contacto" className="hidden md:inline-flex">
            Pedir uma análise
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
