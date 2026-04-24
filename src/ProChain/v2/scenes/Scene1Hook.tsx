import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, ORANGE, SOFT_ORANGE, AR_FONT, SP, CLAMP } from "../tokens";

const CHAOS_EMOJIS = ["📞","📱","💬","📄","😤","⏳","💸","📲","🗂️","😩"];

const RainingEmoji: React.FC<{ emoji: string; x: number; delay: number; speed: number }> = ({ emoji, x, delay, speed }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame - delay, [0, 90], [-80, 900], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(frame - delay, [0, 8, 80, 90], [0, 1, 1, 0], CLAMP);
  if (frame < delay) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, fontSize: 28, opacity, transform: `rotate(${(x % 30) - 15}deg)` }}>
      {emoji}
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1P = spring({ frame: frame - 5, fps, config: SP });
  const line1Y = interpolate(line1P, [0, 1], [60, 0], CLAMP);

  const line2Slam = spring({ frame: frame - 45, fps, config: { damping: 8, stiffness: 200 } });
  const line2Scale = interpolate(line2Slam, [0, 1], [2.2, 1], CLAMP);
  const shakeX = frame > 45 && frame < 60 ? Math.sin(frame * 1.8) * (4 * Math.exp(-(frame - 45) * 0.18)) : 0;

  const seeds = [
    { emoji: CHAOS_EMOJIS[0], x: 60,  delay: 0,  speed: 1.2 },
    { emoji: CHAOS_EMOJIS[1], x: 220, delay: 5,  speed: 1.0 },
    { emoji: CHAOS_EMOJIS[2], x: 380, delay: 3,  speed: 1.3 },
    { emoji: CHAOS_EMOJIS[3], x: 100, delay: 12, speed: 0.9 },
    { emoji: CHAOS_EMOJIS[4], x: 300, delay: 8,  speed: 1.1 },
    { emoji: CHAOS_EMOJIS[5], x: 450, delay: 15, speed: 1.4 },
    { emoji: CHAOS_EMOJIS[6], x: 160, delay: 20, speed: 1.0 },
    { emoji: CHAOS_EMOJIS[7], x: 350, delay: 18, speed: 1.2 },
    { emoji: CHAOS_EMOJIS[8], x: 80,  delay: 25, speed: 0.8 },
    { emoji: CHAOS_EMOJIS[9], x: 480, delay: 22, speed: 1.3 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: AR_FONT, direction: "rtl" }}>
      {/* Left half — chaos */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", background: SOFT_ORANGE, overflow: "hidden" }}>
        {seeds.map((s, i) => <RainingEmoji key={i} {...s} />)}
        <div style={{ position: "absolute", bottom: 80, width: "100%", textAlign: "center", fontSize: 18, color: BROWN + "88", fontWeight: 600 }}>
          كل يوم...
        </div>
      </div>

      {/* Right half — dark + word */}
      <div style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", background: "#1A0A04", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 96, fontWeight: 900, color: ORANGE, textAlign: "center", lineHeight: 1.1 }}>
          يومياً؟
        </div>
      </div>

      {/* Center divider line */}
      <div style={{ position: "absolute", left: "50%", top: 0, width: 4, height: "100%", background: ORANGE, opacity: 0.6 }} />

      {/* Line 1 */}
      <div style={{ position: "absolute", bottom: 240, width: "100%", textAlign: "center", opacity: line1P, transform: `translateY(${line1Y}px)` }}>
        <div style={{ display: "inline-block", background: "rgba(0,0,0,0.75)", padding: "14px 32px", borderRadius: 12 }}>
          <span style={{ fontSize: 44, fontWeight: 800, color: "white" }}>كل يوم تتصل بـ 10 موردين...</span>
        </div>
      </div>

      {/* Line 2 — slams in */}
      <div style={{
        position: "absolute",
        bottom: 140,
        width: "100%",
        textAlign: "center",
        opacity: line2Slam,
        transform: `scale(${line2Scale}) translateX(${shakeX}px)`,
      }}>
        <div style={{ display: "inline-block", background: ORANGE, padding: "14px 32px", borderRadius: 12 }}>
          <span style={{ fontSize: 46, fontWeight: 900, color: "white" }}>وفي الآخر ما وصل شي</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
