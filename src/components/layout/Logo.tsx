import Image from 'next/image';
import { cn } from '@/components/ui/cn';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)} data-testid="brand-logo">
      <Image
        src="/images/logo-qualidade-e-vida-tech-transparent.png"
        alt="Qualidade é Vida Tech"
        width={650}
        height={162}
        priority={priority}
        loading={priority ? undefined : 'eager'}
        sizes="(max-width: 430px) 156px, (max-width: 640px) 168px, (max-width: 1024px) 214px, 236px"
        className="h-auto w-[156px] shrink-0 object-contain min-[430px]:w-[168px] sm:w-[214px] lg:w-[236px]"
      />
    </span>
  );
}
