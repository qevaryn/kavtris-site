import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-kavtris-blue">404</p>
        <h1 className="mt-3 font-display text-[2rem] leading-tight text-navy-800 md:text-[2.65rem]">Página não encontrada</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">
          A página que procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-kavtris-blue px-6 font-semibold text-navy-900 transition hover:bg-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue"
        >
          Voltar à página inicial
        </Link>
      </main>
      <Footer />
    </>
  );
}