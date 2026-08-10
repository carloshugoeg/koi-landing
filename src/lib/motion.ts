import type { Transition, Variants } from 'framer-motion';

/**
 * Shared spring presets. Critically damped (bounce 0) by default — overshoot is
 * reserved for surfaces that follow a gesture, per the sheet preset.
 */
export const spring = {
  /** Press feedback, icon nudges. */
  quick: { type: 'spring', duration: 0.35, bounce: 0 },
  /** Most UI transitions. */
  default: { type: 'spring', duration: 0.5, bounce: 0 },
  /** Large-surface reveals, mockup entrances. */
  gentle: { type: 'spring', duration: 0.7, bounce: 0 },
  /** ONLY the mobile menu sheet. */
  sheet: { type: 'spring', duration: 0.5, bounce: 0.2 },
} satisfies Record<string, Transition>;

export const viewportOnce = { once: true, margin: '-80px' } as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.default },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: spring.gentle },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
