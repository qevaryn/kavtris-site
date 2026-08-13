import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealOnce } from '@/components/shared/RevealOnce';
import { Hero } from '@/features/home/components/Hero';
import { CredibilityBar } from '@/features/home/components/CredibilityBar';
import { ProcessTimeline } from '@/features/home/components/ProcessTimeline';
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts';
import { EnterpriseDetails } from '@/features/enterprise/components/EnterprisePreview';
import { NetworkPreview } from '@/features/home/components/NetworkPreview';
import { Contact } from '@/features/contact/components/ContactForm';
import { MeaningBehindKavtris } from '@/features/home/components/MeaningBehindKavtris';
import { brandTagline, companyName, siteUrl } from '@/lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyName,
  url: siteUrl,
  description:
    'Desenvolvimento de sistemas web, automação de processos, integrações, aplicações empresariais e qualidade de software para empresas em Portugal.',
  slogan: brandTagline,
  areaServed: 'PT'
};

/**
 * WEB.1A — approved homepage structure:
 * Header · Hero · How we work (diagnosis → solution) · Products & Solutions ·
 * Engineering · Rede Qualidade é Vida · Contact · Footer.
 *
 * The Solution Finder ("Descobrir solução") is intentionally NOT rendered on the
 * homepage (SOLUTION_FINDER_HOMEPAGE_RENDERED = NO). Its component, data and tests
 * are preserved for reuse (SOLUTION_FINDER_CODE_DELETED = NO).
 */
export function HomePageView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <ProcessTimeline />
        <FeaturedProducts />
        <EnterpriseDetails />
        <NetworkPreview />
        <Contact />
        {/* WEB.1E — institutional/signature closing before the Footer. */}
        <MeaningBehindKavtris />
      </main>
      {/* WEB.1D — one subtle whole-block footer reveal (FOOTER_WHOLE_REVEAL = YES). */}
      <RevealOnce testId="reveal-footer">
        <Footer />
      </RevealOnce>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
