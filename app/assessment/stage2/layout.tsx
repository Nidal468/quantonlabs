import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extended Operator Brief | Quanton Labs",
  robots: { index: false, follow: false },
};

export default function Stage2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
