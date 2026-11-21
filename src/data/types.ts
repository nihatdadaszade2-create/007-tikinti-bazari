export type CategoryId =
  | "santexnika"
  | "elektrik"
  | "kombi-istilik"
  | "tikinti-materiallari"
  | "boya-rengleme"
  | "laminat-doseme"
  | "teserrufat"
  | "tikinti-aletleri";

export type IconName =
  | "droplet"
  | "zap"
  | "flame"
  | "brick"
  | "paint"
  | "layers"
  | "home"
  | "wrench"
  | "drill";

export interface Category {
  id: CategoryId;
  /** URL slug — currently identical to id. */
  slug: CategoryId;
  name: string;
  /** SEO-oriented heading, e.g. "Santexnika malları Bakıda" */
  seoTitle: string;
  description: string;
  icon: IconName;
  /** Product groups printed on the store's business card for this category. */
  highlights: string[];
}

/**
 * - in_stock / out_of_stock / on_order: only set when confirmed by the store.
 * - unknown: default — nothing is claimed, the visitor is asked to check.
 */
export type Availability = "in_stock" | "out_of_stock" | "on_order" | "unknown";

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  /** One sentence for cards. */
  shortDescription: string;
  description: string;
  /** Path under /public, or null for the branded placeholder. */
  image: string | null;
  imageAlt?: string;
  /** Price in AZN. null = not provided. */
  price: number | null;
  /** Price is shown only when true AND price is set. */
  showPrice: boolean;
  /** e.g. "ədəd", "m²", "kisə" — shown after the price. */
  unit?: string;
  availability: Availability;
  specifications: Specification[];
  featured: boolean;
  /** true = sample record, not yet confirmed by the store. Shows a "Nümunə" badge. */
  isDemo: boolean;
}

export type RentalAvailability = "available" | "rented" | "unknown";

export interface RentalItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  imageAlt?: string;
  /** Rental price in AZN per `pricePeriod`. null = not provided. */
  price: number | null;
  pricePeriod: string | null;
  /** Rental periods offered, e.g. ["Günlük", "Həftəlik"]. null = to be confirmed. */
  rentalPeriods: string[] | null;
  availability: RentalAvailability;
  isDemo: boolean;
}
