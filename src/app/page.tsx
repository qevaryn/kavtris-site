import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { SolutionFinder } from '@/components/sections/SolutionFinder';
import { FeaturedProducts } from '@/components/products/FeaturedProducts';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { EnterpriseDetails } from '@/components/sections/EnterpriseDetails';
import { TrustAndCompany } from '@/components/sections/TrustAndCompany';
import { Contact } from '@/components/sections/Contact';
import { brandTagline, companyName, siteUrl } from '@/lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyName,
  url: siteUrl,
  description:
    'Desenvolvimento de sistemas web, automação de processos, integrações, aplicações empresariais e qualidade de software para empresas em Portugal.',
  slogan: brandTagline,
  areaServed: 'PT',
  sameAs: ['https://github.com/gabrielsouza80', 'https://www.linkedin.com/in/gabrielsouza80/']
};

export default function HomePage() {
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
