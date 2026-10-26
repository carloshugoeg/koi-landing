export function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function framePath(state: string, index: number): string {
  return `/ink/koi-lib/${state}/${String(index).padStart(2, '0')}.png`;
}

export function preloadFrames(state: string, count: number): void {
  for (let index = 0; index < count; index += 1) {
    const image = new Image();
    image.src = framePath(state, index);
  }
}

export type NosotrosPhase = 'checkMotion' | 'idle' | 'settling' | 'settled';

export type NosotrosEvent =
  | { type: 'probe'; reduce: boolean }
  | { type: 'enter' }
  | { type: 'progress'; complete: boolean };

export function stepNosotros(phase: NosotrosPhase, event: NosotrosEvent): NosotrosPhase {
  switch (phase) {
    case 'checkMotion':
      if (event.type !== 'probe') return phase;
      return event.reduce ? 'settled' : 'idle';
    case 'idle':
      if (event.type === 'enter') return 'settling';
      return phase;
    case 'settling':
      if (event.type === 'progress') return event.complete ? 'settled' : phase;
      return phase;
    case 'settled':
      return phase;
    default: {
      const unreachable: never = phase;
      return unreachable;
    }
  }
}

export function tornClips(count: number): string[] {
  let seed = 7;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const clips: string[] = [];
  for (let n = 0; n < count; n += 1) {
    const points: string[] = [];
    const steps = 26;
    const amplitude = 2.6;
    for (let i = 0; i <= steps; i += 1) points.push(`${(i / steps) * 100}% ${next() * amplitude}%`);
    for (let i = 0; i <= steps; i += 1) points.push(`${100 - next() * 1.4}% ${(i / steps) * 100}%`);
    for (let i = steps; i >= 0; i -= 1) points.push(`${(i / steps) * 100}% ${100 - next() * amplitude}%`);
    for (let i = steps; i >= 0; i -= 1) points.push(`${next() * 1.4}% ${(i / steps) * 100}%`);
    clips.push(`polygon(${points.join(',')})`);
  }
  return clips;
}
