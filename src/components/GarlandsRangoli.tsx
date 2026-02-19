// Decorative garlands and rangoli
const GarlandsRangoli = ({ visible }: { visible: boolean }) => {
  return (
    <>
      {/* Top garlands — left side */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-between pointer-events-none z-20"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 2s ease 0.5s" }}
      >
        {/* Left garland */}
        <div
          className="animate-garland-sway"
          style={{
            transformOrigin: "top left",
            width: "45%",
            paddingLeft: "8px",
          }}
        >
          <svg viewBox="0 0 200 60" width="100%" preserveAspectRatio="none">
            {/* Garland string */}
            <path
              d="M 0 10 Q 50 55 100 25 Q 150 55 200 10"
              fill="none"
              stroke="hsl(30 60% 30%)"
              strokeWidth="2"
            />
            {/* Marigold flowers */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((x) => {
              const y = 10 + 45 * Math.sin(Math.PI * x / 200);
              return (
                <g key={x} transform={`translate(${x}, ${y})`}>
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <ellipse
                      key={angle}
                      cx={Math.cos((angle * Math.PI) / 180) * 5}
                      cy={Math.sin((angle * Math.PI) / 180) * 5}
                      rx="4" ry="2.5"
                      fill={angle % 120 === 0 ? "hsl(38 95% 55%)" : "hsl(28 90% 50%)"}
                      opacity="0.9"
                    />
                  ))}
                  <circle cx="0" cy="0" r="3" fill="hsl(42 95% 65%)" />
                </g>
              );
            })}
            {/* Green leaves */}
            {[10, 50, 90, 130, 170].map((x) => {
              const y = 10 + 45 * Math.sin(Math.PI * x / 200);
              return (
                <ellipse key={x} cx={x} cy={y + 5} rx="6" ry="3"
                  fill="hsl(120 40% 25%)" opacity="0.7"
                  transform={`rotate(${x % 2 === 0 ? 20 : -20}, ${x}, ${y + 5})`}
                />
              );
            })}
          </svg>
        </div>

        {/* Right garland */}
        <div
          className="animate-garland-sway"
          style={{
            transformOrigin: "top right",
            width: "45%",
            paddingRight: "8px",
            animationDelay: "0.8s",
          }}
        >
          <svg viewBox="0 0 200 60" width="100%" preserveAspectRatio="none">
            <path
              d="M 0 10 Q 50 55 100 25 Q 150 55 200 10"
              fill="none"
              stroke="hsl(30 60% 30%)"
              strokeWidth="2"
            />
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((x) => {
              const y = 10 + 45 * Math.sin(Math.PI * x / 200);
              return (
                <g key={x} transform={`translate(${x}, ${y})`}>
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <ellipse
                      key={angle}
                      cx={Math.cos((angle * Math.PI) / 180) * 5}
                      cy={Math.sin((angle * Math.PI) / 180) * 5}
                      rx="4" ry="2.5"
                      fill={angle % 120 === 0 ? "hsl(15 90% 55%)" : "hsl(28 90% 50%)"}
                      opacity="0.9"
                    />
                  ))}
                  <circle cx="0" cy="0" r="3" fill="hsl(42 95% 65%)" />
                </g>
              );
            })}
            {[10, 50, 90, 130, 170].map((x) => {
              const y = 10 + 45 * Math.sin(Math.PI * x / 200);
              return (
                <ellipse key={x} cx={x} cy={y + 5} rx="6" ry="3"
                  fill="hsl(120 40% 25%)" opacity="0.7"
                  transform={`rotate(${x % 2 === 0 ? -20 : 20}, ${x}, ${y + 5})`}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Rangoli at bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 2s ease 1s",
          width: "clamp(200px, 35vw, 400px)",
        }}
      >
        <svg viewBox="0 0 200 80" width="100%" preserveAspectRatio="xMidYMid meet">
          {/* Outer petal ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <ellipse
              key={angle}
              cx={100 + Math.cos((angle * Math.PI) / 180) * 35}
              cy={40 + Math.sin((angle * Math.PI) / 180) * 25}
              rx="14" ry="7"
              fill={
                angle % 90 === 0 ? "hsl(0 80% 50%)" :
                angle % 60 === 0 ? "hsl(210 70% 50%)" :
                "hsl(28 90% 50%)"
              }
              opacity="0.85"
              transform={`rotate(${angle}, ${100 + Math.cos((angle * Math.PI) / 180) * 35}, ${40 + Math.sin((angle * Math.PI) / 180) * 25})`}
            />
          ))}
          {/* Middle ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx={100 + Math.cos((angle * Math.PI) / 180) * 18}
              cy={40 + Math.sin((angle * Math.PI) / 180) * 13}
              rx="8" ry="5"
              fill={angle % 90 === 0 ? "hsl(42 95% 55%)" : "hsl(120 50% 35%)"}
              opacity="0.9"
            />
          ))}
          {/* Center */}
          <circle cx="100" cy="40" r="8" fill="hsl(42 95% 55%)" opacity="0.95" />
          <circle cx="100" cy="40" r="4" fill="hsl(0 80% 55%)" opacity="1" />
          <circle cx="100" cy="40" r="2" fill="white" opacity="0.8" />
          {/* Dots border */}
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle) => (
            <circle
              key={angle}
              cx={100 + Math.cos((angle * Math.PI) / 180) * 45}
              cy={40 + Math.sin((angle * Math.PI) / 180) * 32}
              r="2.5"
              fill="hsl(42 95% 55%)"
              opacity="0.8"
            />
          ))}
        </svg>
      </div>
    </>
  );
};

export default GarlandsRangoli;
