"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/components/shared/cn';
import { useInViewport } from '@/components/shared/useInViewport';
import { useMotionBudget } from '@/components/shared/useMotionBudget';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

type LoopingTickerProps<T> = {
  ariaLabel: string;
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  speedPxPerSecond?: number;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
  testId?: string;
  edgeFadeClassName?: string;
};

const INTERACTION_PAUSE_MS = 2000;
const DEFAULT_SPEED_PX_PER_SECOND = 40;

export function LoopingTicker<T>({
  ariaLabel,
  items,
  renderItem,
  speedPxPerSecond = DEFAULT_SPEED_PX_PER_SECOND,
  className,
  viewportClassName,
  trackClassName,
  itemClassName,
  testId,
  edgeFadeClassName
}: LoopingTickerProps<T>) {
  const tickerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mainTrackRef = useRef<HTMLUListElement>(null);
  const duplicateTrackRef = useRef<HTMLUListElement>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [pausedByInteraction, setPausedByInteraction] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { inViewport: isInViewport, priority } = useInViewport(tickerRef, 0.35);
  const reducedMotion = useReducedMotion();
  const motionId = useId();

  const wantsMotion = isInViewport && isPageVisible && !reducedMotion && !pausedByInteraction;
  const canOwnMotion = useMotionBudget(`ticker-${motionId}`, wantsMotion, priority);
  const shouldAnimate = wantsMotion && canOwnMotion;

  const getCycleWidth = useCallback(() => {
    return mainTrackRef.current?.scrollWidth ?? 0;
  }, []);

  const normalizeOffset = useCallback((offset: number, cycleWidth: number) => {
    if (cycleWidth <= 0) {
      return 0;
    }
    return ((offset % cycleWidth) + cycleWidth) % cycleWidth;
  }, []);

  const applyOffset = useCallback((offset: number) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    viewport.scrollLeft = offset;
  }, []);

  const beginInteractionPause = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastFrameTimeRef.current = null;
    }

    setPausedByInteraction(true);
  }, []);

  const scheduleInteractionResume = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      interactionTimeoutRef.current = null;
      setPausedByInteraction(false);
    }, INTERACTION_PAUSE_MS);
  }, []);

  // Avança/retrocede um item lógico (largura real de um item + gap), mantendo
  // a posição dentro do ciclo do loop. O autoplay pausa durante a leitura e
  // retoma depois da pausa de interação.
  const stepManual = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      const mainTrack = mainTrackRef.current;
      if (!viewport || !mainTrack || mainTrack.children.length === 0) {
        return;
      }

      beginInteractionPause();

      const cycleWidth = getCycleWidth();
      if (cycleWidth <= 0) {
        return;
      }

      const firstItem = mainTrack.children[0] as HTMLElement;
      const itemWidth = firstItem.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(mainTrack).gap) || 0;
      const step = itemWidth + gap;
      const currentOffset = normalizeOffset(viewport.scrollLeft, cycleWidth);
      const nextOffset = normalizeOffset(currentOffset + direction * step, cycleWidth);

      offsetRef.current = nextOffset;
      applyOffset(nextOffset);
      scheduleInteractionResume();
    },
    [beginInteractionPause, scheduleInteractionResume, getCycleWidth, normalizeOffset, applyOffset]
  );

  useEffect(() => {
    let lastVisible = document.visibilityState === 'visible';

    function onVisibilityChange() {
      const visible = document.visibilityState === 'visible';
      if (visible === lastVisible) {
        return;
      }
      lastVisible = visible;

      if (!visible) {
        setIsPageVisible(false);
        beginInteractionPause();
      } else {
        setIsPageVisible(true);
        scheduleInteractionResume();
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [beginInteractionPause, scheduleInteractionResume]);

  useLayoutEffect(() => {
    const duplicateTrack = duplicateTrackRef.current;
    if (!duplicateTrack) {
      return;
    }

    duplicateTrack.inert = true;
    duplicateTrack.setAttribute('inert', '');
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const mainTrack = mainTrackRef.current;
    if (!viewport || !mainTrack) {
      return;
    }

    const cycleWidth = getCycleWidth();
    if (cycleWidth > 0) {
      offsetRef.current = normalizeOffset(offsetRef.current, cycleWidth);
      applyOffset(offsetRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [getCycleWidth, normalizeOffset, applyOffset]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const mainTrack = mainTrackRef.current;
    if (!viewport || !mainTrack || !shouldAnimate) {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const deltaMs = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      const deltaSeconds = Math.min(deltaMs, 100) / 1000;
      const cycleWidth = getCycleWidth();

      if (cycleWidth > 0) {
        offsetRef.current += speedPxPerSecond * deltaSeconds;
        offsetRef.current = normalizeOffset(offsetRef.current, cycleWidth);
        applyOffset(offsetRef.current);
      }

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      lastFrameTimeRef.current = null;
    };
  }, [speedPxPerSecond, shouldAnimate, getCycleWidth, normalizeOffset, applyOffset]);

  return (
    <section
      ref={tickerRef}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        beginInteractionPause();
        scheduleInteractionResume();
      }}
      onFocusCapture={() => {
        beginInteractionPause();
        scheduleInteractionResume();
      }}
      data-testid={testId}
    >
      <div className="relative">
        <div
          ref={viewportRef}
          className={cn(
            'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-y',
            viewportClassName
          )}
          tabIndex={0}
          data-testid={testId ? `${testId}-viewport` : undefined}
        >
          <div
            className={cn('flex w-max gap-3 sm:gap-4', trackClassName)}
            data-testid={testId ? `${testId}-track` : undefined}
          >
            <ul ref={mainTrackRef} className="flex shrink-0 gap-3 sm:gap-4" data-testid={testId ? `${testId}-main` : undefined}>
              {items.map((item, index) => (
                <li key={`main-${index}`} className={itemClassName}>
                  {renderItem(item, index)}
                </li>
              ))}
            </ul>

            <ul
              ref={duplicateTrackRef}
              className="flex shrink-0 gap-3 sm:gap-4"
              aria-hidden="true"
              data-testid={testId ? `${testId}-duplicate` : undefined}
            >
              {items.map((item, index) => (
                <li key={`duplicate-${index}`} className={cn('pointer-events-none', itemClassName)}>
                  {renderItem(item, index)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {edgeFadeClassName ? (
          <>
            <div
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-y-0 left-0 z-[5] w-10 bg-gradient-to-r to-transparent', edgeFadeClassName)}
            />
            <div
              aria-hidden="true"
              className={cn('pointer-events-none absolute inset-y-0 right-0 z-[5] w-10 bg-gradient-to-l to-transparent', edgeFadeClassName)}
            />
          </>
        ) : null}

        <button
          type="button"
          className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/20 bg-white/80 text-navy-900 shadow-sm backdrop-blur-sm transition hover:border-gold-500 hover:bg-white hover:text-gold-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          aria-label="Anterior"
          onClick={() => stepManual(-1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/20 bg-white/80 text-navy-900 shadow-sm backdrop-blur-sm transition hover:border-gold-500 hover:bg-white hover:text-gold-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          aria-label="Seguinte"
          onClick={() => stepManual(1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
