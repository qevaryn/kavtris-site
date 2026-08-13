"use client";

import { useEffect } from 'react';
import { useKavtrisNavigation } from '@/components/shared/NavigationHistoryProvider';

/**
 * WEB.1F.4 — global same-page anchor navigation (replaces WEB.1F.3 handler).
 *
 * The owner's navigation-memory requirement supersedes the earlier
 * "replaceState, no anchor history" preference: meaningful internal navigation
 * now creates a real chronological browser-history entry. Repeated clicks on
 * the SAME destination keep scrolling every time without spamming history.
 *
 *   - destination differs from the current URL → pushNavigation (new entry) +
 *     scrollIntoView (smooth, or instant under prefers-reduced-motion);
 *   - same destination clicked again → scroll only (REPEATED_SAME_HASH_CLICK_WORKS);
 *   - links that leave the current pathname are left to Next's router;
 *   - keyboard activation works (anchors click on Enter);
 *   - `scroll-margin-top` on `section[id]` keeps sticky-header clearance.
 */
export function SamePageAnchorHandler() {
  const { pushNavigation } = useKavtrisNavigation();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.<HTMLAnchorElement>('a[href]');
      if (!anchor) {
        return;
      }

      const rawHref = anchor.getAttribute('href') ?? '';
      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) {
        return;
      }

      const hash = rawHref.slice(hashIndex);
      if (!hash || hash === '#') {
        return;
      }

      const pathPart = rawHref.slice(0, hashIndex);
      const normalized = (value: string) => (value.startsWith('/') ? value : `/${value}`);

      // Different page → let the Next router navigate normally.
      if (pathPart && normalized(pathPart) !== window.location.pathname) {
        return;
      }

      const section = document.getElementById(hash.slice(1));
      if (!section) {
        return;
      }

      event.preventDefault();

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });

      const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
      if (window.location.href !== nextUrl) {
        pushNavigation({ url: nextUrl, kind: 'anchor' });
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pushNavigation]);

  return null;
}
