import { cn } from '@/components/shared/cn';

type BrandDescriptorProps = {
  className?: string;
  /** 'xs' = compact mobile (Header); 'sm' = slightly larger (Footer). Both
      converge to the same size at sm+ breakpoints. */
  size?: 'xs' | 'sm';
};

/**
 * WEB.1E — contextual brand descriptor.
 *
 * MASTER BRAND = KAVTRIS (the logo asset). This descriptor is deliberately
 * HTML/CSS contextual copy — it is NOT baked into any SVG/raster lockup and
 * must not become part of the canonical logo geometry.
 *
 * Same text / capitalization / tracking philosophy is reused in the Header and
 * the Footer; only the font-size may differ by context.
 */
export function BrandDescriptor({ className, size = 'xs' }: BrandDescriptorProps) {
  return (
    <span
      className={cn(
        'block whitespace-nowrap font-semibold uppercase leading-none tracking-[0.2em] text-white/55 sm:text-[0.65rem]',
        size === 'sm' ? 'text-[0.6rem]' : 'text-[0.5rem]',
        className
      )}
      data-testid="brand-descriptor"
    >
      Technology &amp; Consulting
    </span>
  );
}
