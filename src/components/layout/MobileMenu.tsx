"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { navigationLinks } from '@/lib/constants';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);

    if (restoreFocus) {
      window.setTimeout(() => {
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu-panel"]')?.focus();
      }, 0);
    }
  };

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

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
          id="mobile-menu-panel"
          className="fixed inset-x-5 top-20 z-50 rounded-3xl border border-white/10 bg-navy-900 p-4 text-white shadow-2xl transition duration-200"
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
            <p data-testid="mobile-network-signature" className="mb-3 rounded-2xl border border-gold-500/20 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
              Operadora da Qualidade é Vida
            </p>
            <Button href="/#contacto" className="w-full justify-center" onClick={() => closeMenu()}>
              Explique o seu problema
            </Button>
          </div>
        </div>
      ) : null}

      {open ? <button type="button" className="fixed inset-0 z-40 cursor-default bg-navy-950/35" aria-label="Fechar menu" onClick={() => closeMenu(true)} /> : null}
    </div>
  );
}
