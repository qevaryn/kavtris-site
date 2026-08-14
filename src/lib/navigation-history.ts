/**
 * WEB.1F.4 — KAVTRIS navigation memory.
 *
 * A lightweight session-scoped journal that AUGMENTS the native browser
 * history with scroll/focus metadata. The native `window.history` remains the
 * canonical navigation sequence (NATIVE_BROWSER_HISTORY_PRESERVED = YES); this
 * module only stores what the browser does not: per-entry scroll position,
 * focus targets and the KAVTRIS position within the stack (for explicit
 * Back/Forward affordances).
 *
 * Privacy: only route/scroll/safe UI identifiers are stored. No form content,
 * no email, no personal data. Session-scoped only (same tab, no persistence,
 * no cookies, no backend).
 */

export type NavigationKind = 'page' | 'anchor' | 'discovery';

export type NavigationEntry = {
  id: string;
  url: string;
  scrollY: number;
  focusKey?: string;
  kind: NavigationKind;
};

export type NavigationJournal = {
  entries: NavigationEntry[];
  index: number;
};

const STORAGE_KEY = 'kavtris.navigation.entries';
const MAX_ENTRIES = 60;

export function readJournal(): NavigationJournal | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as NavigationJournal;
    if (!Array.isArray(parsed.entries) || typeof parsed.index !== 'number') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeJournal(journal: NavigationJournal) {
  try {
    let { entries, index } = journal;
    if (entries.length > MAX_ENTRIES) {
      const excess = entries.length - MAX_ENTRIES;
      entries = entries.slice(excess);
      index = Math.max(0, index - excess);
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, index }));
  } catch {
    // sessionStorage may be unavailable (private mode / storage disabled);
    // navigation still works, only the memory augmentation is skipped.
  }
}

let entryCounter = 0;
export function createEntryId() {
  entryCounter += 1;
  return `kav-${Date.now().toString(36)}-${entryCounter}`;
}

/** Finds the entry matching `url`, preferring the one closest to the current index. */
export function findEntryIndex(journal: NavigationJournal, url: string): number {
  let best = -1;
  let bestDistance = Number.POSITIVE_INFINITY;
  journal.entries.forEach((entry, index) => {
    if (entry.url !== url) {
      return;
    }
    const distance = Math.abs(index - journal.index);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}

/** True when `url` represents the plain products grid (no discovery query). */
export function isProductsGridUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.pathname === '/produtos' && !parsed.searchParams.has('negocio');
  } catch {
    return false;
  }
}
