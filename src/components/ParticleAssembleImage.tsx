'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParticleAssembleImageProps {
  imageSrc: string;
  width?: number;
  height?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  ease: number;
}

export default function ParticleAssembleImage({
  imageSrc = '/images/krrish-cutout.png',
  width = 220,
  height = 290,
  onComplete,
}: ParticleAssembleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Off-screen canvas to extract only the subject pixels (ignoring transparency & pure whites)
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCanvas.width = width;
      offCanvas.height = height;

      offCtx.drawImage(img, 0, 0, width, height);
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Density step: 3px for high-definition sharpness (~7,000 crisp particles)
      const step = 3;
      particles = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          // Filter out transparent and plain white/light grey studio background
          const brightness = (r + g + b) / 3;
          const isWhiteBg = brightness > 220 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15;

          if (a > 50 && !isWhiteBg) {
            // Chaotic particle origin: scatter far out radially
            const angle = Math.random() * Math.PI * 2;
            const dist = 300 + Math.random() * 450;
            const startX = width / 2 + Math.cos(angle) * dist;
            const startY = height / 2 + Math.sin(angle) * dist;

            particles.push({
              x: startX,
              y: startY,
              originX: x,
              originY: y,
              color: `rgba(${r},${g},${b},${a / 255})`,
              size: step + 0.2, // slightly larger so no gaps appear between particles
              vx: 0,
              vy: 0,
              ease: 0.045 + Math.random() * 0.045,
            });
          }
        }
      }

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        let totalDist = 0;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          totalDist += dist;

          // Pull towards target position with organic ease
          p.x += dx * p.ease;
          p.y += dy * p.ease;

          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }

        const avgDist = totalDist / particles.length;

        // When particles are assembled close to origin
        if (avgDist < 0.8 && !assembled) {
          setAssembled(true);
          if (onComplete) onComplete();
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc, width, height, onComplete, assembled]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* ── Particle Canvas (Active during animation) ── */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`relative z-10 transition-opacity duration-700 ${
          assembled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* ── Crystal Clear HD Photo (Seamlessly fades in when particles converge) ── */}
      <img
        src={imageSrc}
        alt="Krrish portrait"
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`absolute inset-0 z-20 object-contain drop-shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-opacity duration-700 ${
          assembled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ── Soft Atmospheric Cyan Glow Behind Head ── */}
      <div className="pointer-events-none absolute -inset-4 rounded-full bg-[#00f0ff]/15 blur-2xl transition-opacity duration-700 opacity-70" />
    </div>
  );
}
