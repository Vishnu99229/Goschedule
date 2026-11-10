"use client";

import { useEffect, useRef } from "react";

type Wave = {
  y: number;
  amp: number;
  freq: number;
  speed: number;
  color: string;
  alpha: number;
};

const WAVES: Wave[] = [
  { y: 0.22, amp: 48, freq: 0.0032, speed: 1.1, color: "139,92,246", alpha: 0.18 },
  { y: 0.38, amp: 62, freq: 0.0024, speed: 0.75, color: "91,33,182", alpha: 0.16 },
  { y: 0.56, amp: 54, freq: 0.0028, speed: 0.95, color: "16,185,129", alpha: 0.09 },
  { y: 0.72, amp: 70, freq: 0.0018, speed: 0.55, color: "139,92,246", alpha: 0.12 },
];

function drawWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  wave: Wave,
) {
  const baseY = wave.y * h;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, baseY);

  for (let x = 0; x <= w; x += 6) {
    const y =
      baseY +
      Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
      Math.sin(x * wave.freq * 1.85 + t * wave.speed * 0.62) * wave.amp * 0.42 +
      Math.cos(x * wave.freq * 0.45 - t * wave.speed * 0.8) * wave.amp * 0.22;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(w, h);
  ctx.closePath();

  const gradient = ctx.createLinearGradient(0, baseY - wave.amp, 0, h);
  gradient.addColorStop(0, `rgba(${wave.color},${wave.alpha})`);
  gradient.addColorStop(0.55, `rgba(${wave.color},${wave.alpha * 0.28})`);
  gradient.addColorStop(1, `rgba(${wave.color},0)`);
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha: number,
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${color},${alpha})`);
  gradient.addColorStop(0.45, `rgba(${color},${alpha * 0.35})`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let running = true;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now: number) => {
      if (!running) return;

      const t = now * 0.00018;

      ctx.fillStyle = "#0A0D14";
      ctx.fillRect(0, 0, width, height);

      const max = Math.max(width, height);
      drawBlob(
        ctx,
        width * (0.28 + Math.sin(t * 0.9) * 0.06),
        height * (0.32 + Math.cos(t * 0.7) * 0.05),
        max * 0.42,
        "139,92,246",
        0.22,
      );
      drawBlob(
        ctx,
        width * (0.78 + Math.cos(t * 0.65) * 0.05),
        height * (0.22 + Math.sin(t * 0.8) * 0.04),
        max * 0.36,
        "76,29,149",
        0.2,
      );
      drawBlob(
        ctx,
        width * (0.62 + Math.sin(t * 0.5) * 0.04),
        height * (0.78 + Math.cos(t * 0.6) * 0.05),
        max * 0.38,
        "16,185,129",
        0.1,
      );

      for (const wave of WAVES) {
        drawWave(ctx, width, height, t, wave);
      }

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        max * 0.72,
      );
      vignette.addColorStop(0, "rgba(10,13,20,0)");
      vignette.addColorStop(1, "rgba(10,13,20,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      if (!reduceMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduceMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
