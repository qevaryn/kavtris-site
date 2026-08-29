import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { getServerSession } from '@/server/auth/session';
import { AuthForm } from '@/features/account/AuthForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Aceda à sua conta KAVTRIS.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function EntrarPage() {
  const session = await getServerSession();

  if (session) {
    redirect('/conta');
  }

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-navy-950/10 bg-white/60">
        <div className="container-wide flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="KAVTRIS — página inicial">
            <Logo variant="kavtris" />
          </Link>
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-navy-700 hover:text-kavtris-blue"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <section className="container-section py-14 sm:py-20">
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-kavtris-blue">
            Área do utilizador
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
            Aceda à sua conta
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Inicie sessão ou crie a sua conta para gerir a sua empresa na KAVTRIS.
          </p>

          <div className="mt-10">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
}
