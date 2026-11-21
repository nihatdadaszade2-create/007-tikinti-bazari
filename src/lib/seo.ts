import type { Metadata } from "next";
import { site, absoluteUrl } from "@/config/site";

/**
 * Per-page metadata: unique title + description, canonical URL and Open Graph.
 * Canonical/OG URLs become absolute once NEXT_PUBLIC_SITE_URL is set.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/og-image.jpg",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "az_AZ",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: absoluteUrl(path),
      images: [{ url: image, width: 1200, height: 628, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [image] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
