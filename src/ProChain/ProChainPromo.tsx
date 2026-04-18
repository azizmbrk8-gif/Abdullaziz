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
import { ProChainLogo, ProChainWordmark } from "./Logo";
import { PhoneFrame } from "./PhoneFrame";
import { BuyerHome } from "./mockups/BuyerHome";
import { Orders } from "./mockups/Orders";
import { SupplierDashboard } from "./mockups/SupplierDashboard";
import { MyProducts } from "./mockups/MyProducts";

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const CREAM = "#FFF9F2";
const NAVY = "#0F172A";

// --- Scene 1: Logo reveal (0 - 45 frames) ---
const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const wordmarkOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const wordmarkY = interpolate(frame, [20, 38], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, #FFF5E6 0%, ${CREAM} 60%, #FFE8D0 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <ProChainLogo size={360} />
      </div>
      <div
        style={{
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkY}px)`,
        }}
      >
        <ProChainWordmark color={NAVY} size={80} />
      </div>
    </AbsoluteFill>
  );
};

// --- Scene 2: Hook (0 - 90 frames) ---
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const t2 = spring({ frame: frame - 25, fps, config: { damping: 14 } });
  const t3 = spring({ frame: frame - 45, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${CREAM} 0%, #FFE5C8 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 60,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", gap: 40, marginBottom: 60 }}>
        <div
          style={{
            transform: `scale(${t1}) rotate(${(1 - t1) * -20}deg)`,
            fontSize: 180,
          }}
        >
          ☕
        </div>
        <div
          style={{
            transform: `scale(${t2}) rotate(${(1 - t2) * 20}deg)`,
            fontSize: 180,
          }}
        >
          🍽
        </div>
      </div>
      <div
        style={{
          opacity: t3,
          transform: `translateY(${(1 - t3) * 30}px)`,
          fontSize: 82,
          fontWeight: 900,
          color: NAVY,
          lineHeight: 1.05,
          letterSpacing: -1.5,
          maxWidth: 900,
        }}
      >
        Running a <span style={{ color: ORANGE_DEEP }}>café</span>
        <br />
        or <span style={{ color: ORANGE_DEEP }}>restaurant?</span>
      </div>
    </AbsoluteFill>
  );
};

// --- Scene 3: Problem (0 - 90 frames) ---
const ProblemRow: React.FC<{ delay: number; icon: string; text: string; accent: string }> = ({
  delay,
  icon,
  text,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * -80}px)`,
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: "white",
        borderRadius: 28,
        padding: "26px 34px",
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 24,
          background: accent,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 44, fontWeight: 800, color: NAVY, lineHeight: 1.15 }}>{text}</div>
    </div>
  );
};

const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const titleP = spring({ frame, fps: 30, config: { damping: 15 } });
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1E293B 0%, #0F172A 100%)`,
        padding: 70,
        justifyContent: "center",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div
        style={{
          opacity: titleP,
          fontSize: 56,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          marginBottom: 10,
          letterSpacing: -1,
        }}
      >
        The struggle is <span style={{ color: "#FB923C" }}>real</span>
      </div>
      <ProblemRow delay={15} icon="🤝" text="Can't trust suppliers" accent="#EF4444" />
      <ProblemRow delay={30} icon="💸" text="Overpaying everywhere" accent="#F59E0B" />
      <ProblemRow delay={45} icon="⏰" text="Wasting hours daily" accent="#8B5CF6" />
    </AbsoluteFill>
  );
};

