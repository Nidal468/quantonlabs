import type { NextConfig } from "next";

// Security headers. Closes the CSP, COOP, clickjacking, and HSTS findings
// raised by Lighthouse. Trusted Types is deliberately omitted: it breaks
// React without a dedicated migration.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline and unsafe-eval for its runtime.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://*.public.blob.vercel-storage.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.public.blob.vercel-storage.com",
      "frame-src https://calendly.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.30.55.237'],
  async redirects() {
    return [
      // Legacy URL structures, retired when routes moved to
      // /insights and /case-studies.
      { source: "/blogs/:id", destination: "/insights/:id", permanent: true },
      { source: "/blogs", destination: "/insights", permanent: true },
      { source: "/cases/:id", destination: "/case-studies/:id", permanent: true },
      { source: "/cases", destination: "/case-studies", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;