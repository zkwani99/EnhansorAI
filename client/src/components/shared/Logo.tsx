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
      
      {/* Magic wand - perfect for AI content creation */}
      <path 
        d="M9 7 L15 13 M15 13 L14 12 M15 13 L16 14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      {/* Sparkles around the wand tip */}
      <circle cx="16" cy="12" r="0.8" fill="currentColor"/>
      <circle cx="17" cy="14" r="0.6" fill="currentColor"/>
      <circle cx="15" cy="15" r="0.5" fill="currentColor"/>
      
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