// --- Scene 4: Solution reveal with phone ---
const SolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSlide = spring({ frame, fps, config: { damping: 14 } });
  const phoneX = interpolate(phoneSlide, [0, 1], [900, 0]);
  const titleP = spring({ frame: frame - 25, fps, config: { damping: 15 } });

  const scroll = interpolate(frame, [60, 130], [0, 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 500,
          height: 500,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 30}px)`,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>Meet</div>
        <div
          style={{
            fontSize: 148,
            fontWeight: 900,
            color: "white",
            letterSpacing: -4,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          ProChain
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "white",
            marginTop: 14,
            opacity: 0.95,
          }}
        >
          The marketplace for food businesses
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -180,
          left: "50%",
          transform: `translateX(calc(-50% + ${phoneX}px))`,
        }}
      >
        <PhoneFrame width={620}>
          <BuyerHome scrollY={scroll} />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

// --- Scene 5: Phone carousel - Buyer views ---
const BuyerCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP = spring({ frame, fps, config: { damping: 15 } });

  const phoneOpacity1 = interpolate(frame, [0, 15, 60, 75], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneOpacity2 = interpolate(frame, [55, 75, 130], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneX1 = interpolate(frame, [0, 75], [0, -400], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const phoneX2 = interpolate(frame, [55, 75], [400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${CREAM} 0%, #FFE8D0 100%)`,
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 20}px)`,
          fontSize: 60,
          fontWeight: 900,
          color: NAVY,
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 30,
        }}
      >
        For <span style={{ color: ORANGE_DEEP }}>buyers</span>
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          color: "#475569",
          marginBottom: 40,
          opacity: titleP,
        }}
      >
        Track every order, in one place
      </div>

      <div style={{ position: "relative", width: 600, height: 1160 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: phoneOpacity1,
            transform: `translateX(${phoneX1}px)`,
          }}
        >
          <PhoneFrame width={600}>
            <BuyerHome scrollY={480} />
          </PhoneFrame>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: phoneOpacity2,
            transform: `translateX(${phoneX2}px)`,
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

// --- Scene 6: Supplier side ---
const SupplierScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP = spring({ frame, fps, config: { damping: 15 } });

  const phoneOpacity1 = interpolate(frame, [5, 20, 60, 75], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneOpacity2 = interpolate(frame, [55, 75, 130], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phoneX1 = interpolate(frame, [5, 75], [0, 400], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const phoneX2 = interpolate(frame, [55, 75], [-400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #0F172A 0%, #1E293B 100%)`,
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 20}px)`,
          fontSize: 60,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 30,
        }}
      >
        For <span style={{ color: "#FB923C" }}>suppliers</span>
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
          marginBottom: 40,
          opacity: titleP,
        }}
      >
        Reach more shops, sell more
      </div>

      <div style={{ position: "relative", width: 600, height: 1160 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: phoneOpacity1,
            transform: `translateX(${phoneX1}px)`,
          }}
        >
          <PhoneFrame width={600}>
            <SupplierDashboard />
          </PhoneFrame>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: phoneOpacity2,
            transform: `translateX(${phoneX2}px)`,
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

// --- Scene 7: Value burst ---
const ValueBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bullets = [
    { icon: "✓", text: "Trusted suppliers" },
    { icon: "💰", text: "Save money" },
    { icon: "⚡", text: "Save time" },
    { icon: "📱", text: "One simple app" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: "white",
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 20,
        }}
      >
        Why ProChain?
      </div>
      {bullets.map((b, i) => {
        const p = spring({ frame: frame - i * 10, fps, config: { damping: 14 } });
        return (
          <div
            key={b.text}
            style={{
              opacity: p,
              transform: `translateX(${(1 - p) * 60}px)`,
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: 28,
              padding: "26px 44px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              width: "100%",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: "white",
                color: ORANGE_DEEP,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              {b.icon}
            </div>
            <div style={{ fontSize: 46, fontWeight: 800, color: "white" }}>{b.text}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// --- Scene 8: CTA ---
const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const titleP = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const badgeP = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  const urlP = spring({ frame: frame - 45, fps, config: { damping: 14 } });

  const pulse = 1 + Math.sin(frame / 6) * 0.04;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, #FFF5E6 0%, ${CREAM} 60%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 70,
      }}
    >
      <div style={{ transform: `scale(${scale * 0.8})`, marginBottom: 30 }}>
        <ProChainLogo size={200} />
      </div>
      <div
        style={{
          opacity: titleP,
          transform: `translateY(${(1 - titleP) * 20}px)`,
          fontSize: 100,
          fontWeight: 900,
          color: NAVY,
          letterSpacing: -3,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        Try it <span style={{ color: ORANGE_DEEP }}>FREE</span>
      </div>
      <div
        style={{
          opacity: badgeP,
          transform: `scale(${badgeP}) rotate(-6deg)`,
          background: "#EF4444",
          color: "white",
          fontSize: 28,
          fontWeight: 900,
          padding: "12px 28px",
          borderRadius: 16,
          marginTop: 30,
          boxShadow: "0 10px 30px rgba(239,68,68,0.4)",
        }}
      >
        LIMITED TIME
      </div>
      <div
        style={{
          opacity: urlP,
          transform: `translateY(${(1 - urlP) * 20}px) scale(${pulse})`,
          marginTop: 60,
          background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
          padding: "28px 60px",
          borderRadius: 999,
          boxShadow: "0 20px 50px rgba(240,90,0,0.4)",
          fontSize: 44,
          fontWeight: 900,
          color: "white",
          letterSpacing: -0.5,
        }}
      >
        prochainapp.manus.space
      </div>
      <div
        style={{
          opacity: urlP,
          fontSize: 26,
          fontWeight: 700,
          color: "#64748B",
          marginTop: 30,
          textAlign: "center",
        }}
      >
        Download the app today
      </div>
    </AbsoluteFill>
  );
};

// --- Root composition ---
export const ProChainPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: "system-ui, -apple-system, Segoe UI, Helvetica, Arial" }}>
      <Sequence from={0} durationInFrames={45}>
        <LogoReveal />
      </Sequence>
      <Sequence from={45} durationInFrames={90}>
        <Hook />
      </Sequence>
      <Sequence from={135} durationInFrames={90}>
        <Problem />
      </Sequence>
      <Sequence from={225} durationInFrames={135}>
        <SolutionIntro />
      </Sequence>
      <Sequence from={360} durationInFrames={130}>
        <BuyerCarousel />
      </Sequence>
      <Sequence from={490} durationInFrames={130}>
        <SupplierScene />
      </Sequence>
      <Sequence from={620} durationInFrames={90}>
        <ValueBurst />
      </Sequence>
      <Sequence from={710} durationInFrames={130}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
