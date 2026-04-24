import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, ORANGE, DARK_BG, AR_FONT, SP, CLAMP } from "../tokens";

const CARDS = [
  { icon: "📞", title: "تتصل بـ 10 موردين يومياً", desc: "وقت ضائع في مكالمات لا تنتهي" },
  { icon: "💰", title: "أسعار غير شفافة", desc: "لا مقارنة، لا وضوح، خسارة مضمونة" },
  { icon: "🧾", title: "أخطاء في الفواتير", desc: "فروق مالية تتراكم كل أسبوع" },
];

const PainCard: React.FC<{ card: typeof CARDS[0]; idx: number }> = ({ card, idx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = idx * 20;
  const p = spring({ frame: frame - delay, fps, config: SP });
  const slideX = interpolate(p, [0, 1], [160, 0], CLAMP);

  // Stacking: earlier cards dim when next one arrives
  const nextArrival = (idx + 1) * 20 + 15;
  const dimOpacity = interpolate(frame, [nextArrival, nextArrival + 12], [1, 0.58], CLAMP);
  const finalOpacity = idx < CARDS.length - 1 ? Math.min(p, dimOpacity) : p;

  return (
    <div style={{
      opacity: finalOpacity,
      transform: `translateX(${slideX}px)`,
      background: CREAM,
      borderRadius: 22,
      padding: "22px 24px",
      display: "flex",
      alignItems: "center",
      gap: 18,
      direction: "rtl",
      borderRight: `8px solid ${ORANGE}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
      width: "100%",
      position: "relative",
    }}>
      {/* Red X badge */}
      <div style={{ position: "absolute", top: -8, left: -8, width: 24, height: 24, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "white" }}>✕</div>
      <div style={{ fontSize: 60, flexShrink: 0 }}>{card.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: BROWN, lineHeight: 1.3 }}>{card.title}</div>
        <div style={{ fontSize: 28, color: BROWN + "88", marginTop: 4 }}>{card.desc}</div>
      </div>
    </div>
  );
};

export const Scene2Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });

  return (
    <AbsoluteFill style={{
      background: DARK_BG,
      padding: "60px 48px",
      flexDirection: "column",
      justifyContent: "center",
      gap: 24,
      direction: "rtl",
      fontFamily: AR_FONT,
    }}>
      <div style={{
        fontSize: 56, fontWeight: 900, color: "white", textAlign: "right",
        opacity: titleP, transform: `translateY(${interpolate(titleP, [0, 1], [30, 0], CLAMP)}px)`,
        marginBottom: 10,
      }}>
        هل تعاني من هذا؟
        <br />
        <span style={{ color: ORANGE, fontSize: 44 }}>— إنها خسارة يومية</span>
      </div>
      {CARDS.map((c, i) => <PainCard key={i} card={c} idx={i} />)}
    </AbsoluteFill>
  );
};
