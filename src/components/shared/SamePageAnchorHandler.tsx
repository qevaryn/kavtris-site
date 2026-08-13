"use client";

import { useEffect } from 'react';

/**
 * WEB.1F.3 — global same-page anchor navigation.
 *
 * Native browser behavior does not scroll when a link to the current URL hash
 * is clicked again (the URL hash is already unchanged). This handler owns
 * same-page hash navigation centrally:
 *
 *   - click → preventDefault → scrollIntoView (smooth, or instant under
 *     prefers-reduced-motion) → history.replaceState hash sync (no history
 *     pollution; back/forward remain sensible);
 *   - repeated clicks on the same anchor ALWAYS scroll again;
 *   - links that leave the current pathname are left to Next's router;
 *   - keyboard activation works (anchors click on Enter);
 *   - `scroll-margin-top` on `section[id]` keeps sticky-header clearance.
 */
export function SamePageAnchorHandler() {
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
      if (window.location.hash !== hash) {
        window.history.replaceState(window.history.state, '', nextUrl);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
