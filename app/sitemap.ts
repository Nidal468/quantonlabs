import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quantonlabs.com";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/assessment`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/home-services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/professional-services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/automotive`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/healthcare-wellness`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/manufacturing-distribution`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions/retail`,
      lastModified: new Date(),
    },
  ];
}
