"use client";

import { useCallback, useRef, useState, type ReactNode, type UIEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/components/shared/cn';

type SnapCarouselProps = {
  label: string;
  testId?: string;
  itemCount: number;
  children: ReactNode;
};

/**
 * Carrossel mobile por scroll-snap com setas de navegação circular.
 *
 * Mantém o scroll nativo (snap-x snap-mandatory) e adiciona:
 * - Previous/Next com loop infinito (primeiro → último e vice-versa);
 * - indicadores de posição sincronizados com o card ativo.
 */
export function SnapCarousel({ label, testId, itemCount, children }: SnapCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const row = rowRef.current;
      if (!row || itemCount === 0) {
        return;
      }
      const cards = Array.from(row.children) as HTMLElement[];
      if (cards.length === 0) {
        return;
      }
      const nextIndex = ((activeIndex + direction) % itemCount + itemCount) % itemCount;
      const target = cards[Math.min(nextIndex, cards.length - 1)];
      const rowRect = row.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetLeft = row.scrollLeft + (targetRect.left - rowRect.left);
      row.scrollTo({ left: targetLeft, behavior: 'smooth' });
      setActiveIndex(nextIndex);
    },
    [activeIndex, itemCount]
  );

  function syncActiveIndex(event: UIEvent<HTMLDivElement>) {
    const row = event.currentTarget;
    const cards = Array.from(row.children) as HTMLElement[];
    if (cards.length === 0) {
      return;
    }
    const rowRect = row.getBoundingClientRect();
    const center = row.scrollLeft + row.clientWidth / 2;
    let nearest = 0;
    let shortestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = row.scrollLeft + (cardRect.left - rowRect.left) + cardRect.width / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  }

  return (
    <div className="relative">
      <div
        ref={rowRef}
        className="snap-row"
        data-testid={testId}
        tabIndex={0}
        aria-label={label}
        onScroll={syncActiveIndex}
      >
        {children}
      </div>

      <button
        type="button"
        className="absolute left-1 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/20 bg-white/80 text-navy-900 shadow-md backdrop-blur-sm transition hover:border-gold-500 hover:bg-white hover:text-gold-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        aria-label="Anterior"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="absolute right-1 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy-900/20 bg-white/80 text-navy-900 shadow-md backdrop-blur-sm transition hover:border-gold-500 hover:bg-white hover:text-gold-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        aria-label="Seguinte"
        onClick={() => navigate(1)}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="mt-3 flex justify-center gap-2" aria-label="Indicadores de posição">
        {Array.from({ length: itemCount }).map((_, index) => (
          <span
            key={`${testId}-dot-${index}`}
            aria-hidden="true"
            className={cn('h-1.5 rounded-full transition', index === activeIndex ? 'w-6 bg-gold-600' : 'w-1.5 bg-navy-800/20')}
          />
        ))}
      </div>
    </div>
  );
}
