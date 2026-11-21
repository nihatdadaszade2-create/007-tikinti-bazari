import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/data/products";
import { PageHero } from "@/components/ui";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { CatalogSkeleton } from "@/components/CatalogSkeleton";

export const metadata = pageMetadata({
  title: "Məhsullar — tikinti materialları kataloqu",
  description:
    "Santexnika, elektrik malları, kombi və radiatorlar, tikinti materialları, boyalar, laminat və tikinti alətləri. Məhsulu tapın və qiyməti WhatsApp-da soruşun.",
  path: "/mehsullar",
});

export default function CatalogPage() {
  return (
    <>
      <PageHero
        eyebrow="Kataloq"
        title="Məhsullar"
        intro={`${products.length} məhsul qrupu, 8 kateqoriya. Axtarın, filtrləyin və qiyməti birbaşa WhatsApp-da soruşun.`}
        crumbs={[{ href: "/", label: "Ana səhifə" }, { label: "Məhsullar" }]}
      />
      <section className="container-x -mt-6 pb-20 sm:-mt-8">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser category={null} />
        </Suspense>
      </section>
    </>
  );
}
