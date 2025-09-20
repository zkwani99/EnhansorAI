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
          // Top curve: mostly straight with very gentle curves at edges only
          <path d="M0,0 L150,0 Q300,20 900,20 Q1050,0 1200,0 L1200,100 L0,100 Z" />
        ) : (
          // Bottom curve: mostly straight with very gentle curves at edges only
          <path d="M0,100 L150,100 Q300,80 900,80 Q1050,100 1200,100 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}