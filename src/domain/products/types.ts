export type ProductSector =
  | 'hospitality'
  | 'restaurant'
  | 'retail'
  | 'services'
  | 'field'
  | 'business'
  | 'customer';

export type ProductLevelId = 'essential' | 'growth' | 'enterprise';

export interface ProductLevelVisualRow {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'sky';
}

/**
 * WEB.1F.7 — level-specific visual state.
 *
 * The product-level visual must VISIBLY change when the visitor switches
 * level (LEVEL_VISUAL_ACTUALLY_CHANGES = YES). All content here is derived
 * strictly from each product's own definition (features / technicalDetails /
 * fieldOpsConfigurations) — no invented capability is added.
 */
export interface ProductLevelVisual {
  /** Short label describing the operational focus of this level's screen. */
  focusLabel: string;
  /** Status rows rendered in the level mockup (3 per level). */
  rows: ProductLevelVisualRow[];
  /** Module tiles surfaced at this level, taken from the product's features. */
  tiles: string[];
  /** Live-status line at the bottom of the mockup. */
  statusLabel: string;
  /** Show the "Integrações" bar — only when the product supports integrations. */
  showIntegration: boolean;
}

/**
 * WEB.1F.7 — a solution adoption/configuration level (NOT a pricing plan).
 *
 * Levels express how a solution MAY start and how it MAY evolve. The final
 * composition is always adapted to the company's operation.
 */
export interface ProductLevel {
  id: ProductLevelId;
  name: 'Essencial' | 'Crescimento' | 'Empresarial';
  /** One-line supporting description of this adoption level. */
  tagline: string;
  /** Concise highlights (4+ items, subset of supported capabilities). */
  highlights: string[];
  visual: ProductLevelVisual;
}

export interface ProductConcept {
  slug: string;
  name: string;
  categoryLabel: string;
  label: string;
  sectors: ProductSector[];
  audience: string[];
  problem: string;
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  catalogImage?: string;
  catalogImageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  benefits: string[];
  features: string[];
  optionalEquipment?: string[];
  technicalDetails: string[];
  mockupType: 'field' | 'stock' | 'hotel' | 'kitchen' | 'ops' | 'portal';
  levels: ProductLevel[];
}
