"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { socialLinks } from '@/lib/constants';

const tags = ['Produto', 'Processos', 'QA', 'Automação', 'Sistemas web'];

export function Founder() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="sobre" className="soft-section-line bg-mist py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-16">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-navy-900/20 bg-white p-4 shadow-card md:p-6">
          <span className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gold-600" aria-hidden="true" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-borderline bg-navy-950 text-white shadow-sm sm:h-24 sm:w-24" data-testid="founder-photo">
                {imageFailed ? (
                  <span className="font-display text-3xl" aria-label="Placeholder do fundador Gabriel Dias de Souza">GS</span>
                ) : (
                  <Image
                    src="/images/gabriel.webp"
                    alt="Gabriel Dias de Souza, QA Engineer e fundador da Qevaryn Systems"
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover object-[50%_28%]"
                    onError={() => setImageFailed(true)}
                  />
                )}
              </div>

              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Sobre a Qevaryn Systems</p>
                <h2 className="mt-2 text-2xl font-semibold text-navy-800">Gabriel Dias de Souza</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">Fundador | QA Engineer | Produto, processos, qualidade e estratégia</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Gabriel Dias de Souza possui experiência em QA manual, automação de testes, análise de requisitos e projetos internacionais de software.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A Qevaryn Systems nasce para aplicar essa experiência em sistemas, automação, processos e qualidade.
                </p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible" tabIndex={0} aria-label="Tecnologias do fundador">
                  {tags.map((tag) => (
                    <Tag key={tag} className="shrink-0">{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:justify-end">
              <Button href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2" aria-label="LinkedIn de Gabriel Dias de Souza">
                LinkedIn
              </Button>
              <Button href={socialLinks.github} variant="ghost" target="_blank" rel="noopener noreferrer" className="border border-borderline px-4 py-2" aria-label="GitHub de Gabriel Dias de Souza">
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
