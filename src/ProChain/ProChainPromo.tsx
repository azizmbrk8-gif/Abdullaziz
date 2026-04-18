import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
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
  AMBER,
  ConfettiBurst,
  CREAM,
  Flash,
  FloatingEmojis,
  KineticText,
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

// ===============================================
// SCENE 1 — HOOK SLAM (0-45f, 1.5s)
// ===============================================
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const bgScale = spring({ frame, fps, config: { damping: 14 } });
  const textSlam = spring({ frame: frame - 6, fps, config: { damping: 10, mass: 0.4 } });
  const textScale = interpolate(textSlam, [0, 1], [2.2, 1]);

  const emojiP = spring({ frame: frame - 20, fps, config: { damping: 9 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #FFCB6B 0%, ${ORANGE} 45%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <div style={{ transform: `scale(${bgScale})`, opacity: bgScale }}>
        <RadialRays color="#FFFFFF" opacity={0.12} speed={0.6} />
      </div>

      <FloatingEmojis emojis={["☕", "🍔", "🥐", "🍕", "🧀", "🥛"]} count={14} opacity={0.22} />

      <div
        style={{
          transform: `scale(${textScale})`,
          opacity: textSlam,
          textAlign: "center",
          filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.25))",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: NAVY,
            background: "white",
            padding: "8px 28px",
            borderRadius: 999,
            display: "inline-block",
            marginBottom: 30,
            letterSpacing: 2,
          }}
        >
          SHOP OWNERS 👀
        </div>
        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            color: "white",
            letterSpacing: -6,
            lineHeight: 0.95,
            WebkitTextStroke: "3px rgba(0,0,0,0.15)",
          }}
        >
          STOP
          <br />
          WASTING
          <br />
          <span style={{ color: "#FFE5A3" }}>TIME</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 140,
          fontSize: 120,
          opacity: emojiP,
          transform: `scale(${emojiP}) rotate(${(1 - emojiP) * -30}deg)`,
        }}
      >
        ⏱️💸
      </div>
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 2 — PAIN POINTS (0-75f, 2.5s)
// ===============================================
const PainCard: React.FC<{ delay: number; emoji: string; title: string; sub: string }> = ({
  delay,
  emoji,
  title,
  sub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 10, mass: 0.5 } });
  const shake = useShake(delay + 12, 8, 6);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * -100}px) scale(${0.85 + p * 0.15}) translate(${shake.x}px, ${shake.y}px)`,
        background: "white",
        borderRadius: 32,
        padding: "28px 36px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: 100,
          width: 130,
          height: 130,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${ORANGE_HOT}, ${ORANGE_DEEP})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 54, fontWeight: 900, color: NAVY, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: "#64748B", marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
};

const Scene2Pain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1E293B 0%, #0F172A 100%)`,
        padding: 60,
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
      }}
    >
      <FloatingEmojis emojis={["❌", "😩", "💔"]} count={8} opacity={0.08} />
      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          letterSpacing: -2,
          marginBottom: 10,
          opacity: Math.min(1, frame / 10),
        }}
      >
        The <span style={{ color: "#FB923C" }}>nightmare</span>:
      </div>
      <PainCard delay={8} emoji="🤥" title="Shady suppliers" sub="Who can you trust?" />
      <PainCard delay={22} emoji="💸" title="Overpaying" sub="Every single order" />
      <PainCard delay={36} emoji="⏰" title="Hours wasted" sub="On calls & chasing" />
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 3 — SOLUTION SLAM (0-60f, 2s)
// ===============================================
const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSlam = spring({ frame: frame - 3, fps, config: { damping: 9, mass: 0.3 } });
  const logoScale = interpolate(logoSlam, [0, 1], [3, 1]);
  const shake = useShake(12, 14, 14);

  const textP = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Flash start={0} duration={5} />
      <RadialRays color="#FFFFFF" opacity={0.15} speed={0.8} />

      <div
        style={{
          transform: `scale(${logoScale}) translate(${shake.x}px, ${shake.y}px)`,
          opacity: logoSlam,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
        }}
      >
        <ProChainLogo size={420} />
      </div>

      <div
        style={{
          opacity: textP,
          transform: `translateY(${(1 - textP) * 40}px)`,
          fontSize: 180,
          fontWeight: 900,
          color: "white",
          letterSpacing: -6,
          marginTop: 20,
          lineHeight: 1,
          textShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        ProChain
      </div>
      <div
        style={{
          opacity: textP,
          fontSize: 40,
          fontWeight: 700,
          color: "white",
          marginTop: 14,
          letterSpacing: -0.5,
          textAlign: "center",
        }}
      >
        The <span style={{ background: "white", color: ORANGE_DEEP, padding: "4px 16px", borderRadius: 12 }}>
          #1
        </span>{" "}
        food marketplace
      </div>
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 4 — BUYER DEMO (0-135f, 4.5s)
// ===============================================
const Scene4Buyer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP = spring({ frame, fps, config: { damping: 14 } });

  // Phone 1: enters, scrolls
  const phone1Y = interpolate(
    frame,
    [0, 25],
    [1500, 0],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
  );
  const phone1Tilt = interpolate(frame, [0, 25, 55, 70], [20, 0, 0, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phone1Opacity = interpolate(frame, [55, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scroll1 = interpolate(frame, [10, 55], [0, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Phone 2
  const phone2Y = interpolate(frame, [55, 80], [1500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const phone2Tilt = interpolate(frame, [55, 80, 115, 130], [20, 0, 0, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phone2Opacity = interpolate(frame, [55, 80, 115, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${CREAM} 0%, #FFE5C8 100%)`,
        alignItems: "center",
        paddingTop: 90,
      }}
    >
      <FloatingEmojis emojis={["🛒", "📦", "✨"]} count={10} opacity={0.12} />

      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 30}px)`,
          fontSize: 42,
          fontWeight: 900,
          color: "white",
          background: NAVY,
          padding: "10px 28px",
          borderRadius: 999,
          letterSpacing: 2,
          marginBottom: 14,
        }}
      >
        FOR BUYERS
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: NAVY,
          letterSpacing: -2,
          opacity: titleP,
          textAlign: "center",
          lineHeight: 1,
          marginBottom: 30,
        }}
      >
        Everything
        <br />
        <span style={{ color: ORANGE_DEEP }}>in one app</span>
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
            <BuyerHome scrollY={scroll1} />
          </PhoneFrame>
          <Ripple x={300} y={800} start={30} color={ORANGE} />
          <Ripple x={300} y={800} start={30} color="white" />
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
            <Orders />
          </PhoneFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 5 — SUPPLIER DEMO (0-120f, 4s)
// ===============================================
const Scene5Supplier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP = spring({ frame, fps, config: { damping: 14 } });

  const phone1Y = interpolate(frame, [0, 25], [1500, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const phone1Tilt = interpolate(frame, [0, 25, 50, 65], [-20, 0, 0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phone1Opacity = interpolate(frame, [50, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phone2Y = interpolate(frame, [50, 70], [1500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const phone2Tilt = interpolate(frame, [50, 70, 100, 115], [-20, 0, 0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phone2Opacity = interpolate(frame, [50, 70, 100, 118], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating dollar signs
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${NAVY} 0%, ${SLATE} 100%)`,
        alignItems: "center",
        paddingTop: 90,
      }}
    >
      <RadialRays color={ORANGE} opacity={0.1} speed={-0.3} />
      <FloatingEmojis emojis={["💰", "📈", "✅"]} count={12} opacity={0.18} />

      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 30}px)`,
          fontSize: 42,
          fontWeight: 900,
          color: NAVY,
          background: "white",
          padding: "10px 28px",
          borderRadius: 999,
          letterSpacing: 2,
          marginBottom: 14,
        }}
      >
        FOR SUPPLIERS
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "white",
          letterSpacing: -2,
          opacity: titleP,
          textAlign: "center",
          lineHeight: 1,
          marginBottom: 30,
        }}
      >
        Sell more.
        <br />
        <span style={{ color: "#FB923C" }}>Stress less.</span>
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
            <SupplierDashboard />
          </PhoneFrame>
          <Ripple x={300} y={700} start={30} color={ORANGE} />
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
            <MyProducts />
          </PhoneFrame>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 6 — VALUE BURST (0-75f, 2.5s)
// ===============================================
const ValueChip: React.FC<{ delay: number; icon: string; text: string; tilt?: number }> = ({
  delay,
  icon,
  text,
  tilt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 8, mass: 0.4 } });
  const scale = interpolate(p, [0, 1], [0, 1]);
  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${tilt}deg)`,
        background: "white",
        borderRadius: 28,
        padding: "22px 36px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        border: `4px solid ${ORANGE_DEEP}`,
      }}
    >
      <div style={{ fontSize: 68 }}>{icon}</div>
      <div style={{ fontSize: 52, fontWeight: 900, color: NAVY, letterSpacing: -1 }}>{text}</div>
    </div>
  );
};

const Scene6Value: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_HOT} 50%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
        padding: 50,
      }}
    >
      <RadialRays color="white" opacity={0.14} speed={0.5} />
      <ConfettiBurst start={5} count={50} />

      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: "white",
          letterSpacing: -2,
          textAlign: "center",
          marginBottom: 10,
          textShadow: "0 8px 20px rgba(0,0,0,0.25)",
        }}
      >
        <KineticText text="WHY" size={80} color="white" stagger={3} />
        <KineticText
          text="ProChain?"
          delay={12}
          size={100}
          color="#FFE5A3"
          stagger={3}
        />
      </div>

      <ValueChip delay={18} icon="✅" text="Trusted suppliers" tilt={-3} />
      <ValueChip delay={28} icon="💰" text="Save money" tilt={2} />
      <ValueChip delay={38} icon="⚡" text="Save hours" tilt={-2} />
      <ValueChip delay={48} icon="📱" text="One simple app" tilt={3} />
    </AbsoluteFill>
  );
};

