import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { Problems } from '@/components/sections/Problems';
import { Services } from '@/components/sections/Services';
import { Industries } from '@/components/sections/Industries';
import { Process } from '@/components/sections/Process';
import { Experience } from '@/components/sections/Experience';
import { EngagementModels } from '@/components/sections/EngagementModels';
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
        <Problems />
        <Services />
        <Industries />
        <Process />
        <Experience />
        <EngagementModels />
        <Network />
        <Founder />
        <Contact />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
