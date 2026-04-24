import React from "react";

const GRAY = "#525C6B";
const AMBER = "#E8A020";

export const RealProChainLogo: React.FC<{ size?: number; showWordmark?: boolean }> = ({
  size = 280,
  showWordmark = true,
}) => {
  const W = 360;
  const H = 230;
  const SW = 52;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.06 }}>
      <svg width={size} height={size * (H / W)} viewBox={`0 0 ${W} ${H}`} fill="none">
        {/* Gray S-arm: sweeps from upper-left through center to lower-right */}
        <path
          d="M 52 88 C 48 42 88 8 142 28 C 182 44 188 86 162 102 C 136 118 112 140 144 164 C 168 184 232 180 262 148"
          stroke={GRAY}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Amber reverse-S: upper-right to lower-left, renders on top at crossings */}
        <path
          d="M 156 20 C 200 2 268 20 270 66 C 272 98 242 114 206 112 C 170 110 148 130 158 160 C 166 186 148 208 106 208"
          stroke={AMBER}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark && (
        <div
          style={{
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
            fontWeight: 600,
            letterSpacing: size * 0.072,
            fontSize: size * 0.17,
            color: GRAY,
            textTransform: "uppercase" as const,
            paddingLeft: size * 0.072,
          }}
        >
          PROCHAIN
        </div>
      )}
    </div>
  );
};
