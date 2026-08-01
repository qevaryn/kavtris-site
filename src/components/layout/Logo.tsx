import Image from 'next/image';
import { cn } from '@/components/ui/cn';

type LogoProps = {
  className?: string;
  priority?: boolean;
  variant?: 'qevaryn' | 'network' | 'seal';
};

const logos = {
  qevaryn: {
    src: '/images/qevaryn-systems-logo.png',
    alt: 'Qevaryn Systems',
    width: 900,
    height: 282,
    sizes: '(max-width: 430px) 145px, (max-width: 640px) 170px, (max-width: 1024px) 220px, 260px',
    className: 'h-auto w-[145px] shrink-0 object-contain min-[430px]:w-[170px] sm:w-[220px] xl:w-[260px]'
  },
  network: {
    src: '/images/qualidade-e-vida-systems-logo.png',
    alt: 'Rede Qualidade é Vida',
    width: 680,
    height: 155,
    sizes: '(max-width: 640px) 160px, 190px',
    className: 'h-auto w-[160px] shrink-0 object-contain sm:w-[190px]'
  },
  seal: {
    src: '/images/qualidade-e-vida-seal.png',
    alt: 'Rede Qualidade é Vida',
    width: 512,
    height: 512,
    sizes: '44px',
    className: 'h-11 w-11 shrink-0 object-contain'
  }
};

export function Logo({ className, priority = false, variant = 'qevaryn' }: LogoProps) {
  const logo = logos[variant];

  return (
    <span className={cn('inline-flex items-center', className)} data-testid="brand-logo">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes={logo.sizes}
        className={logo.className}
      />
    </span>
  );
}
