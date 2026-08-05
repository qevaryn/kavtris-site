"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/components/shared/cn';
import { useInViewport } from '@/components/shared/useInViewport';
import { useMotionBudget } from '@/components/shared/useMotionBudget';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

type LoopingTickerProps<T> = {
  ariaLabel: string;
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  durationSeconds?: number;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
  testId?: string;
};

const DRAG_THRESHOLD = 6;
const INTERACTION_PAUSE_MS = 2000;

export function LoopingTicker<T>({
  ariaLabel,
  items,
  renderItem,
  durationSeconds = 30,
  className,
  viewportClassName,
  trackClassName,
  itemClassName,
  testId
}: LoopingTickerProps<T>) {
  const tickerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mainTrackRef = useRef<HTMLUListElement>(null);
  const duplicateTrackRef = useRef<HTMLUListElement>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const isPointerActiveRef = useRef(false);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    isDragging: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const [pausedByInteraction, setPausedByInteraction] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { inViewport: isInViewport, priority } = useInViewport(tickerRef, 0.35);
  const reducedMotion = useReducedMotion();
  const motionId = useId();

  const wantsMotion = isInViewport && isPageVisible && !reducedMotion && !pausedByInteraction;
  const canOwnMotion = useMotionBudget(`ticker-${motionId}`, wantsMotion, priority);
  const shouldAnimate = wantsMotion && canOwnMotion;

  const beginInteractionPause = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }

    setPausedByInteraction(true);
  }, []);

  const scheduleInteractionResume = useCallback(() => {
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      interactionTimeoutRef.current = null;
      if (isPointerActiveRef.current) {
        return;
      }
      setPausedByInteraction(false);
    }, INTERACTION_PAUSE_MS);
  }, []);

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
        if (!isPointerActiveRef.current) {
          scheduleInteractionResume();
        }
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

      const delta = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      const cycleWidth = mainTrack.scrollWidth;
      if (cycleWidth > 0) {
        const pixelsPerMs = cycleWidth / (durationSeconds * 1000);
        let nextScrollLeft = viewport.scrollLeft + pixelsPerMs * delta;
        if (nextScrollLeft >= cycleWidth) {
          nextScrollLeft -= cycleWidth;
        }
        viewport.scrollLeft = nextScrollLeft;
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
  }, [durationSeconds, shouldAnimate]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) {
      return;
    }

    isPointerActiveRef.current = true;
    beginInteractionPause();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: viewport.scrollLeft,
      isDragging: false
    };

    viewport.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    const mainTrack = mainTrackRef.current;
    const dragState = dragStateRef.current;
    if (!viewport || !mainTrack || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (!dragState.isDragging) {
      if (Math.abs(deltaX) <= DRAG_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }

      dragState.isDragging = true;
      setIsDragging(true);
    }

    const cycleWidth = mainTrack.scrollWidth;
    let nextScrollLeft = dragState.startScrollLeft - deltaX;

    if (cycleWidth > 0) {
      nextScrollLeft = ((nextScrollLeft % cycleWidth) + cycleWidth) % cycleWidth;
    } else {
      nextScrollLeft = Math.max(0, nextScrollLeft);
    }

    viewport.scrollLeft = nextScrollLeft;

    if (event.cancelable) {
      event.preventDefault();
    }
  }

  function finishPointerInteraction(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;
    if (!viewport || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    dragState.pointerId = -1;
    dragState.isDragging = false;
    isPointerActiveRef.current = false;
    setIsDragging(false);
    scheduleInteractionResume();
  }

  function onLostPointerCapture() {
    const dragState = dragStateRef.current;
    if (dragState.pointerId === -1) {
      return;
    }

    dragState.pointerId = -1;
    dragState.isDragging = false;
    isPointerActiveRef.current = false;
    setIsDragging(false);
    scheduleInteractionResume();
  }

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
      <div
        ref={viewportRef}
        className={cn(
          'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-y',
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
          viewportClassName
        )}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointerInteraction}
        onPointerCancel={finishPointerInteraction}
        onLostPointerCapture={onLostPointerCapture}
        onTouchStart={() => beginInteractionPause()}
        onTouchEnd={() => scheduleInteractionResume()}
        onTouchCancel={() => scheduleInteractionResume()}
        onDragStart={(event) => event.preventDefault()}
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
    </section>
  );
}
