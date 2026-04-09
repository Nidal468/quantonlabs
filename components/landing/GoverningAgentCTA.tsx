"use client";

export default function GoverningAgentCTA() {
  return (
    <div
      style={{
        backgroundColor: "#041227",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "56px 48px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            height: "2px",
            width: "60px",
            background: "linear-gradient(to right, #2B60EB, #8B37EA)",
            borderRadius: "1px",
          }}
        />
        <h3
          style={{
            color: "#ffffff",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          Every function in your business. One view. Real time.
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Manrope, sans-serif",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: 0,
          }}
        >
          The dashboard below is what Quanton OS surfaces to the business owner. Not a report. Not a summary. A live operational feed governed by the system you own.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "Manrope, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.06em",
            }}
          >
            See it live
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4v12M4 10l6 6 6-6"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}