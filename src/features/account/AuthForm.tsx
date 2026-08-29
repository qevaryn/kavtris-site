'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { authClient } from '@/features/account/auth-client';

type AuthMode = 'sign-in' | 'sign-up';

const fieldClasses =
  'mt-2 w-full rounded-xl border border-navy-950/15 bg-white px-4 py-3 text-base text-navy-900 shadow-sm placeholder:text-muted/70 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/20';

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');

    try {
      const result =
        mode === 'sign-up'
          ? await authClient.signUp.email({
              name: String(form.get('name') || '').trim(),
              email,
              password,
              callbackURL: '/conta'
            })
          : await authClient.signIn.email({
              email,
              password,
              callbackURL: '/conta'
            });

      if (result.error) {
        setError(
          mode === 'sign-in'
            ? 'Não foi possível iniciar sessão. Confirme o email e a palavra-passe.'
            : 'Não foi possível criar a conta. Confirme os dados ou utilize outro email.'
        );
        return;
      }

      router.replace('/conta');
      router.refresh();
    } catch {
      setError('O serviço de autenticação não está disponível. Tente novamente.');
    } finally {
      setIsPending(false);
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-paper p-6 shadow-card sm:p-9">
      <div className="mb-8 flex rounded-full bg-navy-950/5 p-1" role="group" aria-label="Escolher ação">
        <button
          type="button"
          onClick={() => changeMode('sign-in')}
          aria-pressed={mode === 'sign-in'}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
            mode === 'sign-in' ? 'bg-navy-950 text-white shadow-sm' : 'text-navy-700 hover:bg-white'
          }`}
        >
          Iniciar sessão
        </button>
        <button
          type="button"
          onClick={() => changeMode('sign-up')}
          aria-pressed={mode === 'sign-up'}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
            mode === 'sign-up' ? 'bg-navy-950 text-white shadow-sm' : 'text-navy-700 hover:bg-white'
          }`}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === 'sign-up' ? (
          <label className="block text-sm font-semibold text-navy-800">
            Nome
            <input
              className={fieldClasses}
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={120}
              required
            />
          </label>
        ) : null}

        <label className="block text-sm font-semibold text-navy-800">
          Email
          <input
            className={fieldClasses}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-navy-800">
          Palavra-passe
          <input
            className={fieldClasses}
            name="password"
            type="password"
            autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            minLength={12}
            maxLength={128}
            required
            aria-describedby={mode === 'sign-up' ? 'password-help' : undefined}
          />
          {mode === 'sign-up' ? (
            <span id="password-help" className="mt-2 block text-xs font-normal leading-5 text-muted">
              Utilize pelo menos 12 caracteres.
            </span>
          ) : null}
        </label>

        {error ? (
          <p className="rounded-xl border border-red-700/20 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending
            ? 'A processar…'
            : mode === 'sign-in'
              ? 'Entrar na conta'
              : 'Criar a minha conta'}
        </Button>
      </form>
    </div>
  );
}
