import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ProChainLogo } from "./Logo";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const CREAM = "#FAF5E9";
const BROWN = "#5C2A0E";
const ORANGE = "#F5833F";
const SOFT_ORANGE = "#FCE8D4";
const GREEN = "#9FD6A0";
const AR_FONT =
  '"Tajawal", "Noto Sans Arabic", "IBM Plex Sans Arabic", system-ui, sans-serif';

// ─── Scene boundaries (frames @30fps) ───────────────────────────────────────
const S1 = { start: 0, dur: 120 }; //   0– 4s  Hook
const S2 = { start: 120, dur: 240 }; //  4–12s  Problem
const S3 = { start: 360, dur: 180 }; // 12–18s  Solution
const S4 = { start: 540, dur: 240 }; // 18–26s  How it works
const S5 = { start: 780, dur: 240 }; // 26–34s  Numbers
const S6 = { start: 1020, dur: 180 }; // 34–40s  CTA
const TOTAL = 1200;

// ─── Shared spring config ────────────────────────────────────────────────────
const SP = { damping: 12, stiffness: 100 };
const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ─── SCENE 1: HOOK ──────────────────────────────────────────────────────────
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgP = spring({ frame, fps, config: { damping: 20 } });
  const emojiP = spring({ frame, fps, config: SP });
  const questionP = spring({ frame: frame - 10, fps, config: SP });
  const questionY = interpolate(questionP, [0, 1], [80, 0], CLAMP);
  const subtitleP = spring({ frame: frame - 45, fps, config: SP });
  const subtitleY = interpolate(subtitleP, [0, 1], [40, 0], CLAMP);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${CREAM} 0%, #FDEFD4 55%, ${SOFT_ORANGE} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "60px 64px",
        direction: "rtl",
        fontFamily: AR_FONT,
        gap: 36,
      }}
    >
      {/* Decorative radial blobs */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}30 0%, transparent 70%)`,
          opacity: bgP,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BROWN}18 0%, transparent 70%)`,
          opacity: bgP,
          pointerEvents: "none",
        }}
      />

      {/* Emoji */}
      <div
        style={{
          fontSize: 120,
          opacity: emojiP,
          transform: `scale(${emojiP})`,
        }}
      >
        🍽️
      </div>

      {/* Main question */}
      <div
        style={{
          fontSize: 86,
          fontWeight: 900,
          color: BROWN,
          textAlign: "center",
          lineHeight: 1.3,
          opacity: questionP,
          transform: `translateY(${questionY}px)`,
          direction: "rtl",
        }}
      >
        هل هذا يحدث معك
        <br />
        <span style={{ color: ORANGE }}>يومياً؟</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 46,
          fontWeight: 600,
          color: BROWN + "BB",
          textAlign: "center",
          opacity: subtitleP,
          transform: `translateY(${subtitleY}px)`,
          direction: "rtl",
          background: SOFT_ORANGE,
          padding: "16px 40px",
          borderRadius: 999,
        }}
      >
        إذا كنت تدير مطعماً أو مقهى...
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 2: PROBLEM ───────────────────────────────────────────────────────
const PAIN_CARDS = [
  { icon: "📞", title: "تواصل مع +10 موردين يومياً", desc: "وقت ضائع في الاتصالات" },
  { icon: "💰", title: "أسعار غير شفافة", desc: "لا مقارنة، لا وضوح في التسعير" },
  { icon: "⏳", title: "ساعات ضائعة في المتابعة", desc: "متابعات لا تنتهي مع الموردين" },
  { icon: "🧾", title: "أخطاء في الفواتير", desc: "خسائر مالية متراكمة يومياً" },
];

const PainCard: React.FC<{
  card: (typeof PAIN_CARDS)[0];
  delay: number;
}> = ({ card, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: SP });
  const slideX = interpolate(p, [0, 1], [140, 0], CLAMP);

  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${slideX}px)`,
        background: CREAM,
        borderRadius: 24,
        padding: "26px 30px",
        display: "flex",
        alignItems: "center",
        gap: 22,
        direction: "rtl",
        borderRight: `7px solid ${ORANGE}`,
        boxShadow: "0 8px 30px rgba(92,42,14,0.13)",
        width: "100%",
      }}
    >
      <div style={{ fontSize: 68, flexShrink: 0 }}>{card.icon}</div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: BROWN,
            direction: "rtl",
            lineHeight: 1.3,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: BROWN + "88",
            marginTop: 4,
            direction: "rtl",
          }}
        >
          {card.desc}
        </div>
      </div>
    </div>
  );
};

const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });
  const titleY = interpolate(titleP, [0, 1], [30, 0], CLAMP);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${SOFT_ORANGE} 0%, #FDE8CD 100%)`,
        padding: "56px 48px",
        flexDirection: "column",
        justifyContent: "center",
        gap: 22,
        direction: "rtl",
        fontFamily: AR_FONT,
      }}
    >
      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: BROWN,
          textAlign: "right",
          lineHeight: 1.3,
          opacity: titleP,
          transform: `translateY(${titleY}px)`,
          direction: "rtl",
          marginBottom: 10,
        }}
      >
        الفوضى ليست جزءاً من العمل
        <br />
        <span style={{ color: ORANGE, fontSize: 46 }}>— إنها خسارة يومية</span>
      </div>

      {PAIN_CARDS.map((card, i) => (
        <PainCard key={i} card={card} delay={15 + i * 15} />
      ))}
    </AbsoluteFill>
  );
};

