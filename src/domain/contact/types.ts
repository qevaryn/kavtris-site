export type ContactIntent =
  | { type: 'general'; productSlug?: string }
  | { type: 'product'; productSlug: string }
  | { type: 'enterprise'; productSlug?: string }
  | { type: 'custom-solution'; productSlug?: string };
