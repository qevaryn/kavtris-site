"use client";

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { contactSchema, type ContactFormInput, type ContactFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Logo } from '@/components/layout/Logo';
import { getProductBySlug, products } from '@/data/products';

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
    const searchParams = new URLSearchParams(window.location.search);
    const selectedSlug = searchParams.get('produto');
    const selectedType = searchParams.get('tipo');
    const selectedProduct = selectedSlug ? getProductBySlug(selectedSlug) : undefined;

    if (selectedProduct) {
      setValue('productInterest', selectedProduct.name, { shouldDirty: true });
    }

    if (selectedType === 'empresa') {
      setValue('service', 'Projeto empresarial / requisitos e integrações', { shouldDirty: true });
    } else if (selectedType === 'personalizada') {
      setValue('service', 'Solução personalizada / outro problema', { shouldDirty: true });
    }
  }, [setValue]);

  const onSubmit = (values: ContactFormValues) => {
    setMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });

        const payload = (await response.json().catch(() => null)) as { message?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.message || 'Não foi possível enviar o pedido.');
        }

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

  return (
    <section id="contacto" className="bg-gradient-to-br from-white via-paper to-mist py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start lg:px-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Contacto"
            title="Não precisa chegar com uma solução pronta."
            subtitle="Explique o que está a dificultar o trabalho. Nós ajudamos a organizar a ideia e identificar o primeiro passo."
          />
          <div className="mt-8 rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-navy-800">O que acontece depois?</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Lemos a explicação, fazemos perguntas simples e ajudamos a transformar o problema num primeiro passo viável.
            </p>
            <div className="mt-6 flex h-24 items-center justify-center rounded-2xl bg-navy-900 text-gold-500">
              <Send className="h-16 w-16 stroke-[1.4]" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-[1.35rem] border border-gold-600/20 bg-white p-4 shadow-sm">
            <Logo variant="seal" />
            <div>
              <p className="text-sm font-semibold text-navy-900">Operadora da Qualidade é Vida</p>
              <p className="mt-1 text-sm leading-6 text-muted">Compromisso com responsabilidade, clareza e qualidade.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-card md:p-7 lg:p-8">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy-800">
                Nome
              </label>
              <input
                id="name"
                {...register('name')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name ? <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">{errors.name.message}</p> : null}
            </div>

            <div>
              <label htmlFor="company" className="text-sm font-medium text-navy-800">
                Empresa
              </label>
              <input
                id="company"
                {...register('company')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
                aria-invalid={errors.company ? 'true' : 'false'}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company ? <p id="company-error" className="mt-2 text-sm text-red-600" role="alert">{errors.company.message}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-navy-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-navy-800">
                Telefone ou contacto <span className="font-normal text-slate-500">(opcional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone ? <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">{errors.phone.message}</p> : null}
            </div>

            <div>
              <label htmlFor="service" className="text-sm font-medium text-navy-800">
                Produto ou problema
              </label>
              <select
                id="service"
                {...register('service')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
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
              <label htmlFor="productInterest" className="text-sm font-medium text-navy-800">
                Produto de interesse <span className="font-normal text-slate-500">(opcional)</span>
              </label>
              <select
                id="productInterest"
                {...register('productInterest')}
                className="mt-2 min-h-12 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
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
              <label htmlFor="message" className="text-sm font-medium text-navy-800">
                Breve explicação
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className="mt-2 min-h-32 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-base text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15 md:text-sm"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>{errors.message ? <span id="message-error" className="text-red-600" role="alert">{errors.message.message}</span> : <span id="message-hint">Máximo de 1200 caracteres.</span>}</span>
                <span>Não precisa usar termos técnicos.</span>
              </div>
            </div>

            <input type="hidden" {...register('sector')} />
            <input type="hidden" {...register('currentProcess')} />
            <input type="hidden" {...register('affectedPeople')} />
            <input type="hidden" {...register('contactPreference')} />

            <div className="md:col-span-2">
              <label className="flex items-start gap-3 rounded-2xl border border-borderline bg-paper px-4 py-3 text-sm text-navy-800">
                <input
                  type="checkbox"
                  {...register('privacyConsent')}
                  className="mt-1 h-4 w-4 rounded border-borderline text-gold-600 focus:ring-gold-600"
                  aria-invalid={errors.privacyConsent ? 'true' : 'false'}
                  aria-describedby={errors.privacyConsent ? 'privacyConsent-error' : undefined}
                />
                <span>
                  Li e aceito a <a href="/privacy" className="font-medium text-gold-600 underline-offset-4 hover:underline">Política de Privacidade</a>.
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
                <p className="text-sm text-slate-500">Analisaremos a explicação e entraremos em contacto.</p>
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
        </div>
      </div>
    </section>
  );
}
