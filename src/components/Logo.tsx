import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-500 group-hover:rotate-[360deg] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5 text-zinc-950"
      >
        {/* Divine Spark / Star shape */}
        <path 
          d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" 
          fill="currentColor"
          stroke="currentColor" 
          strokeWidth="0.5" 
          strokeLinejoin="round"
        />
        {/* Inner Circle for 'Unity' */}
        <circle cx="12" cy="12.5" r="2.5" fill="white" fillOpacity="0.5" />
        {/* Radiating lines for 'Spirit' */}
        <path d="M12 5V2M12 22V19M5 12H2M22 12H19" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
      
      {/* Decorative Glow Ring */}
      <div className="absolute inset-0 rounded-full border border-white/20 scale-125 group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
}
