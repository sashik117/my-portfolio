"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const createParticles = () => {
      const isMobile = window.innerWidth < 768;
      const count = reducedMotion ? 20 : isMobile ? 42 : 86;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        size: Math.random() * 1.9 + 0.6,
        hue: [186, 143, 348, 48][index % 4]
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(110, 231, 249, 0.09)");
      gradient.addColorStop(0.48, "rgba(74, 222, 128, 0.035)");
      gradient.addColorStop(1, "rgba(251, 113, 133, 0.075)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - distance / 260);

        particle.x += particle.vx - dx * force * 0.002;
        particle.y += particle.vy - dy * force * 0.002;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 92%, 72%, ${0.24 + force * 0.32})`;
        context.shadowColor = `hsla(${particle.hue}, 92%, 72%, 0.45)`;
        context.shadowBlur = 18 + force * 20;
        context.arc(particle.x, particle.y, particle.size + force * 1.6, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        for (let i = index + 1; i < particles.length; i += 1) {
          const other = particles[i];
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (lineDistance < 128) {
            context.strokeStyle = `rgba(110, 231, 249, ${0.09 * (1 - lineDistance / 128)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      if (!reducedMotion) animationId = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20 h-screen w-screen"
        aria-hidden="true"
      />
      <div className="noise" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(420px circle at var(--cursor-x, 50%) var(--cursor-y, 20%), rgba(110, 231, 249, 0.13), transparent 42%)"
        }}
        aria-hidden="true"
      />
    </>
  );
}
