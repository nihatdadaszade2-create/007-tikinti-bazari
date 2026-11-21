/**
 * Language setup. Only Azerbaijani is live today.
 * To add Russian / English later:
 *   1. add "ru" / "en" to `locales`
 *   2. create dictionaries/ru.ts and dictionaries/en.ts with the same shape as az.ts
 *      (TypeScript will flag any missing key)
 *   3. move pages under src/app/[locale]/ and pass `locale` to getDictionary()
 *   4. add `alternates.languages` in src/lib/seo.ts for hreflang tags
 */
export const locales = ["az"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";
