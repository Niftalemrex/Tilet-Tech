import React from "react";

/**
 * Ultra-simple, hidden & ambient Ethiopian Tilet (ጥለት) Woven Background
 * - Color: Warm creamy cotton tone (inspired by traditional unbleached Shema fabric)
 * - Aesthetic: Extremely subtle ("hidden look"), minimal woven lattice
 * - Non-intrusive: Barely-there contrast (0.025 - 0.045) that lets typography breathe
 */
export default function EthiopianTiletBackground() {
  return (
    <div className="nc-hero-woven-bg" aria-hidden="true">
      {/* Very faint creamy ambient backlight */}
      <div className="nc-woven-radial-glow" />

      {/* Extremely simple, subtle creamy woven pattern */}
      <svg
        className="nc-woven-svg"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="creamySimpleWeave"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            {/* Simple woven diamond contour in soft cream */}
            <path
              d="M32,0 L64,32 L32,64 L0,32 Z"
              fill="none"
              stroke="rgba(245, 240, 230, 0.042)"
              strokeWidth="0.75"
            />

            {/* Faint inner diamond line */}
            <path
              d="M32,12 L52,32 L32,52 L12,32 Z"
              fill="none"
              stroke="rgba(245, 240, 230, 0.022)"
              strokeWidth="0.5"
            />

            {/* Minimal central Ethiopian woven stitch (ቀላል የመስቀል ቅርጽ) */}
            <line
              x1="32"
              y1="28"
              x2="32"
              y2="36"
              stroke="rgba(245, 240, 230, 0.055)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <line
              x1="28"
              y1="32"
              x2="36"
              y2="32"
              stroke="rgba(245, 240, 230, 0.055)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <circle
              cx="32"
              cy="32"
              r="0.9"
              fill="rgba(245, 240, 230, 0.07)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#creamySimpleWeave)" />
      </svg>
    </div>
  );
}
