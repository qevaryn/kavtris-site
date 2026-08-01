"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { services } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Tag } from '@/components/ui/Tag';

export function Services() {
  const mainServices = services.slice(0, 6);
  const supportService = services[6];
  const [openService, setOpenService] = useState('');
  const [automationTab, setAutomationTab] = useState<'process' | 'quality'>('process');

  return (
    <section id="solucoes" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="absolute right-[-8rem] top-16 hidden h-72 w-72 rounded-full border border-navy-900/5 lg:block" aria-hidden="true" />
      <div className="absolute left-[-10rem] bottom-20 hidden h-80 w-80 rounded-full border border-gold-600/10 lg:block" aria-hidden="true" />
      <div className="container-section relative">
        <SectionHeading
          eyebrow="Soluções"
          title="Soluções digitais adaptadas ao funcionamento da sua empresa"
          subtitle="Sistemas, automações, integrações e qualidade de software desenhados a partir do processo real do negócio."
          align="center"
        />

        <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-3">
          {mainServices.map((service) => (
            <ServiceCard key={service.title} icon={service.icon} title={service.title} description={service.description} tags={service.tags}>
              {service.approaches ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {service.approaches.map((approach) => (
                    <div key={approach.title} className="rounded-2xl border border-borderline bg-mist p-4">
                      <p className="text-sm font-semibold text-navy-800">{approach.title}</p>
                      <p className="mt-2 text-xs leading-5 text-muted">{approach.points.slice(0, 3).join(' • ')}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </ServiceCard>
          ))}
        </div>

        <div className="mx-auto mt-8 hidden max-w-4xl rounded-[1.35rem] border border-borderline bg-paper p-5 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h3 className="text-lg font-semibold text-navy-900">{supportService.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{supportService.description}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {supportService.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-medium text-muted">
          Soluções desenvolvidas pela Qevaryn Systems com os padrões institucionais da Rede Qualidade é Vida.
        </p>

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
                  aria-controls={`solution-details-${service.title.replace(/\W+/g, '-').toLowerCase()}`}
                  onClick={() => setOpenService(isOpen ? '' : service.title)}
                >
                  Ver detalhes
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {isOpen ? (
                  <div id={`solution-details-${service.title.replace(/\W+/g, '-').toLowerCase()}`} className="mt-4 rounded-2xl border border-borderline bg-paper p-4">
                    {service.approaches?.length ? (
                      <>
                        <div className="grid grid-cols-2 rounded-full bg-white p-1" role="tablist" aria-label="Tipos de automação">
                          <button
                            type="button"
                            role="tab"
                            aria-selected={automationTab === 'process'}
                            className={`min-h-10 rounded-full text-xs font-semibold ${automationTab === 'process' ? 'bg-navy-900 text-white' : 'text-navy-800'}`}
                            onClick={() => setAutomationTab('process')}
                          >
                            Processos
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={automationTab === 'quality'}
                            className={`min-h-10 rounded-full text-xs font-semibold ${automationTab === 'quality' ? 'bg-navy-900 text-white' : 'text-navy-800'}`}
                            onClick={() => setAutomationTab('quality')}
                          >
                            Qualidade
                          </button>
                        </div>
                        <div className="mt-4 text-sm leading-6 text-muted" role="tabpanel">
                          {automationTab === 'process'
                            ? 'Automação de rotinas, notificações, relatórios e movimentação de dados entre sistemas.'
                            : 'Automação de testes com competências como Playwright, Robot Framework, API e regressão.'}
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
