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
      className={`absolute left-0 w-full overflow-hidden leading-none pointer-events-none ${
        position === 'top' ? '-top-px' : '-bottom-px'
      } ${className}`}
      style={{ height: '100px' }}
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        fill={fillColor}
        aria-hidden="true"
      >
        {position === 'top' ? (
          // Top: minimal corner rounding, almost straight
          <path d="M0,0 C20,0 40,3 60,0 L1140,0 C1160,3 1180,0 1200,0 L1200,100 L0,100 Z" />
        ) : (
          // Bottom: minimal corner rounding, almost straight
          <path d="M0,100 C20,100 40,97 60,100 L1140,100 C1160,97 1180,100 1200,100 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}