import React from "react";
import {
  AbsoluteFill, Audio, Easing, interpolate,
  Sequence, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { BROWN, CREAM, ORANGE, AR_FONT, CLAMP } from "./v2/tokens";
import { Scene1Hook }     from "./v2/scenes/Scene1Hook";
import { Scene2Pain }     from "./v2/scenes/Scene2Pain";
import { Scene3Solution } from "./v2/scenes/Scene3Solution";
import { Scene4Demo }     from "./v2/scenes/Scene4Demo";
import { Scene5Numbers }  from "./v2/scenes/Scene5Numbers";
import { Scene6CTA }      from "./v2/scenes/Scene6CTA";

// Load Tajawal from local public/fonts/
void Promise.all([
  loadFont({ family: "Tajawal", url: staticFile("fonts/Tajawal-Regular.ttf"),    weight: "400" }),
  loadFont({ family: "Tajawal", url: staticFile("fonts/Tajawal-Bold.ttf"),       weight: "700" }),
  loadFont({ family: "Tajawal", url: staticFile("fonts/Tajawal-ExtraBold.ttf"), weight: "800" }),
  loadFont({ family: "Tajawal", url: staticFile("fonts/Tajawal-Black.ttf"),     weight: "900" }),
]);

// ─── Scene timeline ──────────────────────────────────────────────────────────
const S1 = { start: 0,    dur: 90  }; //  0– 3s  Hook
const S2 = { start: 90,   dur: 210 }; //  3–10s  Pain
const S3 = { start: 300,  dur: 150 }; // 10–15s  Solution
const S4 = { start: 450,  dur: 270 }; // 15–24s  App Demo
const S5 = { start: 720,  dur: 240 }; // 24–32s  Numbers
const S6 = { start: 960,  dur: 240 }; // 32–40s  CTA
// Total: 1200 frames

// ─── Vertical wipe transition ────────────────────────────────────────────────
const VerticalWipe: React.FC<{ atFrame: number }> = ({ atFrame }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [atFrame - 12, atFrame + 12], [1920, -1920], {
    ...CLAMP,
    easing: Easing.inOut(Easing.cubic),
  });
  const visible = frame >= atFrame - 12 && frame <= atFrame + 12;
  if (!visible) return null;
  return (
    <div style={{ position: "absolute", inset: 0, background: ORANGE, transform: `translateY(${y}px)`, zIndex: 50, pointerEvents: "none" }} />
  );
};

// ─── Top progress bar ─────────────────────────────────────────────────────────
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, height: 7, width: `${(frame / durationInFrames) * 100}%`, background: `linear-gradient(90deg, ${ORANGE}, ${BROWN})`, zIndex: 100, pointerEvents: "none", boxShadow: `0 0 14px ${ORANGE}BB` }} />
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────
export interface TikTokV2Props { enableAudio?: boolean }

export const ProChainTikTokV2: React.FC<TikTokV2Props> = ({ enableAudio = true }) => {
  useVideoConfig();

  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: AR_FONT }}>

      {/* ── Background music ── */}
      {enableAudio && (
        <Audio
          src={staticFile("audio/music.wav")}
          loop
          loopVolumeCurveBehavior="extend"
          volume={(f) => interpolate(f,
            [0, 720, 750, 960, 990, 1170, 1200],
            [0.8, 0.8, 0.35, 0.35, 0.8, 0.8, 0],
            CLAMP,
          )}
        />
      )}

      {/* ── Scenes ── */}
      <Sequence from={S1.start} durationInFrames={S1.dur} premountFor={30}><Scene1Hook /></Sequence>
      <Sequence from={S2.start} durationInFrames={S2.dur} premountFor={30}><Scene2Pain /></Sequence>
      <Sequence from={S3.start} durationInFrames={S3.dur} premountFor={30}><Scene3Solution /></Sequence>
      <Sequence from={S4.start} durationInFrames={S4.dur} premountFor={30}><Scene4Demo /></Sequence>
      <Sequence from={S5.start} durationInFrames={S5.dur} premountFor={30}><Scene5Numbers /></Sequence>
      <Sequence from={S6.start} durationInFrames={S6.dur} premountFor={30}><Scene6CTA /></Sequence>

      {/* ── Cinematic vertical wipes at each scene boundary ── */}
      {[S2.start, S3.start, S4.start, S5.start, S6.start].map((at, i) => (
        <VerticalWipe key={i} atFrame={at} />
      ))}

      {/* ── SFX ── */}
      {enableAudio && (<>
        {/* Whoosh on wipe transitions */}
        {[S2.start, S3.start, S4.start, S5.start, S6.start].map((at, i) => (
          <Sequence key={`w${i}`} from={at - 10} durationInFrames={35} premountFor={5}>
            <Audio src={staticFile("audio/sfx/whoosh.wav")} volume={0.55} />
          </Sequence>
        ))}
        {/* Thud on each pain card (Scene 2: cards at 90+0, 90+20, 90+40) */}
        {[0, 20, 40].map((d, i) => (
          <Sequence key={`t${i}`} from={S2.start + d} durationInFrames={15} premountFor={5}>
            <Audio src={staticFile("audio/sfx/thud.wav")} volume={0.5} />
          </Sequence>
        ))}
        {/* Ding when each stat bar fills (Scene 5) */}
        {[40, 55, 70, 85].map((d, i) => (
          <Sequence key={`d${i}`} from={S5.start + d} durationInFrames={25} premountFor={5}>
            <Audio src={staticFile("audio/sfx/ding.wav")} volume={0.42} />
          </Sequence>
        ))}
      </>)}

      {/* ── Top progress bar ── */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
