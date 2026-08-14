import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealOnce } from '@/components/shared/RevealOnce';
import { Hero } from '@/features/home/components/Hero';
import { CredibilityBar } from '@/features/home/components/CredibilityBar';
import { CustomerPathSelector } from '@/features/home/components/CustomerPathSelector';
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
 * WEB.1F.5 — approved simplified homepage architecture:
 * Header · Hero · Credibility strip · Como funciona (customer-path selector) ·
 * Rede Qualidade é Vida · Contacto · The Meaning Behind KAVTRIS · Footer.
 *
 * The old homepage sections are intentionally removed by owner decision:
 * full business-discovery carousel, products carousel, old "Como trabalhamos"
 * process section and old "Engenharia por trás" section (see
 * OLD_HOME_*_REMOVED_BY_OWNER = YES). Their purpose now lives on /produtos
 * (business/system modes) and /empresas. Home orients; Products explores.
 */
export function HomePageView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <CustomerPathSelector />
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
