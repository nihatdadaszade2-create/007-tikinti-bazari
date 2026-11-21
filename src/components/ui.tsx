import Link from "next/link";
import { ChevronRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { site, phoneDisplay, telHref, mapsDirectionsUrl, mapsEmbedUrl } from "@/config/site";
import type { Category } from "@/data/types";
import { t } from "@/i18n";
import { CategoryIcon } from "./Icon";

/* ───────────── Section heading ───────────── */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
  as: Tag = "h2",
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${tone === "dark" ? "!text-white/60" : ""}`}>{eyebrow}</p>}
        <Tag id={id} className={`mt-3 text-[30px] font-extrabold sm:text-4xl lg:text-[44px] ${tone === "dark" ? "!text-white" : ""}`}>
          {title}
        </Tag>
        {intro && (
          <p className={`mt-4 text-[16px] leading-relaxed sm:text-[17px] ${tone === "dark" ? "text-white/70" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ───────────── Category card ───────────── */

export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link
      href={`/kateqoriya/${category.slug}`}
      className="card card-hover group relative flex h-full flex-col p-5 sm:p-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-yellow transition-colors group-hover:bg-yellow group-hover:text-ink">
        <CategoryIcon name={category.icon} className="h-6 w-6" strokeWidth={1.9} />
      </span>
      <h3 className="mt-5 text-lg font-bold leading-snug sm:text-[19px]">{category.name}</h3>
      <p className="mt-2 hidden text-[14px] leading-relaxed text-muted sm:block">{category.description}</p>
      <span className="mt-auto flex items-center justify-between pt-5 text-[13px] font-semibold text-ink">
        <span className="text-muted">{count != null ? `${count} məhsul qrupu` : "Bax"}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}

/* ───────────── Breadcrumbs ───────────── */

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Naviqasiya yolu" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ───────────── Page hero band (inner pages) ───────────── */

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: { href?: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="grid-dark relative overflow-hidden text-white">
      <div className="container-x relative py-12 sm:py-16 lg:py-20">
        <div className="[&_a:hover]:!text-white [&_a]:!text-white/60 [&_ol]:!text-white/60 [&_span[aria-current]]:!text-white">
          <Breadcrumbs items={crumbs} />
        </div>
        <p className="eyebrow mt-8 !text-white/60">{eyebrow}</p>
        <h1 className="animate-rise mt-3 max-w-3xl text-[34px] font-black !text-white sm:text-5xl lg:text-[56px]">{title}</h1>
        {intro && <p className="animate-rise delay-1 mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70 sm:text-lg">{intro}</p>}
        {children}
      </div>
      <div className="hazard absolute bottom-0 right-0 h-1.5 w-1/3" aria-hidden="true" />
    </section>
  );
}

/* ───────────── Store details ───────────── */

export function StoreDetails({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const label = `text-[12px] font-bold uppercase tracking-[0.14em] ${dark ? "text-white/50" : "text-muted"}`;
  const value = `mt-1 text-[16px] font-semibold ${dark ? "text-white" : "text-ink"}`;
  const pending = `mt-1 text-[15px] italic ${dark ? "text-white/50" : "text-muted"}`;
  const iconBox = `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${dark ? "bg-white/10 text-yellow" : "bg-ink text-yellow"}`;

  return (
    <ul className="space-y-6">
      <li className="flex gap-4">
        <span className={iconBox}>
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className={label}>Ünvan</p>
          <address className={`${value} not-italic`}>
            {site.address.street}
            <br />
            <span className={dark ? "text-white/70" : "text-muted"}>
              {site.address.landmark}, {site.address.city}
            </span>
          </address>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold underline decoration-yellow decoration-2 underline-offset-4 ${dark ? "text-white" : "text-ink"}`}
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            {t.cta.directions}
          </a>
        </div>
      </li>
      <li className="flex gap-4">
        <span className={iconBox}>
          <Phone className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className={label}>Telefon</p>
          {telHref ? (
            <a href={telHref} className={`${value} block hover:underline`}>
              {phoneDisplay}
            </a>
          ) : (
            <p className={pending}>{t.phone.pending}</p>
          )}
        </div>
      </li>
      <li className="flex gap-4">
        <span className={iconBox}>
          <Clock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className={label}>{t.hours.title}</p>
          {site.workingHours ? (
            <ul className={value}>
              {site.workingHours.map((h) => (
                <li key={h.days}>
                  {h.days}: <span className="font-normal">{h.hours}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={pending}>{t.hours.pending}</p>
          )}
        </div>
      </li>
    </ul>
  );
}

/* ───────────── Google Maps embed ───────────── */

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-[#e8e6df] ${className}`}>
      <iframe
        src={mapsEmbedUrl}
        title={`${site.name} — xəritədə yeri: ${site.address.mapQuery}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
        allowFullScreen
      />
    </div>
  );
}

/* ───────────── JSON-LD ───────────── */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to prevent breaking out of the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
