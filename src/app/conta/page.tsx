import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { getServerSession } from '@/server/auth/session';
import { resolveTenantContext } from '@/server/identity/tenant-service';
import { CompanyBootstrapForm } from '@/features/account/CompanyBootstrapForm';
import { SignOutButton } from '@/features/account/SignOutButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Conta',
  description: 'Área do utilizador KAVTRIS.',
  robots: {
    index: false,
    follow: false
  }
};

const roleLabels: Record<string, string> = {
  PROPRIETARIO: 'Proprietário',
  ADMINISTRADOR: 'Administrador',
  COLABORADOR: 'Colaborador'
};

export default async function ContaPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/entrar');
  }

  const account = session.user;
  const context = await resolveTenantContext(account.id);

  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-navy-950/10 bg-white/60">
        <div className="container-wide flex h-[72px] items-center justify-between">
          <Link href="/" aria-label="KAVTRIS — página inicial">
            <Logo variant="kavtris" />
          </Link>
          <SignOutButton />
        </div>
      </header>

      <section className="container-section py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-kavtris-blue">
            Área do utilizador
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-navy-900 sm:text-5xl">
            A sua conta
          </h1>

          <div className="mt-10 rounded-[1.75rem] border border-navy-950/10 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-lg font-semibold text-navy-900">Identidade</h2>
            <dl className="mt-4 space-y-3 text-navy-800">
              <div>
                <dt className="text-sm text-muted">Nome</dt>
                <dd className="text-base">{account.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd className="text-base">{account.email}</dd>
              </div>
            </dl>
          </div>

          {context ? (
            <div className="mt-6 rounded-[1.75rem] border border-navy-950/10 bg-white p-6 shadow-card sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-navy-900">Empresa</h2>
                <span className="rounded-full bg-kavtris-blue/10 px-3 py-1 text-sm font-semibold text-kavtris-blue">
                  {roleLabels[context.membership.role] ?? context.membership.role}
                </span>
              </div>
              <dl className="mt-4 space-y-3 text-navy-800">
                <div>
                  <dt className="text-sm text-muted">Nome</dt>
                  <dd className="text-base">{context.company.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">NIF</dt>
                  <dd className="text-base">{context.company.nif ?? '—'}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-navy-950/10 bg-white p-6 shadow-card sm:p-9">
              <h2 className="text-lg font-semibold text-navy-900">Criar empresa</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Ainda não tem uma empresa associada. Crie a sua primeira empresa para começar a
                gerir a sua atividade na KAVTRIS.
              </p>
              <CompanyBootstrapForm />
            </div>
          )}

          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-navy-700 hover:text-kavtris-blue">
              Voltar ao site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
