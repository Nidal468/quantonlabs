import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quanton Labs",
    short_name: "Quanton Labs",
    description: "Quanton OS runs the company so its leadership can lead it.",
    start_url: "/",
    display: "browser",
    background_color: "#f0f1f3",
    theme_color: "#0b0c0e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
