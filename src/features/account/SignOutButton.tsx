'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { authClient } from '@/features/account/auth-client';

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function signOut() {
    setIsPending(true);

    try {
      await authClient.signOut();
      router.replace('/entrar');
      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={signOut} disabled={isPending}>
      {isPending ? 'A terminar…' : 'Terminar sessão'}
    </Button>
  );
}
