import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-amber-500 text-black ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5"
      >
        <path
          d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
