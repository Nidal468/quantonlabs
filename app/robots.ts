import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
   rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/solutions/",
      },
    ],
    sitemap: "https://quantonlabs.com/sitemap.xml",
  };
}
