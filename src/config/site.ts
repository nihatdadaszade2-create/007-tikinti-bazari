/**
 * ───────────────────────────────────────────────────────────────
 *  CENTRAL BUSINESS CONFIGURATION — 007 Tikinti Bazarı
 * ───────────────────────────────────────────────────────────────
 *  Every piece of business information shown on the site comes from here.
 *  Values marked `null` are NOT yet confirmed by the business owner and are
 *  rendered as clearly labelled placeholders. Do not fill them with guesses.
 *
 *  Phone / WhatsApp / site URL are read from environment variables so they can
 *  be changed on the hosting platform without touching code (see .env.example).
 */

/** Keep digits only: "+994 (50) 123-45-67" -> "994501234567" */
export function digitsOnly(value: string | undefined | null): string | null {
  const d = (value ?? "").replace(/\D/g, "");
  return d.length >= 9 ? d : null;
}

/** "994501234567" -> "+994 50 123 45 67" (Azerbaijani mobile/landline layout) */
export function formatPhone(digits: string): string {
  const m = digits.match(/^994(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return m ? `+994 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${digits}`;
}

const phone = digitsOnly(process.env.NEXT_PUBLIC_PHONE);
const whatsapp = digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP) ?? phone;
// Explicit domain first; on Vercel fall back to the project's production URL.
const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);

export const site = {
  name: "007 Tikinti Bazarı",
  shortName: "007 Tikinti",
  slogan: "Bakıda ən ucuz qiymət!",

  /** Canonical public URL, e.g. https://007tikinti.az — null until a domain is chosen. */
  url: siteUrl,

  /** Verified from the business card. */
  address: {
    street: "M. Mirqasımov küç. 29",
    landmark: "Nəsimi bazarının yanı",
    city: "Bakı",
    country: "Azərbaycan",
    countryCode: "AZ",
    /** Used for the Google Maps embed and "Get directions" link. */
    mapQuery: "M. Mirqasımov 29, Nəsimi bazarı, Bakı",
  },

  /** Digits only, international format. null = not yet provided. */
  phone,
  whatsapp,

  /**
   * Working hours — NOT YET PROVIDED. Replace with real values, e.g.
   * [{ days: "B.e. – Şənbə", hours: "09:00 – 19:00" }, { days: "Bazar", hours: "10:00 – 16:00" }]
   */
  workingHours: null as { days: string; hours: string }[] | null,

  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,

  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || null,
    searchConsoleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || null,
  },
} as const;

/** True while key business data is still missing — shows a small demo notice bar. */
export const isDemoMode = !site.phone || !site.workingHours;

export const phoneDisplay = site.phone ? formatPhone(site.phone) : null;
export const telHref = site.phone ? `tel:+${site.phone}` : null;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.address.mapQuery,
)}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapQuery,
)}`;

export const fullAddress = `${site.address.street}, ${site.address.landmark}, ${site.address.city}`;

/** Build an absolute URL when the site URL is known, otherwise a root-relative path. */
export function absoluteUrl(path = "/"): string {
  // The GitHub Pages build uses trailing slashes on page URLs (see next.config.ts).
  const p = process.env.GITHUB_PAGES === "true" && !/\.[a-z0-9]+$/i.test(path) && !path.endsWith("/") ? `${path}/` : path;
  return site.url ? `${site.url}${p}` : p;
}
