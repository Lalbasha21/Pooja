// Sound toggle button for bhajan ambience
interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ enabled, onToggle }: SoundToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all duration-300"
      style={{
        background: enabled
          ? "linear-gradient(135deg, hsl(42 60% 18%), hsl(38 50% 12%))"
          : "hsl(20 20% 10%)",
        border: `1px solid hsl(42 90% 50% / ${enabled ? "0.6" : "0.3"})`,
        boxShadow: enabled
          ? "0 0 12px hsl(42 95% 55% / 0.3), inset 0 0 8px hsl(42 95% 55% / 0.1)"
          : "none",
        color: "hsl(42 95% 75%)",
        fontSize: "12px",
        fontFamily: "serif",
        letterSpacing: "0.5px",
        zIndex: 100,
        minWidth: "100px",
      }}
    >
      <span style={{ fontSize: "16px" }}>{enabled ? "🎵" : "🔇"}</span>
      <span style={{ color: enabled ? "hsl(42 95% 70%)" : "hsl(40 20% 50%)" }}>
        {enabled ? "Bhajan ON" : "Bhajan OFF"}
      </span>
      {/* Indicator dot */}
      <span
        className="w-2 h-2 rounded-full ml-1"
        style={{
          background: enabled ? "hsl(120 60% 50%)" : "hsl(0 50% 40%)",
          boxShadow: enabled ? "0 0 6px hsl(120 60% 50%)" : "none",
          display: "inline-block",
        }}
      />
    </button>
  );
};

export default SoundToggle;
