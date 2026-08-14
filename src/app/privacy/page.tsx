import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Resumo informativo sobre o tratamento de dados enviados através do formulário.'
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">Política de Privacidade</h1>
        <span className="mt-4 block h-1 w-14 rounded-full bg-kavtris-blue" aria-hidden="true" />
        <p className="mt-5 text-base leading-8 text-muted md:text-lg">Resumo informativo sobre o tratamento de dados enviados através do formulário.</p>
      </div>
      <div className="mt-10 space-y-6 text-sm leading-7 text-slate-600">
        <p className="rounded-2xl border border-borderline bg-paper p-4 text-navy-800">Versão provisória. Este texto deve ser revisto antes da publicação comercial.</p>
        <p>Os dados são utilizados apenas para responder ao contacto e avaliar o pedido apresentado à KAVTRIS.</p>
        <p>Não vendemos nem partilhamos informação com terceiros para fins comerciais.</p>
        <p>O envio do formulário depende do prestador de email configurado no projeto.</p>
      </div>
      <div className="mt-10">
        <Link href="/" className="text-sm font-semibold text-kavtris-blue underline-offset-4 hover:underline">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
