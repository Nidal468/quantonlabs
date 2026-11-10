import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import "@/lib/dns";
import PageviewTracker from '@/components/PageviewTracker';

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const productionUrl = "https://quantonlabs.com";

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "AI-Native Business System for Established Operators | Quanton Labs",
  description:
    "Quanton OS is an AI-native business system that carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead. The consulting firm that stays.",
  keywords:
    "AI-native business system, AI agents for business operations, governed AI system, AI system of record, business AI infrastructure, AI operating system for business",
  alternates: {
    canonical: productionUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Quanton OS | The AI-Native Business System",
    description:
      "Quanton OS runs the company so its leadership can lead it. A Governing Agent and seven department leads on one system of record the company owns.",
    url: productionUrl,
    siteName: "Quanton Labs",
    type: "website",
    images: [
      {
        url: "https://quantonlabs.com/images/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quanton Labs | The Architecture of Intelligent Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanton OS | The AI-Native Business System",
    description:
      "Quanton OS consolidates strategy, operations, and intelligence into a single governed architecture built as your system of record. For owner-led businesses generating $1M to $20M that need infrastructure, not more tools.",
    images: ["https://quantonlabs.com/images/assets/og-image.png"],
  },
  verification: {
    google: "VH98L-PLDlbMMnphknhdQWCZ1xoL8ClYr7wsxRLyUxo",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quanton Labs",
  url: "https://quantonlabs.com",
  logo: "https://quantonlabs.com/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png",
  description:
    "Quanton Labs builds and operates Quanton OS, a governed AI-native business system for established operators generating $1M to $20M annually.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-929-298-2162",
    email: "growth@quantonlabs.com",
    contactType: "sales",
  },
  sameAs: [
    "https://www.linkedin.com/company/quantonlabs",
    "https://www.youtube.com/@QuantonLabsOfficial",
  ],
};

const schemaProduct = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Quanton OS",
  serviceType: "AI-native business system deployment and managed operations",
  description:
    "An AI-native business system that carries the operating and managing work of an established company on a system of record the company owns, so its leadership can lead.",
  areaServed: "US",
  offers: {
    "@type": "Offer",
    price: "7500",
    priceCurrency: "USD",
    description: "Discovery and Diagnostic engagement starting at $7,500",
  },
  provider: {
    "@type": "Organization",
    name: "Quanton Labs",
    url: "https://quantonlabs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CRKZ7L7PS0"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CRKZ7L7PS0');
          `}
        </Script>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <Script
          id="schema-product"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
        />
      </head>
      <body className={[manrope.variable, "antialiased"].join(" ")}>
        <Analytics />
        <Providers>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
        <PageviewTracker />
      </body>
    </html>
  );
}