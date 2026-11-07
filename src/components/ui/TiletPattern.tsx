import React from "react";

interface TiletPatternProps {
  className?: string;
  opacity?: number;
  height?: number;
}

/**
 * Authentic Ethiopian Tilet (ጥለት) Horizontal Ribbon
 * - Sawtooth selvage borders (የጥርስ ጥለት)
 * - Stepped central diamond cross (የመስቀል ጥለት)
 * - Interlocking chevron braids (የሰንሰለት ጥለት)
 * - Warm sand gold (#c8b89a), emerald green (#10b981), and azure (#38bdf8)
 */
export default function TiletPattern({ className = "", opacity = 0.75, height = 12 }: TiletPatternProps) {
  return (
    <div
      className={`tilet-embroidery-ribbon ${className}`}
      style={{
        width: "100%",
        height: `${height}px`,
        opacity,
        overflow: "hidden",
        position: "relative",
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <pattern
            id="tiletRibbonHabesha"
            width="64"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {/* Top & Bottom Handloom Selvage Borders */}
            <line x1="0" y1="0.5" x2="64" y2="0.5" stroke="rgba(200,184,154,0.3)" strokeWidth="0.8" />
            <line x1="0" y1="11.5" x2="64" y2="11.5" stroke="rgba(200,184,154,0.3)" strokeWidth="0.8" />

            {/* Sawtooth Borders (የጥርስ ጥለት) */}
            <path
              d="M0,1 L2,2.5 L4,1 L6,2.5 L8,1 L10,2.5 L12,1 L14,2.5 L16,1 L18,2.5 L20,1 L22,2.5 L24,1 L26,2.5 L28,1 L30,2.5 L32,1 L34,2.5 L36,1 L38,2.5 L40,1 L42,2.5 L44,1 L46,2.5 L48,1 L50,2.5 L52,1 L54,2.5 L56,1 L58,2.5 L60,1 L62,2.5 L64,1"
              stroke="#c8b89a"
              strokeWidth="0.6"
              fill="rgba(200,184,154,0.12)"
            />
            <path
              d="M0,11 L2,9.5 L4,11 L6,9.5 L8,11 L10,9.5 L12,11 L14,9.5 L16,11 L18,9.5 L20,11 L22,9.5 L24,11 L26,9.5 L28,11 L30,9.5 L32,11 L34,9.5 L36,11 L38,9.5 L40,11 L42,9.5 L44,11 L46,9.5 L48,11 L50,9.5 L52,11 L54,9.5 L56,11 L58,9.5 L60,11 L62,9.5 L64,11"
              stroke="#c8b89a"
              strokeWidth="0.6"
              fill="rgba(200,184,154,0.12)"
            />

            {/* Central Diamond (የጥለት ድንቅ ቅርጽ) at x=32, y=6 */}
            <polygon
              points="32,2 38,6 32,10 26,6"
              stroke="#c8b89a"
              strokeWidth="0.9"
              fill="rgba(200,184,154,0.15)"
            />
            {/* Center Cross Knot */}
            <line x1="32" y1="3.5" x2="32" y2="8.5" stroke="#10b981" strokeWidth="1" />
            <line x1="29.5" y1="6" x2="34.5" y2="6" stroke="#10b981" strokeWidth="1" />
            <circle cx="32" cy="6" r="1" fill="#c8b89a" />

            {/* Left Wing Chevrons (የሰንሰለት ጥለት) */}
            <path d="M21,2.5 L25,6 L21,9.5" stroke="#c8b89a" strokeWidth="0.8" fill="none" opacity="0.85" />
            <path d="M16,3 L20,6 L16,9" stroke="#10b981" strokeWidth="0.8" fill="none" opacity="0.75" />
            <path d="M11,3.5 L15,6 L11,8.5" stroke="#38bdf8" strokeWidth="0.7" fill="none" opacity="0.7" />

            {/* Right Wing Chevrons (የሰንሰለት ጥለት) */}
            <path d="M43,2.5 L39,6 L43,9.5" stroke="#c8b89a" strokeWidth="0.8" fill="none" opacity="0.85" />
            <path d="M48,3 L44,6 L48,9" stroke="#10b981" strokeWidth="0.8" fill="none" opacity="0.75" />
            <path d="M53,3.5 L49,6 L53,8.5" stroke="#38bdf8" strokeWidth="0.7" fill="none" opacity="0.7" />

            {/* Outer Knots */}
            <polygon points="0,6 3,3.5 6,6 3,8.5" fill="rgba(200,184,154,0.25)" stroke="#c8b89a" strokeWidth="0.7" />
            <polygon points="64,6 61,3.5 58,6 61,8.5" fill="rgba(200,184,154,0.25)" stroke="#c8b89a" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tiletRibbonHabesha)" />
      </svg>
    </div>
  );
}
