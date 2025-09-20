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
      style={{ height: '50px' }}
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        fill={fillColor}
        aria-hidden="true"
      >
        {position === 'top' ? (
          // Top: smooth curve from corner to corner, curving down into white section
          <path d="M0,0 Q600,50 1200,0 L1200,50 L0,50 Z" />
        ) : (
          // Bottom: smooth curve from corner to corner, curving up into white section
          <path d="M0,50 Q600,0 1200,50 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}