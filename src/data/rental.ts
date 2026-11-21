import type { RentalItem } from "./types";

/**
 * ───────────────────────────────────────────────────────────────
 *  RENTAL EQUIPMENT — DEMONSTRATION CONTENT
 * ───────────────────────────────────────────────────────────────
 *  The store offers tool rental ("Alətlərin kirayəsi" on the business card),
 *  but the exact list, prices, periods and availability are NOT yet confirmed.
 *  Every item below is a sample: price = null, rentalPeriods = null,
 *  availability = "unknown". Update with the owner's real list before launch.
 */

const demo = (r: Omit<RentalItem, "price" | "pricePeriod" | "rentalPeriods" | "availability" | "isDemo" | "image"> &
  Partial<RentalItem>): RentalItem => ({
  price: null,
  pricePeriod: null,
  rentalPeriods: null,
  availability: "unknown",
  isDemo: true,
  image: null,
  ...r,
});

export const rentalItems: RentalItem[] = [
  demo({
    id: "r-drel",
    slug: "drel-kirayesi",
    name: "Drel",
    description: "Divarda, ağacda və metalda deşmə işləri üçün.",
    image: "/images/drill-red.webp",
    imageAlt: "Taxta səth üzərində qırmızı drel",
  }),
  demo({
    id: "r-dairevi-misar",
    slug: "dairevi-misar-kirayesi",
    name: "Dairəvi mişar",
    description: "Taxta və dikt materiallarının düz kəsilməsi üçün.",
    image: "/images/circular-saw.webp",
    imageAlt: "Dairəvi mişarla taxtanın kəsilməsi",
  }),
  demo({
    id: "r-perforator",
    slug: "perforator-kirayesi",
    name: "Perforator",
    description: "Beton və kərpicdə deşmə və sökmə işləri üçün.",
  }),
  demo({
    id: "r-laqonda",
    slug: "laqonda-kirayesi",
    name: "Laqonda",
    description: "Metal, daş və plitələrin kəsilməsi üçün bucaq daşlama maşını.",
  }),
  demo({
    id: "r-lobzik",
    slug: "lobzik-kirayesi",
    name: "Lobzik",
    description: "Ağac və dikt üzərində əyri və düz kəsiklər üçün.",
  }),
];