// ─── SCENE 3: SOLUTION REVEAL ────────────────────────────────────────────────
const ChainSVG: React.FC<{ frame: number }> = ({ frame }) => {
  const rotate = interpolate(frame, [0, 180], [0, 360], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        opacity: 0.07,
        pointerEvents: "none",
      }}
    >
      <svg width={900} height={900} viewBox="0 0 900 900">
        <ellipse
          cx="260"
          cy="450"
          rx="140"
          ry="70"
          stroke={CREAM}
          strokeWidth="48"
          fill="none"
        />
        <ellipse
          cx="640"
          cy="450"
          rx="140"
          ry="70"
          stroke={CREAM}
          strokeWidth="48"
          fill="none"
        />
        <ellipse
          cx="450"
          cy="260"
          rx="70"
          ry="140"
          stroke={CREAM}
          strokeWidth="48"
          fill="none"
        />
        <ellipse
          cx="450"
          cy="640"
          rx="70"
          ry="140"
          stroke={CREAM}
          strokeWidth="48"
          fill="none"
        />
      </svg>
    </div>
  );
};

const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame: frame - 5, fps, config: { damping: 9, stiffness: 120 } });
  const logoScale = interpolate(logoP, [0, 1], [0, 1], CLAMP);
  const glowP = spring({ frame: frame - 15, fps, config: SP });
  const textP = spring({ frame: frame - 35, fps, config: SP });
  const textY = interpolate(textP, [0, 1], [50, 0], CLAMP);
  const subP = spring({ frame: frame - 55, fps, config: SP });
  const subY = interpolate(subP, [0, 1], [30, 0], CLAMP);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${BROWN} 0%, #3D1A08 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: AR_FONT,
        direction: "rtl",
        gap: 28,
      }}
    >
      <ChainSVG frame={frame} />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}55 0%, transparent 70%)`,
          opacity: glowP,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoP,
          filter: `drop-shadow(0 0 50px ${ORANGE}AA)`,
        }}
      >
        <ProChainLogo size={300} />
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: ORANGE,
          opacity: textP,
          transform: `translateY(${textY}px)`,
          direction: "rtl",
          textAlign: "center",
        }}
      >
        الحل: ProChain
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 46,
          fontWeight: 600,
          color: CREAM + "CC",
          textAlign: "center",
          maxWidth: 940,
          opacity: subP,
          transform: `translateY(${subY}px)`,
          direction: "rtl",
          lineHeight: 1.5,
          padding: "0 32px",
        }}
      >
        منّصة واحدة تجمع كل موردينك في مكان واحد
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 4: HOW IT WORKS ──────────────────────────────────────────────────
const STEPS = [
  { icon: "🏪", label: "اكتشف", sub: "Discover" },
  { icon: "📋", label: "اطلب عرض", sub: "Request quote" },
  { icon: "⚖️", label: "قارن", sub: "Compare" },
  { icon: "🛵", label: "استلم وتابع", sub: "Receive & track" },
];

const StepCard: React.FC<{
  step: (typeof STEPS)[0];
  index: number;
}> = ({ step, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 25;
  const p = spring({ frame: frame - delay, fps, config: SP });
  const scale = interpolate(p, [0, 1], [0.7, 1], CLAMP);
  const y = interpolate(p, [0, 1], [60, 0], CLAMP);

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${y}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "32px 20px",
        background: "white",
        borderRadius: 28,
        boxShadow: `0 12px 40px rgba(92,42,14,0.10)`,
        border: `3px solid ${SOFT_ORANGE}`,
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: ORANGE,
          color: "white",
          fontSize: 28,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {index + 1}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 28,
          background: SOFT_ORANGE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
        }}
      >
        {step.icon}
      </div>

      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: BROWN,
          textAlign: "center",
          direction: "rtl",
        }}
      >
        {step.label}
      </div>
    </div>
  );
};

const SceneHowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });
  const titleY = interpolate(titleP, [0, 1], [30, 0], CLAMP);

  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        padding: "56px 48px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: AR_FONT,
        direction: "rtl",
        gap: 40,
      }}
    >
      {/* Bottom gradient wash */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 360,
          background: `linear-gradient(180deg, transparent, ${SOFT_ORANGE}66)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: 74,
          fontWeight: 900,
          color: BROWN,
          textAlign: "center",
          opacity: titleP,
          transform: `translateY(${titleY}px)`,
          direction: "rtl",
        }}
      >
        كيف تعمل المنّصة؟
      </div>

      {/* 2×2 step grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          width: "100%",
          maxWidth: 940,
        }}
      >
        {STEPS.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 5: THE NUMBERS ────────────────────────────────────────────────────
const STATS = [
  { value: 10, prefix: "+", suffix: "", label: "ساعات أسبوعياً" },
  { value: 15, prefix: "", suffix: "%", label: "توفير في التكاليف" },
  { value: 90, prefix: "", suffix: "%", label: "تقليل الأخطاء" },
  { value: 100, prefix: "", suffix: "%", label: "شفافية كاملة" },
];

const StatCounter: React.FC<{
  stat: (typeof STATS)[0];
  delay: number;
}> = ({ stat, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryP = spring({ frame: frame - delay, fps, config: SP });
  const scale = interpolate(entryP, [0, 1], [0.8, 1], CLAMP);

  const countProgress = interpolate(frame, [delay, delay + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const count = Math.round(countProgress * stat.value);

  return (
    <div
      style={{
        opacity: entryP,
        transform: `scale(${scale})`,
        background: "white",
        borderRadius: 28,
        padding: "40px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 12px 40px rgba(92,42,14,0.10)",
        border: `3px solid ${SOFT_ORANGE}`,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: BROWN,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          direction: "ltr",
        }}
      >
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: ORANGE,
          textAlign: "center",
          marginTop: 10,
          direction: "rtl",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
};

const SceneNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: SP });
  const titleY = interpolate(titleP, [0, 1], [30, 0], CLAMP);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${SOFT_ORANGE} 0%, ${CREAM} 100%)`,
        padding: "56px 48px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: AR_FONT,
        direction: "rtl",
        gap: 40,
      }}
    >
      <div
        style={{
          fontSize: 74,
          fontWeight: 900,
          color: BROWN,
          textAlign: "center",
          opacity: titleP,
          transform: `translateY(${titleY}px)`,
        }}
      >
        ماذا ستوفّر؟
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          width: "100%",
          maxWidth: 960,
        }}
      >
        {STATS.map((stat, i) => (
          <StatCounter key={i} stat={stat} delay={i * 10} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 6: CTA ────────────────────────────────────────────────────────────
const CTA_STEPS = [
  { label: "سجّل مجاناً", bg: ORANGE },
  { label: "أضف مطعمك", bg: BROWN },
  { label: "ابدأ الشراء الذكي", bg: GREEN },
];

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP = spring({ frame, fps, config: SP });
  const titleY = interpolate(titleP, [0, 1], [40, 0], CLAMP);
  const stepsP = spring({ frame: frame - 20, fps, config: SP });
  const stepsY = interpolate(stepsP, [0, 1], [50, 0], CLAMP);
  const urlP = spring({ frame: frame - 60, fps, config: SP });
  const urlY = interpolate(urlP, [0, 1], [30, 0], CLAMP);
  const logoP = spring({ frame: frame - 90, fps, config: SP });

  // Pulsing glow on logo
  const pulse = 1 + 0.06 * Math.sin(frame * 0.15);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #FDEFD4 0%, ${CREAM} 70%)`,
        padding: "56px 48px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: AR_FONT,
        direction: "rtl",
        gap: 28,
      }}
    >
      {/* Decorative top blob */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Headline */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 900,
          color: BROWN,
          textAlign: "center",
          opacity: titleP,
          transform: `translateY(${titleY}px)`,
          direction: "rtl",
          lineHeight: 1.3,
        }}
      >
        جاهز لتنظيم
        <br />
        <span style={{ color: ORANGE }}>مشترياتك؟</span>
      </div>

      {/* 3 pill CTA buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          opacity: stepsP,
          transform: `translateY(${stepsY}px)`,
        }}
      >
        {CTA_STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              background: step.bg,
              borderRadius: 999,
              padding: "26px 48px",
              textAlign: "center",
              fontSize: 48,
              fontWeight: 800,
              color: "white",
              boxShadow: `0 8px 28px ${step.bg}55`,
              direction: "rtl",
            }}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Website URL */}
      <div
        style={{
          opacity: urlP,
          transform: `translateY(${urlY}px)`,
          fontSize: 54,
          fontWeight: 900,
          color: BROWN,
          background: SOFT_ORANGE,
          padding: "18px 44px",
          borderRadius: 20,
          direction: "ltr",
          letterSpacing: 1,
          border: `3px solid ${ORANGE}55`,
        }}
      >
        prochain.sa
      </div>

      {/* Pulsing logo + tagline */}
      <div
        style={{
          opacity: logoP,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            transform: `scale(${pulse})`,
            filter: `drop-shadow(0 0 ${20 * pulse}px ${ORANGE}99)`,
          }}
        >
          <ProChainLogo size={150} />
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: ORANGE,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          وقت أقل، ربح أكثر
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── PROGRESS BAR ───────────────────────────────────────────────────────────
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 7,
        width: `${progress * 100}%`,
        background: `linear-gradient(90deg, ${ORANGE}, ${BROWN})`,
        zIndex: 200,
        boxShadow: `0 0 14px ${ORANGE}BB`,
        pointerEvents: "none",
      }}
    />
  );
};

