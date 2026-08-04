import type { ContactApiResponse, ContactFormValues } from '@/domain/contact';

/**
 * Browser-side adapter for the public contact endpoint.
 * UI state stays in ContactForm; this function only preserves request/response handling.
 */
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
