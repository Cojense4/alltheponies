import { useEffect, useRef } from "react";
import type { TrophyType } from "../trophyData";

interface ConfettiProps {
  /** Center X position relative to viewport */
  x: number;
  /** Center Y position relative to viewport */
  y: number;
  rarity: TrophyType;
  onDone: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  gravity: number;
}

const RARITY_COLORS: Record<TrophyType, string[]> = {
  Bronze: ["#cd7f32", "#a0522d", "#8b4513", "#daa520"],
  Silver: ["#c0c0c0", "#a8a8a8", "#d3d3d3", "#e8e8e8"],
  Gold: ["#ffd700", "#ffb900", "#ffa500", "#ffe066", "#fff4b8"],
  Platinum: [
    "#ff3b3b",
    "#ff9500",
    "#ffd700",
    "#4cd964",
    "#5ac8fa",
    "#007aff",
    "#af52de",
    "#ff2d55",
    "#e0e0e0",
    "#f5f5f5",
  ],
};

const RARITY_COUNT: Record<TrophyType, number> = {
  Bronze: 25,
  Silver: 25,
  Gold: 55,
  Platinum: 110,
};

const DURATION = 2000;
const CANVAS_SIZE = 400;

function isTouchDevice(): boolean {
  return window.matchMedia("(hover: none)").matches;
}

function createParticles(rarity: TrophyType): Particle[] {
  const colors = RARITY_COLORS[rarity];
  let count = RARITY_COUNT[rarity];
  if (isTouchDevice()) count = Math.round(count * 0.5);

  const particles: Particle[] = [];
  const half = CANVAS_SIZE / 2;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    particles.push({
      x: half,
      y: half,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      width: 4 + Math.random() * 6,
      height: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      gravity: 0.06 + Math.random() * 0.04,
    });
  }
  return particles;
}

function Confetti({ x, y, rarity, onDone }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = createParticles(rarity);
    const start = performance.now();
    let raf: number;

    function animate(now: number) {
      const elapsed = now - start;
      if (elapsed > DURATION) {
        onDone();
        return;
      }

      const progress = elapsed / DURATION;
      ctx!.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - progress * 1.2);

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate((p.rotation * Math.PI) / 180);
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx!.restore();
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [rarity, onDone]);

  const half = CANVAS_SIZE / 2;

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{
        position: "fixed",
        left: x - half,
        top: y - half,
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

export default Confetti;
