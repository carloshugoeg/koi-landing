import { clamp, prefersReducedMotion } from './motion.ts';

function ease(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function attachProjects(host: HTMLElement): () => void {
  const items = [...host.querySelectorAll<HTMLElement>('.pjx')];
  const reduce = prefersReducedMotion();

  const layout = () => {
    const width = window.innerWidth;
    /* 601–900 cannot hold two 440px columns. Stack them; 375 and 1440 stay put. */
    const narrow = width <= 900;
    items.forEach((item, index) => {
      const right = index % 2 === 1;
      const text = item.querySelector<HTMLElement>('.tx');
      const pad = item.querySelector<HTMLElement>('.pad');
      const stroke = item.querySelector<HTMLElement>('.stk');
      if (!text || !pad || !stroke) return;
      const phone = width < 600;
      const band = !phone && narrow;
      text.style.marginLeft = narrow ? '0' : `${right ? width * 0.52 : width * 0.16}px`;
      /* 600–900 keeps one left column and gives the ensō its own lane at the
         card edge, so the brush no longer sits under the tags or the paragraph.
         375 and 1440 keep the widths ink set. */
      if (band) {
        const padLeft = width <= 600 ? 24 : 40;
        const textMax = Math.min(420, width - padLeft - 280);
        text.style.width = `${Math.max(220, textMax)}px`;
        text.style.maxWidth = '100%';
      } else {
        text.style.width = '';
        text.style.maxWidth = '';
      }
      const x = narrow ? 24 : right ? width * 0.52 : width * 0.16;
      const y = text.offsetTop;
      const textHeight = text.offsetHeight;
      const textWidth = band ? text.offsetWidth : narrow ? width - 48 : 440;
      const scale = [1, 0.8, 1.05, 0.75][index] ?? 1;
      const padWidth = (narrow ? width * 0.9 : Math.min(640, width * 0.42)) * scale;
      const padHeight = padWidth * (460 / 760);
      pad.style.width = `${padWidth}px`;
      pad.style.left = `${narrow ? (right ? width * 0.35 : -width * 0.2) : right ? x + textWidth * 0.5 : x - padWidth * 0.45}px`;
      pad.style.top = `${y + textHeight * 0.45 - padHeight / 2}px`;
      const tilt = (phone ? [-2, 3, -3, 2] : [-4, 6, -8, 3])[index] ?? 0;
      let strokeWidth = phone ? width * 2.2 : textWidth * 2;
      let strokeHeight = strokeWidth * (520 / 900);
      let centerX = phone ? width / 2 - 40 : x + textWidth / 2 - 10;
      let centerY = phone ? y - 40 + 0.42 * strokeHeight * 0.5 : y + textHeight * 0.5;
      if (band) {
        const textRight = text.offsetLeft + text.offsetWidth;
        const edge = 12;
        const gap = 28;
        const maxTilt = (8 * Math.PI) / 180;
        const bleed = (w: number) => {
          const h = w * (520 / 900);
          return (h * Math.sin(maxTilt) + w * (Math.cos(maxTilt) - 1)) / 2;
        };
        const room = width - textRight - gap - edge;
        strokeWidth = Math.min(880, Math.max(140, room));
        strokeWidth = Math.min(strokeWidth, room - bleed(strokeWidth));
        strokeHeight = strokeWidth * (520 / 900);
        const extra = bleed(strokeWidth);
        centerX = width - edge - extra - strokeWidth / 2;
        const title = text.querySelector('h3');
        const titleCenter = title
          ? text.offsetTop + title.offsetTop + title.offsetHeight / 2
          : y + textHeight * 0.28;
        centerY = Math.max(strokeHeight / 2 + 4, titleCenter);
        /* The wash is dark enough to pull the tags under 4.5:1. Keep it with the ring. */
        const wash = Math.min(strokeWidth * 1.05, width - textRight - gap);
        const washHeight = wash * (460 / 760);
        pad.style.width = `${wash}px`;
        pad.style.left = `${width - edge - wash}px`;
        pad.style.top = `${Math.max(0, centerY - washHeight / 2)}px`;
      }
      stroke.style.width = `${strokeWidth}px`;
      stroke.style.height = band ? `${strokeHeight}px` : '';
      stroke.style.objectFit = band ? 'contain' : '';
      stroke.style.left = `${centerX - strokeWidth / 2}px`;
      stroke.style.top = `${centerY - strokeHeight / 2}px`;
      stroke.style.transform = phone ? `scale(-1,.5) rotate(${tilt}deg)` : `rotate(${tilt}deg)`;
    });
  };

  const tick = () => {
    const viewport = window.innerHeight;
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const progress = reduce ? 1 : clamp((viewport * 0.95 - rect.top) / (viewport * 0.55));
      const stroke = item.querySelector<HTMLElement>('.stk');
      const pad = item.querySelector<HTMLElement>('.pad');
      const text = item.querySelector<HTMLElement>('.tx');
      if (!stroke || !pad || !text) return;
      const drawn = ease(clamp(progress / 0.75));
      stroke.style.clipPath = `inset(0 ${100 - drawn * 100}% 0 0)`;
      stroke.style.opacity = '0.5';
      pad.style.opacity = String(0.35 * ease(clamp((progress - 0.15) / 0.5)));
      const shown = ease(clamp((progress - 0.25) / 0.45));
      text.style.opacity = String(shown);
      if (!text.matches(':hover')) text.style.translate = `0 ${(1 - shown) * 12}px`;
    });
  };

  let frame = 0;
  const schedule = () => {
    if (reduce) {
      tick();
      return;
    }
    if (!frame) frame = window.requestAnimationFrame(() => {
      frame = 0;
      tick();
    });
  };

  layout();
  tick();
  const onResize = () => {
    layout();
    schedule();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize);
  const fonts = document.fonts?.ready;
  void fonts?.then(() => {
    layout();
    tick();
  });
  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', onResize);
  };
}
