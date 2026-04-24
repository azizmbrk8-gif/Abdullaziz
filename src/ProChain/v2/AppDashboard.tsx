import React from "react";

const ORANGE = "#F5833F";
const GRAY_TEXT = "#1A1A1A";
const MUTED = "#9CA3AF";
const BG = "#FFFFFF";
const AR = '"Tajawal", "Noto Sans Arabic", system-ui, sans-serif';

const StatCard: React.FC<{ icon: string; value: number; label: string; iconColor: string }> = ({
  icon,
  value,
  label,
  iconColor,
}) => (
  <div
    style={{
      flex: 1,
      background: "rgba(255,255,255,0.18)",
      borderRadius: 14,
      padding: "14px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    }}
  >
    <div style={{ fontSize: 22, color: iconColor }}>{icon}</div>
    <div style={{ fontSize: 26, fontWeight: 900, color: "white" }}>{value}</div>
    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>{label}</div>
  </div>
);

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; badge?: number }> = ({
  icon,
  label,
  active,
  badge,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
    <div style={{ fontSize: 18, position: "relative" }}>
      {icon}
      {badge ? (
        <div style={{ position: "absolute", top: -4, right: -6, background: "#EF4444", color: "white", fontSize: 8, fontWeight: 700, borderRadius: 999, padding: "1px 4px" }}>
          {badge}
        </div>
      ) : null}
    </div>
    <span style={{ fontSize: 9, color: active ? ORANGE : MUTED, fontWeight: active ? 700 : 400 }}>{label}</span>
    {active && <div style={{ position: "absolute", bottom: -6, width: 5, height: 5, borderRadius: "50%", background: ORANGE }} />}
  </div>
);

const QuickAction: React.FC<{ icon: string; title: string; sub: string }> = ({ icon, title, sub }) => (
  <div
    style={{
      flex: 1,
      background: "#FEF0E6",
      borderRadius: 12,
      padding: "14px 10px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      direction: "rtl",
    }}
  >
    <div
      style={{
        width: 38,
        height: 38,
        background: ORANGE,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: GRAY_TEXT }}>{title}</div>
      <div style={{ fontSize: 10, color: MUTED }}>{sub}</div>
    </div>
  </div>
);

export const AppDashboard: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#F9FAFB",
      fontFamily: AR,
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      overflowY: "hidden",
    }}
  >
    {/* Orange header */}
    <div
      style={{
        background: `linear-gradient(135deg, ${ORANGE} 0%, #E06020 100%)`,
        padding: "36px 18px 22px",
      }}
    >
      {/* Top row: icons + greeting */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {/* Profile circle */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: "white",
            }}
          >
            أ
          </div>
          {/* Bell */}
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>مرحباً بك</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "white" }}>أحمد محمد</div>
        </div>
      </div>

      {/* 3 stat cards */}
      <div style={{ display: "flex", gap: 10 }}>
        <StatCard icon="✅" value={0} label="مكتملة" iconColor="#86EFAC" />
        <StatCard icon="🕐" value={4} label="قيد التنفيذ" iconColor="rgba(255,255,255,0.9)" />
        <StatCard icon="⚠️" value={0} label="طلبات جديدة" iconColor="rgba(255,255,255,0.9)" />
      </div>
    </div>

    {/* White body */}
    <div style={{ flex: 1, padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 14, overflowY: "hidden" }}>
      {/* Quick actions */}
      <div style={{ background: BG, borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GRAY_TEXT, textAlign: "right", marginBottom: 12 }}>الإجراءات السريعة</div>
        <div style={{ display: "flex", gap: 10 }}>
          <QuickAction icon="🛍️" title="الطلبات" sub="إدارة الطلبات" />
          <QuickAction icon="📦" title="إضافة منتج" sub="منتج جديد" />
        </div>
      </div>

      {/* New orders */}
      <div style={{ background: BG, borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: ORANGE, fontWeight: 600 }}>عرض الكل ›</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: GRAY_TEXT }}>الطلبات الجديدة</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "10px 0" }}>
          <div style={{ fontSize: 28 }}>🛍️</div>
          <div style={{ fontSize: 12, color: MUTED }}>لا توجد طلبات جديدة</div>
        </div>
      </div>

      {/* In-progress badge */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GRAY_TEXT }}>قيد التنفيذ</div>
        <div style={{ background: ORANGE, color: "white", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "2px 8px" }}>4</div>
      </div>
    </div>

    {/* Bottom nav */}
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0 6px", borderTop: "1px solid #F3F4F6", background: BG }}>
      <NavItem icon="👤" label="حسابي" />
      <NavItem icon="🔔" label="الإشعارات" badge={9} />
      <NavItem icon="📦" label="المنتجات" />
      <NavItem icon="🏠" label="الرئيسية" active />
    </div>
  </div>
);