// ===============================================
// SCENE 7 — CTA (0-135f, 4.5s)
// ===============================================
const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = usePulse(6, 0.04);

  const freeP = spring({ frame: frame - 4, fps, config: { damping: 8, mass: 0.3 } });
  const freeScale = interpolate(freeP, [0, 1], [3, 1]);
  const shake = useShake(16, 12, 10);

  const stampP = spring({ frame: frame - 22, fps, config: { damping: 7, mass: 0.3 } });
  const stampRotate = interpolate(stampP, [0, 1], [-40, -8]);

  const urlP = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const arrowP = interpolate(
    frame,
    [60, 70, 80, 90, 100, 110],
    [0, 10, 0, 10, 0, 10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const logoP = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, #FFECC7 0%, ${CREAM} 60%, #FFDDAE 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 50,
      }}
    >
      <RadialRays color={ORANGE} opacity={0.12} speed={0.4} />
      <ConfettiBurst start={50} count={100} />

      <div
        style={{
          transform: `scale(${logoP * 0.8})`,
          opacity: logoP,
          marginBottom: 20,
        }}
      >
        <ProChainLogo size={180} />
      </div>

      <div
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: NAVY,
          letterSpacing: -1,
          textAlign: "center",
          opacity: logoP,
        }}
      >
        Get it now.
      </div>

      <div
        style={{
          position: "relative",
          transform: `scale(${freeScale}) translate(${shake.x}px, ${shake.y}px)`,
          opacity: freeP,
          marginTop: 10,
        }}
      >
        <div
          style={{
            fontSize: 280,
            fontWeight: 900,
            color: ORANGE_DEEP,
            letterSpacing: -14,
            lineHeight: 0.9,
            WebkitTextStroke: "6px " + NAVY,
            filter: "drop-shadow(0 12px 0 rgba(15,23,42,0.9))",
          }}
        >
          FREE
        </div>
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -50,
            transform: `rotate(${stampRotate}deg) scale(${stampP})`,
            background: "#EF4444",
            color: "white",
            fontSize: 34,
            fontWeight: 900,
            padding: "14px 26px",
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(239,68,68,0.5)",
            border: "4px dashed white",
            letterSpacing: 1,
          }}
        >
          LIMITED!
        </div>
      </div>

      <div
        style={{
          opacity: urlP,
          transform: `translateY(${(1 - urlP) * 40}px) scale(${pulse})`,
          marginTop: 40,
          background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
          padding: "26px 54px",
          borderRadius: 999,
          boxShadow: "0 20px 50px rgba(240,90,0,0.5), inset 0 -6px 0 rgba(0,0,0,0.15)",
          fontSize: 38,
          fontWeight: 900,
          color: "white",
          letterSpacing: -0.5,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        prochainapp.manus.space
        <span style={{ transform: `translateX(${arrowP}px)`, fontSize: 50 }}>→</span>
      </div>

      <div
        style={{
          opacity: urlP,
          fontSize: 30,
          fontWeight: 800,
          color: NAVY,
          marginTop: 24,
          textAlign: "center",
          background: "white",
          padding: "10px 24px",
          borderRadius: 999,
        }}
      >
        ⬇️ Link in bio
      </div>
    </AbsoluteFill>
  );
};

