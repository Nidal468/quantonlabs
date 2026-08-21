import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Gated, transactional, or non-content routes. Build assets under
        // /_next/ are deliberately left crawlable: Google needs them to
        // render the pages correctly.
        disallow: ["/api/", "/auth/", "/dashboard"],
      },
    ],
    sitemap: "https://quantonlabs.com/sitemap.xml",
  };
}