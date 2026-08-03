import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPinned, QrCode, Smartphone, Tags } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ProductMockup } from '@/components/products/ProductMockup';
import { FieldOpsExperience } from '@/components/products/fieldops/FieldOpsExperience';
import { getProductBySlug } from '@/data/products';
import {
  fieldOpsBenefits,
  fieldOpsImplementationSteps,
  fieldOpsModules,
  fieldOpsProblems,
  fieldOpsSolutionLevels,
  fieldOpsTechnicalGroups
} from '@/data/fieldops';

const fieldOpsProduct = getProductBySlug('fieldops');

const qrNfcItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: QrCode, label: 'QR Code impresso ou autocolante' },
  { icon: Tags, label: 'Etiqueta NFC simples' },
  { icon: Smartphone, label: 'Telemóvel do profissional' },
  { icon: MapPinned, label: 'Identificação única do local' }
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
          <div className="container-section grid gap-9 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
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
                Esta demonstração apresenta uma possível configuração do produto. As funcionalidades finais dependem do levantamento e das necessidades de cada empresa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#como-funciona-fieldops" className="text-navy-950">
                  Ver como funciona
                </Button>
                <Button href="/?produto=fieldops#contacto" variant="secondary">
                  Adaptar à minha empresa
                </Button>
              </div>
            </div>
            <ProductMockup product={fieldOpsProduct} />
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Problemas reais de operação</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                O que o FieldOps ajuda a resolver?
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fieldOpsProblems.map((problem) => (
                <article key={problem} className="rounded-2xl border border-borderline bg-paper p-5">
                  <CheckCircle2 className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-6 text-navy-800">{problem}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FieldOpsExperience />

        <section className="bg-white py-16 sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Confirmação simples no local</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950">QR Code e NFC quando fizer sentido.</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                A empresa pode colocar um QR Code ou uma etiqueta NFC no local do serviço. O profissional utiliza o telemóvel para abrir a tarefa correta e confirmar a presença.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                O software funciona sem equipamento especial. QR Code e NFC podem ser adicionados quando fizer sentido.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {qrNfcItems.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-[1.35rem] border border-borderline bg-paper p-5">
                  <Icon className="h-7 w-7 text-gold-600" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold text-navy-900">{label}</p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-[1.35rem] border border-gold-600/25 bg-navy-950 p-5 text-sm leading-7 text-white/72">
                A validação pode registar identificador do local, hora, utilizador e histórico de auditoria. O objetivo não é vigilância permanente; o uso deve ser proporcional, transparente e definido pelo processo.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-20">
          <div className="container-section">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Módulos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950">
                Comece pelo essencial e adicione módulos quando precisar.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Módulos disponíveis conforme o escopo e as necessidades da empresa.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {fieldOpsModules.map((group) => (
                <article key={group.title} className="rounded-[1.35rem] border border-borderline bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-navy-950">{group.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                  <ul className="mt-5 grid gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-section">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Configurações exemplo para diferentes dimensões.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Estas configurações são exemplos e não representam pacotes fechados ou preços fixos.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {fieldOpsSolutionLevels.map((level) => (
                <article key={level.title} className="rounded-[1.35rem] border border-borderline bg-paper p-6">
                  <h3 className="text-xl font-semibold text-navy-950">{level.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{level.suitableFor}</p>
                  <ul className="mt-5 grid gap-2">
                    {level.scope.map((item) => (
                      <li key={item} className="text-sm font-medium text-navy-800">{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-20">
          <div className="container-section grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy-950">Benefícios práticos</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Sem percentagens inventadas. O objetivo é dar clareza, histórico e acompanhamento à operação.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fieldOpsBenefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-borderline bg-white px-4 py-3 text-sm font-semibold text-navy-800">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-section">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-navy-950">
              Detalhes técnicos para empresas e equipas de tecnologia
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              A arquitetura e os controlos finais são definidos de acordo com o escopo, risco e requisitos contratuais do projeto.
            </p>
            <div className="mt-8 grid gap-4">
              {fieldOpsTechnicalGroups.map((group) => (
                <details key={group.title} className="rounded-[1.35rem] border border-borderline bg-paper p-5">
                  <summary className="cursor-pointer text-xl font-semibold text-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2">
                    {group.title}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-navy-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-20">
          <div className="container-section">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-navy-950">
              Como uma empresa poderia adotar o FieldOps
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              O primeiro projeto pode começar por uma única equipa, serviço ou localização.
            </p>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {fieldOpsImplementationSteps.map((step, index) => (
                <li key={step} className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600 text-sm font-bold text-white">{index + 1}</span>
                  <p className="mt-4 text-sm font-semibold leading-6 text-navy-900">{step}</p>
                </li>
              ))}
            </ol>
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
