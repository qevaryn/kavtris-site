"use client";

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { contactSchema, type ContactFormInput, type ContactFormValues } from '@/domain/contact';
import { Button } from '@/components/shared/Button';
import { RevealOnce } from '@/components/shared/RevealOnce';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Logo } from '@/components/layout/Logo';
import { getProductBySlug, products } from '@/features/products/data/products';
import { submitContact } from '@/features/contact/services/submit-contact';
import { resolveContactIntent } from '@/features/contact/utils/resolveContactIntent';

const serviceOptions = [
  'Ainda não sei qual solução preciso',
  'Solução personalizada / outro problema',
  'Organizar pedidos',
  'Reduzir tarefas manuais',
  'Acompanhar clientes',
  'Gerir equipas externas',
  'Controlar stock',
  'Organizar reservas',
  'Melhorar comunicação entre setores',
  'Projeto empresarial / requisitos e integrações'
];

const productInterestOptions = products.map((product) => product.name);

export function Contact() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      productInterest: '',
      sector: '',
      currentProcess: '',
      affectedPeople: '',
      contactPreference: '',
      message: '',
      privacyConsent: false,
      honeypot: ''
    }
  });

  useEffect(() => {
    const intent = resolveContactIntent(new URLSearchParams(window.location.search));
    const selectedProduct = intent.productSlug ? getProductBySlug(intent.productSlug) : undefined;

    if (selectedProduct) {
      setValue('productInterest', selectedProduct.name, { shouldDirty: true });
    }

    if (intent.type === 'enterprise') {
      setValue('service', 'Projeto empresarial / requisitos e integrações', { shouldDirty: true });
    } else if (intent.type === 'custom-solution') {
      setValue('service', 'Solução personalizada / outro problema', { shouldDirty: true });
    } else if (intent.type === 'discovery') {
      // WEB.1F.3 — "Explicar o meu negócio" reaches the honest discovery state.
      setValue('service', 'Ainda não sei qual solução preciso', { shouldDirty: true });
    }
  }, [setValue]);

  const onSubmit = (values: ContactFormValues) => {
    setMessage(null);

    startTransition(async () => {
      try {
        await submitContact(values);
        reset();
        setMessage({ type: 'success', text: 'Pedido enviado com sucesso. Entraremos em contacto em breve.' });
      } catch (error) {
        setMessage({
          type: 'error',
          text: error instanceof Error ? error.message : 'Ocorreu um erro inesperado.'
        });
      }
    });
  };

  const redeContactCard = (
    <div className="panel-light flex items-center gap-4 rounded-[1.35rem] border border-navy-900/10 p-4">
      <Logo variant="seal" />
      <div>
        <p className="text-sm font-semibold text-navy-800">Integrante da Rede Qualidade é Vida</p>
        <p className="mt-1 text-sm leading-6 text-muted">Compromisso com responsabilidade, clareza e qualidade.</p>
      </div>
    </div>
  );

  return (
    <section id="contacto" className="kavtris-ambient-light bg-kavtris-light py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-stretch lg:px-16">
        {/* WEB.1D — owner-approved staged reveal: left (heading + next steps)
            first, then the form panel (≤120ms); stack resets the delay. */}
        {/* WEB.1D.1 — desktop equal top/bottom: left column is a flex column
            stretched to the grid row; the network/trust card anchors the bottom
            (CONTACT_BOTTOM_ALIGNMENT = PASS). */}
        <RevealOnce className="flex flex-col" testId="reveal-contacto-left">
          <SectionHeading className="[&_h2]:font-sans"
            eyebrow="Contacto"
            title="Não precisa chegar com uma solução pronta."
            subtitle="Explique o que está a dificultar o trabalho. Nós ajudamos a organizar a ideia e identificar o primeiro passo."
          />
          <div className="panel-light mt-8 rounded-[1.35rem] border border-navy-900/10 p-5">
            <p className="text-sm font-semibold text-navy-800/90">O que acontece depois?</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Lemos a explicação, fazemos perguntas simples e ajudamos a transformar o problema num primeiro passo viável.
            </p>
            <div className="mt-6 flex h-24 items-center justify-center rounded-2xl border border-kavtris-blue/15 bg-kavtris-blue/5 text-kavtris-blue">
              <Send className="h-16 w-16 stroke-[1.4]" aria-hidden="true" />
            </div>
          </div>
          {/* WEB.1B — Rede card stays in the left column on desktop only.
              WEB.1D.1 — pinned to the column bottom (mt-auto) so both columns
              share the same bottom edge on desktop.
              WEB.1F.4 — minimum visual separation from the "O que acontece
              depois?" block (pt-6 ≈ 24px) even when the column is short. */}
          <div data-testid="rede-contact-card-desktop" className="mt-5 hidden lg:mt-auto lg:block lg:pt-6">{redeContactCard}</div>
        </RevealOnce>

        <RevealOnce
          className="panel-light rounded-[1.35rem] border border-navy-900/10 p-5 md:p-7 lg:p-8"
          delay="short"
          testId="reveal-contacto-form"
        >
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy-800/85">
                Nome
              </label>
              <input
                id="name"
                {...register('name')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-navy-900/40 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">{errors.name.message}</p> : null}
            </div>

            <div>
              <label htmlFor="company" className="text-sm font-medium text-navy-800/85">
                Empresa
              </label>
              <input
                id="company"
                {...register('company')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-navy-900/40 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.company ? 'true' : 'false'}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company ? <p id="company-error" className="mt-2 text-sm text-red-600" role="alert">{errors.company.message}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-navy-800/85">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-navy-900/40 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-navy-800/85">
                Telefone ou contacto <span className="font-normal text-navy-900/45">(opcional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone ? <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">{errors.phone.message}</p> : null}
            </div>

            <div>
              <label htmlFor="service" className="text-sm font-medium text-navy-800/85">
                Produto ou problema
              </label>
              <select
                id="service"
                {...register('service')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.service ? 'true' : 'false'}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="">Selecione uma opção</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.service ? <p id="service-error" className="mt-2 text-sm text-red-600" role="alert">{errors.service.message}</p> : null}
            </div>

            <div>
              <label htmlFor="productInterest" className="text-sm font-medium text-navy-800/85">
                Produto de interesse <span className="font-normal text-navy-900/45">(opcional)</span>
              </label>
              <select
                id="productInterest"
                {...register('productInterest')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.productInterest ? 'true' : 'false'}
                aria-describedby={errors.productInterest ? 'productInterest-error' : undefined}
              >
                <option value="">Ainda não sei qual solução preciso</option>
                {productInterestOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.productInterest ? <p id="productInterest-error" className="mt-2 text-sm text-red-600" role="alert">{errors.productInterest.message}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-navy-800/85">
                Breve explicação
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className="mt-2 min-h-32 w-full rounded-2xl border border-navy-900/15 bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-navy-900/40 focus:border-kavtris-blue focus:ring-2 focus:ring-kavtris-blue/25 md:text-sm"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-navy-900/45">
                <span>{errors.message ? <span id="message-error" className="text-red-600" role="alert">{errors.message.message}</span> : <span id="message-hint">Máximo de 1200 caracteres.</span>}</span>
                <span>Não precisa usar termos técnicos.</span>
              </div>
            </div>

            <input type="hidden" {...register('sector')} />
            <input type="hidden" {...register('currentProcess')} />
            <input type="hidden" {...register('affectedPeople')} />
            <input type="hidden" {...register('contactPreference')} />

            <div className="md:col-span-2">
              <label className="flex items-start gap-3 rounded-2xl border border-navy-900/10 bg-white px-4 py-3 text-sm text-navy-800/85 shadow-sm">
                <input
                  type="checkbox"
                  {...register('privacyConsent')}
                  className="mt-1 h-4 w-4 rounded border-navy-900/25 bg-white text-kavtris-blue focus:ring-kavtris-blue"
                  aria-invalid={errors.privacyConsent ? 'true' : 'false'}
                  aria-describedby={errors.privacyConsent ? 'privacyConsent-error' : undefined}
                />
                <span>
                  Li e aceito a <a href="/privacy" className="font-medium text-kavtris-blue underline-offset-4 hover:underline">Política de Privacidade</a>.
                </span>
              </label>
              {errors.privacyConsent ? <p id="privacyConsent-error" className="mt-2 text-sm text-red-600" role="alert">{errors.privacyConsent.message}</p> : null}
            </div>

            <input type="text" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" {...register('honeypot')} />

            <div className="md:col-span-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              {message ? (
                <p className={`rounded-2xl px-4 py-3 text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`} role="status">
                  {message.text}
                </p>
              ) : (
                <p className="text-sm text-muted">Analisaremos a explicação e entraremos em contacto.</p>
              )}

              <Button type="submit" disabled={isPending} className="w-full sm:ml-auto sm:w-auto">
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A enviar...
                  </span>
                ) : (
                  'Enviar explicação'
                )}
              </Button>
            </div>
          </form>
          {/* WEB.1B — mobile/tablet: Rede card renders after the form
              (heading → copy → "O que acontece depois?" → form → Rede). */}
          <div className="mt-5 lg:hidden">{redeContactCard}</div>
        </RevealOnce>
      </div>
    </section>
  );
}
