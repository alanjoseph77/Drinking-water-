import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aqua Mareeba",
    short_name: "Mareeba",
    description: "Packaged drinking water from Kolayad, Kannur, Kerala",
    start_url: "/",
    display: "standalone",
    background_color: "#ebecea",
    theme_color: "#14204d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
