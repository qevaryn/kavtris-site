/**
 * Commercial intent resolved from public URL parameters.
 * This keeps CTA links stable while allowing the form to preselect product,
 * enterprise or custom-solution contexts without changing the API payload.
 */
export type ContactIntent =
  | { type: 'general'; productSlug?: string }
  | { type: 'product'; productSlug: string }
  | { type: 'enterprise'; productSlug?: string }
  | { type: 'custom-solution'; productSlug?: string };
