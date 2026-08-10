import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Constrains and pads the inner content. Disable for full-bleed sections. */
  contain?: boolean;
  children: ReactNode;
}

export const Section = ({ id, labelledBy, className, contain = true, children }: SectionProps) => (
  <section id={id} aria-labelledby={labelledBy} className={cn('relative py-24 md:py-32', className)}>
    {contain ? <div className="max-w-7xl mx-auto px-6 md:px-12">{children}</div> : children}
  </section>
);
