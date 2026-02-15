import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const productionUrl = "https://quantonlabs.com"; // ← replace with actual production domain
const ogImage = "/images/assets/seo/logo.png"; // 1200x630 image placed in /public

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),

  title: "Quanton Labs | AI-Powered Business Operating System for Growth-Stage Companies",

  description:
    "Quanton OS integrates strategy, automation, and intelligence into a single governed architecture. Built for owner-led businesses generating $1M-$20M that need an operating system, not more tools.",

  alternates: {
    canonical: productionUrl,
  },
  icons: ogImage,
  openGraph: {
    title: "Quanton Labs | The Architecture of Intelligent Business",
    description:
      "Quanton OS integrates strategy, automation, and intelligence into a single governed architecture. Built for owner-led businesses generating $1M-$20M that need an operating system, not more tools.",
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
    title: "Quanton Labs | The Architecture of Intelligent Business",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#041227] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
