"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let t = 0;
    const CELL = 48;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // High-velocity vertical drops only
    const verticalDrops = [
      { col: 3,  speed: 3.5, color: "26, 86, 255",   delay: 0.0 }, // Cobalt Blue
      { col: 7,  speed: 2.8, color: "139, 92, 246",  delay: 2.1 }, // Violet
      { col: 11, speed: 3.8, color: "26, 86, 255",   delay: 1.3 }, 
      { col: 5,  speed: 3.0, color: "79, 70, 229",   delay: 0.7 }, // Indigo
      { col: 15, speed: 3.2, color: "139, 92, 246",  delay: 3.0 },
    ];

    const draw = (now: number) => {
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;
      t += deltaTime * 2.8; // High-velocity global tracking baseline

      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      // 1. Static Clean Slate Matrix Grid Background
      ctx.lineWidth = 0.5;
      const maxLines = Math.max(cols, rows);
      
      for (let i = 0; i <= maxLines; i++) {
        if (i <= cols) {
          const x = Math.floor(i * CELL) + 0.5;
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H);
          const alpha = 0.045 + 0.02 * Math.sin(i * 0.4 + t * 0.3);
          ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`; 
          ctx.stroke();
        }
        if (i <= rows) {
          const y = Math.floor(i * CELL) + 0.5;
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y);
          const alpha = 0.045 + 0.02 * Math.sin(i * 0.4 + t * 0.25);
          ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`;
          ctx.stroke();
        }
      }

      ctx.lineWidth = 1.2;

      // 2. Vertical Drops (Top to Bottom Loop)
      verticalDrops.forEach(({ col, speed, color, delay }) => {
        const x = Math.floor(col * CELL) + 0.5;
        const yProgress = ((t * speed + delay) % (rows + 4)) - 2;
        const yCenter = yProgress * CELL;

        const grad = ctx.createLinearGradient(x, yCenter - 90, x, yCenter + 90);
        grad.addColorStop(0,   `rgba(${color}, 0)`);
        grad.addColorStop(0.4, `rgba(${color}, 0.25)`);
        grad.addColorStop(0.5, `rgba(${color}, 0.7)`); 
        grad.addColorStop(0.6, `rgba(${color}, 0.25)`);
        grad.addColorStop(1,   `rgba(${color}, 0)`);

        ctx.strokeStyle = grad;
        ctx.beginPath(); ctx.moveTo(x, yCenter - 90); ctx.lineTo(x, yCenter + 90); ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}