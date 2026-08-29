'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';

const fieldClasses =
  'mt-2 w-full rounded-xl border border-navy-950/15 bg-white px-4 py-3 text-base text-navy-900 shadow-sm placeholder:text-muted/70 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/20';

export function CompanyBootstrapForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const form = new FormData(event.currentTarget);
    const nif = String(form.get('nif') || '').trim();

    try {
      const response = await fetch('/api/account/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || '').trim(),
          nif: nif || null
        })
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        setError(result?.error?.message || 'Não foi possível criar a empresa.');
        return;
      }

      router.refresh();
    } catch {
      setError('Não foi possível contactar o serviço. Tente novamente.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-semibold text-navy-800">
        Nome da empresa
        <input
          className={fieldClasses}
          name="name"
          type="text"
          autoComplete="organization"
          minLength={2}
          maxLength={120}
          required
        />
      </label>

      <label className="block text-sm font-semibold text-navy-800">
        NIF <span className="font-normal text-muted">(opcional)</span>
        <input
          className={fieldClasses}
          name="nif"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          minLength={9}
          maxLength={32}
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-red-700/20 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'A criar…' : 'Criar empresa'}
      </Button>
    </form>
  );
}
