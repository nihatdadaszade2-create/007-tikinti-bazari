"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { CategoryId } from "@/data/types";
import { filterProducts, type SortKey } from "@/lib/search";
import { track } from "@/lib/analytics";
import { t } from "@/i18n";
import { ProductCard } from "./product";
import { WhatsAppButton } from "./ContactButtons";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: t.catalog.sortFeatured },
  { value: "az", label: t.catalog.sortAz },
  { value: "za", label: t.catalog.sortZa },
];

const isSort = (v: string | null): v is SortKey => v === "featured" || v === "az" || v === "za";

/**
 * Catalog with live search + sorting (kept in the URL: ?q=…&sirala=…) and
 * category filters that are real, indexable URLs (/kateqoriya/<slug>).
 */
export function CatalogBrowser({ category }: { category: CategoryId | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const sortParam = params.get("sirala");
  const sort: SortKey = isSort(sortParam) ? sortParam : "featured";
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => filterProducts(products, { query: deferredQuery, category, sort }),
    [deferredQuery, category, sort],
  );

  // Keep the URL in sync (shareable searches) without adding history entries per keystroke.
  const updateUrl = (next: { q?: string; sirala?: SortKey }) => {
    const sp = new URLSearchParams(params.toString());
    if (next.q !== undefined) (next.q.trim() ? sp.set("q", next.q.trim()) : sp.delete("q"));
    if (next.sirala !== undefined) (next.sirala === "featured" ? sp.delete("sirala") : sp.set("sirala", next.sirala));
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const urlTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const trackTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => {
    clearTimeout(urlTimer.current);
    clearTimeout(trackTimer.current);
  }, []);

  const onQueryChange = (value: string) => {
    setQuery(value);
    clearTimeout(urlTimer.current);
    urlTimer.current = setTimeout(() => updateUrl({ q: value }), 300);
    clearTimeout(trackTimer.current);
    if (value.trim().length >= 2) {
      trackTimer.current = setTimeout(() => track({ name: "search", params: { search_term: value.trim().slice(0, 60) } }), 1200);
    }
  };

  const hasFilters = !!query.trim() || !!category || sort !== "featured";
  const clearAll = () => {
    setQuery("");
    router.push("/mehsullar", { scroll: false });
  };

  const chip = (active: boolean) =>
    `inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors ${
      active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
    }`;

  return (
    <div>
      {/* Controls */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <form role="search" className="relative flex-1" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="catalog-search" className="sr-only">
              {t.catalog.searchLabel}
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="catalog-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              className="field !pl-12 !pr-11"
              maxLength={60}
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-paper hover:text-ink"
                aria-label="Axtarışı təmizlə"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
          <div className="relative md:w-56">
            <label htmlFor="catalog-sort" className="sr-only">
              {t.catalog.sortLabel}
            </label>
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => updateUrl({ sirala: e.target.value as SortKey })}
              className="field cursor-pointer appearance-none !pl-11"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <nav aria-label="Kateqoriya filtri" className="-mx-4 mt-4 overflow-x-auto px-4 sm:-mx-5 sm:px-5">
          <ul className="flex gap-2 pb-1 md:flex-wrap">
            <li>
              <Link href={query ? `/mehsullar?q=${encodeURIComponent(query)}` : "/mehsullar"} className={chip(!category)} aria-current={!category ? "page" : undefined} scroll={false}>
                {t.catalog.allCategories}
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={query ? `/kateqoriya/${c.slug}?q=${encodeURIComponent(query)}` : `/kateqoriya/${c.slug}`}
                  className={chip(category === c.id)}
                  aria-current={category === c.id ? "page" : undefined}
                  scroll={false}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Result bar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[14px] font-semibold text-muted" aria-live="polite">
          {t.catalog.results(results.length)}
        </p>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink underline decoration-yellow decoration-2 underline-offset-4">
            <X className="h-4 w-4" aria-hidden="true" />
            {t.catalog.clearFilters}
          </button>
        )}
      </div>

      {/* Grid / empty state */}
      {results.length > 0 ? (
        <ul className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => (
            <li key={p.id} className="flex">
              <div className="flex w-full [&>article]:w-full">
                <ProductCard product={p} priority={i < 4} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-4 flex flex-col items-center px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-paper text-ink">
            <PackageSearch className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold">{t.catalog.emptyTitle}</h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{t.catalog.emptyText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              context="catalog_empty"
              item={query}
              message={query ? `Salam. "${query}" sizdə varmı? Qiyməti barədə məlumat verə bilərsiniz?` : t.whatsapp.general}
              label="Mağazadan soruş"
            />
            <button type="button" onClick={clearAll} className="btn btn-outline">
              {t.catalog.clearFilters}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
