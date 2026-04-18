import React from "react";

export const ProChainLogo: React.FC<{ size?: number }> = ({ size = 220 }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 300 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M52 58 C52 32, 82 22, 108 42 C134 62, 138 100, 112 120 C86 140, 52 130, 52 104 Z"
          fill="#334155"
        />
        <path
          d="M150 58 C150 32, 180 22, 206 42 C232 62, 236 100, 210 120 C184 140, 150 130, 150 104 Z"
          fill="#F59E0B"
        />
        <path
          d="M100 88 C110 70, 140 70, 150 88 C160 106, 150 118, 140 110 C130 102, 130 88, 120 88 C110 88, 105 94, 100 88 Z"
          fill="#334155"
        />
      </g>
    </svg>
  );
};

export const ProChainWordmark: React.FC<{ color?: string; size?: number }> = ({
  color = "#334155",
  size = 72,
}) => (
  <div
    style={{
      fontFamily: "system-ui, -apple-system, Segoe UI, Helvetica, Arial",
      fontWeight: 800,
      letterSpacing: 8,
      fontSize: size,
      color,
    }}
  >
    PROCHAIN
  </div>
);
