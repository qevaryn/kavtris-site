import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/components/shared/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ href, variant = 'primary', className, children, ...props }: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kavtris-blue focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 disabled:opacity-60 disabled:pointer-events-none';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-kavtris-blue text-white shadow-glow hover:bg-[#0B5EFF]',
    secondary: 'bg-white/10 text-white ring-1 ring-inset ring-white/15 hover:bg-white/15',
    ghost: 'bg-transparent text-navy-800 hover:bg-navy-950/5',
    // WEB.1C — bordered light-surface CTA (dark text, restrained, blue on hover).
    outline: 'bg-white text-navy-800 ring-1 ring-inset ring-navy-900/15 shadow-sm hover:text-kavtris-blue hover:ring-kavtris-blue'
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
