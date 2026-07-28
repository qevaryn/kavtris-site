"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { contactSchema, type ContactFormInput, type ContactFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

const serviceOptions = [
  'QA Manual e Análise',
  'Automação de Testes',
  'Estruturação e Melhoria de QA',
  'Análise de Requisitos e Experiência',
  'QA Contínuo',
  'Ainda não sei qual serviço preciso'
];

const timelineOptions = ['Imediato', '1 a 2 semanas', '2 a 4 semanas', 'Este trimestre', 'Ainda a definir'];

export function Contact() {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      service: '',
      timeline: '',
      message: '',
      privacyConsent: false,
      honeypot: ''
    }
  });

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
    <section id="contacto" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            title="Vamos analisar o seu projeto?"
            subtitle="Preencha o formulário e entraremos em contacto."
          />
          <div className="mt-8 rounded-[1.35rem] border border-borderline bg-paper p-5">
            <p className="text-sm font-semibold text-navy-800">O que acontece depois?</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Analisamos o contexto, identificamos riscos principais e indicamos o caminho de QA mais adequado.
            </p>
            <div className="mt-6 flex h-24 items-center justify-center text-gold-600">
              <Send className="h-16 w-16 stroke-[1.4]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-borderline bg-white p-5 shadow-sm md:p-7">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy-800">
                Nome
              </label>
              <input
                id="name"
                {...register('name')}
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
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
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
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
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email.message}</p> : null}
            </div>

            <div>
              <label htmlFor="timeline" className="text-sm font-medium text-navy-800">
                Prazo desejado
              </label>
              <select
                id="timeline"
                {...register('timeline')}
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
                aria-invalid={errors.timeline ? 'true' : 'false'}
                aria-describedby={errors.timeline ? 'timeline-error' : undefined}
              >
                <option value="">Selecione uma opção</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.timeline ? <p id="timeline-error" className="mt-2 text-sm text-red-600" role="alert">{errors.timeline.message}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="service" className="text-sm font-medium text-navy-800">
                Serviço pretendido
              </label>
              <select
                id="service"
                {...register('service')}
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
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

            <div className="md:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-navy-800">
                Descrição do projeto
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className="mt-2 w-full rounded-2xl border border-borderline bg-white px-4 py-2.5 text-sm text-navy-800 outline-none transition placeholder:text-slate-400 focus:border-gold-600 focus:ring-2 focus:ring-gold-600/15"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>{errors.message ? <span id="message-error" className="text-red-600" role="alert">{errors.message.message}</span> : <span id="message-hint">Máximo de 1200 caracteres.</span>}</span>
                <span>Seja objetivo e prático.</span>
              </div>
            </div>

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
                <p className="text-sm text-slate-500">Analisaremos o seu pedido e entraremos em contacto.</p>
              )}

              <Button type="submit" disabled={isPending} className="w-full sm:ml-auto sm:w-auto">
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A enviar...
                  </span>
                ) : (
                  'Enviar pedido de análise'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
