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
          // Top curve: straight line that curves down only at the edges
          <path d="M0,0 L200,0 L200,70 Q600,100 1000,70 L1000,0 L1200,0 L1200,100 L0,100 Z" />
        ) : (
          // Bottom curve: straight line that curves up only at the edges
          <path d="M0,100 L200,100 L200,30 Q600,0 1000,30 L1000,100 L1200,100 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}