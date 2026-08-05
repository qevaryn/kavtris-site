"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type UIEvent } from 'react';
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
  showCounter?: boolean;
  counterClassName?: string;
  testId?: string;
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
  showCounter = false,
  counterClassName,
  testId
}: AccessibleCarouselProps<T>) {
  const carouselId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedByIntent, setPausedByIntent] = useState(false);
  const [pausedByInteraction, setPausedByInteraction] = useState(false);
  const isInViewport = useInViewport(viewportRef, 0.35);
  const reducedMotion = useReducedMotion();
  const wantsAutoplay = autoplayMs > 0 && isInViewport && !reducedMotion;
  const canOwnMotion = useMotionBudget(`carousel-${carouselId}`, wantsAutoplay);

  const clampedIndex = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }

    return Math.min(currentIndex, items.length - 1);
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!wantsAutoplay || !canOwnMotion || pausedByIntent || pausedByInteraction || items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      goTo((clampedIndex + 1) % items.length, { smooth: true });
    }, autoplayMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [autoplayMs, canOwnMotion, clampedIndex, items.length, pausedByIntent, pausedByInteraction, wantsAutoplay]);

  function goTo(index: number, options: { smooth: boolean; fromInteraction?: boolean }) {
    if (!slideRefs.current[index]) {
      return;
    }

    if (options.fromInteraction) {
      setPausedByInteraction(true);
    }

    setCurrentIndex(index);
    slideRefs.current[index]?.scrollIntoView({
      behavior: options.smooth ? 'smooth' : 'auto',
      inline: 'start',
      block: 'nearest'
    });
  }

  function onScroll(event: UIEvent<HTMLDivElement>) {
    const viewport = event.currentTarget;
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
    }
  }

  function onKeyboardNavigation(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : event.key === 'ArrowRight'
            ? (clampedIndex + 1) % items.length
            : (clampedIndex - 1 + items.length) % items.length;

    goTo(nextIndex, { smooth: true, fromInteraction: true });
  }

  return (
    <section
      className={className}
      aria-label={ariaLabel}
      data-testid={testId}
      onMouseEnter={() => setPausedByIntent(true)}
      onMouseLeave={() => setPausedByIntent(false)}
      onFocusCapture={() => setPausedByIntent(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPausedByIntent(false);
        }
      }}
    >
      <div
        ref={viewportRef}
        className={cn(
          'overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          viewportClassName
        )}
        onScroll={onScroll}
        onPointerDown={() => setPausedByInteraction(true)}
        onTouchStart={() => setPausedByInteraction(true)}
      >
        <div
          className={cn('flex snap-x snap-mandatory gap-4', trackClassName)}
          role="group"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          tabIndex={0}
          onKeyDown={onKeyboardNavigation}
          data-testid={testId ? `${testId}-track` : undefined}
        >
          {items.map((item, index) => (
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
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-borderline bg-white text-navy-900 transition hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Slide anterior"
          onClick={() => goTo((clampedIndex - 1 + items.length) % items.length, { smooth: true, fromInteraction: true })}
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
              onClick={() => goTo(index, { smooth: true, fromInteraction: true })}
            />
          ))}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-borderline bg-white text-navy-900 transition hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="Próximo slide"
          onClick={() => goTo((clampedIndex + 1) % items.length, { smooth: true, fromInteraction: true })}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {showCounter ? (
        <p className={cn('mt-2 text-center text-sm font-semibold text-muted', counterClassName)} data-testid={testId ? `${testId}-counter` : undefined}>
          {clampedIndex + 1} de {items.length}
        </p>
      ) : null}
    </section>
  );
}