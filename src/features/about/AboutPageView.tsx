import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/layout/Logo';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import { companyName, siteUrl } from '@/lib/constants';

const founderLinkedIn = 'https://www.linkedin.com/in/gabrielsouza80/';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyName,
  url: siteUrl,
  description:
    'Desenvolvimento de sistemas web, automação de processos, integrações e qualidade de software para empresas em Portugal.',
  areaServed: 'PT'
};

const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gabriel Dias de Souza',
  jobTitle: 'Fundador e QA Engineer',
  worksFor: {
    '@type': 'Organization',
    name: companyName,
    url: siteUrl
  },
  sameAs: [founderLinkedIn]
};

const timelineSteps = [
  'Primeiros passos e observação de problemas reais',
  'Conselhos e apoio de pais, familiares e amigos',
  'Experiência profissional em Quality Assurance',
  'Nascimento do projeto inicial',
  'Construção e evolução dos produtos',
  'Evolução da marca para KAVTRIS',
  'Visão de futuro com melhoria contínua'
];

export function AboutPageView() {
  return (
    <>
      <Header />
      <main className="bg-paper">
        {/* WEB.1F.4 — explicit Back/Forward (fallback Início on direct entry). */}
        <div className="border-b border-navy-900/5 bg-white">
          <div className="container-section py-3">
            <ContextBackForwardControls fallbackHref="/" />
          </div>
        </div>
        <section id="historia" className="bg-navy-950 py-12 text-white sm:py-16">
          <div className="container-section">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-kavtris-blueLight">A nossa história</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-[2.875rem]">
              Construída com propósito, qualidade e vontade de servir.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
              A história que deu origem à KAVTRIS começou com uma ideia simples: a tecnologia deve facilitar o trabalho das pessoas, reduzir dificuldades e ajudar
              empresas a crescer com mais organização e confiança.
            </p>
            <p className="mt-3 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
              Antes de existir uma estrutura, um produto ou uma marca definida, existiam experiências profissionais, conversas, anotações e o
              desejo de construir algo que realmente tivesse utilidade.
            </p>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14 lg:py-16">
          <div className="container-section grid gap-4">
            <article className="rounded-[1.35rem] border border-borderline bg-paper p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-3xl leading-tight text-navy-900">Onde tudo começou</h2>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                O início deste projeto não aconteceu com todas as respostas prontas. Começou enquanto Gabriel Dias de Souza trabalhava como QA Engineer
                e descobria que qualidade de software significava muito mais do que encontrar erros.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                Qualidade também significa proteger o tempo das pessoas, evitar frustrações, tornar processos mais claros e criar sistemas que
                contribuam verdadeiramente para o trabalho de quem os utiliza.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                Foi dessa compreensão que surgiu a vontade de criar uma empresa capaz de unir tecnologia, responsabilidade e serviço.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-3xl leading-tight text-navy-900">Uma ideia construída também através da escuta</h2>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                Nos primeiros passos, a ideia foi sendo partilhada com amigos e familiares. Os conselhos dos pais, as conversas com amigos e as
                diferentes opiniões recebidas ajudaram Gabriel a observar o projeto com mais maturidade.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                Alguns conselhos trouxeram incentivo. Outros trouxeram perguntas importantes. Todos contribuíram para mostrar que uma empresa não
                se constrói apenas com uma boa ideia, mas também com paciência, responsabilidade, aprendizagem e disposição para ouvir.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                A KAVTRIS continua a crescer dessa forma: avançando com convicção, mas sem deixar de aprender com as pessoas que fazem parte da
                caminhada.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-3xl leading-tight text-navy-900">Da qualidade de software nasceu uma visão maior</h2>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">A experiência em Quality Assurance foi o ponto de partida.</p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                No início, o trabalho parecia estar concentrado principalmente em testes e validação. Com o tempo, Gabriel percebeu que a qualidade
                começa muito antes de um teste e continua muito depois do lançamento de um sistema.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                Ela está presente na compreensão do problema, na forma como a solução é planeada, na experiência de quem a utiliza e na
                responsabilidade de acompanhar o que foi construído.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                A KAVTRIS nasceu para aplicar essa visão completa: desenvolver soluções que não sejam apenas tecnicamente funcionais, mas que façam
                sentido para as empresas e para as pessoas.
              </p>
            </article>

            <article className="rounded-[1.35rem] border border-kavtris-blue/20 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-3xl leading-tight text-navy-900">Valores que orientam a forma de trabalhar</h2>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                A fé cristã faz parte da história do fundador e inspira valores como serviço, honestidade, responsabilidade, cuidado e respeito
                pelas pessoas.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                A KAVTRIS trabalha com clientes, profissionais e parceiros de diferentes histórias e crenças, tratando todos com o mesmo respeito e
                compromisso.
              </p>
              <p className="mt-3 max-w-[68ch] text-sm leading-7 text-muted sm:text-base">
                O propósito não é impor uma convicção, mas demonstrar através do trabalho os valores que orientam a empresa: servir bem, agir com
                integridade e procurar entregar qualidade em tudo o que estiver ao nosso alcance.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-paper py-12 sm:py-14">
          <div className="container-section grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <article className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm sm:p-6" data-testid="about-founder-card">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-borderline bg-navy-950">
                  <Image
                    src="/images/gabriel.webp"
                    alt="Gabriel Dias de Souza, Fundador e QA Engineer da KAVTRIS"
                    fill
                    sizes="80px"
                    className="object-cover object-[50%_28%]"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-navy-900">Gabriel Dias de Souza</h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-kavtris-blue">Fundador e QA Engineer</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Casado e músico, Gabriel encontrou na tecnologia e na qualidade de software uma forma de unir criatividade, responsabilidade e
                serviço às pessoas.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                A sua experiência envolve testes, automação, análise de requisitos e participação em projetos de software, aplicando essa visão na
                construção e evolução do projeto que hoje é a KAVTRIS.
              </p>
              <div className="mt-4">
                <Button
                  href={founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  className="border border-navy-950/15 bg-white text-navy-900 hover:bg-kavtris-blue/10"
                >
                  Ver perfil profissional no LinkedIn
                </Button>
              </div>
            </article>

            <article className="rounded-[1.35rem] border border-kavtris-blue/20 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-2xl font-semibold text-navy-900">Não construímos sozinhos.</h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                A KAVTRIS faz parte da Rede Qualidade e Vida, uma iniciativa formada por pessoas e projetos que procuram servir com
                responsabilidade em diferentes áreas.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                A tecnologia é um dos caminhos dessa visão. Outros segmentos podem contribuir através de cuidados, mobilidade, serviços e novas
                iniciativas que venham a ser construídas.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Não afirmamos ser perfeitos. Procuramos aprender, melhorar e entregar o melhor possível em cada responsabilidade assumida.
              </p>
              <div className="mt-4">
                <Logo variant="network" className="max-w-[210px]" />
              </div>
              <div className="mt-4">
                <Button href="/rede-qualidade-e-vida" className="w-full sm:w-auto">
                  Conhecer a Rede Qualidade e Vida
                </Button>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="container-section">
            <div className="rounded-[1.35rem] border border-borderline bg-paper p-5 shadow-sm sm:p-5">
              <h2 className="font-display text-3xl leading-tight text-navy-900">Linha do tempo em construção</h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                Esta linha ajuda a organizar futuros registos visuais reais. Quando existirem novas fotografias próprias, os blocos abaixo serão
                atualizados sem alterar o contexto histórico.
              </p>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {timelineSteps.map((step) => (
                  <li key={step} className="rounded-2xl border border-borderline bg-white px-4 py-3 text-sm font-medium text-navy-900">
                    <CheckCircle2 className="mr-2 inline-block h-4 w-4 text-kavtris-blue" aria-hidden="true" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-navy-950 py-14 text-white sm:py-16">
          <div className="container-section rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl sm:p-6">
            <h2 className="max-w-3xl font-display text-3xl leading-tight">A nossa história ainda está no começo.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/74 sm:text-base">
              Estamos a construir com cuidado, a ouvir pessoas, a aprender com cada etapa e a transformar experiência em soluções que possam ajudar
              empresas reais.
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/74 sm:text-base">
              Mais do que criar software, queremos construir relações de confiança e sistemas que tenham valor na vida de quem os utiliza.
            </p>
            <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
              {/* WEB.1F.5 — the public homepage label is now "Como funciona"; the
                  About final CTA follows the same terminology. */}
              <Button href="/#como-funciona" className="text-navy-950">
                Ver como funciona
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/#contacto" variant="secondary">
                Falar com a KAVTRIS
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }} />
    </>
  );
}
