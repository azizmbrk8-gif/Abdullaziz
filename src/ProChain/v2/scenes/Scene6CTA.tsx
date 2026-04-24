import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, ORANGE, SOFT_ORANGE, AR_FONT, SP, CLAMP } from "../tokens";
import { RealProChainLogo } from "../RealLogo";

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo pulses — no spring-in, always visible
  const pulse = 1 + 0.04 * Math.sin((frame / 40) * 2 * Math.PI);

  const headlineP = spring({ frame: frame - 5, fps, config: SP });
  const btnP      = spring({ frame: frame - 25, fps, config: SP });
  const urlP      = spring({ frame: frame - 50, fps, config: SP });
  const tagP      = spring({ frame: frame - 70, fps, config: SP });

  // Animated gradient sweep on CTA button (backgroundPosition trick)
  const bgPos = interpolate(frame, [0, 180], [0, 200], { extrapolateRight: "clamp" });

  // Cinematic pull-back: last 60 frames scale 1→0.96
  const { durationInFrames } = useVideoConfig();
  const pullback = interpolate(frame, [durationInFrames - 60, durationInFrames], [1, 0.96], CLAMP);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(circle at 50% 38%, #FDEFD4 0%, ${CREAM} 70%)`,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: AR_FONT,
      direction: "rtl",
      gap: 28,
      transform: `scale(${pullback})`,
    }}>
      {/* Pulsing logo */}
      <div style={{ transform: `scale(${pulse})`, filter: `drop-shadow(0 0 ${22 * pulse}px ${ORANGE}99)` }}>
        <RealProChainLogo size={180} />
      </div>

      {/* Headline */}
      <div style={{ fontSize: 90, fontWeight: 900, color: BROWN, textAlign: "center", opacity: headlineP, transform: `translateY(${interpolate(headlineP, [0, 1], [40, 0], CLAMP)}px)`, lineHeight: 1.2 }}>
        ابدأ مجاناً اليوم
      </div>

      {/* Single CTA pill */}
      <div style={{
        opacity: btnP,
        transform: `translateY(${interpolate(btnP, [0, 1], [40, 0], CLAMP)}px)`,
        width: "88%",
        height: 80,
        borderRadius: 999,
        background: `linear-gradient(90deg, ${ORANGE} 0%, ${BROWN} 100%)`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${bgPos}% 0`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 12px 36px ${ORANGE}66`,
      }}>
        <span style={{ fontSize: 46, fontWeight: 800, color: "white" }}>سجّل الآن — بدون بطاقة ائتمانية</span>
      </div>

      {/* URL */}
      <div style={{ opacity: urlP, fontSize: 42, fontWeight: 700, color: BROWN + "BB", letterSpacing: 1, direction: "ltr" }}>
        prochain.sa
      </div>

      {/* Tagline */}
      <div style={{
        opacity: tagP,
        fontSize: 34,
        fontWeight: 600,
        color: BROWN + "99",
        textAlign: "center",
        background: SOFT_ORANGE,
        padding: "12px 32px",
        borderRadius: 999,
      }}>
        وقت أقل · ربح أكثر · موردون موثوقون
      </div>
    </AbsoluteFill>
  );
};
