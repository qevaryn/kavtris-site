"use client";

import Image from 'next/image';
import { cn } from '@/components/shared/cn';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

/**
 * WEB.1F.1 - Hero logo reveal.
 *
 * The approved current white KAVTRIS symbol gets ONE quick entrance:
 *   fast fade + subtle side fog (~1s total), then a fully static logo.
 * No narrative sequence, no loops, no WebGL/canvas/external fog assets.
 * Hero text and CTAs never wait for the logo.
 *
 * Reduced motion: the final static state renders immediately.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto min-h-[190px] w-full max-w-[22rem] sm:min-h-[250px] sm:max-w-[28rem] lg:min-h-[440px] lg:max-w-none xl:min-h-[470px]"
      data-testid="hero-brand-visual"
      aria-hidden="true"
    >
      {/* Faint static technical ring (same restrained depth language). */}
      <div className="hero-ring" aria-hidden="true" />

      {/* Subtle lateral fog - CSS gradients only, decorative, aria-hidden. */}
      <div className="hero-fog hero-fog-left" aria-hidden="true" />
      <div className="hero-fog hero-fog-right" aria-hidden="true" />

      {/* Current white Hero logo (approved asset, unchanged). */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[min(50vw,12.5rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(46vw,13rem)] lg:left-[56%] lg:w-[27rem] xl:w-[30rem]">
        <Image
          src="/brand/kavtris/kavtris-symbol-dark.png"
          alt="Símbolo KAVTRIS"
          width={760}
          height={760}
          priority
          sizes="(max-width: 430px) 168px, (max-width: 768px) 192px, (max-width: 1280px) 400px, 464px"
          className={cn('h-auto w-full object-contain', reducedMotion ? 'hero-logo hero-logo--static' : 'hero-logo')}
        />
      </div>
    </div>
  );
}