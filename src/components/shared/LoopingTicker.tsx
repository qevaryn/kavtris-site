"use client";

import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
  const tickerRef = useRef<HTMLDivElement>(null);
  const duplicateTrackRef = useRef<HTMLUListElement>(null);
  const [pausedByIntent, setPausedByIntent] = useState(false);
  const isInViewport = useInViewport(tickerRef, 0.35);
  const reducedMotion = useReducedMotion();
  const motionId = useId();
  const canOwnMotion = useMotionBudget(`ticker-${motionId}`, isInViewport && !reducedMotion);
  const shouldAnimate = canOwnMotion && isInViewport && !reducedMotion;

  useLayoutEffect(() => {
    const duplicateTrack = duplicateTrackRef.current;
    if (!duplicateTrack) {
      return;
    }

    duplicateTrack.inert = true;
    duplicateTrack.setAttribute('inert', '');
  });

  return (
    <section
      ref={tickerRef}
      className={className}
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setPausedByIntent(true)}
      onMouseLeave={() => setPausedByIntent(false)}
      onFocusCapture={() => setPausedByIntent(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPausedByIntent(false);
        }
      }}
      data-testid={testId}
    >
      <div className={cn('overflow-hidden', viewportClassName)}>
        <div
          className={cn('flex w-max gap-3 sm:gap-4', shouldAnimate && 'animate-looping-ticker', trackClassName)}
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: pausedByIntent ? 'paused' : 'running'
          }}
          data-testid={testId ? `${testId}-track` : undefined}
        >
          <ul className="flex shrink-0 gap-3 sm:gap-4" data-testid={testId ? `${testId}-main` : undefined}>
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