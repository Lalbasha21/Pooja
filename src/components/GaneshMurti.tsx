// Ganesh Murti — divine idol with halo, particles, shadow
import ganeshImg from "@/assets/ganesh-murti.jpg";

interface GaneshMurtiProps {
  revealed: boolean;
  allDiyasLit: boolean;
}

const GaneshMurti = ({ revealed, allDiyasLit }: GaneshMurtiProps) => {
  if (!revealed) return null;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        animation: revealed ? "lamp-reveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
      }}
    >
      {/* Outer divine halo - rotating ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "clamp(180px, 30vw, 320px)",
          height: "clamp(180px, 30vw, 320px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: allDiyasLit
            ? "conic-gradient(from 0deg, hsl(42 95% 55% / 0.0), hsl(48 100% 65% / 0.4), hsl(42 95% 55% / 0.0), hsl(28 95% 52% / 0.3), hsl(42 95% 55% / 0.0))"
            : "none",
          animation: allDiyasLit ? "halo-rotate 6s linear infinite" : "none",
          zIndex: 0,
        }}
      />

      {/* Divine glow backdrop */}
      <div
        className="absolute rounded-full animate-halo-pulse"
        style={{
          width: "clamp(160px, 28vw, 280px)",
          height: "clamp(160px, 28vw, 280px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: allDiyasLit
            ? "radial-gradient(circle, hsl(42 95% 55% / 0.35), hsl(28 95% 52% / 0.15), transparent 70%)"
            : "radial-gradient(circle, hsl(42 95% 55% / 0.15), transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
          transition: "all 2s ease",
        }}
      />

      {/* Sacred arch/nimbus */}
      <div
        className="absolute"
        style={{
          width: "clamp(130px, 22vw, 220px)",
          height: "clamp(130px, 22vw, 220px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -52%)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, hsl(42 95% 55% / 0.2), transparent 60%)",
          border: `2px solid hsl(42 95% 55% / ${allDiyasLit ? "0.5" : "0.2"})`,
          boxShadow: allDiyasLit
            ? "0 0 30px hsl(42 95% 55% / 0.4), inset 0 0 30px hsl(42 95% 55% / 0.1)"
            : "none",
          zIndex: 1,
          transition: "all 2s ease",
        }}
      />

      {/* Murti image */}
      <div
        className="relative z-10 animate-idol-float"
        style={{
          width: "clamp(120px, 18vw, 200px)",
        }}
      >
        <img
          src={ganeshImg}
          alt="Lord Ganesha"
          className="w-full object-contain"
          style={{
            filter: allDiyasLit
              ? "brightness(1.15) contrast(1.05) saturate(1.2) drop-shadow(0 0 20px hsl(42 95% 55% / 0.6))"
              : "brightness(0.95) saturate(1.1) drop-shadow(0 0 10px hsl(42 95% 55% / 0.3))",
            borderRadius: "8px",
            transition: "filter 2s ease",
          }}
        />
      </div>

      {/* Ground shadow */}
      <div
        className="rounded-full mt-2 z-10"
        style={{
          width: "clamp(80px, 12vw, 140px)",
          height: "14px",
          background: "radial-gradient(ellipse, hsl(0 0% 0% / 0.6), transparent)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
};

export default GaneshMurti;
