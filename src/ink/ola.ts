import { clamp, framePath, preloadFrames, prefersReducedMotion, smoothstep } from './motion.ts';

type BrushPoint = { x: number; y: number; w: number; dry: number };
type Leap = { x0: number; x1: number; p0: number; dp: number; h: number; S: number };

function mulberry(seed: number): () => number {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function attachOla(section: HTMLElement): () => void {
  const stage = section.querySelector<HTMLElement>('.stage');
  const canvas = section.querySelector<HTMLCanvasElement>('#wave');
  const context = canvas?.getContext('2d');
  if (!stage || !canvas || !context) return () => {};

  const reduce = prefersReducedMotion();
  preloadFrames('rise', 12);
  preloadFrames('dive', 12);
  preloadFrames('swim', 16);

  const noise = (() => {
    const random = mulberry(7);
    const table = Array.from({ length: 512 }, random);
    return (x: number) => {
      const i = Math.floor(x);
      const f = x - i;
      const s = f * f * (3 - 2 * f);
      return table[i & 511] * (1 - s) + table[(i + 1) & 511] * s;
    };
  })();

  const kois = [...stage.querySelectorAll<HTMLImageElement>('.k')];
  const splashes = [...stage.querySelectorAll<SVGElement>('.sp')];
  const cards = [...stage.querySelectorAll<HTMLElement>('.svc')];

  let width = 0;
  let height = 0;
  let narrow = false;
  let waveStart = 0;
  let points: BrushPoint[] = [];
  let leaps: Leap[] = [];
  let waveY = (x: number) => x;
  let waveSlope = (x: number) => x;

  const layout = () => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    narrow = width < 600;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const y0 = height * (narrow ? 0.36 : 0.5);
    const amplitude = height * (narrow ? 0.035 : 0.065);
    const frequency = (Math.PI * 2) / (narrow ? width * 1.1 : width * 0.85);
    waveStart = (y0 + 30) / section.offsetHeight;
    waveY = (x) =>
      y0 + amplitude * Math.sin(frequency * x + 0.9) + amplitude * 0.35 * Math.sin(frequency * 2.3 * x + 2);
    waveSlope = (x) => (waveY(x + 1) - waveY(x - 1)) / 2;

    points = [];
    for (let x = -10; x <= width + 10; x += 1.5) {
      const t = (x + 10) / (width + 20);
      const taper = Math.min(1, t * 9, (1 - t) * 5);
      points.push({
        x,
        y: waveY(x),
        w: (narrow ? 5 : 7.5) * (0.65 + 0.55 * noise(x * 0.013)) * taper,
        dry: noise(x * 0.02 + 40),
      });
    }

    const slots = narrow
      ? [height * 0.44, height * 0.615, height * 0.79]
      : [width * 0.07, width * 0.39, width * 0.7];
    cards.forEach((card, index) => {
      const slot = slots[index] ?? 0;
      if (narrow) {
        card.style.top = `${slot}px`;
        return;
      }
      card.style.left = `${slot}px`;
      card.style.top = `${Math.max(waveY(slot), waveY(slot + 280)) + 46}px`;
    });

    const specs = narrow
      ? [
          [0.05, 0.62, 0.3, 0.22, 150, 0.22],
          [0.4, 0.95, 0.24, 0.18, 120, 0.26],
          [0.12, 0.55, 0.4, 0.26, 95, 0.18],
          [0.55, 1, 0.5, 0.18, 130, 0.24],
          [0, 0.45, 0.62, 0.2, 85, 0.17],
          [0.48, 0.9, 0.72, 0.22, 110, 0.22],
        ]
      : [
          [0.06, 0.3, 0.26, 0.28, 240, 0.17],
          [0.36, 0.58, 0.33, 0.22, 200, 0.15],
          [0.2, 0.38, 0.45, 0.3, 150, 0.11],
          [0.6, 0.86, 0.52, 0.26, 260, 0.18],
          [0.47, 0.64, 0.64, 0.2, 140, 0.12],
          [0.75, 0.96, 0.74, 0.24, 210, 0.15],
        ];
    leaps = specs.map(([a, b, p0, dp, h, s]) => ({
      x0: a * width,
      x1: b * width,
      p0: (p0 - 0.26) * 0.85,
      dp: dp * 0.85,
      h: h * (narrow ? 0.9 : 1) * (height / 900),
      S: (narrow ? width * 2.3 : width * 1.7) * s,
    }));
  };

  const brush = (upto: number) => {
    context.clearRect(0, 0, width, height);
    for (const point of points) {
      if (point.x > upto) break;
      const nx = -waveSlope(point.x);
      const normal = Math.hypot(nx, 1);
      const ox = nx / normal;
      const oy = 1 / normal;
      context.fillStyle = 'rgba(18,18,18,.10)';
      context.beginPath();
      context.arc(point.x, point.y, point.w * 1.25, 0, 7);
      context.fill();
      for (let band = 0; band < 9; band += 1) {
        const offset = (band / 8 - 0.5) * 2 * point.w;
        const gap = noise(point.x * 0.05 + band * 13.7);
        if (gap < 0.25 + 0.4 * point.dry * Math.abs(band / 8 - 0.5) * 2) continue;
        context.fillStyle = `rgba(18,18,18,${0.3 + 0.35 * gap})`;
        context.beginPath();
        context.arc(point.x + ox * offset, point.y + oy * offset, point.w * 0.32, 0, 7);
        context.fill();
      }
    }
  };

  const render = (progress: number) => {
    const reveal = reduce ? width + 20 : -10 + (width + 30) * smoothstep(clamp((progress - waveStart) / 0.2));
    brush(reveal);
    cards.forEach((card, index) => {
      const shown = reduce ? 1 : smoothstep(clamp((progress - (waveStart + 0.13 + index * 0.08)) / 0.07));
      card.style.opacity = String(shown);
      card.style.transform = `translateY(${(1 - shown) * 18}px)`;
    });
    leaps.forEach((leap, index) => {
      const image = kois[index];
      const enter = splashes[index * 2];
      const exit = splashes[index * 2 + 1];
      if (!image || !enter || !exit) return;
      const span = Math.max(0.3, (0.8 - waveStart - 0.22) / 0.41);
      const along = (progress - waveStart - 0.22 - leap.p0 * span) / (leap.dp * 0.85);
      if (reduce || along <= 0 || along >= 1) {
        image.style.opacity = '0';
      } else {
        const x = leap.x0 + (leap.x1 - leap.x0) * along;
        const y = waveY(x) - leap.h * 4 * along * (1 - along);
        const dx = leap.x1 - leap.x0;
        const dy = ((waveSlope(x) * dx) / width) * (width / 1) - leap.h * 4 * (1 - 2 * along);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        let src: string;
        if (along < 0.34) src = framePath('rise', Math.min(11, Math.floor((along / 0.34) * 12)));
        else if (along < 0.66) src = framePath('swim', Math.floor(((along - 0.34) / 0.32) * 16) % 16);
        else src = framePath('dive', Math.min(11, Math.floor(((along - 0.66) / 0.34) * 12)));
        if (image.dataset.s !== src) {
          image.src = src;
          image.dataset.s = src;
        }
        image.style.width = `${leap.S}px`;
        image.style.height = `${leap.S}px`;
        image.style.opacity = String(smoothstep(clamp(along / 0.08)) * smoothstep(clamp((1 - along) / 0.08)));
        image.style.transformOrigin = '45% 40%';
        image.style.transform = `translate(${x - leap.S * 0.45}px, ${y - leap.S * 0.4}px) rotate(${angle}deg)`;
      }
      (
        [
          [enter, leap.x0, along / 0.22],
          [exit, leap.x1, (along - 0.86) / 0.26],
        ] as const
      ).forEach(([mark, x, t]) => {
        if (reduce || t <= 0 || t >= 1) {
          mark.style.opacity = '0';
          return;
        }
        mark.style.opacity = (0.75 * (1 - t)).toFixed(3);
        mark.style.transform = `translate(${x - 45}px, ${waveY(x) - 46}px) scale(${0.55 + 0.6 * smoothstep(t)})`;
      });
    });
  };

  const progress = () => {
    const rect = section.getBoundingClientRect();
    return clamp((window.innerHeight - rect.top) / section.offsetHeight);
  };

  let frame = 0;
  const tick = () => {
    frame = 0;
    render(progress());
  };
  const onScroll = () => {
    if (!frame) frame = window.requestAnimationFrame(tick);
  };
  const onResize = () => {
    layout();
    tick();
  };

  layout();
  tick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };
}
