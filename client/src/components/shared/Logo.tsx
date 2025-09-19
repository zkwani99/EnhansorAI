interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg 
      width="80" 
      height="32" 
      viewBox="0 0 80 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Text: Lorepic */}
      <text 
        x="5" 
        y="22" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="18" 
        fontWeight="500" 
        fill="currentColor"
      >
        Lorepic
      </text>
    </svg>
  );
}