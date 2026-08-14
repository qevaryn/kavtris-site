"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/components/shared/useReducedMotion';
import {
  createEntryId,
  findEntryIndex,
  isProductsGridUrl,
  readJournal,
  writeJournal,
  type NavigationEntry,
  type NavigationJournal,
  type NavigationKind
} from '@/lib/navigation-history';

/**
 * WEB.1F.4 — KAVTRIS navigation memory provider.
 *
 *  - NATIVE_BROWSER_HISTORY_PRESERVED: `window.history` stays canonical;
 *    this provider only merges a `kavtris` metadata field into `history.state`
 *    and keeps a session-scoped journal for scroll/focus restoration.
 *  - Meaningful navigation (routes, anchors, discovery) creates real browser
 *    history entries; scrolling alone never does.
 *  - Back/Forward (browser or explicit controls) restore scroll context and,
 *    when available, keyboard focus.
 *  - Reduced motion: focus/scroll restoration is instant.
 */

type NavigationHistoryContextValue = {
  canGoBack: boolean;
  canGoForward: boolean;
  back: () => void;
  forward: () => void;
  pushNavigation: (options: { url: string; kind?: NavigationKind; focusKey?: string }) => void;
  replaceNavigation: (options: { url: string; focusKey?: string }) => void;
  restoreFocus: (focusKey: string, options?: { scroll?: boolean }) => void;
  canBackToProductsGrid: () => boolean;
};

const NavigationHistoryContext = createContext<NavigationHistoryContextValue | null>(null);

