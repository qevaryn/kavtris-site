"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { navigationLinks } from '@/lib/constants';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
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

      <div
        id="mobile-menu-panel"
        className={`fixed inset-x-4 top-20 z-50 rounded-3xl border border-borderline bg-white p-4 shadow-2xl transition duration-200 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
      >
        <nav aria-label="Menu móvel" className="grid gap-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-navy-800 hover:bg-navy-950/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 border-t border-borderline pt-4">
          <Button href="#contacto" className="w-full justify-center" onClick={() => setOpen(false)}>
            Pedir uma análise
          </Button>
        </div>
      </div>

      {open ? <button type="button" className="fixed inset-0 z-40 cursor-default bg-navy-950/35" aria-label="Fechar menu" onClick={() => setOpen(false)} /> : null}
    </div>
  );
}
