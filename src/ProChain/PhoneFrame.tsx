import React from "react";

interface Props {
  children: React.ReactNode;
  width?: number;
  scale?: number;
}

export const PhoneFrame: React.FC<Props> = ({
  children,
  width = 540,
  scale = 1,
}) => {
  const aspect = 19.5 / 9;
  const height = width * aspect;
  const bezel = width * 0.035;
  const radius = width * 0.11;
  const innerRadius = radius - bezel * 0.8;

  return (
    <div
      style={{
        width,
        height,
        transform: `scale(${scale})`,
        borderRadius: radius,
        background: "#0f172a",
        padding: bezel,
        boxShadow:
          "0 40px 80px rgba(15, 23, 42, 0.45), 0 20px 40px rgba(15, 23, 42, 0.25)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: bezel * 1.1,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.32,
          height: width * 0.045,
          background: "#0f172a",
          borderRadius: 999,
          zIndex: 10,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: innerRadius,
          overflow: "hidden",
          background: "#FFF9F2",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};
