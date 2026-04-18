import React from "react";

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const TEXT = "#0F172A";
const MUTED = "#94A3B8";

const ProductRow: React.FC<{
  name: string;
  sku: string;
  price: string;
  unit: string;
  emoji: string;
  color: string;
}> = ({ name, sku, price, unit, emoji, color }) => (
  <div
    style={{
      background: "white",
      borderRadius: 16,
      padding: 12,
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 4px 10px rgba(15,23,42,0.05)",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#FFF6EB",
          color: ORANGE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        ✎
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#FEF2F2",
          color: "#EF4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        🗑
      </div>
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, textAlign: "right" }}>{name}</div>
      <div style={{ fontSize: 10, color: MUTED }}>{sku}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: ORANGE_DEEP }}>{price} ﷼</div>
      <div style={{ fontSize: 10, color: MUTED }}>{unit}</div>
    </div>
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 12,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
      }}
    >
      {emoji}
    </div>
  </div>
);

export const MyProducts: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#FFF9F2",
      position: "relative",
    }}
  >
    <div
      style={{
        height: 32,
        padding: "0 18px",
      }}
    />
    <div
      style={{
        background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        padding: "16px 18px 26px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          +
        </div>
        <div style={{ fontSize: 26, fontWeight: 900 }}>منتجاتي</div>
      </div>
      <div style={{ fontSize: 13, opacity: 0.9, textAlign: "right", marginTop: 2 }}>My Products</div>
      <div
        style={{
          marginTop: 14,
          background: "white",
          borderRadius: 14,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: MUTED,
          fontSize: 13,
          justifyContent: "flex-end",
        }}
      >
        <span>Search products...</span>
        <span>🔍</span>
      </div>
    </div>

    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
      <ProductRow
        name="President Mozzarella"
        sku="6281024110041"
        price="49.95"
        unit="900g"
        emoji="🧀"
        color="#FEE2E2"
      />
      <ProductRow
        name="Nadec Yoghurt"
        sku="6281057001156"
        price="12.00"
        unit="pieces"
        emoji="🥛"
        color="#DBEAFE"
      />
      <ProductRow
        name="Puck Cream Cheese"
        sku="5711953163890"
        price="62.95"
        unit="900g x2"
        emoji="🫙"
        color="#E0F2FE"
      />
    </div>
  </div>
);
