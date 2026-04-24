import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, ORANGE, AR_FONT, SP, CLAMP } from "../tokens";
import { RealProChainLogo } from "../RealLogo";

const RadialBurst: React.FC<{ frame: number }> = ({ frame }) => {
  const rotate = frame * 0.5;
  const rays = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <svg width={900} height={900} viewBox="0 0 900 900" style={{ transform: `rotate(${rotate}deg)`, opacity: 0.12 }}>
        {rays.map((i) => {
          const angle = (i / 12) * 360;
          const rad = (angle * Math.PI) / 180;
          const x1 = 450 + Math.cos(rad) * 80;
          const y1 = 450 + Math.sin(rad) * 80;
          const x2 = 450 + Math.cos(rad) * 440;
          const y2 = 450 + Math.sin(rad) * 440;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth={22} strokeLinecap="round" />;
        })}
      </svg>
    </div>
  );
};

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame: frame - 5, fps, config: { damping: 8, stiffness: 180 } });
  const logoScale = interpolate(logoP, [0, 1], [0.1, 1], CLAMP);
  const glowP = spring({ frame: frame - 15, fps, config: SP });
  const textP = spring({ frame: frame - 40, fps, config: SP });
  const subP  = spring({ frame: frame - 60, fps, config: SP });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${BROWN} 0%, #3D1A08 100%)`,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: AR_FONT,
      direction: "rtl",
      gap: 24,
    }}>
      <RadialBurst frame={frame} />

      {/* Glow */}
      <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${ORANGE}55 0%, transparent 70%)`, opacity: glowP, filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Real logo */}
      <div style={{ transform: `scale(${logoScale})`, opacity: logoP, filter: `drop-shadow(0 0 50px ${ORANGE}CC)` }}>
        <RealProChainLogo size={300} showWordmark={false} />
      </div>

      {/* Headline */}
      <div style={{ fontSize: 110, fontWeight: 900, color: ORANGE, opacity: textP, transform: `translateY(${interpolate(textP, [0, 1], [50, 0], CLAMP)}px)`, textAlign: "center" }}>
        ProChain
      </div>

      {/* Sub */}
      <div style={{ fontSize: 52, fontWeight: 700, color: CREAM + "CC", textAlign: "center", maxWidth: 900, opacity: subP, transform: `translateY(${interpolate(subP, [0, 1], [30, 0], CLAMP)}px)`, padding: "0 40px", lineHeight: 1.5 }}>
        طلب واحد. كل موردينك.
      </div>
    </AbsoluteFill>
  );
};
