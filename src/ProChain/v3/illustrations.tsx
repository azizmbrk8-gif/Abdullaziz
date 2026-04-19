import React from "react";

// ============================================================================
// Clean, modern SVG illustrations — flat design, minimal detail, tech-startup
// aesthetic. Colors: orange #FF7A1A, navy #0F172A, cream #FFF9F2.
// ============================================================================

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const ORANGE_LIGHT = "#FFB47A";
const NAVY = "#0F172A";
const SLATE = "#334155";
const CREAM = "#FFF9F2";
const WHITE = "#FFFFFF";
const SKIN = "#F4C7A3";
const AMBER = "#F59E0B";
const MINT = "#10B981";
const RED = "#EF4444";

export const Colors = {
  ORANGE,
  ORANGE_DEEP,
  ORANGE_LIGHT,
  NAVY,
  SLATE,
  CREAM,
  WHITE,
  SKIN,
  AMBER,
  MINT,
  RED,
};

// ============================================================================
// Person: restaurant owner holding a phone, stressed expression
// ============================================================================
export const OwnerWithPhone: React.FC<{ size?: number; shake?: number }> = ({
  size = 400,
  shake = 0,
}) => (
  <svg
    width={size}
    height={size * 1.4}
    viewBox="0 0 300 420"
    style={{ filter: "drop-shadow(0 14px 28px rgba(15,23,42,0.25))" }}
  >
    <g transform={`translate(${shake} 0)`}>
      {/* apron */}
      <rect x="70" y="180" width="160" height="190" rx="14" fill={ORANGE} />
      <rect x="70" y="180" width="160" height="40" rx="10" fill={ORANGE_DEEP} />
      {/* chest strap */}
      <rect x="140" y="160" width="20" height="40" fill={ORANGE_DEEP} />
      {/* body */}
      <rect x="80" y="170" width="140" height="40" rx="10" fill={NAVY} />
      {/* arms */}
      <rect x="50" y="175" width="40" height="120" rx="18" fill={SKIN} />
      <rect x="210" y="175" width="40" height="120" rx="18" fill={SKIN} />
      {/* phone in hand */}
      <rect x="195" y="180" width="70" height="120" rx="14" fill={NAVY} />
      <rect x="202" y="192" width="56" height="94" rx="6" fill={ORANGE_LIGHT} />
      <rect x="212" y="200" width="36" height="8" rx="3" fill={WHITE} opacity="0.8" />
      <rect x="212" y="214" width="26" height="6" rx="3" fill={WHITE} opacity="0.6" />
      {/* head */}
      <circle cx="150" cy="120" r="54" fill={SKIN} />
      {/* hair */}
      <path d="M100 110 Q100 70 150 65 Q200 70 200 110 L200 92 Q150 75 100 92 Z" fill={NAVY} />
      {/* stressed eyebrows */}
      <rect x="120" y="108" width="20" height="5" rx="2" fill={NAVY} transform="rotate(-15 130 110)" />
      <rect x="160" y="108" width="20" height="5" rx="2" fill={NAVY} transform="rotate(15 170 110)" />
      {/* eyes */}
      <circle cx="130" cy="125" r="4" fill={NAVY} />
      <circle cx="170" cy="125" r="4" fill={NAVY} />
      {/* worried mouth */}
      <path d="M130 148 Q150 138 170 148" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* sweat drop */}
      <path d="M95 95 Q100 108 105 95 Z" fill="#60A5FA" />
    </g>
  </svg>
);

// ============================================================================
// Notification bubble — pops up with message
// ============================================================================
export const NotificationBubble: React.FC<{
  icon: string;
  title: string;
  body: string;
  tint?: string;
  width?: number;
}> = ({ icon, title, body, tint = RED, width = 420 }) => (
  <div
    style={{
      width,
      background: WHITE,
      borderRadius: 20,
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      boxShadow: "0 16px 40px rgba(15,23,42,0.25), 0 3px 10px rgba(15,23,42,0.1)",
      borderLeft: `6px solid ${tint}`,
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 14,
        background: tint + "22",
        color: tint,
        fontSize: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 24, fontWeight: 800, color: NAVY, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 18, color: SLATE, marginTop: 4 }}>{body}</div>
    </div>
  </div>
);

