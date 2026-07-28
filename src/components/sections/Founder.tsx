"use client";

import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { socialLinks } from '@/lib/constants';

const tags = ['Playwright', 'TypeScript', 'Robot Framework', 'Python', 'SeleniumLibrary'];

export function Founder() {
  return (
    <section id="sobre" className="bg-paper py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-borderline bg-navy-950 text-white shadow-sm" aria-label="Placeholder do fundador Gabriel Dias de Souza">
                <span className="font-display text-3xl">GS</span>
              </div>

              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">Sobre o fundador</p>
                <h2 className="mt-2 text-2xl font-semibold text-navy-800">Gabriel Dias de Souza</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">QA Engineer | Fundador</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  QA Engineer com experiência em projetos internacionais de aplicações web, QA Manual, automação de testes e melhoria contínua.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Acompanha diretamente cada projeto para garantir proximidade, organização e clareza.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
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
