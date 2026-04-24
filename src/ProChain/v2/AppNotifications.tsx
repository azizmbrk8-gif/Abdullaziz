import React from "react";

const ORANGE = "#F5833F";
const GRAY_TEXT = "#1A1A1A";
const MUTED = "#9CA3AF";
const BG = "#FFFFFF";
const AR = '"Tajawal", "Noto Sans Arabic", system-ui, sans-serif';

const NOTIFICATIONS = [
  { title: "تم إرسال طلب عرض السعر", body: "تم إرسال طلبك رقم ORD-17764032 بنجاح وهو قيد المعالجة.", date: "٢٩ شوال، ١٤٤٧ هـ", unread: true },
  { title: "تم اعتماد الطلب", body: "تم اعتماد طلبك رقم ORD-17763568 — يرجى إرسال ملف التحويل البنكي.", date: "٢٨ شوال، ١٤٤٧ هـ", unread: false },
  { title: "تم اختيار أفضل عرض سعر", body: "تم اختيار أفضل عرض لطلبك بإجمالي 48.00 ر.س — مدة توصيل 30 أيام.", date: "٢٨ شوال، ١٤٤٧ هـ", unread: true },
  { title: "تم إرسال طلب عرض السعر", body: "تم إرسال طلبك رقم ORD-17763568 بنجاح وهو قيد المعالجة.", date: "٢٨ شوال، ١٤٤٧ هـ", unread: true },
  { title: "تم اعتماد الطلب", body: "تم اعتماد طلبك رقم ORD-17762346 — يرجى إرسال ملف التحويل البنكي.", date: "٢٧ شوال، ١٤٤٧ هـ", unread: false },
];

const BellIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      background: active ? "#FEF0E6" : "#F3F4F6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={active ? ORANGE : MUTED} strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  </div>
);

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; badge?: number }> = ({
  icon,
  label,
  active,
  badge,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
    <div style={{ fontSize: 20, position: "relative" }}>
      {icon}
      {badge ? (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -6,
            background: "#EF4444",
            color: "white",
            fontSize: 8,
            fontWeight: 700,
            borderRadius: 999,
            padding: "1px 4px",
          }}
        >
          {badge}
        </div>
      ) : null}
    </div>
    <span style={{ fontSize: 9, color: active ? ORANGE : MUTED, fontWeight: active ? 700 : 400 }}>{label}</span>
    {active && <div style={{ position: "absolute", bottom: -8, width: 5, height: 5, borderRadius: "50%", background: ORANGE }} />}
  </div>
);

export const AppNotifications: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: BG,
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
        padding: "40px 20px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>تحديد الكل</span>
      </div>
      <span style={{ color: "white", fontSize: 20, fontWeight: 800 }}>الإشعارات</span>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>

    {/* Notifications list */}
    <div style={{ flex: 1, overflowY: "hidden", padding: "8px 0" }}>
      {NOTIFICATIONS.map((n, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "14px 16px",
            borderBottom: "1px solid #F3F4F6",
            background: n.unread ? "#FFFAF7" : BG,
          }}
        >
          <BellIcon active={n.unread} />
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GRAY_TEXT, marginBottom: 3 }}>{n.title}</div>
            <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 4 }}>{n.body}</div>
            <div style={{ fontSize: 10, color: MUTED }}>{n.date}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom nav */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0 6px",
        borderTop: "1px solid #F3F4F6",
        background: BG,
      }}
    >
      <NavItem icon="👤" label="حسابي" />
      <NavItem icon="🔔" label="الإشعارات" active badge={9} />
      <NavItem icon="🛒" label="السلة" />
      <NavItem icon="📋" label="الطلبات" />
      <NavItem icon="🏠" label="الرئيسية" />
    </div>
  </div>
);
