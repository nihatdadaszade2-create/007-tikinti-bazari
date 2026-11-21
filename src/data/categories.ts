import type { Category, CategoryId } from "./types";

/**
 * The eight catalog categories. `highlights` are taken from the product groups
 * printed on the store's own business card.
 */
export const categories: Category[] = [
  {
    id: "santexnika",
    slug: "santexnika",
    name: "Santexnika malları",
    seoTitle: "Santexnika malları Bakıda",
    description: "Su boruları, su motorları, qaz boruları, kollektorlar və su qızdırıcıları.",
    icon: "droplet",
    highlights: ["Borular və su motorları", "Qaz borusu", "Kollektor", "Su qızdırıcıları"],
  },
  {
    id: "elektrik",
    slug: "elektrik",
    name: "Elektrik malları",
    seoTitle: "Elektrik malları Bakıda",
    description: "Lüstrlər, LED işıqlar, lampalar, elektrik naqilləri, yuvalar və açarlar.",
    icon: "zap",
    highlights: ["Lüstrlər", "LED işıqlar və lampalar", "Elektrik naqilləri", "Yuva və açarlar"],
  },
  {
    id: "kombi-istilik",
    slug: "kombi-istilik",
    name: "Kombi və istilik sistemləri",
    seoTitle: "Kombi və radiator sistemləri Bakıda",
    description: "Kombilər, radiatorlar və isti döşəmə boruları — evinizin istilik sistemi üçün.",
    icon: "flame",
    highlights: ["Kombi", "Radiator", "İsti döşəmə boruları"],
  },
  {
    id: "tikinti-materiallari",
    slug: "tikinti-materiallari",
    name: "Tikinti materialları",
    seoTitle: "Tikinti materialları Bakıda",
    description: "Alçipan, profil, sement, şpaklyovka, qum, kərpic, taxta, dikt və reyka.",
    icon: "brick",
    highlights: ["Alçipan, profil, əqrəb", "Sement və şpaklyovka", "Atsep, qum, kərpic", "Taxta, dikt, reyka"],
  },
  {
    id: "boya-rengleme",
    slug: "boya-rengleme",
    name: "Boya və rəngləmə",
    seoTitle: "Boya və rəng məhsulları Bakıda",
    description: "Boyalar və kompüterlə rənglərin hazırlanması — istədiyiniz çalarda.",
    icon: "paint",
    highlights: ["Boyalar", "Kompüterlə rənglərin hazırlanması"],
  },
  {
    id: "laminat-doseme",
    slug: "laminat-doseme",
    name: "Laminat və döşəmə",
    seoTitle: "Laminat və döşəmə materialları Bakıda",
    description: "Lambirin, plintus, pəncərəaltı, paduqa və lüstraltı — son tamamlama işləri üçün.",
    icon: "layers",
    highlights: ["Lambirin", "Plintus", "Pəncərəaltı", "Paduqa və lüstraltı"],
  },
  {
    id: "teserrufat",
    slug: "teserrufat",
    name: "Təsərrüfat malları",
    seoTitle: "Təsərrüfat malları Bakıda",
    description: "Mebel aksesuarları, qapı cəftələri və gündəlik təsərrüfat ehtiyacları.",
    icon: "home",
    highlights: ["Mebel aksesuarları", "Qapı cəftəsi"],
  },
  {
    id: "tikinti-aletleri",
    slug: "tikinti-aletleri",
    name: "Tikinti alətləri",
    seoTitle: "Tikinti alətləri Bakıda",
    description: "Drellər, laqondalar, lobziklər və digər tikinti alətləri.",
    icon: "drill",
    highlights: ["Drellər", "Laqonda", "Lobzik"],
  },
];

const byId = new Map(categories.map((c) => [c.id, c]));

export function getCategory(id: string): Category | undefined {
  return byId.get(id as CategoryId);
}

export function isCategoryId(id: string | null | undefined): id is CategoryId {
  return !!id && byId.has(id as CategoryId);
}
