import { clamp, framePath, preloadFrames, prefersReducedMotion } from './motion.ts';

type Point = [number, number];

function cubic(points: readonly [Point, Point, Point, Point], t: number): Point {
  const u = 1 - t;
  const at = (axis: 0 | 1) =>
    u * u * u * points[0][axis] +
    3 * u * u * t * points[1][axis] +
    3 * u * t * t * points[2][axis] +
    t * t * t * points[3][axis];
  return [at(0), at(1)];
}

export function attachHero(hero: HTMLElement): () => void {
  const desktop = hero.querySelector<HTMLImageElement>('#hk');
  const mobile = hero.querySelector<HTMLImageElement>('#hm');
  if (!desktop || !mobile) return () => {};

  const reduce = prefersReducedMotion();
  preloadFrames('swim', 16);
  preloadFrames('turn-left', 12);
  preloadFrames('turn-right', 12);
  for (let index = 0; index < 12; index += 1) {
    const image = new Image();
    image.src = `/ink/circ/${String(index).padStart(2, '0')}.png`;
  }

  const desktopPath: readonly [Point, Point, Point, Point] = [
    [1000, 560],
    [780, 500],
    [520, 640],
    [260, 600],
  ];
  let narrow = window.innerWidth < 600;
  let size = narrow ? 330 : 700;
  let distance = 0;
  let lastY = window.scrollY;
  let frame = 0;

  const pointAt = (t: number): Point => {
    if (narrow) {
      const angle = -Math.PI / 2 + t * 2 * Math.PI;
      return [200 + 100 * Math.cos(angle), 640 + 100 * Math.sin(angle)];
    }
    return cubic(desktopPath, t);
  };

  const angleAt = (t: number): number => {
    const a = pointAt(Math.max(0, t - 0.003));
    const b = pointAt(Math.min(1, t + 0.003));
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  };

  const renderMobile = (time: number) => {
    const progress = reduce ? 0 : clamp(window.scrollY / (hero.offsetHeight * 0.9));
    distance += Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    const index = reduce ? 0 : Math.floor((time / 1000) * 5 + distance / 18) % 12;
    const src = `/ink/circ/${String(index).padStart(2, '0')}.png`;
    if (mobile.dataset.s !== src) {
      mobile.src = src;
      mobile.dataset.s = src;
    }
    const scale = 0.56;
    const imageSize = 900 * scale;
    mobile.style.width = `${imageSize}px`;
    mobile.style.height = `${imageSize}px`;
    mobile.style.transform = `translate(${212 - 500 * scale}px, ${630 - 450 * scale}px) rotate(${-progress * 360}deg)`;
  };

  const renderDesktop = () => {
    const progress = reduce ? 0 : clamp(window.scrollY / (hero.offsetHeight * 0.8));
    const [x, y] = pointAt(progress);
    const angle = angleAt(progress);
    let turn = angleAt(Math.min(1, progress + 0.02)) - angleAt(Math.max(0, progress - 0.02));
    turn = Math.atan2(Math.sin(turn), Math.cos(turn));
    const traveled = progress * 1100;
    let src = framePath('swim', Math.floor(traveled / 12) % 16);
    if (Math.abs(turn) > 0.06) {
      const pose = turn > 0 ? 'turn-right' : 'turn-left';
      src = framePath(pose, Math.min(6, Math.round((Math.abs(turn) / 0.25) * 6)));
    }
    if (reduce) src = framePath('swim', 0);
    if (desktop.dataset.s !== src) {
      desktop.src = src;
      desktop.dataset.s = src;
    }
    desktop.style.width = `${size}px`;
    desktop.style.height = `${size}px`;
    desktop.style.transform = `translate(${x - size * 0.45}px, ${y - size * 0.4}px) rotate(${(angle * 180) / Math.PI + 90}deg)`;
  };

  const layout = () => {
    narrow = window.innerWidth < 600;
    size = narrow ? 330 : 700;
    desktop.style.width = `${size}px`;
    desktop.style.height = `${size}px`;
  };

  const paint = (time: number) => {
    if (narrow) renderMobile(time);
    else renderDesktop();
  };

  const tick = (time: number) => {
    frame = 0;
    const rect = hero.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    if (narrow && !reduce && visible) {
      paint(time);
      frame = window.requestAnimationFrame(tick);
      return;
    }
    paint(time);
  };

  const onScroll = () => {
    if (!frame) frame = window.requestAnimationFrame(tick);
  };
  const onResize = () => {
    layout();
    onScroll();
  };

  layout();
  frame = window.requestAnimationFrame(tick);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };
}
