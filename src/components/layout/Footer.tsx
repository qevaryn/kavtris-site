import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { companyName, socialLinks } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div>
            <Logo />
          </div>

          <p className="text-sm leading-7 text-white/75 lg:text-center">Qualidade de software que impulsiona o seu negócio.</p>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={socialLinks.linkedin} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Gabriel Dias de Souza">
              LinkedIn
            </Button>
            <Button href={socialLinks.github} variant="secondary" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Gabriel Dias de Souza">
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
