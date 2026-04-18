import React from "react";

const ORANGE = "#FF7A1A";
const ORANGE_DEEP = "#F05A00";
const TEXT = "#0F172A";
const MUTED = "#94A3B8";

const StatusChip: React.FC<{ label: string; color: string; bg: string }> = ({ label, color, bg }) => (
  <div
    style={{
      fontSize: 11,
      fontWeight: 700,
      color,
      background: bg,
      padding: "6px 12px",
      borderRadius: 999,
    }}
  >
    {label}
  </div>
);

const OrderRow: React.FC<{
  id: string;
  date: string;
  price?: string;
  status: string;
  statusColor: string;
  statusBg: string;
}> = ({ id, date, price, status, statusColor, statusBg }) => (
  <div
    style={{
      background: "white",
      borderRadius: 16,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxShadow: "0 4px 10px rgba(15,23,42,0.05)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <StatusChip label={status} color={statusColor} bg={statusBg} />
      <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, fontFamily: "monospace" }}>{id}</div>
    </div>
    <div style={{ fontSize: 11, color: MUTED, textAlign: "right" }}>{date}</div>
    {price && (
      <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", textAlign: "right" }}>
        {price} ﷼
      </div>
    )}
  </div>
);

export const Orders: React.FC = () => (
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
        background: "#FFF9F2",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 18px",
        fontSize: 12,
        fontWeight: 700,
        color: TEXT,
      }}
    />
    <div
      style={{
        background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`,
        padding: "14px 18px 28px",
        color: "white",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 900, textAlign: "right" }}>طلباتي</div>
      <div style={{ fontSize: 13, opacity: 0.9, textAlign: "right", marginTop: 4 }}>My Orders</div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexDirection: "row-reverse" }}>
        {["All", "Processing", "Pending", "Done"].map((t, i) => (
          <div
            key={t}
            style={{
              background: i === 0 ? "white" : "rgba(255,255,255,0.22)",
              color: i === 0 ? ORANGE_DEEP : "white",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>

    <div
      style={{
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <OrderRow
        id="ORD-931"
        date="29 Shawwal 1447"
        status="Processing"
        statusColor={ORANGE_DEEP}
        statusBg="#FFEDD5"
      />
      <OrderRow
        id="ORD-25"
        date="28 Shawwal 1447"
        price="48.00"
        status="Awaiting Supplier"
        statusColor="#B45309"
        statusBg="#FEF3C7"
      />
      <OrderRow
        id="ORD-89"
        date="27 Shawwal 1447"
        price="94.90"
        status="Awaiting Supplier"
        statusColor="#B45309"
        statusBg="#FEF3C7"
      />
      <OrderRow
        id="ORD-632"
        date="27 Shawwal 1447"
        status="Processing"
        statusColor={ORANGE_DEEP}
        statusBg="#FFEDD5"
      />
    </div>
  </div>
);
