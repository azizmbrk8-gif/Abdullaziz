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
import { PhoneFrame } from "./PhoneFrame";
import { BuyerHome } from "./mockups/BuyerHome";
import { Orders } from "./mockups/Orders";
import { SupplierDashboard } from "./mockups/SupplierDashboard";
import { MyProducts } from "./mockups/MyProducts";
import {
  ConfettiBurst,
  CREAM,
  Flash,
  FloatingEmojis,
  NAVY,
  ORANGE,
  ORANGE_DEEP,
  ORANGE_HOT,
  RadialRays,
  Ripple,
  SLATE,
  useShake,
  usePulse,
} from "./helpers";

export type Lang = "en" | "ar";
export type Audience = "buyer" | "supplier";

export interface PromoConfig {
  lang: Lang;
  audience: Audience;
  audioBase: string;
  durations: [number, number, number, number, number];
  texts: {
    hookBadge: string;
    hookMain: string;
    hookAccent: string;
    painTitle: string;
    painCards: { emoji: string; title: string; sub: string }[];
    solutionTag: string;
    solutionMain: string;
    solutionSub: string;
    demoBadge: string;
    demoHeadline: string;
    demoAccent: string;
    ctaIntro: string;
    ctaBig: string;
    ctaStamp: string;
    ctaCaption: string;
  };
}

const arFont = `"Noto Sans Arabic", "Noto Kufi Arabic", system-ui, sans-serif`;
const enFont = `system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`;

const dir = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");
const font = (lang: Lang) => (lang === "ar" ? arFont : enFont);

// ========== SCENE 1: HOOK ==========
const SceneHook: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgScale = spring({ frame, fps, config: { damping: 14 } });
  const textSlam = spring({ frame: frame - 6, fps, config: { damping: 10, mass: 0.4 } });
  const textScale = interpolate(textSlam, [0, 1], [2, 1]);
  const badgeP = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const emojiP = spring({ frame: frame - 24, fps, config: { damping: 9 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #FFCB6B 0%, ${ORANGE} 45%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        direction: dir(config.lang),
        fontFamily: font(config.lang),
      }}
    >
      <div style={{ opacity: bgScale }}>
        <RadialRays color="#FFFFFF" opacity={0.12} speed={0.6} />
      </div>
      <FloatingEmojis emojis={["☕", "🍔", "🥐", "🍕", "🧀", "🥛"]} count={14} opacity={0.22} />

      <div
        style={{
          transform: `scale(${badgeP})`,
          opacity: badgeP,
          fontSize: 46,
          fontWeight: 900,
          color: NAVY,
          background: "white",
          padding: "10px 30px",
          borderRadius: 999,
          marginBottom: 30,
          letterSpacing: config.lang === "ar" ? 0 : 2,
        }}
      >
        {config.texts.hookBadge}
      </div>
      <div
        style={{
          transform: `scale(${textScale})`,
          opacity: textSlam,
          textAlign: "center",
          filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.25))",
          fontSize: config.lang === "ar" ? 140 : 160,
          fontWeight: 900,
          color: "white",
          letterSpacing: config.lang === "ar" ? -1 : -5,
          lineHeight: 1,
          WebkitTextStroke: "3px rgba(0,0,0,0.15)",
        }}
      >
        {config.texts.hookMain}
        <br />
        <span style={{ color: "#FFE5A3" }}>{config.texts.hookAccent}</span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          fontSize: 120,
          opacity: emojiP,
          transform: `scale(${emojiP}) rotate(${(1 - emojiP) * -30}deg)`,
        }}
      >
        {config.audience === "buyer" ? "☕🍽️" : "📦💰"}
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 2: PAIN ==========
const PainCard: React.FC<{
  delay: number;
  emoji: string;
  title: string;
  sub: string;
  lang: Lang;
}> = ({ delay, emoji, title, sub, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 10, mass: 0.5 } });
  const shake = useShake(delay + 12, 8, 6);
  const slideX = lang === "ar" ? 100 : -100;
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * slideX}px) scale(${0.85 + p * 0.15}) translate(${shake.x}px, ${shake.y}px)`,
        background: "white",
        borderRadius: 32,
        padding: "26px 34px",
        display: "flex",
        alignItems: "center",
        gap: 26,
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        width: "100%",
        direction: dir(lang),
      }}
    >
      <div
        style={{
          fontSize: 92,
          width: 124,
          height: 124,
          borderRadius: 26,
          background: `linear-gradient(135deg, ${ORANGE_HOT}, ${ORANGE_DEEP})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
      <div style={{ flex: 1, textAlign: lang === "ar" ? "right" : "left" }}>
        <div style={{ fontSize: 50, fontWeight: 900, color: NAVY, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: "#64748B", marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
};

const ScenePain: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1E293B 0%, #0F172A 100%)`,
        padding: 60,
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        direction: dir(config.lang),
        fontFamily: font(config.lang),
      }}
    >
      <FloatingEmojis emojis={["❌", "😩", "💔"]} count={8} opacity={0.08} />
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 8,
          opacity: Math.min(1, frame / 10),
        }}
      >
        {config.texts.painTitle}
      </div>
      {config.texts.painCards.map((c, i) => (
        <PainCard
          key={i}
          delay={8 + i * 14}
          emoji={c.emoji}
          title={c.title}
          sub={c.sub}
          lang={config.lang}
        />
      ))}
    </AbsoluteFill>
  );
};

