"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  color: string;
  amp: number;
  speed: number;
  phase: number;
};

const blobs: Blob[] = [
  { x: 0.72, y: 0.28, r: 0.42, color: "69,230,201", amp: 0.05, speed: 0.00025, phase: 0 },
  { x: 0.24, y: 0.78, r: 0.36, color: "230,163,74", amp: 0.045, speed: 0.0002, phase: 2 },
];

export default function AmbientGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    function resize() {
      if (!canvas || !wrap) return;
      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        const dx = reduceMotion ? 0 : Math.sin(t * b.speed + b.phase) * b.amp;
        const dy = reduceMotion
          ? 0
          : Math.cos(t * b.speed * 0.8 + b.phase) * b.amp;
        const cx = (b.x + dx) * canvas.width;
        const cy = (b.y + dy) * canvas.height;
        const r = b.r * Math.max(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${b.color},0.22)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-75"
      aria-hidden="true"
    />
  );
}
