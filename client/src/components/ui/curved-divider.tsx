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
          // Concave curve at top (Leadpages style - cuts down into white section)
          <path d="M0,0 L1200,0 L1200,70 C600,100 600,100 0,70 Z" />
        ) : (
          // Concave curve at bottom (Leadpages style - cuts up into white section)  
          <path d="M0,100 L1200,100 L1200,30 C600,0 600,0 0,30 Z" />
        )}
      </svg>
    </div>
  );
}