"use client";

import { useEffect, useState, type RefObject } from 'react';

export function useInViewport<T extends Element>(ref: RefObject<T | null>, threshold = 0.35) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return inViewport;
}