// ========== SCENE 3: SOLUTION LOGO SLAM ==========
const SceneSolution: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSlam = spring({ frame: frame - 3, fps, config: { damping: 9, mass: 0.3 } });
  const logoScale = interpolate(logoSlam, [0, 1], [3, 1]);
  const shake = useShake(12, 14, 12);
  const textP = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: font(config.lang),
        direction: dir(config.lang),
      }}
    >
      <Flash start={0} duration={5} />
      <RadialRays color="#FFFFFF" opacity={0.15} speed={0.8} />

      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: "white",
          marginBottom: 10,
          opacity: textP,
          letterSpacing: config.lang === "ar" ? 0 : 1,
        }}
      >
        {config.texts.solutionTag}
      </div>
      <div
        style={{
          transform: `scale(${logoScale}) translate(${shake.x}px, ${shake.y}px)`,
          opacity: logoSlam,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
        }}
      >
        <ProChainLogo size={380} />
      </div>
      <div
        style={{
          opacity: textP,
          transform: `translateY(${(1 - textP) * 40}px)`,
          fontSize: config.lang === "ar" ? 120 : 170,
          fontWeight: 900,
          color: "white",
          letterSpacing: config.lang === "ar" ? -1 : -6,
          marginTop: 16,
          lineHeight: 1,
          textShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        {config.texts.solutionMain}
      </div>
      <div
        style={{
          opacity: textP,
          fontSize: 38,
          fontWeight: 700,
          color: "white",
          marginTop: 14,
          letterSpacing: -0.5,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {config.texts.solutionSub}
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 4: DEMO (audience-specific mockups) ==========
const SceneDemo: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const titleP = spring({ frame, fps, config: { damping: 14 } });

  const half = Math.floor(durationInFrames / 2);

  const phone1Y = interpolate(frame, [0, 25], [1500, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const phone1Tilt = interpolate(
    frame,
    [0, 25, half - 15, half],
    [config.audience === "buyer" ? 20 : -20, 0, 0, config.audience === "buyer" ? -10 : 10],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const phone1Opacity = interpolate(frame, [half - 15, half + 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phone2Y = interpolate(frame, [half - 15, half + 5], [1500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const phone2Tilt = interpolate(
    frame,
    [half - 15, half + 5, durationInFrames - 15, durationInFrames],
    [config.audience === "buyer" ? 20 : -20, 0, 0, config.audience === "buyer" ? -10 : 10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const phone2Opacity = interpolate(
    frame,
    [half - 15, half + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scroll1 = interpolate(frame, [10, half - 10], [0, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const isBuyer = config.audience === "buyer";
  const bg = isBuyer
    ? `linear-gradient(180deg, ${CREAM} 0%, #FFE5C8 100%)`
    : `linear-gradient(180deg, ${NAVY} 0%, ${SLATE} 100%)`;
  const badgeBg = isBuyer ? NAVY : "white";
  const badgeFg = isBuyer ? "white" : NAVY;
  const headlineColor = isBuyer ? NAVY : "white";
  const accentColor = isBuyer ? ORANGE_DEEP : "#FB923C";

  return (
    <AbsoluteFill
      style={{
        background: bg,
        alignItems: "center",
        paddingTop: 80,
        fontFamily: font(config.lang),
        direction: dir(config.lang),
      }}
    >
      {!isBuyer && <RadialRays color={ORANGE} opacity={0.08} speed={-0.3} />}
      <FloatingEmojis
        emojis={isBuyer ? ["🛒", "📦", "✨"] : ["💰", "📈", "✅"]}
        count={10}
        opacity={isBuyer ? 0.12 : 0.18}
      />

      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 30}px)`,
          fontSize: 42,
          fontWeight: 900,
          color: badgeFg,
          background: badgeBg,
          padding: "10px 28px",
          borderRadius: 999,
          letterSpacing: config.lang === "ar" ? 0 : 2,
          marginBottom: 14,
        }}
      >
        {config.texts.demoBadge}
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: headlineColor,
          letterSpacing: -2,
          opacity: titleP,
          textAlign: "center",
          lineHeight: 1,
          marginBottom: 26,
        }}
      >
        {config.texts.demoHeadline}
        <br />
        <span style={{ color: accentColor }}>{config.texts.demoAccent}</span>
      </div>

      <div style={{ position: "relative", width: 620, height: 1280, perspective: 1800 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            transform: `translateY(${phone1Y}px) rotateY(${phone1Tilt}deg)`,
            opacity: phone1Opacity,
            transformOrigin: "center center",
          }}
        >
          <PhoneFrame width={600}>
            {isBuyer ? <BuyerHome scrollY={scroll1} /> : <SupplierDashboard />}
          </PhoneFrame>
          <Ripple x={300} y={800} start={30} color={ORANGE} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            transform: `translateY(${phone2Y}px) rotateY(${phone2Tilt}deg)`,
            opacity: phone2Opacity,
            transformOrigin: "center center",
          }}
        >
          <PhoneFrame width={600}>
            {isBuyer ? <Orders /> : <MyProducts />}
          </PhoneFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 5: CTA ==========
const SceneCTA: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = usePulse(6, 0.04);
  const logoP = spring({ frame, fps, config: { damping: 14 } });

  const freeP = spring({ frame: frame - 6, fps, config: { damping: 8, mass: 0.3 } });
  const freeScale = interpolate(freeP, [0, 1], [3, 1]);
  const shake = useShake(18, 12, 10);

  const stampP = spring({ frame: frame - 24, fps, config: { damping: 7, mass: 0.3 } });
  const stampRotate = interpolate(stampP, [0, 1], [-40, -8]);

  const urlP = spring({ frame: frame - 42, fps, config: { damping: 12 } });
  const arrowShift = interpolate(
    frame,
    [60, 70, 80, 90, 100, 110],
    [0, 10, 0, 10, 0, 10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, #FFECC7 0%, ${CREAM} 60%, #FFDDAE 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 50,
        fontFamily: font(config.lang),
        direction: dir(config.lang),
      }}
    >
      <RadialRays color={ORANGE} opacity={0.12} speed={0.4} />
      <ConfettiBurst start={50} count={90} />

      <div style={{ transform: `scale(${logoP * 0.75})`, opacity: logoP, marginBottom: 20 }}>
        <ProChainLogo size={170} />
      </div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: NAVY,
          letterSpacing: -1,
          textAlign: "center",
          opacity: logoP,
        }}
      >
        {config.texts.ctaIntro}
      </div>

      <div
        style={{
          position: "relative",
          transform: `scale(${freeScale}) translate(${shake.x}px, ${shake.y}px)`,
          opacity: freeP,
          marginTop: 60,
        }}
      >
        <div
          style={{
            fontSize: config.lang === "ar" ? 210 : 270,
            fontWeight: 900,
            color: ORANGE_DEEP,
            letterSpacing: config.lang === "ar" ? -4 : -12,
            lineHeight: 0.9,
            WebkitTextStroke: "6px " + NAVY,
            filter: "drop-shadow(0 12px 0 rgba(15,23,42,0.9))",
          }}
        >
          {config.texts.ctaBig}
        </div>
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -40,
            transform: `rotate(${stampRotate}deg) scale(${stampP})`,
            background: "#EF4444",
            color: "white",
            fontSize: 30,
            fontWeight: 900,
            padding: "12px 22px",
            borderRadius: 14,
            boxShadow: "0 10px 30px rgba(239,68,68,0.5)",
            border: "4px dashed white",
            letterSpacing: 1,
          }}
        >
          {config.texts.ctaStamp}
        </div>
      </div>

      <div
        style={{
          opacity: urlP,
          transform: `translateY(${(1 - urlP) * 40}px) scale(${pulse})`,
          marginTop: 40,
          background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
          padding: "24px 48px",
          borderRadius: 999,
          boxShadow: "0 20px 50px rgba(240,90,0,0.5), inset 0 -6px 0 rgba(0,0,0,0.15)",
          fontSize: 36,
          fontWeight: 900,
          color: "white",
          letterSpacing: -0.5,
          display: "flex",
          alignItems: "center",
          gap: 14,
          direction: "ltr",
        }}
      >
        prochainapp.manus.space
        <span style={{ transform: `translateX(${arrowShift}px)`, fontSize: 50 }}>→</span>
      </div>

      <div
        style={{
          opacity: urlP,
          fontSize: 28,
          fontWeight: 800,
          color: NAVY,
          marginTop: 22,
          textAlign: "center",
          background: "white",
          padding: "10px 24px",
          borderRadius: 999,
        }}
      >
        {config.texts.ctaCaption}
      </div>
    </AbsoluteFill>
  );
};

// ========== PROGRESS BAR ==========
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 8,
        width: `${progress * 100}%`,
        background: `linear-gradient(90deg, ${ORANGE}, #F59E0B, ${ORANGE_DEEP})`,
        zIndex: 200,
        boxShadow: "0 0 12px rgba(255,122,26,0.7)",
      }}
    />
  );
};

// ========== ROOT COMPOSITION ==========
export const ProChainPromoV2: React.FC<{ config: PromoConfig }> = ({ config }) => {
  const [d1, d2, d3, d4, d5] = config.durations;
  const s1 = 0;
  const s2 = s1 + d1;
  const s3 = s2 + d2;
  const s4 = s3 + d3;
  const s5 = s4 + d4;

  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        fontFamily: font(config.lang),
      }}
    >
      {/* Background music — spans full video */}
      <Audio src={staticFile("audio/music.wav")} volume={0.22} />

      {/* Per-scene VO */}
      <Sequence from={s1} durationInFrames={d1}>
        <SceneHook config={config} />
        <Audio src={staticFile(`audio/${config.audioBase}/s1.wav`)} volume={1} />
      </Sequence>
      <Sequence from={s2} durationInFrames={d2}>
        <ScenePain config={config} />
        <Audio src={staticFile(`audio/${config.audioBase}/s2.wav`)} volume={1} />
      </Sequence>
      <Sequence from={s3} durationInFrames={d3}>
        <SceneSolution config={config} />
        <Audio src={staticFile(`audio/${config.audioBase}/s3.wav`)} volume={1} />
      </Sequence>
      <Sequence from={s4} durationInFrames={d4}>
        <SceneDemo config={config} />
        <Audio src={staticFile(`audio/${config.audioBase}/s4.wav`)} volume={1} />
      </Sequence>
      <Sequence from={s5} durationInFrames={d5}>
        <SceneCTA config={config} />
        <Audio src={staticFile(`audio/${config.audioBase}/s5.wav`)} volume={1} />
      </Sequence>

      <ProgressBar />

      {/* Beat flashes at scene transitions */}
      <Flash start={s2 - 1} duration={4} color="white" />
      <Flash start={s3 - 1} duration={4} color="white" />
      <Flash start={s4 - 1} duration={4} color="white" />
      <Flash start={s5 - 1} duration={4} color="white" />
    </AbsoluteFill>
  );
};
