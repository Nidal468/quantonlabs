import type { Metadata } from "next";
import LegalPage from "@/components/site/pages/LegalPage";
import doc from "@/content/legal/terms-of-service.json";

const url = "https://quantonlabs.com/terms-of-service";

export const metadata: Metadata = {
  title: `${doc.title} | Quanton Labs`,
  description: "The terms that govern every use of a Quanton OS deployment.",
  alternates: { canonical: url },
  openGraph: { title: `${doc.title} | Quanton Labs`, url, siteName: "Quanton Labs", type: "website" },
};

export default function Page() {
  return <LegalPage doc={doc} path="/terms-of-service" />;
}
