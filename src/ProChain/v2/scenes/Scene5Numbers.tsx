import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BROWN, CREAM, ORANGE, SOFT_ORANGE, AR_FONT, SP, CLAMP } from "../tokens";

const STATS = [
  { number: "+٣٠٠", label: "مطعم ومقهى يثق بنا",      note: "",               delay: 0  },
  { number: "١٥٪",  label: "توفير في تكاليف الشراء",  note: "* بحسب عملائنا", delay: 15 },
  { number: "٩٠٪",  label: "تقليل في وقت الطلبات",   note: "",               delay: 30 },
  { number: "مجاني", label: "للانضمام الآن",           note: "",               delay: 45 },
];

const StatRow: React.FC<{ stat: typeof STATS[0] }> = ({ stat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entryP = spring({ frame: frame - stat.delay, fps, config: SP });
  const barW = interpolate(frame, [stat.delay, stat.delay + 40], [0, 100], CLAMP);

  return (
    <div style={{ opacity: entryP, transform: `translateX(${interpolate(entryP, [0, 1], [80, 0], CLAMP)}px)`, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 28, color: BROWN + "99" }}>{stat.label}</span>
          {stat.note && <span style={{ fontSize: 18, color: BROWN + "66" }}>{stat.note}</span>}
        </div>
        <span style={{ fontSize: 62, fontWeight: 900, color: ORANGE, lineHeight: 1 }}>{stat.number}</span>
      </div>
      {/* Progress bar */}
      <div style={{ width: "100%", height: 8, background: SOFT_ORANGE, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${barW}%`, background: `linear-gradient(90deg, ${ORANGE}, ${BROWN})`, borderRadius: 999 }} />
      </div>
    </div>
  );
};

export const Scene5Numbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${SOFT_ORANGE} 0%, ${CREAM} 100%)`,
      padding: "60px 52px",
      flexDirection: "column",
      justifyContent: "center",
      gap: 36,
      fontFamily: AR_FONT,
      direction: "rtl",
    }}>
      <div style={{ fontSize: 72, fontWeight: 900, color: BROWN, textAlign: "center", opacity: titleP, transform: `translateY(${interpolate(titleP, [0, 1], [30, 0], CLAMP)}px)`, marginBottom: 8 }}>
        ماذا ستوفّر؟
      </div>
      {STATS.map((s, i) => <StatRow key={i} stat={s} />)}
    </AbsoluteFill>
  );
};
