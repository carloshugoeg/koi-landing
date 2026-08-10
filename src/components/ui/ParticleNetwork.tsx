import { useEffect, useRef } from 'react';

const CONNECT_DIST = 150;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const CELL_SIZE = CONNECT_DIST;
const MAX_PARTICLES = 200;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isRed: boolean;
}

export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    // Logical (CSS px) size — drawing happens in this space, scaled up by dpr.
    let width = 0;
    let height = 0;
    let frameId = 0;
    let running = false;
    let inView = true;

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      isRed: Math.random() > 0.85,
    });

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 12000), MAX_PARTICLES);
      particles = Array.from({ length: count }, makeParticle);
    };

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / CELL_SIZE);
      const rows = Math.ceil(height / CELL_SIZE);
      const grid: number[][] = new Array(cols * rows);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isRed ? 'rgba(233, 32, 16, 0.85)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        const cx = Math.floor(p.x / CELL_SIZE);
        const cy = Math.floor(p.y / CELL_SIZE);
        const key = cy * cols + cx;
        if (key >= 0 && key < grid.length) {
          if (!grid[key]) grid[key] = [];
          grid[key].push(i);
        }
      }

      // Link nearby particles — spatial grid keeps this O(n·k)
      ctx.lineWidth = 0.6;
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cellKey = cy * cols + cx;
          const cell = grid[cellKey];
          if (!cell) continue;

          for (let ny = cy; ny <= cy + 1 && ny < rows; ny++) {
            for (let nx = ny === cy ? cx : cx - 1; nx <= cx + 1 && nx < cols; nx++) {
              if (nx < 0) continue;
              const neighbor = grid[ny * cols + nx];
              if (!neighbor) continue;
              const sameCell = ny * cols + nx === cellKey;

              for (let a = 0; a < cell.length; a++) {
                const pi = particles[cell[a]];
                for (let b = sameCell ? a + 1 : 0; b < neighbor.length; b++) {
                  const pj = particles[neighbor[b]];
                  const dx = pi.x - pj.x;
                  const dy = pi.y - pj.y;
                  const distSq = dx * dx + dy * dy;
                  if (distSq < CONNECT_DIST_SQ) {
                    const opacity = 0.25 * (1 - Math.sqrt(distSq) / CONNECT_DIST);
                    ctx.beginPath();
                    ctx.strokeStyle =
                      pi.isRed || pj.isRed
                        ? `rgba(233, 32, 16, ${opacity * 1.5})`
                        : `rgba(255, 255, 255, ${opacity})`;
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(pj.x, pj.y);
                    ctx.stroke();
                  }
                }
              }
            }
          }
        }
      }
    };

    const loop = () => {
      drawFrame(true);
      frameId = requestAnimationFrame(loop);
    };

    // The loop runs only while the hero is on screen, the tab is visible,
    // and the user hasn't asked for reduced motion.
    const syncRunning = () => {
      const shouldRun = inView && !document.hidden && !reducedMotionQuery.matches;
      if (shouldRun && !running) {
        running = true;
        frameId = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frameId);
        // Reduced motion still gets the decoration — one static frame.
        if (reducedMotionQuery.matches) drawFrame(false);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      if (!running) drawFrame(false);
    };

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncRunning();
    });
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => syncRunning();
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotionQuery.addEventListener('change', syncRunning);

    resize();
    syncRunning();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotionQuery.removeEventListener('change', syncRunning);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frameId);
      running = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
