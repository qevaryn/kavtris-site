"use client";

import Image from 'next/image';
import { cn } from '@/components/shared/cn';
import { useReducedMotion } from '@/components/shared/useReducedMotion';

/**
 * WEB.1A — Hero engineering visual.
 *
 * Linear/angular SVG + CSS composition: a small light point travels an angular
 * technical path, precise circuit structures assemble around it, and the
 * structures converge toward the KAVTRIS K symbol. No cube / sphere / portal /
 * eye / circular tunnel. SSR-safe, no WebGL, no interaction required.
 *
 * Reduced motion: renders the finished technical K composition statically.
 */
export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-[380px]"
      data-testid="hero-brand-visual"
      aria-hidden="true"
    >
      <div
        className={cn(
          'absolute left-1/2 top-1/2 h-[min(72vw,24rem)] w-[min(72vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]',
          !reducedMotion && 'hero-inner-ring'
        )}
      />

      <svg
        className={cn('absolute inset-0 h-full w-full text-white/45', reducedMotion && 'hero-reduced')}
        viewBox="0 0 720 460"
        fill="none"
        aria-hidden="true"
      >
        {/* Angular technical paths (draw in sequence) */}
        <path
          className="hero-draw"
          style={{ animationDelay: '0.7s' }}
          d="M56 366 L188 306 L252 218 L340 196"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.85"
        />
        <path
          className="hero-draw"
          style={{ animationDelay: '1.6s' }}
          d="M340 196 L462 148 L560 96"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.7"
        />
        <path
          className="hero-draw"
          style={{ animationDelay: '2.2s' }}
          d="M96 396 L224 340 L300 268 L368 300"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.6"
        />
        <path
          className="hero-draw"
          style={{ animationDelay: '2.8s' }}
          d="M368 300 L470 214 L560 214"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.55"
        />

        {/* Geometric K outline (draws as structures converge, 4.5–6.5s) */}
        <path
          className="hero-draw"
          style={{ animationDelay: '4.6s' }}
          d="M470 130 L470 316"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          className="hero-draw"
          style={{ animationDelay: '5.2s' }}
          d="M470 220 L560 130"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          className="hero-draw"
          style={{ animationDelay: '5.8s' }}
          d="M470 220 L560 316"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Circuit nodes */}
        <g className="hero-node" style={{ animationDelay: '1.2s' }}>
          <circle cx="188" cy="306" r="4" fill="#3D7BFF" />
          <circle cx="340" cy="196" r="3.4" fill="currentColor" />
        </g>
        <g className="hero-node" style={{ animationDelay: '2s' }}>
          <circle cx="462" cy="148" r="4" fill="#3D7BFF" />
          <circle cx="560" cy="96" r="3.2" fill="currentColor" />
        </g>
        <g className="hero-node" style={{ animationDelay: '2.6s' }}>
          <circle cx="368" cy="300" r="3.4" fill="currentColor" />
          <circle cx="560" cy="214" r="4" fill="#3D7BFF" />
        </g>

        {/* Light point travelling the angular path */}
        <g className="hero-light-point">
          <circle cx="0" cy="0" r="4.6" fill="#ffffff" />
          <circle cx="0" cy="0" r="11" fill="#065AFD" opacity="0.35" />
        </g>
      </svg>

      {/* Converged KAVTRIS symbol */}
      <div className="absolute left-1/2 top-1/2 w-[min(50vw,12.5rem)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(46vw,13rem)] lg:left-[62%] lg:w-[25rem] xl:w-[29rem]">
        <Image
          src="/brand/kavtris/kavtris-symbol-dark.png"
          alt="Símbolo KAVTRIS"
          width={760}
          height={760}
          priority
          sizes="(max-width: 430px) 168px, (max-width: 768px) 192px, (max-width: 1280px) 400px, 464px"
          className={cn('h-auto w-full object-contain', reducedMotion ? 'opacity-100' : 'hero-k-symbol')}
        />
      </div>
    </div>
  );
}
