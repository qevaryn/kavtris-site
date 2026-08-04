export type ProductSector =
  | 'hospitality'
  | 'restaurant'
  | 'retail'
  | 'services'
  | 'field'
  | 'business'
  | 'customer';

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
  benefits: string[];
  features: string[];
  optionalEquipment?: string[];
  technicalDetails: string[];
  mockupType: 'field' | 'stock' | 'hotel' | 'kitchen' | 'ops' | 'portal';
}
