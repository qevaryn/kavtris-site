"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode, type UIEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/components/shared/cn';
import { useInViewport } from '@/components/shared/useInViewport';
import { useMotionBudget } from '@/components/shared/useMotionBudget';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

type AccessibleCarouselProps<T> = {
  ariaLabel: string;
  items: readonly T[];
  renderItem: (item: T, context: { index: number; isActive: boolean }) => ReactNode;
  getItemLabel: (item: T, index: number) => string;
  itemClassName?: string;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  autoplayMs?: number;
  interactionPauseMs?: number;
  showCounter?: boolean;
  counterClassName?: string;
  testId?: string;
  motionMode?: 'default' | 'continuous';
};

const DRAG_THRESHOLD = 6;
const PROGRAMMATIC_SCROLL_EPSILON = 4;
const PROGRAMMATIC_SCROLL_FALLBACK_MS = 5000;
const CONTINUOUS_SPEED_PX_PER_SECOND = 40;

type ProgrammaticScrollState = {
  active: boolean;
  targetIndex: number;
  targetScrollLeft: number;
};

export function AccessibleCarousel<T>({
  ariaLabel,
  items,
  renderItem,
  getItemLabel,
  itemClassName,
  className,
  viewportClassName,
  trackClassName,
  autoplayMs = 0,
  interactionPauseMs = 2000,
  showCounter = false,
  counterClassName,
  testId,
  motionMode = 'default'
}: AccessibleCarouselProps<T>) {
  const carouselId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const interactionTimeoutRef = useRef<number | null>(null);
  const resumeWithImmediateAdvanceRef = useRef(false);
  const suppressClickRef = useRef(false);
  const isPointerActiveRef = useRef(false);
  const programmaticScrollRef = useRef<ProgrammaticScrollState>({
    active: false,
    targetIndex: 0,
    targetScrollLeft: 0
  });
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    isDragging: false
  });
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [pausedByInteraction, setPausedByInteraction] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { inViewport: isInViewport, priority } = useInViewport(viewportRef, 0.35);
  const reducedMotion = useReducedMotion();

  const isContinuous = motionMode === 'continuous';

  const getCycleWidth = useCallback(() => {
    if (!isContinuous || items.length === 0) {
      return 0;
    }
    const track = trackRef.current;
    if (!track || track.children.length < items.length + 2) {
      return 0;
    }
    let width = 0;
    for (let i = 1; i < track.children.length - 1; i++) {
      const slide = track.children[i] as HTMLElement | undefined;
      if (slide) {
        width += slide.offsetWidth;
      }
    }
    return width;
  }, [isContinuous, items.length]);

  const getInitialOffset = useCallback(() => {
    if (!isContinuous || items.length === 0) {
      return 0;
    }
    const track = trackRef.current;
    if (!track || track.children.length < 1) {
      return 0;
    }
    const firstSlide = track.children[0] as HTMLElement | undefined;
    return firstSlide ? firstSlide.offsetWidth : 0;
  }, [isContinuous, items.length]);

  const normalizeOffset = useCallback((offset: number, cycleWidth: number) => {
    if (cycleWidth <= 0) {
      return 0;
    }
    return ((offset % cycleWidth) + cycleWidth) % cycleWidth;
  }, []);

  const getLogicalIndexFromOffset = useCallback((offset: number, cycleWidth: number) => {
    if (cycleWidth <= 0 || items.length === 0) {
      return 0;
    }
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || track.children.length < items.length) {
      return 0;
    }

    const viewportCenter = offset + viewport.clientWidth / 2;
    let nearestIndex = 0;
    let shortestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < items.length; i++) {
      const slide = track.children[i + 1] as HTMLElement | undefined;
      if (!slide) {
        continue;
      }
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(viewportCenter - slideCenter);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }, [items.length]);

  const getSlideOffset = useCallback((logicalIndex: number) => {
    if (!isContinuous || items.length === 0) {
      return 0;
    }
    const track = trackRef.current;
    if (!track || track.children.length < items.length) {
      return 0;
    }
    let offset = getInitialOffset();
    for (let i = 0; i < logicalIndex; i++) {
      const slide = track.children[i + 1] as HTMLElement | undefined;
      if (slide) {
        offset += slide.offsetWidth;
      }
    }
    return offset;
  }, [isContinuous, items.length, getInitialOffset]);

  const clampedIndex = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }
    return Math.min(currentIndex, items.length - 1);
  }, [currentIndex, items.length]);

  const wantsAutoplay = isContinuous
    ? isInViewport && !reducedMotion && isPageVisible && !pausedByInteraction && items.length > 1
    : autoplayMs > 0 && isInViewport && !reducedMotion && isPageVisible && !pausedByInteraction && items.length > 1;
  const canOwnMotion = useMotionBudget(`carousel-${carouselId}`, wantsAutoplay, priority);
  const shouldAutoplay = wantsAutoplay && canOwnMotion && items.length > 1;

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
      resumeWithImmediateAdvanceRef.current = true;
      setPausedByInteraction(false);
    }, interactionPauseMs);
  }, [interactionPauseMs]);

  const registerInteractionPause = useCallback(() => {
    beginInteractionPause();
    scheduleInteractionResume();
  }, [beginInteractionPause, scheduleInteractionResume]);

  const finalizeProgrammaticScroll = useCallback(() => {
    const state = programmaticScrollRef.current;
    if (!state.active) {
      return;
    }

    state.active = false;

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
      programmaticScrollTimeoutRef.current = null;
    }

    activeIndexRef.current = state.targetIndex;
    setCurrentIndex(state.targetIndex);

    if (isContinuous) {
      const viewport = viewportRef.current;
      const cycleWidth = getCycleWidth();
      if (viewport && cycleWidth > 0) {
        offsetRef.current = normalizeOffset(state.targetScrollLeft, cycleWidth);
        viewport.scrollLeft = offsetRef.current;
      }
    }
  }, [isContinuous, getCycleWidth, normalizeOffset]);

  const goToLogicalIndex = useCallback((index: number, options: { smooth: boolean; fromInteraction?: boolean }) => {
    if (items.length === 0) {
      return;
    }

    if (options.fromInteraction) {
      registerInteractionPause();
    }

    const targetIndex = ((index % items.length) + items.length) % items.length;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    activeIndexRef.current = targetIndex;
    setCurrentIndex(targetIndex);

    if (isContinuous) {
      const targetOffset = getSlideOffset(targetIndex);
      const cycleWidth = getCycleWidth();
      const normalizedTarget = normalizeOffset(targetOffset, cycleWidth);

      if (!options.smooth || reducedMotion) {
        offsetRef.current = normalizedTarget;
        viewport.scrollLeft = normalizedTarget;
        return;
      }

      programmaticScrollRef.current = {
        active: true,
        targetIndex,
        targetScrollLeft: normalizedTarget
      };

      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
      programmaticScrollTimeoutRef.current = window.setTimeout(() => {
        programmaticScrollTimeoutRef.current = null;
        const state = programmaticScrollRef.current;
        if (!state.active) {
          return;
        }
        if (Math.abs(viewport.scrollLeft - state.targetScrollLeft) <= PROGRAMMATIC_SCROLL_EPSILON) {
          finalizeProgrammaticScroll();
        }
      }, PROGRAMMATIC_SCROLL_FALLBACK_MS);

      viewport.scrollTo({
        left: normalizedTarget,
        behavior: 'smooth'
      });
      return;
    }

    const slide = slideRefs.current[targetIndex];
    if (!slide) {
      return;
    }

    const slideRect = slide.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const targetScrollLeft = viewport.scrollLeft + (slideRect.left - viewportRect.left);

    programmaticScrollRef.current = {
      active: true,
      targetIndex,
      targetScrollLeft
    };

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      programmaticScrollTimeoutRef.current = null;
      const state = programmaticScrollRef.current;
      if (!state.active) {
        return;
      }
      if (Math.abs(viewport.scrollLeft - state.targetScrollLeft) <= PROGRAMMATIC_SCROLL_EPSILON) {
        finalizeProgrammaticScroll();
      }
    }, PROGRAMMATIC_SCROLL_FALLBACK_MS);

    slide.scrollIntoView({
      behavior: options.smooth && !reducedMotion ? 'smooth' : 'auto',
      inline: 'start',
      block: 'nearest'
    });
  }, [items.length, isContinuous, reducedMotion, registerInteractionPause, getSlideOffset, getCycleWidth, normalizeOffset, finalizeProgrammaticScroll]);

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
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    if (isContinuous && items.length > 0) {
      const cycleWidth = getCycleWidth();
      const initialOffset = getInitialOffset();
      offsetRef.current = normalizeOffset(initialOffset, cycleWidth);
      viewport.scrollLeft = offsetRef.current;
    }
  }, [isContinuous, items.length, getCycleWidth, getInitialOffset, normalizeOffset]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !isContinuous) {
      return;
    }

    track.querySelectorAll('[data-duplicate-clone]').forEach((node) => {
      (node as HTMLElement).inert = true;
      (node as HTMLElement).setAttribute('inert', '');
    });
  });

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isContinuous) {
      return;
    }

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !shouldAutoplay) {
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
        if (!programmaticScrollRef.current.active) {
          offsetRef.current += CONTINUOUS_SPEED_PX_PER_SECOND * deltaSeconds;
        }
        offsetRef.current = normalizeOffset(offsetRef.current, cycleWidth);
        viewport.scrollLeft = offsetRef.current;
        activeIndexRef.current = getLogicalIndexFromOffset(offsetRef.current, cycleWidth);
        setCurrentIndex(activeIndexRef.current);
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
  }, [isContinuous, shouldAutoplay, getCycleWidth, normalizeOffset, getLogicalIndexFromOffset]);

  useEffect(() => {
    if (isContinuous) {
      return;
    }

    if (!shouldAutoplay) {
      return;
    }

    const firstDelay = resumeWithImmediateAdvanceRef.current ? 0 : autoplayMs;
    resumeWithImmediateAdvanceRef.current = false;

    let intervalId: number | null = null;

    const timeoutId = window.setTimeout(() => {
      goToLogicalIndex(activeIndexRef.current + 1, { smooth: true });

      intervalId = window.setInterval(() => {
        goToLogicalIndex(activeIndexRef.current + 1, { smooth: true });
      }, autoplayMs);
    }, firstDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoplayMs, goToLogicalIndex, items.length, shouldAutoplay, isContinuous]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const onScrollEnd = () => {
      finalizeProgrammaticScroll();
    };

    viewport.addEventListener('scrollend', onScrollEnd);

    return () => {
      viewport.removeEventListener('scrollend', onScrollEnd);
    };
  }, [finalizeProgrammaticScroll]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  const snapToNearest = useCallback(() => {
    if (isContinuous) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport || slideRefs.current.length === 0) {
      return;
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearestIndex = clampedIndex;
    let shortestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(viewportCenter - slideCenter);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestIndex = index;
      }
    });

    goToLogicalIndex(nearestIndex, { smooth: true });
  }, [clampedIndex, goToLogicalIndex, isContinuous]);

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const viewport = event.currentTarget;
    const state = programmaticScrollRef.current;

    if (state.active) {
      const distance = Math.abs(viewport.scrollLeft - state.targetScrollLeft);
      if (distance <= PROGRAMMATIC_SCROLL_EPSILON) {
        finalizeProgrammaticScroll();
      }
      return;
    }

    if (isContinuous) {
      const cycleWidth = getCycleWidth();
      if (cycleWidth > 0) {
        const normalized = normalizeOffset(viewport.scrollLeft, cycleWidth);
        if (Math.abs(viewport.scrollLeft - normalized) > 1) {
          offsetRef.current = normalized;
          viewport.scrollLeft = normalized;
        }
      }
      return;
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;

    let nextIndex = clampedIndex;
    let shortestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(viewportCenter - slideCenter);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nextIndex = index;
      }
    });

    if (nextIndex !== clampedIndex) {
      setCurrentIndex(nextIndex);
      activeIndexRef.current = nextIndex;
    }
  }

  function onKeyboardNavigation(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    if (isContinuous) {
      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : event.key === 'ArrowRight'
              ? (clampedIndex + 1) % items.length
              : (clampedIndex - 1 + items.length) % items.length;
      goToLogicalIndex(nextIndex, { smooth: true, fromInteraction: true });
      return;
    }

    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : event.key === 'ArrowRight'
            ? (clampedIndex + 1) % items.length
            : (clampedIndex - 1 + items.length) % items.length;

    goToLogicalIndex(nextIndex, { smooth: true, fromInteraction: true });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) {
      return;
    }

    isPointerActiveRef.current = true;
    beginInteractionPause();

    if (isContinuous) {
      offsetRef.current = viewport.scrollLeft;
    }

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
      suppressClickRef.current = true;
    }

    if (isContinuous) {
      const cycleWidth = getCycleWidth();
      let nextOffset = dragState.startScrollLeft - deltaX;
      if (cycleWidth > 0) {
        nextOffset = normalizeOffset(nextOffset, cycleWidth);
      } else {
        nextOffset = Math.max(0, nextOffset);
      }
      offsetRef.current = nextOffset;
      viewport.scrollLeft = nextOffset;
    } else {
      viewport.scrollLeft = dragState.startScrollLeft - deltaX;
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

    const wasDragging = dragState.isDragging;
    dragState.pointerId = -1;
    dragState.isDragging = false;
    isPointerActiveRef.current = false;
    setIsDragging(false);

    if (isContinuous) {
      const cycleWidth = getCycleWidth();
      if (cycleWidth > 0) {
        offsetRef.current = normalizeOffset(viewport.scrollLeft, cycleWidth);
        viewport.scrollLeft = offsetRef.current;
      }
      const logical = getLogicalIndexFromOffset(offsetRef.current, cycleWidth);
      activeIndexRef.current = logical;
      setCurrentIndex(logical);
    } else if (wasDragging) {
      snapToNearest();
    }

    scheduleInteractionResume();
  }

  function onLostPointerCapture() {
    const dragState = dragStateRef.current;
    if (dragState.pointerId === -1) {
      return;
    }

    const wasDragging = dragState.isDragging;
    dragState.pointerId = -1;
    dragState.isDragging = false;
    isPointerActiveRef.current = false;
    setIsDragging(false);

    if (isContinuous) {
      const viewport = viewportRef.current;
      const cycleWidth = getCycleWidth();
      if (viewport && cycleWidth > 0) {
        offsetRef.current = normalizeOffset(viewport.scrollLeft, cycleWidth);
        viewport.scrollLeft = offsetRef.current;
      }
      const logical = getLogicalIndexFromOffset(offsetRef.current, cycleWidth);
      activeIndexRef.current = logical;
      setCurrentIndex(logical);
    } else if (wasDragging) {
      snapToNearest();
    }

    scheduleInteractionResume();
  }

  const slides = useMemo(() => {
    if (!isContinuous || items.length === 0) {
      return items.map((item, index) => (
        <div
          key={`${carouselId}-${index}`}
          ref={(node) => {
            slideRefs.current[index] = node;
          }}
          className={cn('shrink-0 snap-start', itemClassName)}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} de ${items.length}: ${getItemLabel(item, index)}`}
          data-active={index === clampedIndex ? 'true' : 'false'}
          data-testid={testId ? `${testId}-slide-${index + 1}` : undefined}
        >
          {renderItem(item, { index, isActive: index === clampedIndex })}
        </div>
      ));
    }

    const previousClone = items[items.length - 1];
    const nextClone = items[0];

    return [
      <div
        key={`${carouselId}-prev-clone`}
        ref={(node) => {
          slideRefs.current[0] = node;
        }}
        className={cn('shrink-0', itemClassName)}
        role="group"
        aria-roledescription="slide"
        aria-hidden="true"
        data-duplicate-clone=""
        data-testid={testId ? `${testId}-slide-clone-prev` : undefined}
      >
        {renderItem(previousClone, { index: items.length - 1, isActive: false })}
      </div>,
      ...items.map((item, index) => (
        <div
          key={`${carouselId}-${index}`}
          ref={(node) => {
            slideRefs.current[index + 1] = node;
          }}
          className={cn('shrink-0', itemClassName)}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} de ${items.length}: ${getItemLabel(item, index)}`}
          data-active={index === clampedIndex ? 'true' : 'false'}
          data-testid={testId ? `${testId}-slide-${index + 1}` : undefined}
        >
          {renderItem(item, { index, isActive: index === clampedIndex })}
        </div>
      )),
      <div
        key={`${carouselId}-next-clone`}
        ref={(node) => {
          slideRefs.current[items.length + 1] = node;
        }}
        className={cn('shrink-0', itemClassName)}
        role="group"
        aria-roledescription="slide"
        aria-hidden="true"
        data-duplicate-clone=""
        data-testid={testId ? `${testId}-slide-clone-next` : undefined}
      >
        {renderItem(nextClone, { index: 0, isActive: false })}
      </div>
    ];
  }, [isContinuous, items, carouselId, itemClassName, clampedIndex, renderItem, getItemLabel, testId]);

  return (
    <section
      className={className}
      aria-label={ariaLabel}
      data-testid={testId}
      onMouseEnter={() => {
        beginInteractionPause();
        scheduleInteractionResume();
      }}
      onFocusCapture={() => {
        beginInteractionPause();
        scheduleInteractionResume();
      }}
    >
      <div
        ref={viewportRef}
        className={cn(
          'overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-y',
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
          viewportClassName
        )}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointerInteraction}
        onPointerCancel={finishPointerInteraction}
        onLostPointerCapture={onLostPointerCapture}
        onTouchStart={() => beginInteractionPause()}
        onTouchEnd={() => scheduleInteractionResume()}
        onTouchCancel={() => scheduleInteractionResume()}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
            registerInteractionPause();
          }
        }}
        data-testid={testId ? `${testId}-viewport` : undefined}
      >
        <div
          ref={trackRef}
          className={cn('flex', isContinuous ? '' : 'snap-x snap-mandatory gap-4', trackClassName)}
          style={{ scrollSnapType: isDragging && !isContinuous ? 'none' : undefined }}
          role="group"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          tabIndex={0}
          onKeyDown={onKeyboardNavigation}
          data-testid={testId ? `${testId}-track` : undefined}
        >
          {slides}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-borderline bg-white text-navy-900 transition hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Slide anterior"
          onClick={() => goToLogicalIndex(clampedIndex - 1, { smooth: true, fromInteraction: true })}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" aria-label="Indicadores de posição">
          {items.map((item, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              className={cn(
                'h-2 rounded-full transition',
                index === clampedIndex ? 'w-6 bg-gold-600' : 'w-2 bg-navy-900/20 hover:bg-gold-500/60'
              )}
              aria-label={`Ir para ${getItemLabel(item, index)}`}
              aria-pressed={index === clampedIndex}
              onClick={() => goToLogicalIndex(index, { smooth: true, fromInteraction: true })}
            />
          ))}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-borderline bg-white text-navy-900 transition hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Próximo slide"
          onClick={() => goToLogicalIndex(clampedIndex + 1, { smooth: true, fromInteraction: true })}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {showCounter ? (
        <p className={cn('mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted', counterClassName)} data-testid={testId ? `${testId}-counter` : undefined}>
          {items.length === 0 ? '0 de 0' : `${clampedIndex + 1} de ${items.length}`}
        </p>
      ) : null}
    </section>
  );
}
