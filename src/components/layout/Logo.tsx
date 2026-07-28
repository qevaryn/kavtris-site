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
        src="/images/logo-qualidade-e-vida-tech.png"
        alt="Qualidade é Vida Tech"
        width={720}
        height={280}
        priority={priority}
        loading={priority ? undefined : 'eager'}
        sizes="(max-width: 640px) 148px, 180px"
        className="h-auto w-[148px] sm:w-[180px]"
      />
    </span>
  );
}
