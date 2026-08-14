'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPinned, QrCode, Smartphone, Tags } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { ContextBackForwardControls } from '@/components/shared/ContextBackForwardControls';
import { getProductBySlug } from '@/features/products/data/products';
import type { ProductLevelId } from '@/features/products/data/products';
import { fieldOpsSectors, fieldOpsTechnicalGroups } from '@/features/products/fieldops/data/fieldops';
import {
  FieldOpsSectorAdaptation,
  type FieldOpsSectorId
} from '@/features/products/fieldops/components/responsive/FieldOpsSectorAdaptation';
import { FieldOpsDemonstration } from '@/features/products/fieldops/components/responsive/FieldOpsDemonstration';
import { ProductConsultantEscape } from '@/features/products/shared/ProductConsultantEscape';
import { ProductEvolution } from '@/features/products/shared/ProductEvolution';
import { ProductLevelConfigurator } from '@/features/products/shared/ProductLevelConfigurator';

const fieldOpsProduct = getProductBySlug('fieldops');

const equipmentItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: QrCode, label: 'QR Code' },
  { icon: Tags, label: 'Etiqueta NFC' },
  { icon: Smartphone, label: 'Smartphone' },
  { icon: MapPinned, label: 'Tablet ou local identificado' }
];

/**
 * WEB.1F.8 — FieldOps journey (synchronized page-level state).
 *
 * Order: Hero → Configurator → Evolução por fases → Adaptação por setor →
 * Demonstração visual → equipamento/apoio → detalhes técnicos → escape de
 * consultor → footer. `selectedLevel` is page-level (single source of truth);
 * `sectorId` is also lifted so the demonstration stays contextual.
 */
export function FieldOpsPage() {
  const [levelId, setLevelId] = useState<ProductLevelId>('essential');
  const [sectorId, setSectorId] = useState<FieldOpsSectorId>(fieldOpsSectors[0].id);

  const level = useMemo(
    () => fieldOpsProduct?.levels.find((item) => item.id === levelId) ?? fieldOpsProduct?.levels[0],
    [levelId]
  );

  if (!fieldOpsProduct || !level) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="bg-paper">
        {/* WEB.1F.4 — explicit Back/Forward (fallback Produtos for product detail). */}
        <div className="border-b border-navy-900/5 bg-white">
          <div className="container-section py-3">
            <ContextBackForwardControls fallbackHref="/produtos" />
          </div>
        </div>

        {/* 1 — Product hero: visual first, level-aware CTAs. */}
        <section className="bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="container-section grid gap-9 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-kavtris-blueLight">FieldOps</p>
              <p className="mt-3 inline-flex rounded-full bg-kavtris-blue/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-kavtris-blueLight">
                Conceito de solução adaptável
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Organize equipas externas, serviços e visitas num único sistema.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/78">
                Planeie serviços, acompanhe profissionais, registe evidências e consulte relatórios sem depender de mensagens, chamadas e folhas separadas.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/64">
                A solução pode começar com o essencial e crescer de acordo com a operação da empresa.
              </p>
              <p className="mt-4 rounded-2xl border border-kavtris-blue/20 bg-white/5 p-4 text-sm leading-7 text-white/70">
                Esta apresentação mostra uma possível configuração. As funcionalidades finais dependem do levantamento e das necessidades de cada empresa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  href={`/?produto=${fieldOpsProduct.slug}#contacto`}
                  data-testid="hero-adapt-cta"
                  className="text-navy-950"
                >
                  Adaptar o {level.name} à minha empresa
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="#fieldops-experience" variant="secondary">
                  Ver como funciona
                </Button>
                <Link
                  href="/#contacto"
                  data-testid="hero-doubt-cta"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-white/72 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  Tirar uma dúvida
                </Link>
              </div>
            </div>

            <HeroVisual
              image={fieldOpsProduct.heroImage ?? fieldOpsProduct.image}
              imageAlt={fieldOpsProduct.heroImageAlt ?? fieldOpsProduct.imageAlt}
            />
          </div>
        </section>

        {/* 2 — Visual level configurator (page-level state). */}
        <ProductLevelConfigurator product={fieldOpsProduct} levelId={levelId} onLevelChange={setLevelId} />

        {/* 3 — Evolution by phases (reacts to selected level). */}
        <ProductEvolution product={fieldOpsProduct} levelId={levelId} />

        {/* 4 — Adaptation by sector (sector tabs + level-aware config line). */}
        <FieldOpsSectorAdaptation levelId={levelId} sectorId={sectorId} onSectorChange={setSectorId} />

        {/* 5 — Visual demonstration (experience tabs + level-aware config panel). */}
        <FieldOpsDemonstration levelId={levelId} sectorId={sectorId} />

        {/* 6 — Supporting practical information (optional equipment). */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-kavtris-blue">Equipamentos opcionais</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950">Confirmação simples no local</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                O software funciona sem equipamento especial. Dispositivos simples podem ser adicionados quando trouxerem valor prático.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Um QR Code ou uma etiqueta NFC pode abrir a tarefa correta e ajudar a confirmar presença no local.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {equipmentItems.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-[1.35rem] border border-borderline bg-paper p-5">
                  <Icon className="h-7 w-7 text-kavtris-blue" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-navy-900">{label}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-[1.35rem] border border-kavtris-blue/25 bg-navy-950 p-5 text-sm leading-7 text-white/70">
                A utilização deve ser proporcional, transparente e limitada ao processo necessário. O objetivo não é vigilância permanente, e a KAVTRIS não fabrica estes dispositivos.
              </div>
            </div>
          </div>
        </section>

        {/* 7 — Technical details (after the visual discovery). */}
        <section id="detalhes" className="bg-paper py-16 sm:py-20">
          <div className="container-section">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-navy-950">
              Detalhes técnicos para empresas e equipas de tecnologia
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              A arquitetura e os controlos finais são definidos de acordo com o escopo, o risco e os requisitos contratuais do projeto.
            </p>
            <div className="mt-8 grid gap-4">
              {fieldOpsTechnicalGroups.map((group) => (
                <details key={group.title} className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2">
                    {group.title}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-2xl bg-paper px-4 py-3 text-sm font-medium text-navy-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8 — Final consultant escape (never a dead end). */}
        <ProductConsultantEscape />
      </main>
      <Footer />
    </>
  );
}

function HeroVisual({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <div className="relative min-w-0">
      <div className="absolute inset-8 rounded-full bg-kavtris-blue/14 blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-navy-900">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 46vw, 92vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/35 via-transparent to-kavtris-blue/10" aria-hidden="true" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Agenda', 'serviços do dia'],
            ['Check-in', 'presença no local'],
            ['Relatório', 'histórico organizado']
          ].map(([label, text]) => (
            <div key={label} className="rounded-2xl bg-navy-950/80 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-kavtris-blueLight">{label}</p>
              <p className="mt-1 text-sm text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
