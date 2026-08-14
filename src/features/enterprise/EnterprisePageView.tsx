import {
  ArrowRight,
  Cable,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Code2,
  FileText,
  GitBranch,
  Layers,
  ShieldCheck,
  SlidersHorizontal,
  TestTube2
} from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import {
  commercialClarityItems,
  enterpriseCapabilities,
  enterpriseDeliveryStages,
  enterpriseFitScenarios,
  enterpriseFoundations,
  enterpriseGovernanceItems
} from '@/features/enterprise/data/enterprise-details';

const foundationIcons = [ClipboardCheck, ShieldCheck, TestTube2, FileText];

const helpApproaches = [
  {
    title: 'Adaptar',
    description: 'Soluções existentes ajustadas ao seu processo.',
    icon: SlidersHorizontal
  },
  {
    title: 'Combinar',
    description: 'Vários produtos num conjunto que faz sentido.',
    icon: Layers
  },
  {
    title: 'Integrar',
    description: 'Ligar sistemas que hoje não comunicam.',
    icon: Cable
  },
  {
    title: 'Desenvolver',
    description: 'Construir tecnologia específica quando fizer sentido.',
    icon: Code2
  }
] as const;

/**
 * WEB.1F.3 — /empresas is the dedicated SERVICES page, business-first:
 * problem → how KAVTRIS helps → when it makes sense → how we work →
 * technical foundations → delivery/governance → commercial clarity →
 * trust → contact. Technical credibility is preserved, just sequenced
 * after the business understanding.
 */