// ─── FLASH (scene transition overlay) ───────────────────────────────────────
const Flash: React.FC<{ start: number; dur?: number }> = ({
  start,
  dur = 5,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [start, start + 1, start + dur],
    [0, 0.35, 0],
    CLAMP,
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "white",
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

// ─── ROOT COMPOSITION ────────────────────────────────────────────────────────
export interface TikTokProps {
  enableAudio?: boolean;
}

export const ProChainTikTok: React.FC<TikTokProps> = ({ enableAudio = true }) => {
  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: AR_FONT }}>
      {/* ── Background music ── */}
      {enableAudio && (
        <Audio
          src={staticFile("audio/music.wav")}
          loop
          loopVolumeCurveBehavior="extend"
          volume={(f) =>
            interpolate(
              f,
              [0, 780, 810, 990, 1020, 1170, 1200],
              [0.7, 0.7, 0.4, 0.4, 0.7, 0.7, 0],
              CLAMP,
            )
          }
        />
      )}

      {/* ── Scenes ── */}
      <Sequence from={S1.start} durationInFrames={S1.dur} premountFor={30}>
        <SceneHook />
      </Sequence>
      <Sequence from={S2.start} durationInFrames={S2.dur} premountFor={30}>
        <SceneProblem />
      </Sequence>
      <Sequence from={S3.start} durationInFrames={S3.dur} premountFor={30}>
        <SceneSolution />
      </Sequence>
      <Sequence from={S4.start} durationInFrames={S4.dur} premountFor={30}>
        <SceneHowItWorks />
      </Sequence>
      <Sequence from={S5.start} durationInFrames={S5.dur} premountFor={30}>
        <SceneNumbers />
      </Sequence>
      <Sequence from={S6.start} durationInFrames={S6.dur} premountFor={30}>
        <SceneCTA />
      </Sequence>

      {/* ── Scene-transition white flashes ── */}
      <Flash start={S2.start - 1} />
      <Flash start={S3.start - 1} />
      <Flash start={S4.start - 1} />
      <Flash start={S5.start - 1} />
      <Flash start={S6.start - 1} />

      {/* ── SFX ── */}
      {enableAudio && (
        <>
          {/* Whoosh on each scene transition */}
          {[S2.start, S3.start, S4.start, S5.start, S6.start].map(
            (start, i) => (
              <Sequence
                key={`whoosh-${i}`}
                from={start - 2}
                durationInFrames={40}
                premountFor={5}
              >
                <Audio src="https://remotion.media/whoosh.wav" volume={0.5} />
              </Sequence>
            ),
          )}

          {/* Tick / switch SFX when each pain card slides in (Scene 2) */}
          {[15, 30, 45, 60].map((delay, i) => (
            <Sequence
              key={`tick-${i}`}
              from={S2.start + delay}
              durationInFrames={20}
              premountFor={5}
            >
              <Audio src="https://remotion.media/switch.wav" volume={0.35} />
            </Sequence>
          ))}

          {/* Ding when each stat counter finishes (Scene 5) */}
          {[60, 70, 80, 90].map((delay, i) => (
            <Sequence
              key={`ding-${i}`}
              from={S5.start + delay}
              durationInFrames={30}
              premountFor={5}
            >
              <Audio src="https://remotion.media/ding.wav" volume={0.45} />
            </Sequence>
          ))}
        </>
      )}

      {/* ── Progress bar (uses global frame — must stay outside scene Sequences) ── */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
