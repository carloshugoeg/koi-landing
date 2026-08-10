import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';
import { spring } from '../../lib/motion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
  children: ReactNode;
}

const styles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-koi-red-500 to-koi-ember text-white shadow-glow-red hover:brightness-110',
  secondary:
    'bg-white text-koi-dark hover:bg-white/90',
  ghost:
    'border border-white/20 text-white hover:border-white/50 hover:bg-white/5',
};

export const Button = ({ href, variant = 'primary', external, className, onClick, children, ...rest }: ButtonProps) => (
  <m.a
    href={href}
    onClick={onClick}
    whileTap={{ scale: 0.97 }}
    transition={spring.quick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={cn(
      'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-body-sm font-semibold transition-[filter,background-color,border-color] duration-150 select-none',
      styles[variant],
      className,
    )}
    aria-label={rest['aria-label']}
  >
    {children}
  </m.a>
);
