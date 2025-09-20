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
          // Convex curve at top (Leadpages style - bulging down into section)
          <path d="M0,0 C600,50 600,50 1200,0 L1200,100 L0,100 Z" />
        ) : (
          // Convex curve at bottom (Leadpages style - bulging up from section)
          <path d="M0,100 C600,50 600,50 1200,100 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}