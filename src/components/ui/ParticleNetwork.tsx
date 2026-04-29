import React, { useEffect, useRef } from 'react';

export const ParticleNetwork: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let resizeTimer: number;

        const CONNECT_DIST = 150;
        const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
        const CELL_SIZE = CONNECT_DIST;
        const MAX_PARTICLES = 200;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            isRed: boolean;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 0.5;
                this.isRed = Math.random() > 0.85;
                this.color = this.isRed ? 'rgba(233, 32, 16, 0.85)' : 'rgba(255, 255, 255, 0.5)';
            }

            update() {
                if (!canvas) return;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 12000), MAX_PARTICLES);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const drawNetwork = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / CELL_SIZE);
            const rows = Math.ceil(canvas.height / CELL_SIZE);
            const grid: number[][] = new Array(cols * rows);

            // Update, draw, and bucket particles into grid
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                p.draw();

                const cx = Math.floor(p.x / CELL_SIZE);
                const cy = Math.floor(p.y / CELL_SIZE);
                const key = cy * cols + cx;
                if (key >= 0 && key < grid.length) {
                    if (!grid[key]) grid[key] = [];
                    grid[key].push(i);
                }
            }

            // Check connections using spatial grid — only neighboring cells
            ctx.lineWidth = 0.6;
            for (let cy = 0; cy < rows; cy++) {
                for (let cx = 0; cx < cols; cx++) {
                    const cellKey = cy * cols + cx;
                    const cell = grid[cellKey];
                    if (!cell) continue;

                    // Check this cell and right/bottom/diagonal neighbors to avoid double-checking
                    for (let ny = cy; ny <= cy + 1 && ny < rows; ny++) {
                        for (let nx = (ny === cy ? cx : cx - 1); nx <= cx + 1 && nx < cols; nx++) {
                            if (nx < 0) continue;
                            const neighborKey = ny * cols + nx;
                            const neighbor = grid[neighborKey];
                            if (!neighbor) continue;

                            const sameCell = neighborKey === cellKey;

                            for (let a = 0; a < cell.length; a++) {
                                const pi = particles[cell[a]];
                                const startB = sameCell ? a + 1 : 0;
                                for (let b = startB; b < neighbor.length; b++) {
                                    const pj = particles[neighbor[b]];
                                    const dx = pi.x - pj.x;
                                    const dy = pi.y - pj.y;
                                    const distSq = dx * dx + dy * dy;

                                    if (distSq < CONNECT_DIST_SQ) {
                                        const distance = Math.sqrt(distSq);
                                        const opacity = 0.25 * (1 - distance / CONNECT_DIST);
                                        const isRed = pi.isRed || pj.isRed;

                                        ctx.beginPath();
                                        if (isRed) {
                                            ctx.strokeStyle = `rgba(233, 32, 16, ${opacity * 1.5})`;
                                        } else {
                                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                                        }
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

            animationFrameId = requestAnimationFrame(drawNetwork);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(resize, 150);
        };

        // Initialize and start loop
        window.addEventListener('resize', debouncedResize);
        resize();
        drawNetwork();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimer);
            cancelAnimationFrame(animationFrameId);
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
