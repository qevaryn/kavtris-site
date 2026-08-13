import Image from 'next/image';
import { cn } from '@/components/shared/cn';
import { BrandDescriptor } from '@/components/shared/BrandDescriptor';

/**
 * WEB.1F.1 — semantic brand lockup.
 *
 *   [K SYMBOL]  KAVTRIS
 *               TECHNOLOGY & CONSULTING
 *
 * The symbol stays visually independent on the left; the KAVTRIS wordmark
 * and the contextual descriptor live in one textual lockup, so the
 * descriptor always belongs underneath the WORDMARK ONLY — never as a
 * full-width line under the symbol + wordmark block.
 *
 * Header and Footer share this component (contextual size differences are
 * applied via `descriptorClassName` / `className`), keeping the same brand
 * logic everywhere.
 */
export function BrandLockup({
  className,
  descriptorClassName,
  descriptorSize
}: {
  className?: string;
  descriptorClassName?: string;
  descriptorSize?: 'xs' | 'sm';
}) {
  return (
    <span className={cn('flex items-center', className)} data-testid="brand-lockup">
      {/* Decorative symbol: the textual lockup below carries the brand name. */}
      <Image
        src="/brand/kavtris/kavtris-symbol-dark.png"
        alt=""
        width={760}
        height={760}
        aria-hidden="true"
        className="h-auto w-[28px] shrink-0 object-contain min-[430px]:w-[32px] lg:w-[36px]"
      />
      <span className="ml-2.5 flex min-w-0 flex-col min-[430px]:ml-3" data-testid="brand-text-lockup">
        <span className="text-[1.05rem] font-extrabold leading-none tracking-[0.05em] text-white min-[430px]:text-[1.15rem] lg:text-[1.3rem]">
          KAVTRIS
        </span>
        <BrandDescriptor size={descriptorSize} className={descriptorClassName} />
      </span>
    </span>
  );
}
