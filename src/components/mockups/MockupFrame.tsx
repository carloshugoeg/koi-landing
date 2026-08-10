import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTilt } from '../../hooks/useTilt';

interface MockupFrameProps {
  /** Accessible one-line description of what the mockup shows. */
  label: string;
  /** Tailwind aspect-ratio class. */
  aspect?: string;
  className?: string;
  children: ReactNode;
  /** Layers floating above the surface (use FloatCard) — they get real 3D depth. */
  float?: ReactNode;
}

/**
 * Shared shell for product mockups. The frame owns perspective + pointer tilt;
 * content sizes itself in `em` against a container-width-driven font-size, so
 * the whole composition scales fluidly with the card — no pixel offsets.
 */
export const MockupFrame = ({ label, aspect = 'aspect-[4/3]', className, children, float }: MockupFrameProps) => {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt();

  return (
    <div
      role="img"
      aria-label={label}
      className={cn('relative w-full select-none', aspect, className)}
      style={{ perspective: 1200 }}
    >
      <m.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, containerType: 'inline-size' }}
        className="absolute inset-0 transform-3d"
      >
        <div
          className="absolute inset-0 rounded-panel bg-koi-surface border border-white/10 shadow-card overflow-hidden flex flex-col"
          style={{ fontSize: 'clamp(8px, 2.4cqw, 14px)' }}
        >
          {children}
        </div>
        {float}
      </m.div>
    </div>
  );
};

interface FloatCardProps {
  /** translateZ depth in px — deeper floats drift more under tilt. */
  depth?: number;
  className?: string;
  children: ReactNode;
}

export const FloatCard = ({ depth = 48, className, children }: FloatCardProps) => (
  <div
    style={{ transform: `translateZ(${depth}px)`, fontSize: 'clamp(8px, 2.4cqw, 14px)' }}
    className={cn(
      'absolute rounded-panel bg-koi-raised/95 border border-white/10 shadow-float',
      className,
    )}
  >
    {children}
  </div>
);

export const WindowChrome = ({ title }: { title: string }) => (
  <div className="flex items-center gap-[0.45em] px-[1.1em] py-[0.8em] border-b border-white/10 bg-white/[0.02]">
    <span className="w-[0.7em] h-[0.7em] rounded-full bg-white/15" />
    <span className="w-[0.7em] h-[0.7em] rounded-full bg-white/15" />
    <span className="w-[0.7em] h-[0.7em] rounded-full bg-white/15" />
    <span className="ml-[0.6em] text-[0.85em] font-medium text-white/40">{title}</span>
  </div>
);

export const MockupSkeleton = ({ aspect = 'aspect-[4/3]' }: { aspect?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      'relative w-full rounded-panel bg-koi-surface border border-white/10 animate-pulse motion-reduce:animate-none',
      aspect,
    )}
  />
);
