import type { Metadata } from "next";
import LegalPage from "@/components/site/pages/LegalPage";
import doc from "@/content/legal/terms-of-use.json";

const url = "https://quantonlabs.com/terms-of-use";

export const metadata: Metadata = {
  title: `${doc.title} | Quanton Labs`,
  description: "The terms that govern use of quantonlabs.com.",
  alternates: { canonical: url },
  openGraph: { title: `${doc.title} | Quanton Labs`, url, siteName: "Quanton Labs", type: "website" },
};

export default function Page() {
  return <LegalPage doc={doc} path="/terms-of-use" />;
}
