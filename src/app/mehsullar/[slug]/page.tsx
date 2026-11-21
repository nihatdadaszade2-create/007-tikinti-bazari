import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, MapPin } from "lucide-react";
import { products, getProduct, getRelatedProducts } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { t } from "@/i18n";
import { AvailabilityBadge, DemoBadge, PriceTag, ProductCard, ProductImage } from "@/components/product";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { WhatsAppButton, CallButton } from "@/components/ContactButtons";
import { ProductViewTracker } from "@/components/ProductViewTracker";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const category = getCategory(product.category);
  return pageMetadata({
    title: `${product.name} Bakıda`,
    description: `${product.description} ${category ? `${category.name} — ` : ""}${site.name}, Nəsimi bazarının yanı.`.slice(0, 300),
    path: `/mehsullar/${product.slug}`,
    image: product.image ?? undefined,
  });
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);

  /*
   * Product structured data is intentionally NOT emitted: Google requires price
   * (offers), reviews or ratings for Product rich results, and none are verified
   * yet. Add it here once real prices are published (showPrice: true).
   */

  return (
    <>
      <ProductViewTracker item={product.name} category={product.category} />
      <div className="border-b border-line bg-white">
        <div className="container-x py-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Ana səhifə" },
              { href: "/mehsullar", label: "Məhsullar" },
              ...(category ? [{ href: `/kateqoriya/${category.slug}`, label: category.name }] : []),
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <section className="container-x py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Image */}
          <div className="relative">
            <ProductImage
              src={product.image}
              alt={product.imageAlt ?? product.name}
              icon={category?.icon ?? "wrench"}
              sizes="(min-width:1024px) 640px, 100vw"
              priority
              className="aspect-square rounded-[20px] border border-line sm:aspect-[4/3] lg:aspect-square"
            />
            {product.isDemo && <DemoBadge className="absolute left-4 top-4" />}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {category && (
              <Link
                href={`/kateqoriya/${category.slug}`}
                className="self-start text-[12.5px] font-bold uppercase tracking-[0.14em] text-muted hover:text-ink"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 text-[34px] font-black sm:text-5xl">{product.name}</h1>
            <div className="mt-4">
              <AvailabilityBadge value={product.availability} />
            </div>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{product.description}</p>

            <div className="card mt-8 p-5 sm:p-6">
              <PriceTag product={product} large />
              <p className="mt-1.5 text-[14px] text-muted">
                {product.showPrice && product.price != null
                  ? "Qiymət dəyişə bilər — son qiyməti mağazadan dəqiqləşdirin."
                  : "Qiymət və mövcudluq barədə ən dəqiq məlumatı WhatsApp-da veririk."}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <WhatsAppButton
                  context="product_page"
                  item={product.name}
                  message={t.whatsapp.product(product.name)}
                  label={t.cta.askOnWhatsapp}
                  fullWidth
                />
                <CallButton context="product_page" fullWidth />
              </div>
              <p className="mt-4 flex items-start gap-2 text-[13.5px] text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Mağazada baxmaq üçün: {site.address.street}, {site.address.landmark}
              </p>
            </div>

            {/* Specifications */}
            <div className="mt-8">
              <h2 className="text-xl font-extrabold">Texniki məlumat</h2>
              {product.specifications.length > 0 ? (
                <dl className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
                  {product.specifications.map((s) => (
                    <div key={s.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-[15px]">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-semibold text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <p className="mt-4 flex items-start gap-2 text-[14px] leading-relaxed text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Ölçü, marka və model seçimləri barədə ətraflı məlumat üçün bizə yazın.
              </p>
            </div>

            {product.isDemo && (
              <p className="mt-6 rounded-lg border border-dashed border-line px-4 py-3 text-[13px] text-muted">
                Bu səhifədəki məlumat nümunədir və mağaza tərəfindən hələ təsdiqlənməyib.
              </p>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-white py-14 lg:py-20" aria-labelledby="related-title">
          <div className="container-x">
            <SectionHeading
              id="related-title"
              eyebrow="Oxşar məhsullar"
              title={category ? `${category.name} bölməsindən` : "Oxşar məhsullar"}
              action={
                category && (
                  <Link href={`/kateqoriya/${category.slug}`} className="btn btn-outline self-start md:self-auto">
                    <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
                    Bütün bölmə
                  </Link>
                )
              }
            />
            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
