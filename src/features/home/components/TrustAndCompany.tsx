"use client";

import { useId, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { Logo } from '@/components/layout/Logo';

export function TrustAndCompany() {
  const [founderExpanded, setFounderExpanded] = useState(false);
  const founderDisclosureId = useId();

  return (
    <section id="sobre" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-section">
        <div className="grid gap-6 rounded-[1.6rem] border border-borderline bg-paper p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Propósito e responsabilidade</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">
              Software de qualidade para servir melhor pessoas e empresas.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              A Qevaryn Systems nasceu da experiência de Gabriel Souza em Quality Assurance e de uma convicção simples: a tecnologia só cria valor quando melhora o trabalho e a vida de quem a utiliza.
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              A sua fé cristã inspira princípios de serviço, integridade e cuidado, vividos com respeito por clientes, equipas e parceiros de qualquer crença. É assim que transformamos processos reais em sistemas úteis, seguros e preparados para evoluir.
            </p>
          </div>

          <article data-testid="founder-card" className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-borderline bg-navy-950 text-white shadow-sm" data-testid="founder-photo">
                <Image
                  src="/images/gabriel.webp"
                  alt="Gabriel Souza, Fundador e QA Engineer da Qevaryn Systems"
                  fill
                  sizes="80px"
                  className="object-cover object-[50%_28%]"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-navy-900">Gabriel Souza</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-gold-600">Fundador e QA Engineer</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Casado e músico, Gabriel encontrou na qualidade de software uma forma de unir tecnologia, responsabilidade e serviço às pessoas.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                aria-expanded={founderExpanded}
                aria-controls={founderDisclosureId}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-borderline bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition hover:border-gold-500 hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                onClick={() => setFounderExpanded((value) => !value)}
              >
                Conhecer o fundador
              </button>
              <Button href="/rede-qualidade-e-vida" variant="ghost" className="border border-navy-950/10 bg-white text-navy-900 hover:bg-gold-500/10">
                Conhecer a Rede
              </Button>
            </div>

            <div id={founderDisclosureId} hidden={!founderExpanded} className="mt-4 rounded-2xl border border-borderline bg-paper p-4" data-testid="founder-disclosure">
              <p className="text-sm leading-7 text-muted">
                Gabriel iniciou a sua trajetória como QA Engineer acreditando que qualidade significava principalmente encontrar problemas antes de um sistema chegar ao utilizador.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Com a experiência profissional e a sua caminhada cristã, compreendeu que qualidade vai muito além dos testes. Significa proteger o tempo das pessoas, reduzir frustrações, facilitar o trabalho das equipas e desenvolver soluções que realmente contribuam para a vida de quem as utiliza.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Dessa visão nasceu a Qevaryn Systems: uma empresa criada para ajudar desde pequenos negócios até operações maiores a trabalhar com mais organização, segurança e confiança.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                A fé em Cristo faz parte da história do fundador e orienta valores como honestidade, responsabilidade, serviço e cuidado. A Qevaryn atende pessoas e empresas de qualquer crença com o mesmo respeito, profissionalismo e compromisso com a qualidade.
              </p>
            </div>
          </article>

          <article className="rounded-[1.35rem] border border-gold-600/20 bg-white p-5 shadow-sm sm:p-6" data-testid="network-section">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <h3 className="text-2xl font-semibold text-navy-900">Não trabalhamos isolados.</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  A Qevaryn Systems integra a Rede Qualidade é Vida, formada por pessoas e projetos que procuram servir com excelência em diferentes áreas, como tecnologia, cuidados, mobilidade, limpeza e outros segmentos.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Não afirmamos ser perfeitos. O nosso compromisso é trabalhar com responsabilidade, aprender continuamente e entregar o melhor que estiver ao nosso alcance em cada serviço.
                </p>
              </div>

              <div className="shrink-0">
                <Logo variant="network" className="max-w-[220px]" />
              </div>
            </div>

            <div className="mt-5">
              <Button href="/rede-qualidade-e-vida" className="w-full sm:w-auto">
                Conhecer a Rede
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
