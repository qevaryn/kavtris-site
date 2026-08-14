import { describe, expect, it } from 'vitest';
import { products } from '@/features/products/data/products';

/**
 * WEB.1F.7 — structural guarantee for the visual level configurator.
 *
 * Every current product must define the three configuration levels
 * (Essencial / Crescimento / Empresarial), each with a meaningful visual
 * state. A missing level or an unchanged visual on ANY product fails here
 * (ALL_PRODUCTS_HAVE_3_LEVELS = YES, ALL_PRODUCTS_HAVE_3_LEVEL_VISUALS = YES).
 */
describe('WEB.1F.7 — product levels', () => {
  it('cada produto define exatamente os 3 níveis na ordem Esperada', () => {
    expect(products.length).toBeGreaterThanOrEqual(6);

    for (const product of products) {
      const ids = product.levels.map((level) => level.id);
      expect(ids, `${product.slug} deve ter os 3 níveis`).toEqual(['essential', 'growth', 'enterprise']);
      expect(product.levels.map((level) => level.name), `${product.slug} nomes`).toEqual([
        'Essencial',
        'Crescimento',
        'Empresarial'
      ]);
    }
  });

  it('cada nível tem tagline, highlights e um estado visual completo', () => {
    for (const product of products) {
      for (const level of product.levels) {
        expect(level.tagline.length, `${product.slug}/${level.id} tagline`).toBeGreaterThan(0);
        expect(level.highlights.length, `${product.slug}/${level.id} highlights`).toBeGreaterThanOrEqual(4);
        expect(level.visual.rows.length, `${product.slug}/${level.id} rows`).toBeGreaterThanOrEqual(3);
        expect(level.visual.tiles.length, `${product.slug}/${level.id} tiles`).toBeGreaterThanOrEqual(4);
        expect(level.visual.statusLabel.length, `${product.slug}/${level.id} status`).toBeGreaterThan(0);
      }
    }
  });

  it('o estado visual muda efetivamente entre níveis em todos os produtos', () => {
    for (const product of products) {
      const signatures = product.levels.map((level) =>
        JSON.stringify([level.visual.rows, level.visual.tiles, level.visual.statusLabel, level.visual.showIntegration])
      );
      expect(new Set(signatures).size, `${product.slug} deve ter 3 visuais distintos`).toBe(3);
    }
  });

  it('os níveis Empresarial só exibem integrações quando o produto suporta', () => {
    for (const product of products) {
      const enterprise = product.levels.find((level) => level.id === 'enterprise');
      expect(enterprise, `${product.slug} enterprise level`).toBeDefined();
      // All current products support integrations in their technical details;
      // if a future product does not, its enterprise visual must not claim it.
      const supportsIntegrations = product.technicalDetails.some((detail) =>
        /integra|api/i.test(detail)
      );
      if (!supportsIntegrations) {
        expect(enterprise?.visual.showIntegration, `${product.slug} não deve inventar integrações`).toBe(false);
      }
    }
  });

  it('nenhum rótulo de integração genérica aparece em produtos sem suporte (WEB.1F.8 §85)', () => {
    for (const product of products) {
      const supportsIntegrations = product.technicalDetails.some((detail) => /integra|api/i.test(detail));
      const labelStrings = product.levels.flatMap((level) => [...level.highlights, ...level.visual.tiles]);
      for (const label of labelStrings) {
        if (!supportsIntegrations) {
          expect(/integra|api/i.test(label), `${product.slug} tem rótulo de integração não suportado: "${label}"`).toBe(false);
        }
      }
    }
  });
});
