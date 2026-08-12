"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { navigationLinks } from '@/lib/constants';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);

    if (restoreFocus) {
      // Restoring focus keeps keyboard users at the menu trigger after Escape or backdrop close.
      window.setTimeout(() => {
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu-panel"]')?.focus();
      }, 0);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    // Conteúdo de fundo não deve receber foco nem ser lido enquanto o menu estiver aberto.
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    background.forEach((el) => {
      el.inert = true;
    });

    // Foco inicial dentro da superfície interativa do menu.
    window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    }, 0);

    return () => {
      background.forEach((el) => {
        el.inert = false;
      });
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeMenu]);

  return (
    <div className="min-[1180px]:hidden">
      <Button
        type="button"
        variant="ghost"
        className="rounded-full border border-borderline bg-white px-4 py-2 text-navy-800"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          tabIndex={-1}
          className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/10 bg-navy-900 p-4 text-white shadow-2xl transition duration-200 sm:inset-x-5"
        >
          <nav aria-label="Menu móvel" className="grid gap-2">
            {navigationLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/85 hover:bg-white/10"
                onClick={() => closeMenu()}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p data-testid="mobile-network-signature" className="mb-3 rounded-2xl border border-kavtris-blue/20 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
              Integrante da Rede Qualidade é Vida
            </p>
            <Button href="/#contacto" className="w-full justify-center" onClick={() => closeMenu()}>
              Pedir demonstração
            </Button>
          </div>
        </div>
      ) : null}

      {open ? <button type="button" className="fixed inset-0 z-40 cursor-default bg-navy-950/35" aria-label="Fechar menu" onClick={() => closeMenu(true)} /> : null}
    </div>
  );
}