export function NavigationHistoryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // The journal is a client-only augmentation. It starts EMPTY everywhere
  // (SSR and first client render) so the UI never hydrates with different text,
  // then resumes from sessionStorage on mount (NAVIGATION_MEMORY_STATUS).
  const [journal, setJournal] = useState<NavigationJournal>({ entries: [], index: -1 });
  const journalRef = useRef(journal);
  const popStateFlagRef = useRef(false);
  const lastUrlRef = useRef(typeof window !== 'undefined' ? window.location.href : '');
  const initializedRef = useRef(false);

  const syncJournal = useCallback((next: NavigationJournal) => {
    journalRef.current = next;
    writeJournal(next);
    setJournal(next);
  }, []);

  const restoreFocus = useCallback(
    (focusKey: string, options?: { scroll?: boolean }) => {
      let attempts = 0;
      const tryFocus = () => {
        const element = document.getElementById(focusKey);
        if (element) {
          element.focus({ preventScroll: true });
          if (options?.scroll) {
            element.scrollIntoView({
              block: 'center',
              behavior: reducedMotion ? 'auto' : 'smooth'
            });
          }
          return;
        }
        attempts += 1;
        if (attempts < 4) {
          window.setTimeout(tryFocus, 140 * attempts);
        }
      };
      window.requestAnimationFrame(() => tryFocus());
    },
    [reducedMotion]
  );

  // Register a brand-new journal entry for a navigation that did NOT come from
  // popstate (Next router links/CTAs). The browser history entry already exists
  // (created by Next); the journal mirrors it.
  const registerNewUrl = useCallback(() => {
    const journal = journalRef.current;
    const url = window.location.href;
    if (url === lastUrlRef.current) {
      return;
    }
    lastUrlRef.current = url;

    const entries = [...journal.entries];
    const current = entries[journal.index];
    if (current) {
      current.scrollY = window.scrollY;
    }
    const nextEntry: NavigationEntry = { id: createEntryId(), url, scrollY: window.scrollY, kind: 'page' };
    const next = { entries: [...entries.slice(0, journal.index + 1), nextEntry], index: journal.index + 1 };
    syncJournal(next);
  }, [syncJournal]);

  // Seed/resume the journal on first mount and observe route changes from Next.
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const stored = readJournal();
      if (stored && stored.entries.length > 0) {
        // Same-tab session: resume the journal (refresh-safe). This is a
        // deliberate client-only hydration step — sessionStorage does not
        // exist on the server, and the UI is rendered consistently first
        // (empty journal) to avoid hydration mismatches.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        syncJournal(stored);
      } else {
        syncJournal({
          entries: [{ id: createEntryId(), url: window.location.href, scrollY: window.scrollY, kind: 'page' }],
          index: 0
        });
      }
      return;
    }
    if (popStateFlagRef.current) {
      return;
    }
    registerNewUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: seed once, then observe pathname changes.
  }, [pathname]);

  // Keep the CURRENT entry's scroll position fresh (throttled, passive).
  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const journal = journalRef.current;
      const current = journal.entries[journal.index];
      if (current && current.url === window.location.href) {
        current.scrollY = window.scrollY;
        writeJournal(journal);
      }
    };
    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Native Back/Forward: update the journal position and restore context.
  useEffect(() => {
    const onPopState = () => {
      popStateFlagRef.current = true;
      window.setTimeout(() => {
        popStateFlagRef.current = false;
      }, 250);

      const journal = journalRef.current;
      const url = window.location.href;
      lastUrlRef.current = url;

      const index = findEntryIndex(journal, url);
      if (index >= 0) {
        const entry = journal.entries[index];
        const focusKey = entry.focusKey;
        const targetScrollY = entry.scrollY;
        syncJournal({ ...journal, index });
        // Augment native scroll restoration with the recorded position when the
        // browser/Next did not restore it (SCROLL_RESTORATION).
        if (targetScrollY > 0) {
          window.setTimeout(() => {
            if (Math.abs(window.scrollY - targetScrollY) > 200) {
              window.scrollTo({ top: targetScrollY, behavior: 'auto' });
            }
          }, 220);
        }
        if (focusKey) {
          // Restore the origin control (scroll + focus) so contextual returns
          // land on a stable semantic element rather than raw pixels.
          window.setTimeout(() => restoreFocus(focusKey, { scroll: true }), 150);
        }
      } else {
        // Unknown entry (external/edge case): keep native scroll restoration and
        // just step the internal position backwards.
        syncJournal({ ...journal, index: Math.max(0, journal.index - 1) });
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [syncJournal, restoreFocus]);


  const absoluteUrl = useCallback((url: string) => {
    try {
      return new URL(url, window.location.href).href;
    } catch {
      return url;
    }
  }, []);

  const pushNavigation = useCallback(
    ({ url, kind = 'page', focusKey }: { url: string; kind?: NavigationKind; focusKey?: string }) => {
      const journal = journalRef.current;
      const entries = [...journal.entries];
      const current = entries[journal.index];
      if (current) {
        current.scrollY = window.scrollY;
      }
      const absolute = absoluteUrl(url);
      const nextEntry: NavigationEntry = { id: createEntryId(), url: absolute, scrollY: 0, focusKey, kind };
      const next = { entries: [...entries.slice(0, journal.index + 1), nextEntry], index: journal.index + 1 };
      try {
        // Merge KAVTRIS metadata into the framework state — never overwrite it.
        window.history.pushState({ ...window.history.state, kavtris: { id: nextEntry.id } }, '', absolute);
      } catch {
        // Same-document navigation the browser refused; the journal still records
        // the context so restoration keeps working.
      }
      lastUrlRef.current = absolute;
      syncJournal(next);
    },
    [syncJournal, absoluteUrl]
  );

  const replaceNavigation = useCallback(
    ({ url, focusKey }: { url: string; focusKey?: string }) => {
      const journal = journalRef.current;
      const entries = [...journal.entries];
      const targetIndex = Math.max(0, journal.index);
      const absolute = absoluteUrl(url);
      if (entries[targetIndex]) {
        entries[targetIndex] = { ...entries[targetIndex], url: absolute, focusKey, scrollY: window.scrollY };
      } else {
        entries.push({ id: createEntryId(), url: absolute, scrollY: window.scrollY, focusKey, kind: 'page' });
      }
      try {
        window.history.replaceState({ ...window.history.state, kavtris: { id: entries[targetIndex].id } }, '', absolute);
      } catch {
        // ignore
      }
      lastUrlRef.current = absolute;
      syncJournal({ entries, index: targetIndex });
    },
    [syncJournal, absoluteUrl]
  );

  const back = useCallback(() => {
    if (journalRef.current.index > 0) {
      window.history.back();
    }
  }, []);

  const forward = useCallback(() => {
    const journal = journalRef.current;
    if (journal.index < journal.entries.length - 1) {
      window.history.forward();
    }
  }, []);

  const canBackToProductsGrid = useCallback(() => {
    const journal = journalRef.current;
    const previous = journal.entries[journal.index - 1];
    return previous ? isProductsGridUrl(previous.url) : false;
  }, []);

  const value = useMemo<NavigationHistoryContextValue>(() => {
    return {
      canGoBack: journal.index > 0,
      canGoForward: journal.index < journal.entries.length - 1,
      back,
      forward,
      pushNavigation,
      replaceNavigation,
      restoreFocus,
      canBackToProductsGrid
    };
  }, [journal, back, forward, pushNavigation, replaceNavigation, restoreFocus, canBackToProductsGrid]);

  return <NavigationHistoryContext.Provider value={value}>{children}</NavigationHistoryContext.Provider>;
}

export function useKavtrisNavigation(): NavigationHistoryContextValue {
  const context = useContext(NavigationHistoryContext);
  if (!context) {
    throw new Error('useKavtrisNavigation must be used within NavigationHistoryProvider');
  }
  return context;
}

