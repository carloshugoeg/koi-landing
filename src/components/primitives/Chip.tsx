import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const Chip = ({ className, children }: { className?: string; children: ReactNode }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-chip border border-white/10 bg-white/5 text-caption text-white/70',
      className,
    )}
  >
    {children}
  </span>
);
