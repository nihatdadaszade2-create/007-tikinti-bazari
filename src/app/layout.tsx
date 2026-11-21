import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site, absoluteUrl, fullAddress } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { DemoBar, MobileActionBar, SiteFooter } from "@/components/Chrome";
import { Toaster } from "@/components/Toaster";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/ui";
import { t } from "@/i18n";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const defaultDescription =
  "007 Tikinti Bazarı — Bakıda tikinti materialları, santexnika, elektrik malları, kombi və radiatorlar, boyalar və tikinti alətlərinin kirayəsi. M. Mirqasımov 29, Nəsimi bazarının yanı.";

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: `${site.name} — Tikinti materialları Bakıda`, template: `%s | ${site.name}` },
  description: defaultDescription,
  applicationName: site.name,
  keywords: [
    "tikinti materialları Bakı",
    "tikinti bazarı Bakı",
    "santexnika malları Bakı",
    "elektrik malları Bakı",
    "tikinti alətləri kirayəsi Bakı",
    "kombi və radiator Bakı",
  ],
  formatDetection: { telephone: false },
  verification: site.analytics.searchConsoleVerification
    ? { google: site.analytics.searchConsoleVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

/** LocalBusiness structured data — only verified facts; phone/hours added once configured. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: site.name,
  description: defaultDescription,
  image: absoluteUrl("/images/og-image.jpg"),
  ...(site.url ? { url: site.url, "@id": `${site.url}/#store` } : {}),
  ...(site.phone ? { telephone: `+${site.phone}` } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  areaServed: { "@type": "City", name: "Bakı" },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-yellow px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          {t.nav.skipToContent}
        </a>
        <JsonLd data={localBusiness} />
        <DemoBar />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
