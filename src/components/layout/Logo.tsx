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
        src="/images/logo-qualidade-e-vida-tech.svg"
        alt="Qualidade é Vida Tech"
        width={180}
        height={48}
        priority={priority}
        className="h-auto w-[156px] sm:w-[180px]"
      />
    </span>
  );
}
