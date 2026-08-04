import { describe, expect, it } from 'vitest';
import { resolveContactIntent } from '@/features/contact/utils/resolveContactIntent';

function params(value: string) {
  return new URLSearchParams(value);
}

describe('resolveContactIntent', () => {
  it('resolves general contact when no supported query parameter is present', () => {
    expect(resolveContactIntent(params(''))).toEqual({ type: 'general' });
    expect(resolveContactIntent(params('tipo=desconhecido'))).toEqual({ type: 'general' });
  });

  it('resolves product-specific contact', () => {
    expect(resolveContactIntent(params('produto=fieldops'))).toEqual({
      type: 'product',
      productSlug: 'fieldops'
    });
  });

  it('resolves enterprise contact while preserving a product slug when present', () => {
    expect(resolveContactIntent(params('tipo=empresa&produto=fieldops'))).toEqual({
      type: 'enterprise',
      productSlug: 'fieldops'
    });
  });

  it('resolves custom-solution contact while preserving a product slug when present', () => {
    expect(resolveContactIntent(params('tipo=personalizada&produto=fieldops'))).toEqual({
      type: 'custom-solution',
      productSlug: 'fieldops'
    });
  });
});
