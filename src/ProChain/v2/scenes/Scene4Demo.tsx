import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, ORANGE, SOFT_ORANGE, AR_FONT, SP, CLAMP } from "../tokens";
import { PhoneFrame } from "../../PhoneFrame";
import { AppLogin } from "../AppLogin";
import { AppNotifications } from "../AppNotifications";
import { AppDashboard } from "../AppDashboard";

const TapRipple: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, startFrame + 22], [0, 1], CLAMP);
  if (frame < startFrame || frame > startFrame + 22) return null;
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 20 }}>
      <div style={{ width: p * 120, height: p * 120, borderRadius: "50%", border: `3px solid ${ORANGE}`, opacity: 1 - p }} />
    </div>
  );
};

const PhoneColumn: React.FC<{ delay: number; children: React.ReactNode; featured?: boolean }> = ({ delay, children, featured }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 90 } });
  const y = interpolate(p, [0, 1], [500, 0], CLAMP);
  const scale = featured ? 1.06 : 1;
  return (
    <div style={{ opacity: p, transform: `translateY(${y}px) scale(${scale})`, zIndex: featured ? 2 : 1 }}>
      {children}
    </div>
  );
};

export const Scene4Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${SOFT_ORANGE} 0%, ${CREAM} 100%)`,
      flexDirection: "column",
      alignItems: "center",
      fontFamily: AR_FONT,
      direction: "rtl",
      padding: "40px 16px 20px",
      gap: 24,
    }}>
      {/* Title */}
      <div style={{ fontSize: 60, fontWeight: 900, color: BROWN, textAlign: "center", opacity: titleP, transform: `translateY(${interpolate(titleP, [0, 1], [30, 0], CLAMP)}px)` }}>
        شوف كيف تشتغل
      </div>

      {/* 3 phones side by side */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flex: 1 }}>
        <PhoneColumn delay={0}>
          <PhoneFrame width={290}>
            <AppLogin />
          </PhoneFrame>
        </PhoneColumn>

        <PhoneColumn delay={40} featured>
          <div style={{ position: "relative" }}>
            <PhoneFrame width={310}>
              <AppNotifications />
            </PhoneFrame>
            <TapRipple startFrame={120} />
          </div>
        </PhoneColumn>

        <PhoneColumn delay={80}>
          <PhoneFrame width={290}>
            <AppDashboard />
          </PhoneFrame>
        </PhoneColumn>
      </div>

      {/* Bottom overlay text */}
      <div style={{
        fontSize: 40,
        fontWeight: 700,
        color: BROWN,
        textAlign: "center",
        background: "rgba(255,255,255,0.85)",
        padding: "12px 36px",
        borderRadius: 999,
        opacity: interpolate(frame, [100, 130], [0, 1], CLAMP),
      }}>
        من الاكتشاف للتوصيل — في منصة واحدة
      </div>
    </AbsoluteFill>
  );
};
