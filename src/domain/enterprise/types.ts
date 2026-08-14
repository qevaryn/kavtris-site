export interface EnterprisePillar {
  id: string;
  title: string;
  description: string;
}

export interface EnterpriseCapabilityGroup {
  id: string;
  title: string;
  description: string;
  /** WEB.1F.6 — concise "why it matters" line for the expanded accordion state. */
  why?: string;
  items: string[];
}

export interface CommercialClarityItem {
  id: string;
  title: string;
  description: string;
}
