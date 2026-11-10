import type { Metadata } from "next";
import LegalPage from "@/components/site/pages/LegalPage";
import doc from "@/content/legal/privacy.json";

const url = "https://quantonlabs.com/privacy";

export const metadata: Metadata = {
  title: `${doc.title} | Quanton Labs`,
  description: "How Quanton Labs handles personal information on quantonlabs.com and in Quanton OS client deployments.",
  alternates: { canonical: url },
  openGraph: { title: `${doc.title} | Quanton Labs`, url, siteName: "Quanton Labs", type: "website" },
};

export default function Page() {
  return <LegalPage doc={doc} path="/privacy" />;
}
