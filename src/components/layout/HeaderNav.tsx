"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/lib/constants';
import { cn } from '@/components/shared/cn';

/**
 * WEB.1F.4 — desktop header navigation with route-aware active state.
 * Route pages own the active signal; the homepage owns "Início" (/ and
 * same-page Home anchors never create a second page-active state).
 */
export function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/#inicio') {
      return pathname === '/';
    }
    if (href === '/produtos') {
      return pathname === '/produtos' || pathname.startsWith('/produtos/');
    }
    if (href === '/empresas' || href === '/sobre') {
      return pathname === href;
    }
    return false;
  };

  return (
    <nav aria-label="Navegação principal" className="hidden items-center gap-4 min-[1180px]:flex 2xl:gap-5">
      {navigationLinks.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative rounded-sm px-0.5 text-[13px] font-semibold transition 2xl:text-sm',
              active
                ? 'text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-kavtris-blueLight'
                : 'text-white/84 hover:text-kavtris-blueLight'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
