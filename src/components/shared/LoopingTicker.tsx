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
  speedPxPerSecond?: number;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  itemClassName?: string;
  testId?: string;
};

const DRAG_THRESHOLD = 6;
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
  testId
}: LoopingTickerProps<T>) {
  const tickerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const mainTrackRef = useRef<HTMLUListElement>(null);
  const duplicateTrackRef = useRef<HTMLUListElement>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const isPointerActiveRef = useRef(false);
  const isTouchActiveRef = useRef(false);
  const dragRafRef = useRef<number | null>(null);
  const latestDragTargetRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startOffset: 0,
    cycleWidth: 0,
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

  // Normaliza a posição apenas quando a interação real terminou (dedo solto).
  const finalizeDragPosition = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const cycleWidth = getCycleWidth();
    if (cycleWidth > 0) {
      offsetRef.current = normalizeOffset(viewport.scrollLeft, cycleWidth);
      applyOffset(offsetRef.current);
    }
  }, [getCycleWidth, normalizeOffset, applyOffset]);

  // Aplica o último alvo do arrasto pendente (um único write por frame).
  const flushDragWrite = useCallback(() => {
    if (dragRafRef.current !== null) {
      window.cancelAnimationFrame(dragRafRef.current);
      dragRafRef.current = null;
    }
    applyOffset(latestDragTargetRef.current);
  }, [applyOffset]);

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
      // O autoplay só pode retomar quando nenhuma interação está ativa.
      // No Safari, pointercancel/lostpointercapture podem ocorrer com o dedo
      // ainda sobre a tela; isTouchActiveRef preserva esse estado.
      if (isPointerActiveRef.current || isTouchActiveRef.current) {
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
      if (dragRafRef.current) {
        window.cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
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

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) {
      return;
    }

    isPointerActiveRef.current = true;
    beginInteractionPause();

    const cycleWidth = getCycleWidth();
    const currentOffset = cycleWidth > 0 ? normalizeOffset(viewport.scrollLeft, cycleWidth) : viewport.scrollLeft;

    offsetRef.current = currentOffset;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: currentOffset,
      cycleWidth,
      isDragging: false
    };

    // A captura de ponteiro mantém o drag do rato fora do viewport. No toque,
    // a captura implícita reside num filho e a reatribuição dispararia
    // lostpointercapture, interrompendo o drag.
    if (event.pointerType === 'mouse') {
      viewport.setPointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    const dragState = dragStateRef.current;
    if (!viewport || dragState.pointerId !== event.pointerId) {
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

    let nextOffset = dragState.startOffset - deltaX;

    if (dragState.cycleWidth > 0) {
      nextOffset = normalizeOffset(nextOffset, dragState.cycleWidth);
    } else {
      nextOffset = Math.max(0, nextOffset);
    }

    offsetRef.current = nextOffset;
    latestDragTargetRef.current = nextOffset;

    // Um único write por frame, sincronizado com o paint: o pointermove apenas
    // regista o alvo; o requestAnimationFrame aplica o scrollLeft.
    if (dragRafRef.current === null) {
      dragRafRef.current = window.requestAnimationFrame(() => {
        dragRafRef.current = null;
        applyOffset(latestDragTargetRef.current);
      });
    }

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

    // pointercancel durante toque: o dedo pode continuar sobre a tela. A
    // normalização e a retomada ficam para o touchend/touchcancel, evitando
    // escrita concorrente na posição durante o gesto.
    if (isTouchActiveRef.current) {
      return;
    }

    flushDragWrite();
    finalizeDragPosition();
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

    // lostpointercapture durante toque: mesmo tratamento do pointercancel.
    if (isTouchActiveRef.current) {
      return;
    }

    flushDragWrite();
    finalizeDragPosition();
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
        onTouchStart={() => {
          isTouchActiveRef.current = true;
          beginInteractionPause();
        }}
        onTouchEnd={() => {
          isTouchActiveRef.current = false;
          flushDragWrite();
          finalizeDragPosition();
          scheduleInteractionResume();
        }}
        onTouchCancel={() => {
          isTouchActiveRef.current = false;
          flushDragWrite();
          finalizeDragPosition();
          scheduleInteractionResume();
        }}
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
