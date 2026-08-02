"use client";

import { useMemo, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { productDemos, type ProductDemoId } from '@/data/product-demos';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function InteractiveProductDemo() {
  const [activeId, setActiveId] = useState<ProductDemoId>('orders');
  const [device, setDevice] = useState<'web' | 'mobile'>('web');
  const active = useMemo(() => productDemos.find((demo) => demo.id === activeId) ?? productDemos[0], [activeId]);

  return (
    <section id="demonstracao" className="bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Demonstração interativa"
          title="Veja um exemplo sem precisar entender termos técnicos."
          subtitle="Escolha uma necessidade e veja como a solução pode organizar o processo no computador e no telemóvel."
          align="center"
          tone="dark"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3" aria-label="Tipos de demonstração">
            {productDemos.map((demo) => (
              <button
                key={demo.id}
                type="button"
                aria-pressed={activeId === demo.id}
                onClick={() => setActiveId(demo.id)}
                className={`mb-2 min-h-11 w-full rounded-2xl px-4 text-left text-sm font-semibold transition last:mb-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  activeId === demo.id ? 'bg-gold-500 text-navy-950' : 'text-white/74 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>

          <div className="grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#08223A] shadow-card lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-500">{active.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{active.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">{active.text}</p>

              <div className="mt-6 flex rounded-full border border-white/10 bg-navy-950 p-1" role="tablist" aria-label="Ver exemplo por dispositivo">
                <button
                  type="button"
                  role="tab"
                  aria-selected={device === 'web'}
                  className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold ${device === 'web' ? 'bg-white text-navy-950' : 'text-white/70'}`}
                  onClick={() => setDevice('web')}
                >
                  <Monitor className="h-4 w-4" aria-hidden="true" />
                  Ver no computador
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={device === 'mobile'}
                  className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold ${device === 'mobile' ? 'bg-white text-navy-950' : 'text-white/70'}`}
                  onClick={() => setDevice('mobile')}
                >
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                  Ver no telemóvel
                </button>
              </div>

              <ol className="mt-6 grid gap-3">
                {active.flow.map((item, index) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/78">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-500/50 text-xs font-bold text-gold-500">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-white/10 bg-[#03182B] p-6 sm:p-8 lg:border-l lg:border-t-0" role="tabpanel">
              {device === 'web' ? <WebMockup active={active} /> : <MobileMockup active={active} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebMockup({ active }: { active: (typeof productDemos)[number] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white text-navy-950 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-borderline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs font-semibold text-slate-500">Qevaryn demo</span>
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{active.label}</p>
          <h4 className="mt-2 text-xl font-bold">{active.title}</h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {active.benefits.map((benefit) => (
            <div key={benefit} className="rounded-2xl bg-mist p-3 text-sm font-semibold text-navy-800">
              {benefit}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-borderline">
          {active.flow.slice(0, 4).map((item) => (
            <div key={item} className="flex items-center justify-between border-b border-borderline px-4 py-3 text-sm last:border-b-0">
              <span>{item}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Ativo</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileMockup({ active }: { active: (typeof productDemos)[number] }) {
  return (
    <div className="mx-auto w-[13.5rem] rounded-[2.25rem] border-[9px] border-black bg-white p-3 text-navy-950 shadow-2xl">
      <div className="mx-auto mb-3 h-4 w-20 rounded-b-2xl bg-black" />
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Qevaryn</p>
      <h4 className="mt-2 text-lg font-bold leading-tight">{active.label}</h4>
      <div className="mt-4 grid gap-3">
        {active.flow.slice(0, 3).map((item, index) => (
          <div key={item} className={`rounded-2xl p-3 text-sm ${index === 0 ? 'bg-navy-900 text-white' : 'border border-borderline bg-paper'}`}>
            {item}
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 min-h-10 w-full rounded-full bg-gold-500 text-sm font-bold text-navy-950">
        Atualizar estado
      </button>
    </div>
  );
}
