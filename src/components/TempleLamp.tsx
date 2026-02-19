// Temple Lamp — tall brass lamp revealed after all diyas are lit
interface TempleLampProps {
  visible: boolean;
  side: "left" | "right";
  delay?: number;
}

const TempleLamp = ({ visible, side, delay = 0 }: TempleLampProps) => {
  return (
    <div
      className={`relative flex flex-col items-center transition-none ${
        visible ? "animate-lamp-reveal" : "opacity-0"
      }`}
      style={{
        animationDelay: visible ? `${delay}ms` : "0ms",
        pointerEvents: "none",
      }}
    >
      {/* Radiant halo around lamp top */}
      {visible && (
        <div
          className="absolute rounded-full animate-lamp-halo"
          style={{
            width: "120px",
            height: "120px",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, hsl(42 95% 55% / 0.15), transparent 70%)",
            filter: "blur(12px)",
            zIndex: 0,
          }}
        />
      )}

      {/* Flames (3 wicks) */}
      {visible && (
        <div className="flex gap-2 mb-1 z-10 relative">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <div
                className="animate-flame"
                style={{
                  width: "8px",
                  height: "16px",
                  background: "linear-gradient(to top, hsl(20 100% 50%), hsl(35 100% 60%), hsl(48 100% 80%), white)",
                  borderRadius: "50% 50% 30% 30%",
                  transformOrigin: "bottom center",
                  boxShadow: "0 0 6px hsl(45 100% 65%), 0 0 15px hsl(28 95% 52% / 0.5)",
                  animationDelay: `${i * 0.27}s`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lamp SVG — tall brass oil lamp */}
      <svg
        width="60"
        height="160"
        viewBox="0 0 60 160"
        style={{
          filter: visible
            ? "drop-shadow(0 0 15px hsl(42 95% 55% / 0.5)) drop-shadow(0 0 30px hsl(28 95% 52% / 0.25))"
            : "none",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Top bowl / burner */}
        <ellipse cx="30" cy="22" rx="20" ry="8" fill="url(#brassGrad)" />
        <ellipse cx="30" cy="18" rx="14" ry="5" fill="hsl(38 60% 25%)" />

        {/* Neck */}
        <rect x="26" y="28" width="8" height="16" rx="4" fill="url(#brassGrad)" />

        {/* Middle decorative sphere */}
        <ellipse cx="30" cy="50" rx="14" ry="14" fill="url(#brassSphereGrad)" />
        {/* Engraved ring on sphere */}
        <ellipse cx="30" cy="50" rx="14" ry="4" fill="none" stroke="hsl(38 60% 30%)" strokeWidth="1" opacity="0.5" />

        {/* Lower neck */}
        <rect x="27" y="64" width="6" height="30" rx="3" fill="url(#brassGrad)" />

        {/* Base disc */}
        <ellipse cx="30" cy="96" rx="22" ry="7" fill="url(#brassBaseGrad)" />

        {/* Flare decorative band */}
        <ellipse cx="30" cy="97" rx="22" ry="3" fill="none" stroke="hsl(42 95% 60%)" strokeWidth="1" opacity="0.7" />

        {/* Lower pillar */}
        <rect x="26" y="103" width="8" height="30" rx="4" fill="url(#brassGrad)" />

        {/* Foot base */}
        <ellipse cx="30" cy="140" rx="26" ry="9" fill="url(#brassBaseGrad)" />
        <ellipse cx="30" cy="148" rx="20" ry="5" fill="url(#brassGrad)" />
        <ellipse cx="30" cy="153" rx="24" ry="5" fill="url(#brassBaseGrad)" />

        {/* Engravings on sphere */}
        {[-8, 0, 8].map((x, i) => (
          <line key={i} x1={30 + x} y1="40" x2={30 + x} y2="60"
            stroke="hsl(38 50% 25%)" strokeWidth="0.8" opacity="0.4" />
        ))}

        <defs>
          <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(35 60% 28%)" />
            <stop offset="35%" stopColor="hsl(42 80% 50%)" />
            <stop offset="60%" stopColor="hsl(48 100% 65%)" />
            <stop offset="80%" stopColor="hsl(42 75% 45%)" />
            <stop offset="100%" stopColor="hsl(35 55% 25%)" />
          </linearGradient>
          <radialGradient id="brassSphereGrad" cx="35%" cy="35%">
            <stop offset="0%" stopColor="hsl(48 100% 68%)" />
            <stop offset="40%" stopColor="hsl(42 85% 50%)" />
            <stop offset="100%" stopColor="hsl(35 55% 25%)" />
          </radialGradient>
          <linearGradient id="brassBaseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(35 55% 22%)" />
            <stop offset="30%" stopColor="hsl(42 80% 48%)" />
            <stop offset="50%" stopColor="hsl(45 90% 58%)" />
            <stop offset="70%" stopColor="hsl(42 80% 48%)" />
            <stop offset="100%" stopColor="hsl(35 55% 22%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ground shadow */}
      <div
        className="rounded-full mt-1"
        style={{
          width: "48px",
          height: "8px",
          background: "radial-gradient(ellipse, hsl(0 0% 0% / 0.5), transparent)",
          filter: "blur(3px)",
        }}
      />
    </div>
  );
};

export default TempleLamp;
