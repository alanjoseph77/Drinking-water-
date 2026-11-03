import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL, business } from "@/lib/site";
import "./globals.css";

// Self-hosted (SIL OFL) so builds work offline and pages load without a Google Fonts request.
const stencil = localFont({ src: "./fonts/saira-stencil-one-latin-400-normal.woff2", weight: "400", variable: "--font-stencil", display: "swap" });
const tektur = localFont({
  src: [
    { path: "./fonts/tektur-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/tektur-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/tektur-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-display",
  display: "swap",
});
const geist = localFont({
  src: [
    { path: "./fonts/geist-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/geist-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});
const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});
const yellowtail = localFont({ src: "./fonts/yellowtail-latin-400-normal.woff2", weight: "400", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aqua Mareeba | Packaged Drinking Water from Kannur, Kerala",
    template: "%s | Aqua Mareeba",
  },
  description: business.description,
  keywords: [
    "Aqua Mareeba",
    "packaged drinking water",
    "Kannur",
    "Kerala",
    "RO water",
    "BIS IS 14543",
    "Rain Drops",
    "drinking water supplier Kannur",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.brand,
    title: "Aqua Mareeba | Packaged Drinking Water",
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua Mareeba | Packaged Drinking Water",
    description: business.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ebecea",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${stencil.variable} ${tektur.variable} ${geist.variable} ${geistMono.variable} ${yellowtail.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
