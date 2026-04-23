import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const productionUrl = "https://quantonlabs.com";
const ogImage = "/images/assets/seo/ql_logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "AI Operating System for Business | Quanton Labs",
  description:
    "Quanton OS deploys eight coordinated AI agents on your business. One governing intelligence layer connects every function, integrates with your existing systems, and gives leadership real-time visibility. Built for businesses generating $1M to $20M annually.",
  keywords:
    "AI operating system for business, AI agents for business operations, governed AI system for growth-stage companies, business AI infrastructure",
  alternates: {
    canonical: productionUrl,
  },
  icons: {
    icon: "/images/assets/QL favicon transparent.svg",
  },
  openGraph: {
    title: "Quanton OS | AI Operating System for Growth-Stage Businesses",
    description:
      "Eight coordinated AI agents. One governing intelligence layer. Complete business infrastructure deployed on your existing systems without migration.",
    url: productionUrl,
    siteName: "Quanton Labs",
    images: [
      {
        url: ogImage,
        alt: "Quanton Labs - AI Operating System for Growth-Stage Businesses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanton OS | AI Operating System for Growth-Stage Businesses",
    description:
      "Quanton OS integrates strategy, automation, and intelligence into a single governed architecture. Built for owner-led businesses generating $1M-$20M that need an operating system, not more tools.",
    images: [ogImage],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CRKZ7L7PS0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Quanton Labs",
              url: "https://quantonlabs.com",
              logo: "https://quantonlabs.com/images/assets/QL_LOGO_WHITE_TRANSPARENT_v1_0_Feb2026.png",
              description:
                "Quanton Labs deploys Quanton OS, a governed AI operating system for growth-stage businesses generating $1M to $20M annually.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-929-298-2162",
                email: "growth@quantonlabs.com",
                contactType: "sales",
              },
              sameAs: [
                "https://www.linkedin.com/company/quantonlabs",
                "https://www.instagram.com/quantonlabs",
                "https://www.youtube.com/@QuantonLabsOfficial",
              ],
            }),
          }}
        />
        <Script
          id="schema-product"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Quanton OS",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Cloud",
              description:
                "An AI-integrated operating system that deploys eight coordinated AI agents for growth-stage businesses. Connects directly to existing business platforms via API without migration.",
              offers: {
                "@type": "Offer",
                price: "7500",
                priceCurrency: "USD",
                description:
                  "Discovery and Diagnostic engagement starting at $7,500",
              },
              provider: {
                "@type": "Organization",
                name: "Quanton Labs",
                url: "https://quantonlabs.com",
              },
            }),
          }}
        />
      </head>
      <body className={[manrope.variable, "antialiased"].join(" ")}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}