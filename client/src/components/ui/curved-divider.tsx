interface CurvedDividerProps {
  position?: 'top' | 'bottom';
  className?: string;
  fillColor?: string;
}

export function CurvedDivider({ 
  position = 'bottom', 
  className = '', 
  fillColor = 'currentColor' 
}: CurvedDividerProps) {
  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-none ${
        position === 'top' ? '-top-px' : '-bottom-px'
      } ${className}`}
      style={{ height: '60px' }}
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill={fillColor}
      >
        {position === 'top' ? (
          // Concave curve at top (opening upward)
          <path d="M0,120 C300,0 900,0 1200,120 L1200,0 L0,0 Z" />
        ) : (
          // Concave curve at bottom (opening downward)
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" />
        )}
      </svg>
    </div>
  );
}