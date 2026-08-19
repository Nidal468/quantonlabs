import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.30.55.237'],
  async redirects() {
    return [
      // Legacy URL structures, retired when routes moved to
      // /insights and /case-studies.
      { source: "/blogs/:id", destination: "/insights/:id", permanent: true },
      { source: "/blogs", destination: "/insights", permanent: true },
      { source: "/cases/:id", destination: "/case-studies/:id", permanent: true },
      { source: "/cases", destination: "/case-studies", permanent: true },
    ];
  },
};

export default nextConfig;