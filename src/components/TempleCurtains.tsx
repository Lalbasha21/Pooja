// Temple Curtains component — velvet center-opening curtains with rope
import { useState, useRef } from "react";

interface TempleCurtainsProps {
  onOpen: () => void;
  isOpen: boolean;
}

const TempleCurtains = ({ onOpen, isOpen }: TempleCurtainsProps) => {
  const [pulling, setPulling] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const ropeRef = useRef<HTMLDivElement>(null);

  const handleRopePull = () => {
    if (isOpen || pulling) return;
    setPulling(true);
    setBellRinging(true);

    // Play bell sound via Web Audio API
    playBellSound();

    setTimeout(() => {
      setBellRinging(false);
      onOpen();
    }, 600);
  };

  const playBellSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Temple bell: layered oscillators
      const frequencies = [880, 1108, 1320, 1760];
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.18 / (i + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        osc.start(ctx.currentTime + i * 0.02);
        osc.stop(ctx.currentTime + 3);
      });
    } catch {}
  };

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      {/* Left curtain */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 pointer-events-none origin-left transition-none ${
          isOpen ? "animate-curtain-open-left" : ""
        }`}
        style={{
          background: `
            linear-gradient(105deg,
              hsl(355 75% 12%) 0%,
              hsl(0 70% 22%) 25%,
              hsl(0 65% 18%) 50%,
              hsl(355 72% 14%) 75%,
              hsl(0 68% 10%) 100%
            )
          `,
          boxShadow: "inset -20px 0 60px hsl(0 0% 0% / 0.6), inset 10px 0 30px hsl(355 50% 8% / 0.4)",
        }}
      >
        {/* Velvet fold lines */}
        {[15, 30, 45, 62, 78].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 h-full w-px opacity-30"
            style={{
              left: `${pos}%`,
              background: "linear-gradient(to bottom, transparent, hsl(0 30% 35%), transparent)",
            }}
          />
        ))}
        {/* Gold trim on right edge */}
        <div
          className="absolute right-0 top-0 h-full w-4"
          style={{
            background: "linear-gradient(to right, transparent, hsl(42 90% 50%), hsl(48 100% 65%), hsl(42 90% 50%))",
            boxShadow: "0 0 12px hsl(42 95% 55% / 0.6)",
          }}
        />
        {/* Top decorative border */}
        <div
          className="absolute top-0 left-0 right-0 h-12"
          style={{
            background: "linear-gradient(to bottom, hsl(42 60% 18%), hsl(0 70% 16%))",
            borderBottom: "2px solid hsl(42 90% 50%)",
          }}
        />
        {/* Bottom tassel row */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-1 h-8"
                style={{ background: "linear-gradient(to bottom, hsl(42 90% 50%), hsl(42 80% 35%))" }}
              />
              <div
                className="w-3 h-5 rounded-full"
                style={{ background: "radial-gradient(circle, hsl(48 100% 65%), hsl(38 85% 40%))" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 pointer-events-none origin-right transition-none ${
          isOpen ? "animate-curtain-open-right" : ""
        }`}
        style={{
          background: `
            linear-gradient(255deg,
              hsl(355 75% 12%) 0%,
              hsl(0 70% 22%) 25%,
              hsl(0 65% 18%) 50%,
              hsl(355 72% 14%) 75%,
              hsl(0 68% 10%) 100%
            )
          `,
          boxShadow: "inset 20px 0 60px hsl(0 0% 0% / 0.6), inset -10px 0 30px hsl(355 50% 8% / 0.4)",
        }}
      >
        {[22, 38, 55, 70, 85].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 h-full w-px opacity-30"
            style={{
              left: `${pos}%`,
              background: "linear-gradient(to bottom, transparent, hsl(0 30% 35%), transparent)",
            }}
          />
        ))}
        {/* Gold trim on left edge */}
        <div
          className="absolute left-0 top-0 h-full w-4"
          style={{
            background: "linear-gradient(to left, transparent, hsl(42 90% 50%), hsl(48 100% 65%), hsl(42 90% 50%))",
            boxShadow: "0 0 12px hsl(42 95% 55% / 0.6)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-12"
          style={{
            background: "linear-gradient(to bottom, hsl(42 60% 18%), hsl(0 70% 16%))",
            borderBottom: "2px solid hsl(42 90% 50%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-around">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-1 h-8" style={{ background: "linear-gradient(to bottom, hsl(42 90% 50%), hsl(42 80% 35%))" }} />
              <div className="w-3 h-5 rounded-full" style={{ background: "radial-gradient(circle, hsl(48 100% 65%), hsl(38 85% 40%))" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ROPE — right side, interactive */}
      {!isOpen && (
        <div
          className="absolute right-6 top-0 pointer-events-auto cursor-pointer z-60 flex flex-col items-center"
          onClick={handleRopePull}
          style={{ top: "10px" }}
        >
          {/* Bell */}
          <div
            className={`text-3xl select-none mb-1 ${bellRinging ? "animate-bell-ring" : ""}`}
            style={{
              filter: "drop-shadow(0 0 8px hsl(42 95% 55% / 0.8))",
              display: "inline-block",
            }}
          >
            🔔
          </div>
          {/* Rope body */}
          <div
            ref={ropeRef}
            className={`flex flex-col items-center ${pulling ? "animate-rope-pull" : "animate-rope-swing"}`}
            style={{ transformOrigin: "top center" }}
          >
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-5 rounded-sm"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(to right, hsl(30 50% 25%), hsl(35 60% 40%), hsl(30 50% 25%))"
                    : "linear-gradient(to right, hsl(35 55% 30%), hsl(40 65% 45%), hsl(35 55% 30%))",
                  boxShadow: "inset 1px 0 2px hsl(0 0% 0% / 0.4)",
                  marginBottom: "2px",
                  borderRadius: "2px",
                }}
              />
            ))}
            {/* Rope handle */}
            <div
              className="mt-1 px-4 py-2 rounded-full select-none"
              style={{
                background: "linear-gradient(135deg, hsl(42 90% 50%), hsl(38 85% 38%))",
                boxShadow: "0 2px 8px hsl(0 0% 0% / 0.5), 0 0 12px hsl(42 95% 55% / 0.4)",
                fontSize: "11px",
                color: "hsl(20 30% 8%)",
                fontWeight: "bold",
                letterSpacing: "0.5px",
              }}
            >
              PULL
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleCurtains;
