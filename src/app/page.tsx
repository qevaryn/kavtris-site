import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { Problems } from '@/components/sections/Problems';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Experience } from '@/components/sections/Experience';
import { Differentials } from '@/components/sections/Differentials';
import { Founder } from '@/components/sections/Founder';
import { Contact } from '@/components/sections/Contact';
import { companyName, siteUrl } from '@/lib/constants';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyName,
  url: siteUrl,
  description:
    'Serviços de QA Manual, automação de testes, melhoria de processos e qualidade de software para empresas e equipas de desenvolvimento.',
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
        <Process />
        <Experience />
        <Differentials />
        <Founder />
        <Contact />
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
