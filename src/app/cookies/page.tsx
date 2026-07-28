import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading title="Política de Cookies" subtitle="Esta página descreve o uso mínimo de cookies e tecnologias semelhantes." />
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
