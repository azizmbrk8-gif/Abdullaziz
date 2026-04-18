import React from "react";

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const TEXT = "#0F172A";
const MUTED = "#94A3B8";
const CARD = "#FFFFFF";

const StatTile: React.FC<{ value: string; label: string; icon: string; color: string; bg: string }> = ({
  value,
  label,
  icon,
  color,
  bg,
}) => (
  <div
    style={{
      flex: 1,
      background: "rgba(255,255,255,0.2)",
      borderRadius: 18,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.25)",
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 800,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 26, fontWeight: 900, color: "white" }}>{value}</div>
    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.9)", textAlign: "center" }}>{label}</div>
  </div>
);

const QuickAction: React.FC<{ title: string; subtitle: string; icon: string }> = ({
  title,
  subtitle,
  icon,
}) => (
  <div
    style={{
      flex: 1,
      background: "#FFF6EB",
      borderRadius: 16,
      padding: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: ORANGE,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
      }}
    >
      {icon}
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>{title}</div>
      <div style={{ fontSize: 11, color: MUTED }}>{subtitle}</div>
    </div>
  </div>
);

export const SupplierDashboard: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#FFF9F2",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: 32,
        background: "#FFF9F2",
        padding: "0 18px",
        fontSize: 12,
        fontWeight: 700,
        color: TEXT,
      }}
    />
    <div
      style={{
        background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        padding: "18px 18px 32px",
        color: "white",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🔔
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: "rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            أ
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, opacity: 0.9 }}>مرحباً بك</div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>أحمد محمد</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <StatTile value="0" label="Completed" icon="✓" color="#10B981" bg="#D1FAE5" />
        <StatTile value="4" label="In progress" icon="⏱" color={ORANGE_DEEP} bg="#FFEDD5" />
        <StatTile value="0" label="New" icon="!" color="#DC2626" bg="#FEE2E2" />
      </div>
    </div>

    <div
      style={{
        background: CARD,
        marginTop: -18,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 800, color: TEXT, textAlign: "right" }}>
        الإجراءات السريعة
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <QuickAction title="Orders" subtitle="Manage" icon="🛍" />
        <QuickAction title="Add Product" subtitle="New item" icon="📦" />
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: TEXT,
          textAlign: "right",
          marginTop: 8,
        }}
      >
        الطلبات الجديدة
      </div>
      <div
        style={{
          background: "#FFF6EB",
          borderRadius: 16,
          padding: "28px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: MUTED,
        }}
      >
        <div style={{ fontSize: 32 }}>🛍</div>
        <div style={{ fontSize: 13 }}>No new orders yet</div>
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        padding: "14px 8px 18px",
        display: "flex",
        justifyContent: "space-around",
        borderTop: "1px solid #F1F5F9",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
      }}
    >
      {[
        { i: "👤", l: "Account" },
        { i: "🔔", l: "Alerts" },
        { i: "📦", l: "Products" },
        { i: "🏠", l: "Home", active: true },
      ].map((item) => (
        <div
          key={item.l}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            color: item.active ? ORANGE : MUTED,
            fontSize: 10,
            fontWeight: item.active ? 700 : 500,
          }}
        >
          <div style={{ fontSize: 18 }}>{item.i}</div>
          <div>{item.l}</div>
        </div>
      ))}
    </div>
  </div>
);
