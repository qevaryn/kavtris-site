import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { companyName, socialLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-gold-600/35 bg-gold-600/10 text-sm font-semibold text-gold-500">QV</span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90">Qualidade é Vida</p>
                <p className="text-xs tracking-[0.32em] text-gold-500">TECH</p>
              </div>
            </div>
          </div>

          <p className="text-sm leading-7 text-white/75 lg:text-center">Qualidade de software que impulsiona o seu negócio.</p>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={socialLinks.linkedin} variant="secondary" target="_blank" rel="noreferrer">
              LinkedIn
            </Button>
            <Button href={socialLinks.github} variant="secondary" target="_blank" rel="noreferrer">
              GitHub
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>Portugal · © {new Date().getFullYear()} {companyName}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="transition hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
