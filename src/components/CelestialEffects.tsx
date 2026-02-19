// Floating golden particles + rotating mandala background
import { useEffect, useRef } from "react";
import mandalaImg from "@/assets/mandala.png";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "dot" | "sparkle" | "petal";
}

const PARTICLE_COUNT = 40;

const CelestialEffects = ({ active }: { active: boolean }) => {
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.3,
      type: (["dot", "sparkle", "petal"] as const)[Math.floor(Math.random() * 3)],
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Mandala — background, always visible subtle */}
      <div
        className="absolute animate-mandala"
        style={{
          top: "50%",
          left: "50%",
          width: "min(70vw, 70vh)",
          height: "min(70vw, 70vh)",
          transform: "translate(-50%, -50%)",
          opacity: active ? 0.25 : 0.08,
          transition: "opacity 2s ease",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={mandalaImg}
          alt="Sacred Mandala"
          className="w-full h-full object-contain animate-mandala-spin"
          style={{ filter: "sepia(1) saturate(3) hue-rotate(5deg) brightness(1.5)" }}
        />
      </div>

      {/* Floating particles — more when active */}
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: active ? p.opacity : p.opacity * 0.3,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transition: "opacity 2s ease",
          }}
        >
          {p.type === "dot" && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(48 100% 80%), hsl(42 95% 55%))",
                boxShadow: "0 0 4px hsl(42 95% 55% / 0.8)",
              }}
            />
          )}
          {p.type === "sparkle" && (
            <svg viewBox="0 0 10 10" style={{ width: p.size * 1.5, height: p.size * 1.5 }}>
              <path
                d="M5 0 L5.5 4 L10 5 L5.5 6 L5 10 L4.5 6 L0 5 L4.5 4 Z"
                fill="hsl(48 100% 75%)"
                filter="url(#sparkleGlow)"
              />
              <defs>
                <filter id="sparkleGlow">
                  <feGaussianBlur stdDeviation="0.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
            </svg>
          )}
          {p.type === "petal" && (
            <div
              style={{
                width: p.size * 0.8,
                height: p.size * 1.4,
                borderRadius: "50% 50% 50% 0",
                background: "linear-gradient(135deg, hsl(28 90% 65%), hsl(42 95% 55%))",
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.7,
              }}
            />
          )}
        </div>
      ))}

      {/* Ambient light rays — temple pillars of light */}
      {[20, 40, 60, 80].map((pos, i) => (
        <div
          key={i}
          className="absolute top-0 h-full animate-light-ray"
          style={{
            left: `${pos}%`,
            width: "2px",
            background: `linear-gradient(to bottom, hsl(42 95% 55% / 0.08), hsl(28 90% 50% / 0.04), transparent)`,
            animationDelay: `${i * 1.1}s`,
            transform: "scaleY(1)",
            transformOrigin: "top",
            opacity: active ? 1 : 0.3,
            transition: "opacity 2s ease",
          }}
        />
      ))}
    </div>
  );
};

export default CelestialEffects;
