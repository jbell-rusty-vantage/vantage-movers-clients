import { ImageResponse } from "next/og";
import { business } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #024799 0%, #022f66 58%, #0b0d14 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#ffce45",
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {business.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              maxWidth: 920,
              fontSize: 78,
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-0.045em",
            }}
          >
            Nationwide Long-Distance Moving Coordination
          </div>
          <div style={{ maxWidth: 820, color: "#cfe0f2", fontSize: 30, lineHeight: 1.25 }}>
            Licensed interstate moving broker connecting customers with FMCSA-authorized motor
            carriers.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#cfe0f2",
            fontSize: 26,
          }}
        >
          <span>
            DOT {business.dot} | MC {business.mc}
          </span>
          <span style={{ color: "#ffce45", fontWeight: 800 }}>{business.phoneDisplay}</span>
        </div>
      </div>
    ),
    size,
  );
}
