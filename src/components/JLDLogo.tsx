import React from 'react';

export const JLDLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
}> = ({
  className = '',
  size = 'md',
  darkMode = false,
}) => {
  const height = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-13' : 'h-11';

  return (
    <div className={`flex flex-col items-center justify-center select-none transition-all duration-300 ${className}`}>
      <svg
        viewBox="0 0 320 100"
        className={`${height} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Light Mode Chrome Metallic Gradient for J & D */}
          <linearGradient id="chromeLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="15%" stopColor="#E2E8F0" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="55%" stopColor="#F8FAFC" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="90%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Dark Mode Chrome Metallic Gradient for J & D */}
          <linearGradient id="chromeDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#F1F5F9" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="85%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* 3D Bevel Highlight Gradient for J & D */}
          <linearGradient id="chromeBevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
          </linearGradient>

          {/* Vibrant Metallic Royal Blue Gradient for L */}
          <linearGradient id="blueMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="20%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="80%" stopColor="#0F3D9C" />
            <stop offset="100%" stopColor="#0A255C" />
          </linearGradient>

          {/* 3D Bevel Highlight for L */}
          <linearGradient id="blueBevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0A1E4A" stopOpacity="0.9" />
          </linearGradient>

          {/* Drop Shadow Filter for 3D realism */}
          <filter id="jld3DShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy={darkMode ? '2.5' : '1.5'}
              stdDeviation={darkMode ? '2' : '1.2'}
              floodColor={darkMode ? '#000000' : '#0F172A'}
              floodOpacity={darkMode ? '0.6' : '0.2'}
            />
          </filter>
        </defs>

        <g filter="url(#jld3DShadow)">
          {/* ================= LETTER J ================= */}
          {/* Main J Chrome Body */}
          <path
            d="M 68 14 
               H 86 
               V 48 
               C 86 58 78 65 64 65 
               C 50 65 42 58 39 49 
               L 54 44 
               C 55.5 48.5 58.5 51 63.5 51 
               C 68.5 51 71 48 71 43 
               V 14 
               Z"
            fill={darkMode ? 'url(#chromeDark)' : 'url(#chromeLight)'}
            stroke="url(#chromeBevel)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Angled Chamfer on J's bottom-left tail */}
          <path
            d="M 39 49 L 46 62 L 54 44 Z"
            fill={darkMode ? '#475569' : '#64748B'}
            opacity="0.7"
          />

          {/* ================= LETTER L ================= */}
          {/* Main L Blue Body */}
          <path
            d="M 97 14 
               H 113 
               V 51 
               H 148 
               L 140 65 
               H 97 
               V 14 
               Z"
            fill="url(#blueMetal)"
            stroke="url(#blueBevel)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Chamfer slice at the bottom right tip of L */}
          <path
            d="M 148 51 L 140 65 L 134 51 Z"
            fill="#0A1E4A"
            opacity="0.8"
          />

          {/* ================= LETTER D ================= */}
          {/* Main D Chrome Body */}
          <path
            d="M 158 14 
               H 188 
               C 214 14 233 27 233 39.5 
               C 233 52 214 65 188 65 
               H 158 
               V 42 
               H 170 
               V 52 
               H 186 
               C 203 52 216 46 216 39.5 
               C 216 33 203 27 186 27 
               H 170 
               V 14 
               Z"
            fill={darkMode ? 'url(#chromeDark)' : 'url(#chromeLight)'}
            stroke="url(#chromeBevel)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Lower vertical stem segment of D below the pixel cut-out */}
          <path
            d="M 158 42 H 170 V 65 H 158 Z"
            fill={darkMode ? 'url(#chromeDark)' : 'url(#chromeLight)'}
            stroke="url(#chromeBevel)"
            strokeWidth="0.8"
          />

          {/* ================= DIGITAL PIXELS MOSAIC ================= */}
          {/* Placed precisely in the notch/cutout at the upper-left curve of D */}
          {/* Column 1 */}
          <rect x="144" y="27" width="7" height="7" fill="#0284C7" rx="0.5" />
          
          {/* Column 2 */}
          <rect x="153" y="20" width="7" height="7" fill="#38BDF8" rx="0.5" />
          <rect x="153" y="29" width="7" height="7" fill="#0F3D9C" rx="0.5" />
          <rect x="153" y="38" width="7" height="7" fill="#2563EB" rx="0.5" />

          {/* Column 3 */}
          <rect x="162" y="25" width="7" height="7" fill="#2563EB" rx="0.5" />
          <rect x="162" y="34" width="7" height="7" fill="#0A255C" rx="0.5" />

          {/* Column 4 */}
          <rect x="171" y="28" width="6.5" height="6.5" fill="#0284C7" rx="0.5" />
        </g>

        {/* ================= DIGITAL SOLUTIONS SUBTITLE ================= */}
        <text
          x="160"
          y="87"
          textAnchor="middle"
          fill={darkMode ? '#FFFFFF' : '#000000'}
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="0.32em"
          fontFamily="Montserrat, Inter, system-ui, -apple-system, sans-serif"
        >
          DIGITAL SOLUTIONS
        </text>
      </svg>
    </div>
  );
};


