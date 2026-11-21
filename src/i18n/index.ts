import { az, type Dictionary } from "./dictionaries/az";
import { defaultLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { az };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

/** Shortcut for the current (only) locale. */
export const t = getDictionary();
