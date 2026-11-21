import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import type { Availability, Product, RentalAvailability, RentalItem } from "@/data/types";
import { getCategory } from "@/data/categories";
import { t } from "@/i18n";
import { CategoryIcon } from "./Icon";
import { WhatsAppButton } from "./ContactButtons";
import type { IconName } from "@/data/types";

/* ───────────── Image with branded placeholder ───────────── */

export function ProductImage({
  src,
  alt,
  icon,
  sizes,
  priority,
  className = "",
}: {
  src: string | null;
  alt: string;
  icon: IconName;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-[#eceae4] ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
    );
  }
  return (
    <div
      className={`grid-dark relative grid place-items-center overflow-hidden ${className}`}
      role="img"
      aria-label={`${alt} — ${t.demo.imagePending.toLowerCase()}`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-yellow text-ink shadow-lg">
          <CategoryIcon name={icon} className="h-8 w-8" strokeWidth={1.75} />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{t.demo.imagePending}</span>
      </div>
    </div>
  );
}

/* ───────────── Price & availability ───────────── */

export function formatPrice(value: number) {
  return `${value.toLocaleString("az-AZ", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${t.price.currency}`;
}

export function PriceTag({ product, large }: { product: Pick<Product, "price" | "showPrice" | "unit">; large?: boolean }) {
  if (product.showPrice && product.price != null) {
    return (
      <p className={`font-display font-extrabold text-ink ${large ? "text-3xl" : "text-xl"}`}>
        {formatPrice(product.price)}
        {product.unit && <span className="ml-1 text-sm font-semibold text-muted">/ {product.unit}</span>}
      </p>
    );
  }
  return <p className={`font-semibold text-ink ${large ? "text-lg" : "text-[14px]"}`}>{t.price.onRequest}</p>;
}

const availabilityStyle: Record<Availability | RentalAvailability, string> = {
  in_stock: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  available: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  on_order: "bg-amber-50 text-amber-900 ring-amber-200",
  out_of_stock: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  rented: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  unknown: "bg-neutral-100 text-neutral-700 ring-neutral-200",
};

export function AvailabilityBadge({ value }: { value: Availability | RentalAvailability }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1 ${availabilityStyle[value]}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${value === "in_stock" || value === "available" ? "bg-emerald-500" : value === "on_order" ? "bg-amber-500" : "bg-neutral-400"}`}
        aria-hidden="true"
      />
      {t.availability[value]}
    </span>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-ink/85 px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-yellow backdrop-blur ${className}`}
      title="Nümunə məlumat — mağaza tərəfindən hələ təsdiqlənməyib"
    >
      {t.demo.badge}
    </span>
  );
}

/* ───────────── Product card ───────────── */

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const category = getCategory(product.category);
  const href = `/mehsullar/${product.slug}`;
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={href} className="relative block" tabIndex={-1} aria-hidden="true">
        <ProductImage
          src={product.image}
          alt={product.imageAlt ?? product.name}
          icon={category?.icon ?? "wrench"}
          sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, 50vw"
          priority={priority}
          className="aspect-[4/3]"
        />
        {product.isDemo && <DemoBadge className="absolute left-3 top-3" />}
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {category && (
          <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-muted">{category.name}</p>
        )}
        <h3 className="mt-1.5 text-[17px] font-bold leading-snug sm:text-lg">
          <Link href={href} className="hover:underline decoration-yellow decoration-[3px] underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">{product.shortDescription}</p>
        <div className="mt-auto pt-4">
          <PriceTag product={product} />
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <WhatsAppButton
              context="product_card"
              item={product.name}
              message={t.whatsapp.product(product.name)}
              label={t.cta.askOnWhatsapp}
              size="sm"
            />
            <Link href={href} className="btn btn-outline btn-sm px-3" aria-label={`${product.name} — ${t.cta.details}`}>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────────── Rental card ───────────── */

export function RentalCard({ item }: { item: RentalItem }) {
  return (
    <article className="card group flex flex-col overflow-hidden">
      <div className="relative">
        <ProductImage
          src={item.image}
          alt={item.imageAlt ?? item.name}
          icon="drill"
          sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
          className="aspect-[4/3]"
        />
        {item.isDemo && <DemoBadge className="absolute left-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <AvailabilityBadge value={item.availability} />
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.description}</p>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[14px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Kirayə qiyməti</dt>
            <dd className="text-right font-semibold text-ink">
              {item.price != null ? `${formatPrice(item.price)}${item.pricePeriod ? ` / ${item.pricePeriod}` : ""}` : "Soruşun"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="flex items-center gap-1.5 text-muted">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              Kirayə müddəti
            </dt>
            <dd className="text-right font-semibold text-ink">{item.rentalPeriods?.join(", ") ?? "Dəqiqləşdirilir"}</dd>
          </div>
        </dl>
        <div className="mt-auto pt-5">
          <WhatsAppButton
            context="rental_card"
            item={item.name}
            message={t.whatsapp.rental(item.name)}
            label="Kirayə üçün yaz"
            fullWidth
          />
        </div>
      </div>
    </article>
  );
}
