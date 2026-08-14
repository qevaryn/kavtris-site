import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import { ProductsModeSelector } from '@/features/catalog/components/responsive/ProductsModeSelector';
import { BusinessDiscovery } from '@/features/catalog/components/responsive/BusinessDiscovery';
import { ProductCatalogClient } from '@/features/catalog/components/responsive/ProductCatalogClient';

type CatalogPageViewProps = {
  searchParams: { modo?: string };
};

/**
 * WEB.1F.5 — /produtos mode architecture.
 *
 * The URL query is the canonical shareable representation of the chosen path:
 *
 *   /produtos                 → STATE 1: mode selector (the customer chooses first)
 *   /produtos?modo=negocio    → STATE 2: business-based discovery ONLY
 *   /produtos?modo=sistemas   → STATE 3: system catalog ONLY
 *
 * This is an onboarding gate, not a lock: Header/Footer/Back remain fully
 * available. Invalid/unknown `?modo=` values fall back to the selector.
 */
export function CatalogPageView({ searchParams }: CatalogPageViewProps) {
  const mode = searchParams.modo;

  let content: ReactNode;
  if (mode === 'negocio') {
    content = <BusinessDiscovery />;
  } else if (mode === 'sistemas') {
    content = <ProductCatalogClient />;
  } else {
    // Default entry (and invalid-mode fallback): the two-choice selector.
    content = <ProductsModeSelector />;
  }

  return (
    <>
      <Header />
      <main>
        {/* WEB.1F.4 — explicit Back/Forward (fallback Início on direct entry). */}
        <div className="border-b border-navy-900/5 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 py-3 sm:px-8 lg:px-16">
            <ContextBackForwardControls fallbackHref="/" />
          </div>
        </div>
        {content}
      </main>
      <Footer />
    </>
  );
}

