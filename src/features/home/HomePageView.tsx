import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/features/home/components/Hero';
import { CredibilityBar } from '@/features/home/components/CredibilityBar';
import { SolutionFinder } from '@/features/home/components/SolutionFinder';
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts';
import { ProcessTimeline } from '@/features/home/components/ProcessTimeline';
import { EnterpriseDetails } from '@/features/enterprise/components/EnterprisePreview';
import { TrustAndCompany } from '@/features/home/components/TrustAndCompany';
import { Contact } from '@/features/contact/components/ContactForm';
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

export function HomePageView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <SolutionFinder />
        <FeaturedProducts />
        <ProcessTimeline />
        <EnterpriseDetails />
        <TrustAndCompany />
        <Contact />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