// ============================================================================
// Delivery Truck (late)
// ============================================================================
export const Truck: React.FC<{ size?: number; rollX?: number }> = ({ size = 400, rollX = 0 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 400 240" style={{ overflow: "visible" }}>
    <g transform={`translate(${rollX} 0)`}>
      {/* shadow */}
      <ellipse cx="200" cy="220" rx="170" ry="10" fill={NAVY} opacity="0.12" />
      {/* cargo box */}
      <rect x="30" y="60" width="240" height="140" rx="12" fill={ORANGE} />
      <rect x="40" y="70" width="220" height="120" rx="8" fill={ORANGE_DEEP} opacity="0.3" />
      {/* divider lines */}
      <line x1="110" y1="60" x2="110" y2="200" stroke={ORANGE_DEEP} strokeWidth="4" />
      <line x1="190" y1="60" x2="190" y2="200" stroke={ORANGE_DEEP} strokeWidth="4" />
      {/* cab */}
      <rect x="270" y="100" width="100" height="100" rx="10" fill={NAVY} />
      <rect x="282" y="112" width="74" height="50" rx="6" fill="#60A5FA" opacity="0.7" />
      {/* headlight */}
      <circle cx="366" cy="190" r="6" fill={AMBER} />
      {/* wheels */}
      <circle cx="85" cy="205" r="24" fill={NAVY} />
      <circle cx="85" cy="205" r="10" fill={SLATE} />
      <circle cx="225" cy="205" r="24" fill={NAVY} />
      <circle cx="225" cy="205" r="10" fill={SLATE} />
      <circle cx="330" cy="205" r="24" fill={NAVY} />
      <circle cx="330" cy="205" r="10" fill={SLATE} />
    </g>
  </svg>
);

// ============================================================================
// Broken Package (wrong items)
// ============================================================================
export const BrokenBox: React.FC<{ size?: number }> = ({ size = 320 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300">
    {/* shadow */}
    <ellipse cx="150" cy="270" rx="110" ry="8" fill={NAVY} opacity="0.12" />
    {/* box */}
    <path d="M60 120 L150 80 L240 120 L240 240 L60 240 Z" fill={ORANGE_LIGHT} />
    <path d="M60 120 L150 160 L240 120" stroke={ORANGE_DEEP} strokeWidth="4" fill="none" />
    <line x1="150" y1="160" x2="150" y2="240" stroke={ORANGE_DEEP} strokeWidth="4" />
    {/* tape X */}
    <line x1="90" y1="95" x2="210" y2="145" stroke={SLATE} strokeWidth="8" />
    <line x1="210" y1="95" x2="90" y2="145" stroke={SLATE} strokeWidth="8" />
    {/* big red X overlay */}
    <g transform="translate(150 150)">
      <circle r="50" fill={RED} />
      <line x1="-22" y1="-22" x2="22" y2="22" stroke={WHITE} strokeWidth="8" strokeLinecap="round" />
      <line x1="22" y1="-22" x2="-22" y2="22" stroke={WHITE} strokeWidth="8" strokeLinecap="round" />
    </g>
  </svg>
);

// ============================================================================
// Frustrated Chef
// ============================================================================
export const ChefFrustrated: React.FC<{ size?: number }> = ({ size = 320 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 300 360">
    <g>
      {/* chef coat */}
      <rect x="80" y="190" width="140" height="160" rx="14" fill={WHITE} />
      <rect x="80" y="190" width="140" height="30" rx="10" fill={WHITE} />
      {/* buttons */}
      <circle cx="130" cy="220" r="4" fill={NAVY} />
      <circle cx="130" cy="240" r="4" fill={NAVY} />
      <circle cx="130" cy="260" r="4" fill={NAVY} />
      {/* collar */}
      <path d="M120 200 L150 220 L180 200 L180 180 L120 180 Z" fill={NAVY} />
      <rect x="144" y="190" width="12" height="18" fill={RED} />
      {/* head */}
      <circle cx="150" cy="140" r="52" fill={SKIN} />
      {/* chef hat */}
      <path
        d="M102 90 Q100 55 120 50 Q130 30 150 35 Q170 30 180 50 Q200 55 198 90 L198 110 L102 110 Z"
        fill={WHITE}
      />
      <rect x="98" y="105" width="104" height="18" rx="3" fill={WHITE} />
      {/* angry eyebrows */}
      <rect x="118" y="128" width="24" height="6" rx="2" fill={NAVY} transform="rotate(20 130 130)" />
      <rect x="158" y="128" width="24" height="6" rx="2" fill={NAVY} transform="rotate(-20 170 130)" />
      {/* eyes closed/angry */}
      <line x1="122" y1="146" x2="138" y2="146" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <line x1="162" y1="146" x2="178" y2="146" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      {/* angry mouth */}
      <path d="M128 170 Q150 180 172 170" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* steam from head */}
      <path d="M80 70 Q70 50 85 40 Q100 50 90 70" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M215 70 Q225 50 210 40 Q195 50 205 70" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

// ============================================================================
// Warehouse / building with shelves
// ============================================================================
export const Warehouse: React.FC<{ size?: number; stackProgress?: number }> = ({
  size = 360,
  stackProgress = 1,
}) => {
  // stackProgress 0..1 controls how many boxes visible
  const boxes = [
    { x: 90, y: 220, d: 0 },
    { x: 140, y: 220, d: 0.15 },
    { x: 190, y: 220, d: 0.3 },
    { x: 240, y: 220, d: 0.45 },
    { x: 90, y: 180, d: 0.6 },
    { x: 140, y: 180, d: 0.75 },
    { x: 190, y: 180, d: 0.85 },
  ];
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 400 360">
      {/* shadow */}
      <ellipse cx="200" cy="340" rx="180" ry="10" fill={NAVY} opacity="0.15" />
      {/* building */}
      <rect x="40" y="100" width="320" height="220" rx="8" fill={WHITE} stroke={NAVY} strokeWidth="4" />
      {/* roof */}
      <path d="M30 100 L200 40 L370 100 Z" fill={ORANGE} />
      {/* door */}
      <rect x="170" y="240" width="60" height="80" rx="4" fill={NAVY} />
      <rect x="175" y="270" width="50" height="6" fill={AMBER} />
      {/* shelf lines */}
      <line x1="60" y1="210" x2="340" y2="210" stroke={SLATE} strokeWidth="3" opacity="0.5" />
      <line x1="60" y1="170" x2="340" y2="170" stroke={SLATE} strokeWidth="3" opacity="0.5" />
      {/* boxes, revealed with stackProgress */}
      {boxes.map((b, i) => {
        const visible = stackProgress > b.d ? 1 : 0;
        return (
          <g key={i} opacity={visible} transform={`translate(0 ${(1 - visible) * 20})`}>
            <rect x={b.x} y={b.y} width="36" height="36" rx="3" fill={ORANGE_LIGHT} stroke={ORANGE_DEEP} strokeWidth="2" />
            <line x1={b.x + 8} y1={b.y + 18} x2={b.x + 28} y2={b.y + 18} stroke={ORANGE_DEEP} strokeWidth="2" />
          </g>
        );
      })}
      {/* sign */}
      <rect x="130" y="120" width="140" height="30" rx="6" fill={NAVY} />
      <text
        x="200"
        y="141"
        fontSize="18"
        fontWeight="900"
        fill={WHITE}
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        STORAGE
      </text>
    </svg>
  );
};

// ============================================================================
// Restaurant storefront
// ============================================================================
export const Restaurant: React.FC<{ size?: number }> = ({ size = 360 }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 400 360">
    {/* shadow */}
    <ellipse cx="200" cy="340" rx="180" ry="10" fill={NAVY} opacity="0.15" />
    {/* building */}
    <rect x="40" y="120" width="320" height="200" rx="6" fill={WHITE} stroke={NAVY} strokeWidth="4" />
    {/* awning */}
    <path d="M30 120 L370 120 L350 80 L50 80 Z" fill={ORANGE} />
    <rect x="55" y="85" width="290" height="35" fill={ORANGE_DEEP} opacity="0.2" />
    {/* awning stripes */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <line
        key={i}
        x1={50 + i * 40}
        y1="80"
        x2={70 + i * 40}
        y2="120"
        stroke={WHITE}
        strokeWidth="4"
        opacity="0.4"
      />
    ))}
    {/* window */}
    <rect x="70" y="150" width="100" height="100" rx="4" fill="#BFDBFE" stroke={NAVY} strokeWidth="3" />
    <line x1="120" y1="150" x2="120" y2="250" stroke={NAVY} strokeWidth="3" />
    <line x1="70" y1="200" x2="170" y2="200" stroke={NAVY} strokeWidth="3" />
    {/* door */}
    <rect x="230" y="170" width="80" height="150" rx="4" fill={NAVY} />
    <circle cx="295" cy="245" r="4" fill={AMBER} />
    {/* menu sign */}
    <rect x="195" y="270" width="30" height="50" rx="3" fill={AMBER} />
    {/* sign */}
    <rect x="140" y="92" width="120" height="22" rx="4" fill={NAVY} />
    <text
      x="200"
      y="108"
      fontSize="14"
      fontWeight="900"
      fill={WHITE}
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      RESTAURANT
    </text>
  </svg>
);

