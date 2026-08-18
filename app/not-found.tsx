import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Page Not Found | Quanton Labs",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

const GRADIENT = "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/faq", label: "FAQ" },
  { href: "/insights", label: "Insights" },
];

export default function NotFound() {
  return (
    <>
      <Navbar isScrolled={true} />
      <main
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "160px",
          paddingBottom: "120px",
          minHeight: "70vh",
        }}
      >
        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "72px",
              lineHeight: 1,
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "24px",
            }}
          >
            404
          </div>

          <h1
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px, 4vw, 36px)",
              color: "#1F2937",
              lineHeight: 1.25,
              margin: "0 0 16px",
            }}
          >
            This page does not exist
          </h1>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.7,
              margin: "0 0 40px",
            }}
          >
            The link may be outdated or the address mistyped. Everything else is still here.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/assessment"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "12px",
              background: GRADIENT,
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Assess Your Business
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}