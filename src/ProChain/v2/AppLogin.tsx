import React from "react";
import { RealProChainLogo } from "./RealLogo";

const ORANGE = "#F5833F";
const GRAY_TEXT = "#1A1A1A";
const MUTED = "#9CA3AF";
const BORDER = "#E5E7EB";
const BG = "#FFFFFF";
const AR = '"Tajawal", "Noto Sans Arabic", system-ui, sans-serif';

export const AppLogin: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: BG,
      fontFamily: AR,
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 24px 16px",
      overflowY: "hidden",
      boxSizing: "border-box",
    }}
  >
    {/* Logo */}
    <RealProChainLogo size={110} />

    {/* Toggle */}
    <div
      style={{
        display: "flex",
        width: "100%",
        background: "#F3F4F6",
        borderRadius: 12,
        padding: 4,
        marginTop: 20,
        marginBottom: 18,
      }}
    >
      {["مورد", "مشتري"].map((label, i) => (
        <div
          key={label}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px 0",
            borderRadius: 9,
            fontSize: 15,
            fontWeight: i === 1 ? 700 : 500,
            color: i === 1 ? GRAY_TEXT : MUTED,
            background: i === 1 ? BG : "transparent",
            boxShadow: i === 1 ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
          }}
        >
          {label}
        </div>
      ))}
    </div>

    {/* Heading */}
    <div style={{ fontSize: 26, fontWeight: 800, color: GRAY_TEXT, alignSelf: "flex-end", marginBottom: 4 }}>
      مرحباً بعودتك!
    </div>
    <div style={{ fontSize: 13, color: MUTED, alignSelf: "flex-end", marginBottom: 20, textAlign: "right" }}>
      سجّل دخولك لمتابعة عمليات التوريد بسهولة.
    </div>

    {/* Input: رقم السجل التجاري */}
    <div style={{ width: "100%", marginBottom: 14 }}>
      <div style={{ fontSize: 13, color: MUTED, textAlign: "right", marginBottom: 6 }}>رقم السجل التجاري</div>
      <div
        style={{
          width: "100%",
          height: 48,
          border: `1.5px solid ${BORDER}`,
          borderRadius: 10,
          boxSizing: "border-box",
          background: BG,
        }}
      />
    </div>

    {/* Input: كلمة المرور */}
    <div style={{ width: "100%", marginBottom: 10 }}>
      <div style={{ fontSize: 13, color: MUTED, textAlign: "right", marginBottom: 6 }}>كلمة المرور</div>
      <div
        style={{
          width: "100%",
          height: 48,
          border: `1.5px solid ${BORDER}`,
          borderRadius: 10,
          boxSizing: "border-box",
          background: BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
        }}
      >
        {/* Eye icon left */}
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {/* Dots */}
        <div style={{ color: GRAY_TEXT, fontSize: 20, letterSpacing: 4 }}>••••••••</div>
        {/* Lock right */}
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
    </div>

    {/* Remember + Forgot */}
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 18,
            height: 18,
            border: `1.5px solid ${BORDER}`,
            borderRadius: 4,
          }}
        />
        <span style={{ fontSize: 12, color: MUTED }}>تذكرني</span>
      </div>
      <span style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>نسيت كلمة المرور؟</span>
    </div>

    {/* CTA Button */}
    <div
      style={{
        width: "100%",
        height: 52,
        background: ORANGE,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 700,
        color: "white",
      }}
    >
      تسجيل الدخول
    </div>
  </div>
);
