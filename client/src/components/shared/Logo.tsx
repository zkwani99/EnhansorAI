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
      {/* Shield outline - traditional heraldic shield shape */}
      <path 
        d="M12 2C8 2 4 4 4 4V14C4 20 8 26 12 30C16 26 20 20 20 14V4S16 2 12 2Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
      />
      
      {/* Lightning bolt - vertical zigzag matching your design */}
      <path 
        d="M14 6L10 6L12 12L9 12L15 26L13 18L16 18L14 6Z" 
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