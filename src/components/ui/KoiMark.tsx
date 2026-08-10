import { cn } from '../../lib/utils';

/** Inline brand mark: koi-red circle over a water line (matches /koi-mark.svg). */
export const KoiMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('w-7 h-7', className)}>
    <defs>
      <linearGradient id="koi-mark-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e92010" />
        <stop offset="1" stopColor="#ff7a2f" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="26" r="14" fill="url(#koi-mark-g)" />
    <path
      d="M8 48 q 6 -7.5 12 0 t 12 0 t 12 0 t 12 0"
      stroke="currentColor"
      strokeOpacity="0.85"
      strokeWidth="4.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
