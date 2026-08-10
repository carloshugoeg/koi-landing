import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/** Pointer position (0..1) that yields the resting pose: rotateX +4°, rotateY -4°. */
const REST = 1 / 6;
const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

/**
 * Pointer-tracking 3D tilt. Springs animate from the current value, so the
 * motion is interruptible and settles without overshoot. On touch or under
 * reduced motion the surface holds the resting pose.
 */
export function useTilt(maxTilt = 6) {
  const reduced = useReducedMotion();
  const canHover = useRef(
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  );

  const px = useMotionValue(REST);
  const py = useMotionValue(REST);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || !canHover.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    px.set(REST);
    py.set(REST);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave };
}
