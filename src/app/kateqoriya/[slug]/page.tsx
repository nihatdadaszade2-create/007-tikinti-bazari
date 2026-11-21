import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { CatalogSkeleton } from "@/components/CatalogSkeleton";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return pageMetadata({
    title: category.seoTitle,
    description: `${category.name}: ${category.description} 007 Tikinti Bazarı — Nəsimi bazarının yanı, Bakı. Qiymət üçün WhatsApp-da yazın.`,
    path: `/kateqoriya/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow="Kateqoriya"
        title={category.seoTitle}
        intro={category.description}
        crumbs={[
          { href: "/", label: "Ana səhifə" },
          { href: "/mehsullar", label: "Məhsullar" },
          { label: category.name },
        ]}
      >
        <ul className="mt-6 flex flex-wrap gap-2">
          {category.highlights.map((h) => (
            <li key={h} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13.5px] font-medium text-white/80">
              {h}
            </li>
          ))}
        </ul>
      </PageHero>
      <section className="container-x -mt-6 pb-20 sm:-mt-8">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser category={category.id} />
        </Suspense>
      </section>
    </>
  );
}
