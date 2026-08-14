"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/lib/constants';
import { cn } from '@/components/shared/cn';

type HomeSectionId = 'inicio' | 'como-funciona' | 'contacto';

/**
 * WEB.1F.4/6 — desktop header navigation with route-aware active state PLUS
 * homepage scrollspy (WEB.1F.6).
 *
 * Route pages own the active signal:
 *   /produtos* → Produtos | /empresas* → Engenharia | /sobre* → Sobre
 *
 * On the homepage, a scrollspy observes the navigation destinations that are
 * real sections of the page (`#inicio`, `#como-funciona`, `#contacto`):
 *   - viewport top/hero      → Início ACTIVE
 *   - inside #como-funciona  → Como funciona ACTIVE
 *   - contact section        → Contacto ACTIVE
 * The section signal overrides the generic "Início" route state so the header
 * always describes what the visitor is actually looking at. Decorative
 * sections (Rede, Significado) never trigger noisy switching.
 *
 * Technical behavior: IntersectionObserver (no dependency), no history
 * entries are created by active-state changes, direct anchors/manual scroll/
 * back-forward all update through the same observer.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const [sectionActive, setSectionActive] = useState<HomeSectionId | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      return undefined;
    }

    const ids: HomeSectionId[] = ['inicio', 'como-funciona', 'contacto'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)
          .sort((a, b) => {
            const aTop = document.getElementById(a)?.getBoundingClientRect().top ?? Number.MAX_VALUE;
            const bTop = document.getElementById(b)?.getBoundingClientRect().top ?? Number.MAX_VALUE;
            return aTop - bTop;
          });

        if (intersecting.length > 0) {
          // The section closest to the top of the band is the one the visitor
          // is currently reading.
          setSectionActive(intersecting[0] as HomeSectionId);
        }
      },
      // The band sits just below the fixed header (≈84px) and occupies the
      // upper part of the viewport.
      { rootMargin: '-84px 0px -62% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const routeActive = (href: string): boolean => {
    if (href === '/produtos') {
      return pathname === '/produtos' || pathname.startsWith('/produtos/');
    }
    return pathname === href;
  };

  const activeState = (href: string): { active: boolean; current?: 'page' | 'true' } => {
    // Homepage anchors: the scrollspy owns the active signal on `/`.
    if (href === '/#inicio') {
      const sectionOverride = sectionActive === 'como-funciona' || sectionActive === 'contacto';
      return { active: pathname === '/' && !sectionOverride, current: 'page' };
    }
    if (href === '/#como-funciona') {
      return {
        active: pathname === '/' && sectionActive === 'como-funciona',
        current: 'true'
      };
    }
    if (href === '/#contacto') {
      return {
        active: pathname === '/' && sectionActive === 'contacto',
        current: 'true'
      };
    }
    return { active: routeActive(href), current: 'page' };
  };

  return (
    <nav aria-label="Navegação principal" className="hidden items-center gap-4 min-[1180px]:flex 2xl:gap-5">
      {navigationLinks.map((link) => {
        const { active, current } = activeState(link.href);

        return (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            aria-current={active ? current : undefined}
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
