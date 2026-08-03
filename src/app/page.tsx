import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { ProblemSelector } from '@/components/sections/ProblemSelector';
import { SolutionExamples } from '@/components/sections/SolutionExamples';
import { Industries } from '@/components/sections/Industries';
import { InteractiveProductDemo } from '@/components/sections/InteractiveProductDemo';
import { BusinessSolutionWizard } from '@/components/sections/BusinessSolutionWizard';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { EnterpriseDetails } from '@/components/sections/EnterpriseDetails';
import { ConceptProducts } from '@/components/sections/ConceptProducts';
import { Experience } from '@/components/sections/Experience';
import { Network } from '@/components/sections/Network';
import { Founder } from '@/components/sections/Founder';
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
        <ProblemSelector />
        <SolutionExamples />
        <Industries />
        <InteractiveProductDemo />
        <BusinessSolutionWizard />
        <ProcessTimeline />
        <EnterpriseDetails />
        <ConceptProducts />
        <Experience />
        <Network />
        <Founder />
        <Contact />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
