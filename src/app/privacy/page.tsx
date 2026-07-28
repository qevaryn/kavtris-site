import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading title="Política de Privacidade" subtitle="Resumo informativo sobre o tratamento de dados enviados através do formulário." />
      <div className="mt-10 space-y-6 text-sm leading-7 text-slate-600">
        <p className="rounded-2xl border border-borderline bg-paper p-4 text-navy-800">Versão provisória. Este texto deve ser revisto antes da publicação comercial.</p>
        <p>Os dados são utilizados apenas para responder ao contacto e avaliar o pedido de análise.</p>
        <p>Não vendemos nem partilhamos informação com terceiros para fins comerciais.</p>
        <p>O envio do formulário depende do prestador de email configurado no projeto.</p>
      </div>
      <div className="mt-10">
        <Link href="/" className="text-sm font-semibold text-gold-600 underline-offset-4 hover:underline">
          Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
