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
      {/* Shield outline */}
      <path 
        d="M4 6C4 6 8.5 4 12 4C15.5 4 20 6 20 6C20 6 20.5 10 20 16C19.5 22 16.5 27 12 29C7.5 27 4.5 22 4 16C3.5 10 4 6 4 6Z" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        fill="none"
      />
      
      {/* Lightning bolt - matching original design */}
      <path 
        d="M10 9L14 9L11.5 16L14.5 16L10.5 23L12.5 16L9.5 16L10 9Z" 
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