import type { ContactIntent } from '@/domain/contact/types';

/**
 * Resolves supported commercial intent parameters from the public URL.
 * Unknown values fall back to the general contact state.
 */
export function resolveContactIntent(searchParams: URLSearchParams): ContactIntent {
  const productSlug = searchParams.get('produto')?.trim() || undefined;
  const selectedType = searchParams.get('tipo');

  if (selectedType === 'empresa') {
    return { type: 'enterprise', productSlug };
  }

  if (selectedType === 'personalizada') {
    return { type: 'custom-solution', productSlug };
  }

  // WEB.1F.3 — "Explicar o meu negócio": the visitor knows their business but
  // not which system they need ("Ainda não sei qual solução preciso").
  if (selectedType === 'descobrir') {
    return { type: 'discovery', productSlug };
  }

  if (productSlug) {
    return { type: 'product', productSlug };
  }

  return { type: 'general' };
}
