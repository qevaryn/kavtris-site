"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { services } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Tag } from '@/components/ui/Tag';

export function Services() {
  const [manual, automation, structure, analysis, continuous] = services;
  const [openService, setOpenService] = useState('');
  const [automationTab, setAutomationTab] = useState<'playwright' | 'robot'>('playwright');

  return (
    <section id="servicos" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="absolute right-[-8rem] top-16 hidden h-72 w-72 rounded-full border border-navy-900/5 lg:block" aria-hidden="true" />
      <div className="absolute left-[-10rem] bottom-20 hidden h-80 w-80 rounded-full border border-gold-600/10 lg:block" aria-hidden="true" />
      <div className="container-section relative">
        <SectionHeading
          eyebrow="Soluções"
          title="Serviços"
          subtitle="Qualidade adaptada ao contexto, aos riscos e aos objetivos de cada projeto."
          align="center"
        />

        <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-3">
          <ServiceCard icon={manual.icon} title={manual.title} description={manual.description} tags={manual.tags} />

          <ServiceCard icon={automation.icon} title={automation.title} description={automation.description} className="border-gold-600/35 shadow-card">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {automation.approaches?.map((approach) => (
                <div key={approach.title} className="rounded-2xl border border-borderline bg-mist p-4 text-center">
                  <p className="text-sm font-semibold text-navy-800">{approach.title}</p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {approach.title.includes('Playwright') ? 'E2E e fluxos críticos' : 'Keywords e BDD funcional'}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {automation.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ServiceCard>

          <ServiceCard icon={structure.icon} title={structure.title} description={structure.description} tags={structure.tags} />
        </div>

        <div className="mx-auto mt-6 hidden max-w-5xl gap-6 md:grid lg:grid-cols-2">
          <ServiceCard icon={analysis.icon} title={analysis.title} description={analysis.description} tags={analysis.tags} />
          <ServiceCard icon={continuous.icon} title={continuous.title} description={continuous.description} tags={continuous.tags} />
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {services.map((service) => {
            const isOpen = openService === service.title;
            const Icon = service.icon;

            return (
              <article key={service.title} className="rounded-[1.35rem] border border-borderline bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-500">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug text-navy-800">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 flex min-h-11 w-full items-center justify-between rounded-2xl border border-borderline bg-mist px-4 text-sm font-semibold text-navy-800"
                  aria-expanded={isOpen}
                  aria-controls={`service-details-${service.title.replace(/\W+/g, '-').toLowerCase()}`}
                  onClick={() => setOpenService(isOpen ? '' : service.title)}
                >
                  Ver detalhes
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {isOpen ? (
                  <div id={`service-details-${service.title.replace(/\W+/g, '-').toLowerCase()}`} className="mt-4 rounded-2xl border border-borderline bg-paper p-4">
                    {service.approaches?.length ? (
                      <>
                        <div className="grid grid-cols-2 rounded-full bg-white p-1" role="tablist" aria-label="Abordagens de automação">
                          <button
                            type="button"
                            role="tab"
                            aria-selected={automationTab === 'playwright'}
                            className={`min-h-10 rounded-full text-xs font-semibold ${automationTab === 'playwright' ? 'bg-navy-900 text-white' : 'text-navy-800'}`}
                            onClick={() => setAutomationTab('playwright')}
                          >
                            Playwright
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={automationTab === 'robot'}
                            className={`min-h-10 rounded-full text-xs font-semibold ${automationTab === 'robot' ? 'bg-navy-900 text-white' : 'text-navy-800'}`}
                            onClick={() => setAutomationTab('robot')}
                          >
                            Robot
                          </button>
                        </div>
                        <div className="mt-4 text-sm leading-6 text-muted" role="tabpanel">
                          {automationTab === 'playwright' ? 'Playwright + TypeScript para fluxos end-to-end, múltiplos navegadores e CI/CD.' : 'Robot Framework + Python para automação funcional, keywords reutilizáveis e Data-Driven Testing.'}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                      </div>
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