// ===============================================
// PROGRESS BAR (always on top)
// ===============================================
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
        background: `linear-gradient(90deg, ${ORANGE}, ${AMBER}, ${ORANGE_DEEP})`,
        zIndex: 200,
        boxShadow: "0 0 12px rgba(255,122,26,0.7)",
      }}
    />
  );
};

// ===============================================
// ROOT COMPOSITION (20s = 600f @ 30fps)
// ===============================================
export const ProChainPromo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: CREAM,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
      }}
    >
      <Sequence from={0} durationInFrames={45}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={45} durationInFrames={75}>
        <Scene2Pain />
      </Sequence>
      <Sequence from={120} durationInFrames={60}>
        <Scene3Solution />
      </Sequence>
      <Sequence from={180} durationInFrames={135}>
        <Scene4Buyer />
      </Sequence>
      <Sequence from={315} durationInFrames={120}>
        <Scene5Supplier />
      </Sequence>
      <Sequence from={435} durationInFrames={75}>
        <Scene6Value />
      </Sequence>
      <Sequence from={510} durationInFrames={135}>
        <Scene7CTA />
      </Sequence>
      <ProgressBar />

      {/* Beat-flash transitions between scenes */}
      <Flash start={44} duration={4} color="white" />
      <Flash start={119} duration={5} color="white" />
      <Flash start={179} duration={4} color="white" />
      <Flash start={314} duration={4} color={ORANGE} />
      <Flash start={434} duration={4} color="white" />
      <Flash start={509} duration={5} color="white" />
    </AbsoluteFill>
  );
};
