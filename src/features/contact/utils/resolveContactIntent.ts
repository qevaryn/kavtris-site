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

  if (productSlug) {
    return { type: 'product', productSlug };
  }

  return { type: 'general' };
}
