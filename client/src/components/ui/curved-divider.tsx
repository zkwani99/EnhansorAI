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
          // Top: short cubic curves only at edges, straight middle (Leadpages style)
          <path d="M0,0 C40,0 80,10 120,0 L1080,0 C1120,10 1160,0 1200,0 L1200,100 L0,100 Z" />
        ) : (
          // Bottom: short cubic curves only at edges, straight middle (Leadpages style)
          <path d="M0,100 C40,100 80,90 120,100 L1080,100 C1120,90 1160,100 1200,100 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}