import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const productionUrl = "https://quantonlabs.com";
const ogImage = "/images/assets/seo/ql_logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),

  title: "AI Operating System for Business | Quanton Labs",

  description:
    "Quanton OS deploys eight coordinated AI agents on your business. One governing intelligence layer connects every function, integrates with your existing systems, and gives leadership real-time visibility. Built for businesses generating $1M to $20M annually.",
  keywords: "AI operating system for business, AI agents for business operations, governed AI system for growth-stage companies, business AI infrastructure",
  alternates: {
    canonical: productionUrl,
  },
  icons: ogImage,
  openGraph: {
    title: "Quanton OS | AI Operating System for Growth-Stage Businesses",
    description:
      "Eight coordinated AI agents. One governing intelligence layer. Complete business infrastructure deployed on your existing systems without migration.",
    url: productionUrl,
    siteName: "Quanton Labs",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Quanton Labs - AI-powered business operating system",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
