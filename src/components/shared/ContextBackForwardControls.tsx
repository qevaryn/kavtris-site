"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useKavtrisNavigation } from '@/components/shared/NavigationHistoryProvider';
import { cn } from '@/components/shared/cn';

/**
 * WEB.1F.4 — explicit website-level Back/Forward controls.
 *
 * The browser's own Back/Forward remain canonical; these buttons map 1:1 onto
 * them (NATIVE_BROWSER_HISTORY_PRESERVED). They exist for users who do not
 * know browser navigation conventions:
 *
 *   - `← Voltar` when an internal previous entry exists (calls history.back());
 *   - `← Início` as a safe fallback for direct entry (never history.back into
 *     an unknown external context — DIRECT_ENTRY_FALLBACK);
 *   - `Avançar →` shown only when a forward entry actually exists, otherwise
 *     visually and semantically disabled.
 */
export function ContextBackForwardControls({
  fallbackHref = '/',
  className
}: {
  fallbackHref?: string;
  className?: string;
}) {
  const { canGoBack, canGoForward, back, forward } = useKavtrisNavigation();
  const router = useRouter();

  const handleBack = () => {
    if (canGoBack) {
      back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <div data-testid="nav-back-forward" className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        data-testid="nav-back-control"
        onClick={handleBack}
        aria-label="Voltar à página ou posição anterior"
        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3.5 py-2 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-kavtris-blue hover:text-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {canGoBack ? 'Voltar' : 'Início'}
      </button>
      <button
        type="button"
        data-testid="nav-forward-control"
        onClick={forward}
        disabled={!canGoForward}
        aria-disabled={canGoForward ? undefined : 'true'}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3.5 py-2 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-kavtris-blue hover:text-kavtris-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:border-navy-900/15 disabled:hover:text-navy-800"
      >
        Avançar
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
