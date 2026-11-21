import type { Product } from "@/data/types";
import { getCategory } from "@/data/categories";

/** Lowercase and strip Azerbaijani diacritics so "kərpic" matches "kerpic". */
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export type SortKey = "featured" | "az" | "za";

/**
 * Azerbaijani alphabetical order. Implemented explicitly because browser
 * `localeCompare(…, "az")` support is inconsistent (Chrome falls back to
 * English order and puts Q after P instead of after K).
 */
const AZ_ALPHABET = "abcçdeəfgğhxıijkqlmnoöprsştuüvyz";
const azRank = (ch: string) => {
  const i = AZ_ALPHABET.indexOf(ch);
  if (i !== -1) return i;
  return /\s|[,.\-]/.test(ch) ? -1 : 1000 + ch.charCodeAt(0); // separators sort before letters
};
export function compareAz(a: string, b: string): number {
  const x = a.toLocaleLowerCase("az");
  const y = b.toLocaleLowerCase("az");
  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    const d = azRank(x[i]) - azRank(y[i]);
    if (d !== 0) return d;
  }
  return x.length - y.length;
}

export function filterProducts(
  list: Product[],
  { query, category, sort }: { query: string; category: string | null; sort: SortKey },
): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  const result = list.filter((p) => {
    if (category && p.category !== category) return false;
    if (!terms.length) return true;
    const haystack = normalize(
      [p.name, p.shortDescription, p.description, getCategory(p.category)?.name ?? ""].join(" "),
    );
    return terms.every((term) => haystack.includes(term));
  });

  const byName = (a: Product, b: Product) => compareAz(a.name, b.name);
  if (sort === "az") return [...result].sort(byName);
  if (sort === "za") return [...result].sort((a, b) => byName(b, a));
  return [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
}
