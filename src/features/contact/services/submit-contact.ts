import type { ContactApiResponse, ContactFormValues } from '@/domain/contact';

export async function submitContact(values: ContactFormValues) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  });

  const payload = (await response.json().catch(() => null)) as ContactApiResponse | null;

  if (!response.ok) {
    throw new Error(payload && !payload.ok ? payload.message : 'Não foi possível enviar o pedido.');
  }

  return payload;
}
