import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Esta página descreve o uso mínimo de cookies e tecnologias semelhantes.'
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">Política de Cookies</h1>
        <span className="mt-4 block h-1 w-14 rounded-full bg-gold-600" aria-hidden="true" />
        <p className="mt-5 text-base leading-8 text-muted md:text-lg">Esta página descreve o uso mínimo de cookies e tecnologias semelhantes.</p>
      </div>
      <div className="mt-10 space-y-6 text-sm leading-7 text-slate-600">
        <p className="rounded-2xl border border-borderline bg-paper p-4 text-navy-800">Versão provisória. Este texto deve ser revisto antes da publicação comercial.</p>
        <p>O site pode usar cookies essenciais para funcionamento e cookies de análise apenas se forem ativados pelo administrador do projeto.</p>
        <p>Se vierem a ser integradas ferramentas externas, a política deve ser atualizada antes da publicação.</p>
      </div>
      <div className="mt-10">
        <Link href="/" className="text-sm font-semibold text-gold-600 underline-offset-4 hover:underline">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
