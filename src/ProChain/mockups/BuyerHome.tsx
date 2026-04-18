import React from "react";

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const CARD = "#FFFFFF";
const MUTED = "#94A3B8";
const TEXT = "#0F172A";

const CategoryCard: React.FC<{ icon: string; label: string; bg: string; fg: string }> = ({
  icon,
  label,
  bg,
  fg,
}) => (
  <div
    style={{
      flex: 1,
      background: CARD,
      borderRadius: 20,
      padding: "18px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      boxShadow: "0 6px 14px rgba(15,23,42,0.06)",
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 14,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        color: fg,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, textAlign: "center" }}>{label}</div>
  </div>
);

const ProductCard: React.FC<{ name: string; supplier: string; emoji: string; color: string }> = ({
  name,
  supplier,
  emoji,
  color,
}) => (
  <div
    style={{
      flex: 1,
      background: CARD,
      borderRadius: 20,
      padding: 12,
      boxShadow: "0 6px 14px rgba(15,23,42,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <div
      style={{
        width: "100%",
        height: 110,
        borderRadius: 14,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 60,
      }}
    >
      {emoji}
    </div>
    <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, textAlign: "right", lineHeight: 1.2 }}>
      {name}
    </div>
    <div style={{ fontSize: 11, color: MUTED, textAlign: "right" }}>Supplier</div>
  </div>
);

export const BuyerHome: React.FC<{ scrollY?: number }> = ({ scrollY = 0 }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FFF9F2",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `translateY(${-scrollY}px)`,
          transition: "none",
        }}
      >
        {/* status bar */}
        <div
          style={{
            height: 32,
            background: "#FFF9F2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 18px",
            fontSize: 12,
            fontWeight: 700,
            color: TEXT,
          }}
        >
          <span>11:55</span>
          <span>5G</span>
        </div>

        {/* orange header with search */}
        <div
          style={{
            background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
            padding: "14px 14px 20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 14,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: MUTED,
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 16 }}>🔍</span>
            <span>ابحث عن منتج...</span>
          </div>
        </div>

        {/* discount banner */}
        <div style={{ padding: "14px" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
              borderRadius: 22,
              padding: 20,
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                top: -40,
                left: -40,
              }}
            />
            <div style={{ fontSize: 12, opacity: 0.9 }}>عروض حصرية</div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>20% OFF</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>All food products</div>
            <div
              style={{
                background: "white",
                color: ORANGE_DEEP,
                padding: "8px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Shop now →
            </div>
          </div>
        </div>

        {/* categories header */}
        <div
          style={{
            padding: "4px 18px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: ORANGE_DEEP, fontWeight: 700 }}>View all ›</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>الأقسام</div>
        </div>

        <div style={{ display: "flex", gap: 10, padding: "0 14px" }}>
          <CategoryCard icon="🍴" label="Restaurants" bg="#FFEDD5" fg={ORANGE} />
          <CategoryCard icon="🛍" label="Retail" bg="#DBEAFE" fg="#3B82F6" />
          <CategoryCard icon="🏨" label="Hotels" bg="#EDE9FE" fg="#8B5CF6" />
          <CategoryCard icon="🏥" label="Hospitals" bg="#FCE7F3" fg="#EC4899" />
        </div>

        {/* featured products header */}
        <div
          style={{
            padding: "22px 18px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: ORANGE_DEEP, fontWeight: 700 }}>View all ›</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>منتجات مميزة</div>
        </div>

        <div style={{ display: "flex", gap: 10, padding: "0 14px" }}>
          <ProductCard name="Mozzarella 900g" supplier="President" emoji="🧀" color="#FEE2E2" />
          <ProductCard name="Fresh Yoghurt" supplier="Nadec" emoji="🥛" color="#DBEAFE" />
        </div>
        <div style={{ display: "flex", gap: 10, padding: "10px 14px 0" }}>
          <ProductCard name="Cooking Cream 1L" supplier="Nadec" emoji="🥫" color="#FEF3C7" />
          <ProductCard name="Fresh Milk 2L" supplier="Almarai" emoji="🥛" color="#D1FAE5" />
        </div>
      </div>

      {/* bottom nav */}
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
          alignItems: "center",
          borderTop: "1px solid #F1F5F9",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
        }}
      >
        {[
          { i: "👤", l: "Account" },
          { i: "🔔", l: "Alerts" },
          { i: "🛒", l: "Cart" },
          { i: "📦", l: "Orders" },
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
};