// ============================================================================
// Handshake — two hands shaking
// ============================================================================
export const Handshake: React.FC<{ size?: number; clasp?: number }> = ({
  size = 400,
  clasp = 1,
}) => {
  // clasp: 0..1 — hands come together
  const offset = (1 - clasp) * 80;
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 400 280">
      {/* left arm */}
      <g transform={`translate(${-offset} 0)`}>
        <rect x="20" y="130" width="150" height="40" rx="12" fill={ORANGE} />
        <rect x="30" y="125" width="25" height="50" rx="6" fill={ORANGE_DEEP} />
        <ellipse cx="175" cy="150" rx="28" ry="22" fill={SKIN} />
        {/* fingers */}
        <path
          d="M150 135 Q170 130 185 140 L195 155 Q190 168 170 170 L150 160 Z"
          fill={SKIN}
          stroke={NAVY}
          strokeWidth="2"
        />
      </g>
      {/* right arm */}
      <g transform={`translate(${offset} 0)`}>
        <rect x="230" y="130" width="150" height="40" rx="12" fill={NAVY} />
        <rect x="345" y="125" width="25" height="50" rx="6" fill={SLATE} />
        <ellipse cx="225" cy="150" rx="28" ry="22" fill={SKIN} />
        <path
          d="M250 135 Q230 130 215 140 L205 155 Q210 168 230 170 L250 160 Z"
          fill={SKIN}
          stroke={NAVY}
          strokeWidth="2"
        />
      </g>
      {/* spark of handshake */}
      {clasp > 0.95 && (
        <g transform="translate(200 150)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 22}
                y1={Math.sin(a) * 22}
                x2={Math.cos(a) * 44}
                y2={Math.sin(a) * 44}
                stroke={AMBER}
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// Benefit Icon — shield/lightning/phone with checkmark
// ============================================================================
export const BenefitIcon: React.FC<{ kind: "shield" | "phone" | "bolt"; size?: number }> = ({
  kind,
  size = 120,
}) => {
  const stroke = 8;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="54" fill={ORANGE} />
      <circle cx="60" cy="60" r="54" fill="url(#iconGrad)" opacity="0.2" />
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      {kind === "shield" && (
        <path
          d="M60 30 L85 40 L85 65 Q85 85 60 92 Q35 85 35 65 L35 40 Z"
          fill={WHITE}
          stroke={WHITE}
          strokeWidth="2"
        />
      )}
      {kind === "shield" && (
        <path
          d="M48 60 L56 68 L72 52"
          stroke={ORANGE}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {kind === "phone" && (
        <>
          <rect x="42" y="30" width="36" height="62" rx="6" fill={WHITE} />
          <rect x="46" y="36" width="28" height="44" rx="3" fill={ORANGE_LIGHT} />
          <circle cx="60" cy="86" r="3" fill={ORANGE} />
          <path d="M52 56 L58 62 L70 50" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "bolt" && (
        <path
          d="M64 28 L42 66 L58 66 L54 92 L82 54 L66 54 Z"
          fill={WHITE}
        />
      )}
    </svg>
  );
};

// ============================================================================
// Delivery Pin — location marker on map
// ============================================================================
export const MapPin: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = ORANGE_DEEP,
}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 48 58">
    <path
      d="M24 2 Q44 2 44 22 Q44 40 24 56 Q4 40 4 22 Q4 2 24 2 Z"
      fill={color}
      stroke={WHITE}
      strokeWidth="3"
    />
    <circle cx="24" cy="22" r="7" fill={WHITE} />
  </svg>
);

// ============================================================================
// Subtle background pattern — grid dots for tech feel
// ============================================================================
export const SoftGrid: React.FC<{ color?: string; opacity?: number }> = ({
  color = NAVY,
  opacity = 0.04,
}) => (
  <svg
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}
  >
    <defs>
      <pattern id="softgrid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill={color} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#softgrid)" />
  </svg>
);
