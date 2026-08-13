"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/components/shared/cn';

/**
 * WEB.1D / WEB.1D.1 — one-time scroll reveal (IntersectionObserver + CSS transition).
 *
 * Contract:
 *  - REVEAL_ONCE = YES — the observer disconnects after the first intersection.
 *  - REHIDE_ON_SCROLL_UP = NO — the revealed state is one-way, never returns to hidden.
 *  - REPLAY_ON_SECOND_ENTRY = NO — reveal is component-local for the page session.
 *  - Fails open — SSR/JS-off output is fully visible; the hidden state is applied on
 *    the client, after hydration, only to content strictly below the fold.
 *  - prefers-reduced-motion: reduce → content stays visible immediately.
 *  - transform/opacity only → REVEAL_CAUSES_LAYOUT_SHIFT = NO.
 *
 * Trigger strategy (WEB.1D.1 — owner correction for "too early"):
 *  the reveal begins when the section top is genuinely approaching the lower
 *  visual area, NOT when a sliver exists anywhere in the viewport:
 *   - mobile / tablet portrait (≤768px wide or ≤700px tall): section top at ~90%
 *   - normal desktop: section top at ~85%
 *   - very tall / large screens (>1100px tall): section top at ~82%
 */

type RevealOnceProps = {
  children: ReactNode;
  className?: string;
  /** Staged-right variant: applies the shared short-delay token (reset to 0 below lg). */
  delay?: 'none' | 'short';
  testId?: string;
};

/** Any content meaningfully visible in the initial viewport (≥30%) must not be hidden. */
const INITIAL_VISIBLE_RATIO = 0.3;

function triggerBottomRootMargin(viewportWidth: number, viewportHeight: number): string {
  // Mobile / tablet portrait and short landscape windows: ~90% of viewport height.
  if (viewportWidth <= 768 || viewportHeight <= 700) {
    return '-10%';
  }
  // Very tall / large screens (1440p / 4K-like heights): ~82%.
  if (viewportHeight > 1100) {
    return '-18%';
  }
  // Normal desktop: ~85%.
  return '-15%';
}

export function RevealOnce({ children, className, delay = 'none', testId }: RevealOnceProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    // The reveal state is armed one frame after mount (client only), so the
    // server/first paint output stays fully visible (fail-open) while the
    // below-fold content is then hidden and revealed once on intersection.
    const frame = window.requestAnimationFrame(() => {
      // Reduced motion: content stays visible immediately (§74).
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMounted(true);
        setRevealed(true);
        return;
      }

      // Any content MEANINGFULLY visible in the initial viewport (≥30% of the
      // section) must stay visible — applies especially to tall/large screens.
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / Math.max(rect.height, 1);
      if (visibleRatio >= INITIAL_VISIBLE_RATIO) {
        setMounted(true);
        setRevealed(true);
        return;
      }

      setMounted(true);

      const rootMargin = `0px 0px ${triggerBottomRootMargin(window.innerWidth, viewportHeight)} 0px`;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            observerRef.current = null;
            setRevealed(true);
          }
        },
        { rootMargin, threshold: 0 }
      );
      observerRef.current = observer;
      observer.observe(node);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const revealState = !mounted ? 'idle' : revealed ? 'revealed' : 'pending';

  return (
    <div
      ref={ref}
      className={cn(
        className,
        mounted && 'kavtris-reveal',
        delay === 'short' && 'kavtris-reveal--delay-short',
        revealed && 'kavtris-reveal--revealed'
      )}
      data-testid={testId}
      data-reveal-state={revealState}
    >
      {children}
    </div>
  );
}