export function EnterprisePageView() {
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
        {/* 1 — Hero (business-first) */}
        <section className="bg-navy-950 py-16 text-white sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-kavtris-blueLight">Engenharia</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
                Tecnologia adaptada à realidade da sua empresa.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                Conte-nos como a sua operação funciona. A KAVTRIS identifica oportunidades, adapta soluções existentes ou desenvolve a tecnologia necessária para melhorar processos reais.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Não precisa saber qual sistema precisa antes de falar connosco.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/?tipo=empresa#contacto" className="text-navy-950">
                  Falar sobre a minha empresa
                </Button>
                <Button href="#como-trabalhamos" variant="secondary">
                  Ver como trabalhamos
                </Button>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7FA8FF]">Como a KAVTRIS ajuda</p>
              <div className="mt-6 grid gap-3">
                {helpApproaches.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="rounded-2xl bg-navy-900/80 p-4 transition hover:bg-navy-900">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-kavtris-blue/30 bg-kavtris-blue/10 text-kavtris-blueLight">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-sm font-bold text-white">{title}</p>
                    </div>
                    <p className="mt-2 text-sm text-white/64">{description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-white/58">
                Sempre a partir do processo real da empresa — nunca do catálogo para a operação.
              </p>
            </div>
          </div>
        </section>

        {/* 2 — Problem recognition (WEB.1F.6: clear hierarchy — intro column +
            two-column signal grid, no 8 identical boxes). */}
        <section id="problemas-reconhecidos" className="bg-white py-16 sm:py-20">
          <div className="container-section grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Quando faz sentido</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Quando faz sentido falar com a KAVTRIS?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Se reconhece uma destas situações no dia a dia da sua empresa, a conversa pode ajudar a encontrar um caminho mais simples.
              </p>
              <p className="mt-6 rounded-2xl border border-kavtris-blue/25 bg-[#EAF1FC] p-4 text-sm leading-6 text-navy-800">
                Não precisa de um diagnóstico formal. Basta reconhecer o padrão para começar a conversa.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {enterpriseFitScenarios.map((scenario) => (
                <article
                  key={scenario}
                  className="flex gap-3 rounded-[1.25rem] border border-borderline bg-paper p-5 shadow-sm transition hover:border-kavtris-blue/40"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-kavtris-blue" aria-hidden="true" />
                  <p className="text-sm leading-6 text-navy-800">{scenario}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — How we work (WEB.1F.6: connected numbered flow, not 4 loose cards). */}
        <section id="como-trabalhamos" className="bg-mist py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Como trabalhamos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Um caminho claro, do problema ao funcionamento.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Antes de falar de tecnologia, entendemos o negócio. Depois avançamos por fases controladas.
              </p>
            </div>
            <div className="relative mt-8 grid gap-5 lg:grid-cols-4">
              {/* Progression line connecting the numbered nodes (desktop). */}
              <div
                aria-hidden="true"
                className="absolute inset-x-6 top-[2.625rem] hidden h-0.5 rounded-full bg-kavtris-blue/20 lg:block"
              />
              {enterpriseDeliveryStages.map((stage, index) => (
                <article key={stage.id} className="relative rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-mist bg-kavtris-blue text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy-950">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{stage.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-600">
              O objetivo do percurso é simples: começar por entender, definir antes de construir, validar em cada fase e evoluir com base no que foi acordado.
            </p>
          </div>
        </section>

        {/* 4 — Technical foundations (WEB.1F.6: added intro copy + icon badges). */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Base do projeto</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Fundamentos antes da construção
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Quatro bases orientam o desenho de cada projeto, independentemente da sua dimensão.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {enterpriseFoundations.map((pillar, index) => {
                const Icon = foundationIcons[index] ?? ClipboardCheck;

                return (
                  <article
                    key={pillar.id}
                    className="rounded-[1.35rem] border border-borderline bg-paper p-6 shadow-sm transition hover:border-kavtris-blue/40"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-kavtris-blue/25 bg-kavtris-blue/10">
                      <Icon className="h-6 w-6 text-kavtris-blue" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-navy-950">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5 — Technical capabilities */}
        <section id="capacidades" className="bg-paper py-16 sm:py-20">
          <div className="container-section">
            <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Capacidades técnicas</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                  Detalhe técnico quando o projeto exige
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  A arquitetura, os controlos e as ferramentas finais são definidos conforme o escopo, o risco, os sistemas existentes e os requisitos contratuais.
                </p>
              </div>
              <div className="grid gap-4">
                {enterpriseCapabilities.map((group) => (
                  <details
                    key={group.id}
                    className="group rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm transition open:border-kavtris-blue/40 open:shadow-card sm:p-6"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2">
                      {group.title}
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-kavtris-blue transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="mt-4 border-t border-navy-900/5 pt-4">
                      <p className="text-sm leading-6 text-slate-600">{group.description}</p>
                      {group.why ? (
                        <p className="mt-3 rounded-2xl border border-kavtris-blue/20 bg-kavtris-blue/5 px-4 py-3 text-sm leading-6 text-navy-800">
                          <span className="font-semibold text-kavtris-blue">Porque importa: </span>
                          {group.why}
                        </p>
                      ) : null}
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li key={item} className="rounded-2xl bg-paper px-4 py-3 text-sm font-medium text-navy-800">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* 6 — Governance */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Governança</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Projeto controlado do início à evolução
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                O projeto pode começar por um processo, equipa, localização ou integração antes de crescer.
              </p>
            </div>
            <div className="mt-8 rounded-[1.35rem] border border-borderline bg-paper p-6">
              <div className="flex items-center gap-3">
                <GitBranch className="h-6 w-6 text-kavtris-blue" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-navy-950">Governança compacta</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {enterpriseGovernanceItems.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-navy-800 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7 — Commercial clarity */}
        <section className="bg-paper py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Clareza comercial</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                O que pode esperar de cada projeto
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Detalhes comerciais e contratuais dependem do projeto. O objetivo é deixar responsabilidades e limites claros antes de avançar.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {commercialClarityItems.map((item) => (
                <article key={item.id} className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-[1.35rem] border border-kavtris-blue/25 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm">
              <p>
                Não são apresentadas certificações, tempos fixos de resposta, garantias de disponibilidade ou promessas de conformidade universal. Esses pontos devem ser definidos conforme o escopo, o risco e o contrato.
              </p>
            </div>
          </div>
        </section>

        {/* 8 — Trust */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Confiança realista</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Experiência aplicada, sem promessas inventadas
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['QA e automação', 'Experiência em testes manuais, automação, validação e prevenção de falhas.'],
                ['Projetos internacionais', 'Participação em contextos de software com requisitos, equipas e validação estruturada.'],
                ['Processo transparente', 'Limitações, riscos e responsabilidades são tratados antes de prometer soluções.'],
                ['Rede Qualidade é Vida', 'Ligação institucional com responsabilidade, clareza e qualidade como princípios.']
              ].map(([title, text]) => (
                <article key={title} className="rounded-[1.35rem] border border-borderline bg-paper p-5">
                  <h3 className="text-base font-semibold text-navy-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9 — Final next-step section (three paths).
            WEB.1F.6: the section is a LIGHT page surface — clearly part of the
            page, never visually merged with the deep-navy footer. The
            consultant card remains the dark PRIMARY; the other two paths are
            light secondary cards. */}
        <section className="bg-mist py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Próximo passo</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Qual é o próximo passo para a sua empresa?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Escolha como prefere continuar. Se ainda não souber qual caminho faz mais sentido, podemos ajudar.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {/* PRIMARY — consultant (strongest CTA on this page). */}
              <article
                data-testid="engineering-final-consultant"
                className="flex flex-col rounded-[1.5rem] border border-kavtris-blueLight/60 bg-navy-950 p-6 text-white shadow-glow sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A5C9FF]">
                  Quero falar sobre a minha necessidade
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                  Falar com um consultor
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                  Conte-nos o que pretende melhorar e ajudamos a definir o próximo passo.
                </p>
                <Button href="/#contacto" className="mt-auto sm:mt-8">
                  Falar com um consultor
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </article>

              {/* SECONDARY — business discovery. */}
              <article
                data-testid="engineering-final-business"
                className="flex flex-col rounded-[1.5rem] border border-borderline bg-white p-6 text-navy-950 shadow-sm transition hover:border-kavtris-blue/50 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blue">
                  Não sei qual sistema preciso
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-navy-950 sm:text-3xl">
                  Começar pelo meu negócio
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  Escolha o tipo de empresa que mais se aproxima da sua e veja sistemas que podem servir como ponto de partida.
                </p>
                <Button
                  href="/produtos?modo=negocio#tipos-de-negocio"
                  variant="outline"
                  className="mt-auto sm:mt-8"
                >
                  Encontrar pelo meu negócio
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </article>

              {/* SECONDARY — system catalog. */}
              <article
                data-testid="engineering-final-systems"
                className="flex flex-col rounded-[1.5rem] border border-kavtris-blue/30 bg-[#EAF1FC] p-6 text-navy-950 shadow-sm transition hover:border-kavtris-blue/60 sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-kavtris-blue">
                  Já sei o que procuro
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-navy-950 sm:text-3xl">
                  Ver os sistemas
                </h3>
                <p className="mt-4 text-sm leading-7 text-navy-800/80 sm:text-base">
                  Explore diretamente os sistemas e soluções da KAVTRIS.
                </p>
                <Button
                  href="/produtos?modo=sistemas#catalogo"
                  variant="outline"
                  className="mt-auto sm:mt-8"
                >
                  Ver todos os sistemas
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

