"use client";

import { useEffect, useState, type RefObject } from 'react';

const THRESHOLDS = Array.from({ length: 21 }, (_, index) => index / 20);

export type InViewportState = {
  inViewport: boolean;
  visibleRatio: number;
  priority: number;
};

function computeMetrics(node: Element) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = Math.max(window.innerHeight, 1);
  const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
  const ratio = Math.min(1, visibleHeight / Math.max(rect.height, 1));

  const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
  const maxDistance = viewportHeight / 2 + Math.max(rect.height, 1) / 2;
  const centrality = 1 - Math.min(1, centerDistance / Math.max(maxDistance, 1));

  const priority = ratio * 0.6 + centrality * 0.4;

  return { ratio, priority };
}

export function useInViewport<T extends Element>(ref: RefObject<T | null>, threshold = 0.35): InViewportState {
  const [state, setState] = useState<InViewportState>({ inViewport: false, visibleRatio: 0, priority: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const update = () => {
      const { ratio, priority } = computeMetrics(node);
      setState({ inViewport: ratio >= threshold, visibleRatio: ratio, priority });
    };

    update();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]) {
        const { ratio, priority } = computeMetrics(node);
        setState({ inViewport: ratio >= threshold, visibleRatio: ratio, priority });
      }
    }, { threshold: THRESHOLDS });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return state;
}
