// Individual Diya component
interface DiyaProps {
  lit: boolean;
  onClick: () => void;
  delay?: number;
}

const Diya = ({ lit, onClick, delay = 0 }: DiyaProps) => {
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none group"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      title={lit ? "Diya is lit 🙏" : "Click to light this diya"}
    >
      {/* Flame */}
      {lit && (
        <div
          className="absolute animate-diya-ignite"
          style={{ bottom: "calc(100% - 10px)", zIndex: 10 }}
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full animate-diya-pulse"
            style={{
              width: "40px",
              height: "40px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, hsl(45 100% 65% / 0.3), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          {/* Main flame */}
          <div
            className="animate-flame"
            style={{
              width: "12px",
              height: "22px",
              background: "linear-gradient(to top, hsl(20 100% 50%), hsl(35 100% 60%), hsl(48 100% 75%), hsl(60 100% 90%))",
              borderRadius: "50% 50% 30% 30%",
              transformOrigin: "bottom center",
              boxShadow: "0 0 8px hsl(45 100% 65% / 0.9), 0 0 20px hsl(28 95% 52% / 0.6), 0 0 35px hsl(20 100% 40% / 0.3)",
              position: "relative",
              zIndex: 2,
            }}
          />
          {/* Inner bright core */}
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "5px",
              height: "10px",
              background: "linear-gradient(to top, hsl(60 100% 90%), white)",
              borderRadius: "50% 50% 30% 30%",
              opacity: 0.9,
              zIndex: 3,
            }}
          />
        </div>
      )}

      {/* Diya body — clay pot shape */}
      <svg
        width="56"
        height="36"
        viewBox="0 0 56 36"
        className={`transition-all duration-300 ${lit ? "drop-shadow-[0_0_12px_hsl(42_95%_55%_/_0.8)]" : "group-hover:drop-shadow-[0_0_6px_hsl(42_95%_55%_/_0.4)]"}`}
      >
        {/* Diya clay body */}
        <ellipse cx="28" cy="24" rx="26" ry="10"
          fill={lit ? "hsl(25 70% 42%)" : "hsl(20 60% 32%)"}
          stroke={lit ? "hsl(42 90% 55%)" : "hsl(30 50% 40%)"}
          strokeWidth="1"
        />
        {/* Oil reservoir */}
        <ellipse cx="28" cy="20" rx="18" ry="7"
          fill={lit ? "hsl(42 80% 35%)" : "hsl(30 40% 22%)"}
        />
        {/* Spout */}
        <path
          d="M 46 22 Q 55 18 52 14 Q 48 20 44 20"
          fill={lit ? "hsl(25 70% 42%)" : "hsl(20 60% 32%)"}
          stroke={lit ? "hsl(42 90% 55%)" : "hsl(30 50% 40%)"}
          strokeWidth="1"
        />
        {/* Wick */}
        <line x1="46" y1="20" x2="49" y2="16"
          stroke={lit ? "hsl(42 80% 60%)" : "hsl(30 20% 40%)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Oil sheen */}
        {lit && (
          <ellipse cx="28" cy="20" rx="12" ry="4"
            fill="hsl(45 90% 60%)"
            opacity="0.2"
          />
        )}
        {/* Decorative dots */}
        {[18, 28, 38].map((x) => (
          <circle key={x} cx={x} cy="27" r="2"
            fill={lit ? "hsl(42 90% 55%)" : "hsl(30 50% 40%)"}
            opacity="0.7"
          />
        ))}
      </svg>

      {/* Base plate */}
      <div
        className="w-14 h-1 rounded-full mt-0.5"
        style={{
          background: lit
            ? "linear-gradient(to right, hsl(38 85% 35%), hsl(42 90% 50%), hsl(38 85% 35%))"
            : "linear-gradient(to right, hsl(30 30% 20%), hsl(35 40% 30%), hsl(30 30% 20%))",
          boxShadow: lit ? "0 0 8px hsl(42 95% 55% / 0.4)" : "none",
        }}
      />

      {/* Glow on floor */}
      {lit && (
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-8px",
            width: "50px",
            height: "12px",
            background: "radial-gradient(ellipse, hsl(42 95% 55% / 0.25), transparent)",
            filter: "blur(4px)",
          }}
        />
      )}
    </div>
  );
};

export default Diya;
