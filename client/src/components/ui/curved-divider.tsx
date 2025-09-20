interface CurvedDividerProps {
  position?: "top" | "bottom";
  className?: string;
  fillColor?: string;
}

export function CurvedDivider({
  position = "bottom",
  className = "",
  fillColor = "currentColor",
}: CurvedDividerProps) {
  return (
    <div
      className={`absolute left-0 w-full overflow-hidden leading-none pointer-events-none ${
        position === "top" ? "-top-px" : "-bottom-px"
      } ${className}`}
      style={{ height: "30px" }} // flatter look
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 30" // percentage-based
        preserveAspectRatio="none"
        fill={fillColor}
        aria-hidden="true"
      >
        {position === "top" ? (
          // Top: 97% straight, ~3% curved edges
          <path d="M0,30 Q3,0 10,0 L90,0 Q97,0 100,30 L100,0 L0,0 Z" />
        ) : (
          // Bottom: 97% straight, ~3% curved edges
          <path d="M0,0 Q3,30 10,30 L90,30 Q97,30 100,0 L100,30 L0,30 Z" />
        )}
      </svg>
    </div>
  );
}
