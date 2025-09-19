interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg 
      width="120" 
      height="32" 
      viewBox="0 0 120 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield with proper heraldic shape */}
      <path 
        d="M12 2 C9.5 2, 7 3, 7 4 V12 C7 18, 9.5 22, 12 26 C14.5 22, 17 18, 17 12 V4 C17 3, 14.5 2, 12 2 Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Lightning bolt - classic zigzag */}
      <path 
        d="M10.5 6 L13.5 6 L11.8 9.5 L14 9.5 L9.5 16 L11 12 L9 12 Z" 
        fill="currentColor"
      />
      
      {/* Text: Lorepic */}
      <text 
        x="28" 
        y="20" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="14" 
        fontWeight="400" 
        fill="currentColor"
      >
        Lorepic
      </text>
    </svg>
  );
}