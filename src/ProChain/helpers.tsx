import React from "react";
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ORANGE = "#FF7A1A";
export const ORANGE_DEEP = "#F05A00";
export const ORANGE_HOT = "#FF4500";
export const AMBER = "#F59E0B";
export const CREAM = "#FFF9F2";
export const NAVY = "#0F172A";
export const SLATE = "#1E293B";

// Kinetic text — each character springs in
export const KineticText: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  stagger?: number;
  weight?: number;
  letterSpacing?: number;
}> = ({
  text,
  delay = 0,
  size = 80,
  color = NAVY,
  stagger = 2,
  weight = 900,
  letterSpacing = -2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "flex",
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing,
        lineHeight: 1,
      }}
    >
      {text.split("").map((ch, i) => {
        const p = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 11, mass: 0.6 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${(1 - p) * 80}px) scale(${0.5 + p * 0.5})`,
              opacity: p,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

// Pulsing element — for buttons, logos
export const usePulse = (speed = 8, amplitude = 0.05) => {
  const frame = useCurrentFrame();
  return 1 + Math.sin(frame / speed) * amplitude;
};

// Camera shake
export const useShake = (startFrame: number, duration = 10, amount = 8) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || frame > startFrame + duration) return { x: 0, y: 0 };
  const t = (frame - startFrame) / duration;
  const decay = 1 - t;
  return {
    x: (random(`x${frame}`) - 0.5) * amount * decay * 2,
    y: (random(`y${frame}`) - 0.5) * amount * decay * 2,
  };
};

// Floating particle background
export const FloatingEmojis: React.FC<{
  emojis: string[];
  count?: number;
  opacity?: number;
}> = ({ emojis, count = 18, opacity = 0.15 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const seed = i + 1;
        const x = random(`px${seed}`) * width;
        const startY = height + 100 + random(`py${seed}`) * height;
        const speed = 0.8 + random(`sp${seed}`) * 1.4;
        const size = 40 + random(`sz${seed}`) * 60;
        const delay = random(`d${seed}`) * 60;
        const progress = ((frame - delay) * speed) / durationInFrames;
        const y = startY - progress * (height + 300);
        const rot = progress * 360 * (random(`r${seed}`) > 0.5 ? 1 : -1);
        const emoji = emojis[i % emojis.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontSize: size,
              opacity,
              transform: `rotate(${rot}deg)`,
            }}
          >
            {emoji}
          </div>
        );
      })}
    </div>
  );
};

// Confetti burst
export const ConfettiBurst: React.FC<{ start: number; count?: number }> = ({
  start,
  count = 80,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const t = frame - start;
  if (t < 0) return null;
  const colors = ["#FF7A1A", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#FFFFFF"];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const seed = i + 100;
        const angle = random(`a${seed}`) * Math.PI * 2;
        const speed = 300 + random(`sp${seed}`) * 800;
        const gravity = 1400;
        const x = width / 2 + Math.cos(angle) * speed * (t / 30);
        const y =
          height / 2 +
          Math.sin(angle) * speed * (t / 30) +
          0.5 * gravity * Math.pow(t / 30, 2);
        const rot = t * (random(`r${seed}`) * 20 - 10);
        const size = 16 + random(`s${seed}`) * 22;
        const color = colors[i % colors.length];
        const op = interpolate(t, [0, 5, 60, 90], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size * 0.4,
              background: color,
              borderRadius: 2,
              transform: `rotate(${rot}deg)`,
              opacity: op,
            }}
          />
        );
      })}
    </div>
  );
};

// Radial rays background
export const RadialRays: React.FC<{ color?: string; speed?: number; opacity?: number }> = ({
  color = "#FFFFFF",
  speed = 0.3,
  opacity = 0.08,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const rotation = frame * speed;
  const cx = width / 2;
  const cy = height / 2;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, opacity }}
    >
      <g transform={`rotate(${rotation} ${cx} ${cy})`}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x2 = cx + Math.cos(a) * 2500;
          const y2 = cy + Math.sin(a) * 2500;
          return (
            <polygon
              key={i}
              points={`${cx},${cy} ${cx + Math.cos(a - 0.12) * 2500},${cy + Math.sin(a - 0.12) * 2500} ${x2},${y2}`}
              fill={color}
            />
          );
        })}
      </g>
    </svg>
  );
};

// Ripple — for phone taps
export const Ripple: React.FC<{ x: number; y: number; start: number; color?: string }> = ({
  x,
  y,
  start,
  color = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  if (t < 0 || t > 25) return null;
  const r = interpolate(t, [0, 25], [0, 120]);
  const op = interpolate(t, [0, 5, 25], [0.8, 0.5, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: 999,
        border: `4px solid ${color}`,
        opacity: op,
        pointerEvents: "none",
      }}
    />
  );
};

// Flash white frame
export const Flash: React.FC<{ start: number; duration?: number; color?: string }> = ({
  start,
  duration = 6,
  color = "#FFFFFF",
}) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  if (t < 0 || t > duration) return null;
  const op = interpolate(t, [0, 1, duration], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity: op,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};
