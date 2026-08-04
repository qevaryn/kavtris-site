import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPinned, QrCode, Smartphone, Tags } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/shared/Button';
import { FieldOpsExperience } from '@/features/products/fieldops/components/responsive/FieldOpsExperience';
import { getProductBySlug } from '@/features/products/data/products';
import { fieldOpsTechnicalGroups } from '@/features/products/fieldops/data/fieldops';

const fieldOpsProduct = getProductBySlug('fieldops');

const equipmentItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: QrCode, label: 'QR Code' },
  { icon: Tags, label: 'Etiqueta NFC' },
  { icon: Smartphone, label: 'Smartphone' },
  { icon: MapPinned, label: 'Tablet ou local identificado' }
];

export function FieldOpsPage() {
  if (!fieldOpsProduct) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="bg-paper">
        <section className="bg-navy-950 py-12 text-white sm:py-16 lg:py-20">
          <div className="container-section grid gap-9 lg:grid-cols-[0.5fr_0.5fr] lg:items-center">
            <div>
              <Link href="/produtos" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 underline-offset-4 hover:underline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar aos produtos
              </Link>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-gold-500">Qevaryn FieldOps</p>
              <p className="mt-3 inline-flex rounded-full bg-gold-500/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-200">
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
              <p className="mt-4 rounded-2xl border border-gold-500/20 bg-white/5 p-4 text-sm leading-7 text-white/70">
                Esta apresentação mostra uma possível configuração. As funcionalidades finais dependem do levantamento e das necessidades de cada empresa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#fieldops-experience" className="text-navy-950">
                  Ver como funciona
                </Button>
                <Button href="/?produto=fieldops#contacto" variant="secondary">
                  Adaptar à minha empresa
                </Button>
              </div>
            </div>

            <HeroVisual image={fieldOpsProduct.image} imageAlt={fieldOpsProduct.imageAlt} />
          </div>
        </section>

        <FieldOpsExperience />

        <section className="bg-white py-16 sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Equipamentos opcionais</p>
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
                  <Icon className="h-7 w-7 text-gold-600" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-navy-900">{label}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-[1.35rem] border border-gold-600/25 bg-navy-950 p-5 text-sm leading-7 text-white/72">
                A utilização deve ser proporcional, transparente e limitada ao processo necessário. O objetivo não é vigilância permanente, e a Qevaryn não fabrica estes dispositivos.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-20">
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
                  <summary className="cursor-pointer text-xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
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

        <section className="bg-navy-950 py-16 text-white sm:py-20">
          <div className="container-section rounded-[1.6rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight">Quer saber como o FieldOps funcionaria na sua empresa?</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
              Explique como os serviços são organizados atualmente e onde acontecem as maiores dificuldades.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/?produto=fieldops#contacto" className="text-navy-950">
                Adaptar o FieldOps à minha empresa
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/#contacto" variant="secondary">
                Ainda não sei qual solução preciso
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroVisual({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <div className="relative min-w-0">
      <div className="absolute inset-8 rounded-full bg-gold-500/14 blur-3xl" aria-hidden="true" />
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
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/35 via-transparent to-gold-500/10" aria-hidden="true" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Agenda', 'serviços do dia'],
            ['Check-in', 'presença no local'],
            ['Relatório', 'histórico organizado']
          ].map(([label, text]) => (
            <div key={label} className="rounded-2xl bg-navy-950/80 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-400">{label}</p>
              <p className="mt-1 text-sm text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
