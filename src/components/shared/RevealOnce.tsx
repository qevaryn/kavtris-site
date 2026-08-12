"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/components/shared/cn';

/**
 * WEB.1D — one-time scroll reveal (IntersectionObserver + CSS transition).
 *
 * Contract:
 *  - REVEAL_ONCE = YES — the observer disconnects after the first intersection.
 *  - REHIDE_ON_SCROLL_UP = NO — the revealed state is one-way, never returns to hidden.
 *  - REPLAY_ON_SECOND_ENTRY = NO — reveal is component-local for the page session.
 *  - Fails open — SSR/JS-off output is fully visible; the hidden state is applied on
 *    the client, after hydration, only to content strictly below the fold.
 *  - prefers-reduced-motion: reduce → content stays visible immediately.
 *  - transform/opacity only → REVEAL_CAUSES_LAYOUT_SHIFT = NO.
 */

type RevealOnceProps = {
  children: ReactNode;
  className?: string;
  /** Applies the shared short-delay token; reset to 0 below the lg breakpoint. */
  delay?: 'none' | 'short';
  testId?: string;
};

/** Trigger slightly before the content reaches the visual focus area (§39). */
const BELOW_FOLD_TRIGGER_PX = 96;

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
      // Reduced motion: content stays visible immediately (§46).
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMounted(true);
        setRevealed(true);
        return;
      }

      // Any content already inside the initial viewport must not blank (§35/§54 —
      // also covers hash/anchor deep links and scroll restoration).
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setMounted(true);
        setRevealed(true);
        return;
      }

      setMounted(true);

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            observerRef.current = null;
            setRevealed(true);
          }
        },
        { rootMargin: `0px 0px ${BELOW_FOLD_TRIGGER_PX}px 0px`, threshold: 0 }
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

