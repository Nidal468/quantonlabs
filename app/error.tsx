"use client";

import { useEffect } from "react";
import Link from "next/link";

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "560px", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "16px",
          }}
        >
          Something went wrong
        </div>

        <h1
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 4vw, 32px)",
            color: "#1F2937",
            lineHeight: 1.25,
            margin: "0 0 16px",
          }}
        >
          This page failed to load
        </h1>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "16px",
            color: "#6B7280",
            lineHeight: 1.7,
            margin: "0 0 32px",
          }}
        >
          The problem has been logged. Try again, or return to the homepage.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              background: GRADIENT,
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              color: "#374151",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Go home
          </Link>
        </div>

        {error.digest && (
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "12px",
              color: "#9CA3AF",
              marginTop: "32px",
            }}
          >
            Reference: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}