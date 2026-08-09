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
  motionMode?: 'default' | 'continuous' | 'featured-step';
};

const DRAG_THRESHOLD = 6;
const PROGRAMMATIC_SCROLL_EPSILON = 4;
const PROGRAMMATIC_SCROLL_FALLBACK_MS = 3000;
const CONTINUOUS_SPEED_PX_PER_SECOND = 40;

type ProgrammaticScrollState = {
  active: boolean;
  targetIndex: number;
  targetScrollLeft: number;
  normalizedIndex?: number;
  fromAutoplay?: boolean;
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
const isTouchActiveRef = useRef(false);
const pendingTouchSettleRef = useRef(false);
  const programmaticScrollRef = useRef<ProgrammaticScrollState>({
    active: false,
    targetIndex: 0,
    targetScrollLeft: 0
  });
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const featuredAdvanceTimerRef = useRef<number | null>(null);
  const shouldAutoplayRef = useRef(false);
  const advanceToNextRef = useRef<() => void>(() => {});
  const featuredStartSpacerRef = useRef<HTMLDivElement>(null);
  const featuredEndSpacerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    cycleWidth: 0,
    isDragging: false
  });
  const dragRafRef = useRef<number | null>(null);
  const latestDragTargetRef = useRef(0);
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
  const isFeaturedStep = motionMode === 'featured-step';
  const hasClones = isContinuous || isFeaturedStep;

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

  const getSlideTargetScrollLeft = useCallback((slideIndex: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[slideIndex];
    if (!viewport || !slide) {
      return 0;
    }
    const viewportRect = viewport.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const slideCenterInContent = viewport.scrollLeft + (slideRect.left - viewportRect.left) + slideRect.width / 2;
    return Math.max(0, slideCenterInContent - viewport.clientWidth / 2);
  }, []);

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

  useEffect(() => {
    shouldAutoplayRef.current = shouldAutoplay;
  }, [shouldAutoplay]);

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
      // O autoplay só pode retomar quando nenhuma interação está ativa.
      // No Safari, pointercancel/lostpointercapture podem ocorrer com o dedo
      // ainda sobre a tela; isTouchActiveRef preserva esse estado.
      if (isPointerActiveRef.current || isTouchActiveRef.current) {
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

  const scheduleFeaturedAdvance = useCallback((delayMs: number) => {
    if (featuredAdvanceTimerRef.current) {
      window.clearTimeout(featuredAdvanceTimerRef.current);
      featuredAdvanceTimerRef.current = null;
    }
    featuredAdvanceTimerRef.current = window.setTimeout(() => {
      featuredAdvanceTimerRef.current = null;
      advanceToNextRef.current();
    }, delayMs);
  }, []);

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

    if (isFeaturedStep && items.length > 0) {
      const viewport = viewportRef.current;
      if (viewport) {
        if (state.targetIndex === items.length + 1) {
          const normalizedLeft = getSlideTargetScrollLeft(1);
          viewport.scrollLeft = normalizedLeft;
          activeIndexRef.current = 0;
          setCurrentIndex(0);
        } else if (state.targetIndex === 0) {
          const normalizedLeft = getSlideTargetScrollLeft(items.length);
          viewport.scrollLeft = normalizedLeft;
          activeIndexRef.current = items.length - 1;
          setCurrentIndex(items.length - 1);
        } else {
          const logical = state.targetIndex - 1;
          activeIndexRef.current = logical;
          setCurrentIndex(logical);
        }
        if (state.fromAutoplay && shouldAutoplayRef.current) {
          scheduleFeaturedAdvance(autoplayMs);
        }
      }
      return;
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
  }, [isContinuous, isFeaturedStep, items.length, getCycleWidth, normalizeOffset, getSlideTargetScrollLeft, scheduleFeaturedAdvance, autoplayMs]);

  const goToLogicalIndex = useCallback((index: number, options: { smooth: boolean; fromInteraction?: boolean; fromAutoplay?: boolean }) => {
    if (items.length === 0) {
      return;
    }

    if (options.fromInteraction) {
      registerInteractionPause();
    }

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      return;
    }

    if (isFeaturedStep) {
      let targetTrackIndex: number;
      let targetLogicalIndex: number;

      if (index >= items.length) {
        targetTrackIndex = items.length + 1;
        targetLogicalIndex = 0;
      } else if (index < 0) {
        targetTrackIndex = 0;
        targetLogicalIndex = items.length - 1;
      } else {
        targetTrackIndex = index + 1;
        targetLogicalIndex = index;
      }

      activeIndexRef.current = targetLogicalIndex;
      setCurrentIndex(targetLogicalIndex);

      const targetScrollLeft = getSlideTargetScrollLeft(targetTrackIndex);

      if (!options.smooth || reducedMotion) {
        if (targetTrackIndex === items.length + 1) {
          viewport.scrollLeft = getSlideTargetScrollLeft(1);
        } else if (targetTrackIndex === 0) {
          viewport.scrollLeft = getSlideTargetScrollLeft(items.length);
        } else {
          viewport.scrollLeft = targetScrollLeft;
        }
        return;
      }

      programmaticScrollRef.current = {
        active: true,
        targetIndex: targetTrackIndex,
        targetScrollLeft,
        normalizedIndex: targetLogicalIndex,
        fromAutoplay: options.fromAutoplay === true
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
        finalizeProgrammaticScroll();
      }, PROGRAMMATIC_SCROLL_FALLBACK_MS);

      viewport.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      return;
    }

    const targetIndex = ((index % items.length) + items.length) % items.length;
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
  }, [items.length, isContinuous, isFeaturedStep, reducedMotion, registerInteractionPause, getSlideOffset, getCycleWidth, normalizeOffset, getSlideTargetScrollLeft, finalizeProgrammaticScroll]);

  useLayoutEffect(() => {
    advanceToNextRef.current = () => {
      if (shouldAutoplayRef.current && items.length > 1) {
        goToLogicalIndex(activeIndexRef.current + 1, { smooth: true, fromAutoplay: true });
      }
    };
  }, [goToLogicalIndex, items.length]);

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
    if (!isFeaturedStep || items.length === 0) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const applyLayout = () => {
      const firstReal = slideRefs.current[1];
      if (!firstReal) {
        return;
      }
      const cardWidth = firstReal.offsetWidth;
      const viewportWidth = viewport.clientWidth;
      const spacerWidth = Math.max(0, Math.round((viewportWidth - cardWidth) / 2));
      if (featuredStartSpacerRef.current) {
        featuredStartSpacerRef.current.style.width = `${spacerWidth}px`;
      }
      if (featuredEndSpacerRef.current) {
        featuredEndSpacerRef.current.style.width = `${spacerWidth}px`;
      }
    };

    const centerCurrent = () => {
      const target = getSlideTargetScrollLeft(activeIndexRef.current + 1);
      viewport.scrollLeft = target;
    };

    applyLayout();
    centerCurrent();

    const resizeObserver = new ResizeObserver(() => {
      applyLayout();
      centerCurrent();
    });
    resizeObserver.observe(viewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isFeaturedStep, items.length, getSlideTargetScrollLeft]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !hasClones) {
      return;
    }

    track.querySelectorAll('[data-duplicate-clone]').forEach((node) => {
      const clone = node as HTMLElement;
      clone.inert = true;
      clone.setAttribute('inert', '');
      clone.querySelectorAll('a, button, input, select, textarea, iframe, [tabindex], [contenteditable="true"]').forEach((focusable) => {
        if (!focusable.hasAttribute('tabindex')) {
          focusable.setAttribute('tabindex', '-1');
        }
      });
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
      if (featuredAdvanceTimerRef.current) {
        window.clearTimeout(featuredAdvanceTimerRef.current);
        featuredAdvanceTimerRef.current = null;
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
      if (dragRafRef.current) {
        window.cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
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
      if (dragRafRef.current) {
        window.cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
      }
      lastFrameTimeRef.current = null;
    };
  }, [isContinuous, shouldAutoplay, getCycleWidth, normalizeOffset, getLogicalIndexFromOffset]);

  useEffect(() => {
    if (isContinuous || isFeaturedStep) {
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
  }, [autoplayMs, goToLogicalIndex, items.length, shouldAutoplay, isContinuous, isFeaturedStep]);

  useEffect(() => {
    if (isContinuous || !isFeaturedStep) {
      return;
    }

    if (featuredAdvanceTimerRef.current) {
      window.clearTimeout(featuredAdvanceTimerRef.current);
      featuredAdvanceTimerRef.current = null;
    }

    if (!shouldAutoplay) {
      return;
    }

    const firstDelay = resumeWithImmediateAdvanceRef.current ? 0 : autoplayMs;
    resumeWithImmediateAdvanceRef.current = false;

    const timeoutId = window.setTimeout(() => {
      advanceToNextRef.current();
    }, firstDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shouldAutoplay, autoplayMs, isFeaturedStep, isContinuous, items.length]);

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
      if (featuredAdvanceTimerRef.current) {
        window.clearTimeout(featuredAdvanceTimerRef.current);
        featuredAdvanceTimerRef.current = null;
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

  const snapToNearest = useCallback(() => {
    if (isContinuous) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport || slideRefs.current.length === 0) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearestIndex = clampedIndex;
    let shortestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const slideRect = slide.getBoundingClientRect();
      const slideCenter = viewport.scrollLeft + (slideRect.left - viewportRect.left) + slideRect.width / 2;
      const distance = Math.abs(viewportCenter - slideCenter);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestIndex = index;
      }
    });

    if (isFeaturedStep) {
      if (nearestIndex === 0) {
        activeIndexRef.current = items.length - 1;
        setCurrentIndex(items.length - 1);
        viewport.scrollLeft = getSlideTargetScrollLeft(items.length);
        return;
      }
      if (nearestIndex === items.length + 1) {
        activeIndexRef.current = 0;
        setCurrentIndex(0);
        viewport.scrollLeft = getSlideTargetScrollLeft(1);
        return;
      }
      goToLogicalIndex(Math.max(0, nearestIndex - 1), { smooth: true });
      return;
    }

    goToLogicalIndex(nearestIndex, { smooth: true });
  }, [clampedIndex, goToLogicalIndex, isContinuous, isFeaturedStep, items.length, getSlideTargetScrollLeft]);

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

    if (isFeaturedStep) {
      if (!isPointerActiveRef.current) {
        return;
      }
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let nearestTrackIndex = -1;
      let shortestDistance = Number.POSITIVE_INFINITY;

      slideRefs.current.forEach((slide, trackIndex) => {
        if (!slide) {
          return;
        }
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = viewport.scrollLeft + (slideRect.left - viewportRect.left) + slideRect.width / 2;
        const distance = Math.abs(viewportCenter - slideCenter);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestTrackIndex = trackIndex;
        }
      });

      if (nearestTrackIndex >= 0) {
        let logical: number;
        if (nearestTrackIndex === 0) {
          logical = items.length - 1;
        } else if (nearestTrackIndex === items.length + 1) {
          logical = 0;
        } else {
          logical = nearestTrackIndex - 1;
        }
        if (logical !== clampedIndex) {
          activeIndexRef.current = logical;
          setCurrentIndex(logical);
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

    if (programmaticScrollRef.current.active) {
      programmaticScrollRef.current.active = false;
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
        programmaticScrollTimeoutRef.current = null;
      }
    }

    // Interrompe qualquer scroll suave automático em curso para que o gesto
    // manual não compita com a animação nativa do browser.
    if (isFeaturedStep) {
      viewport.scrollTo({ left: viewport.scrollLeft, behavior: 'auto' });
    }

    if (isContinuous) {
      offsetRef.current = viewport.scrollLeft;
    }

    const cycleWidth = getCycleWidth();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: viewport.scrollLeft,
      cycleWidth,
      isDragging: false
    };
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
      // A captura de ponteiro do rato mantém o drag fora do viewport. No toque,
      // a captura implícita reside num filho e a reatribuição dispararia
      // lostpointercapture, interrompendo o drag.
      if (event.pointerType === 'mouse') {
        viewport.setPointerCapture(event.pointerId);
      }
    }

    if (isContinuous) {
      let nextOffset = dragState.startScrollLeft - deltaX;
      if (dragState.cycleWidth > 0) {
        nextOffset = normalizeOffset(nextOffset, dragState.cycleWidth);
      } else {
        nextOffset = Math.max(0, nextOffset);
      }
      offsetRef.current = nextOffset;
      latestDragTargetRef.current = nextOffset;
    } else {
      latestDragTargetRef.current = dragState.startScrollLeft - deltaX;
    }

    // Um único write por frame, sincronizado com o paint.
    if (dragRafRef.current === null) {
      dragRafRef.current = window.requestAnimationFrame(() => {
        dragRafRef.current = null;
        const viewport = viewportRef.current;
        if (viewport) {
          viewport.scrollLeft = latestDragTargetRef.current;
        }
      });
    }

    if (event.cancelable) {
      event.preventDefault();
    }
  }

  function flushDragWrite() {
    if (dragRafRef.current !== null) {
      window.cancelAnimationFrame(dragRafRef.current);
      dragRafRef.current = null;
    }
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollLeft = latestDragTargetRef.current;
    }
  }

  function settlePosition(wasDragging: boolean) {
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

    // pointercancel durante toque: o dedo pode continuar sobre a tela. O snap
    // e a retomada ficam para o touchend/touchcancel, evitando escrita
    // concorrente na posição durante o gesto. Preserva o estado de arrasto
    // para que o touchend consiga decidir o settle.
    if (isTouchActiveRef.current) {
      pendingTouchSettleRef.current = pendingTouchSettleRef.current || wasDragging;
      return;
    }

    flushDragWrite();
    settlePosition(wasDragging);
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

    // lostpointercapture durante toque: mesmo tratamento do pointercancel.
    if (isTouchActiveRef.current) {
      pendingTouchSettleRef.current = pendingTouchSettleRef.current || wasDragging;
      return;
    }

    flushDragWrite();
    settlePosition(wasDragging);
    scheduleInteractionResume();
  }

  const slides = useMemo(() => {
    if ((!isContinuous && !isFeaturedStep) || items.length === 0) {
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

    const slideClassName = (trackIndex: number) => {
      if (isFeaturedStep) {
        const active =
          trackIndex === 0
            ? clampedIndex === items.length - 1
            : trackIndex === items.length + 1
              ? clampedIndex === 0
              : clampedIndex === trackIndex - 1;
        return cn(
          'shrink-0 transition duration-500 motion-reduce:transition-none motion-reduce:duration-0',
          active ? 'z-10 scale-100 saturate-100' : 'z-0 scale-[0.98] sm:scale-[0.95] lg:scale-[0.92] saturate-[0.85]',
          itemClassName
        );
      }
      return cn('shrink-0', itemClassName);
    };

    const previousClone = items[items.length - 1];
    const nextClone = items[0];

    const leadingSpacers = isFeaturedStep
      ? [
          <div
            key={`${carouselId}-featured-start`}
            ref={featuredStartSpacerRef}
            className="shrink-0"
            aria-hidden="true"
            data-testid={testId ? `${testId}-spacer-start` : undefined}
          />
        ]
      : [];
    const trailingSpacers = isFeaturedStep
      ? [
          <div
            key={`${carouselId}-featured-end`}
            ref={featuredEndSpacerRef}
            className="shrink-0"
            aria-hidden="true"
            data-testid={testId ? `${testId}-spacer-end` : undefined}
          />
        ]
      : [];

    return [
      ...leadingSpacers,
      <div
        key={`${carouselId}-prev-clone`}
        ref={(node) => {
          slideRefs.current[0] = node;
        }}
        className={slideClassName(0)}
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
          className={slideClassName(index + 1)}
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
        className={slideClassName(items.length + 1)}
        role="group"
        aria-roledescription="slide"
        aria-hidden="true"
        data-duplicate-clone=""
        data-testid={testId ? `${testId}-slide-clone-next` : undefined}
      >
        {renderItem(nextClone, { index: 0, isActive: false })}
      </div>,
      ...trailingSpacers
    ];
  }, [isContinuous, isFeaturedStep, items, carouselId, itemClassName, clampedIndex, renderItem, getItemLabel, testId, featuredStartSpacerRef, featuredEndSpacerRef]);

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
        onTouchStart={() => {
          isTouchActiveRef.current = true;
          beginInteractionPause();
        }}
        onTouchEnd={() => {
          isTouchActiveRef.current = false;
          const dragState = dragStateRef.current;
          const wasDragging = pendingTouchSettleRef.current || dragState.isDragging;
          pendingTouchSettleRef.current = false;
          dragState.pointerId = -1;
          dragState.isDragging = false;
          isPointerActiveRef.current = false;
          setIsDragging(false);
          flushDragWrite();
          settlePosition(wasDragging);
          scheduleInteractionResume();
        }}
        onTouchCancel={() => {
          isTouchActiveRef.current = false;
          const dragState = dragStateRef.current;
          const wasDragging = pendingTouchSettleRef.current || dragState.isDragging;
          pendingTouchSettleRef.current = false;
          dragState.pointerId = -1;
          dragState.isDragging = false;
          isPointerActiveRef.current = false;
          setIsDragging(false);
          flushDragWrite();
          settlePosition(wasDragging);
          scheduleInteractionResume();
        }}
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
          className={cn('flex', isContinuous ? '' : 'gap-4', !hasClones ? 'snap-x snap-mandatory' : '', trackClassName)}
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
