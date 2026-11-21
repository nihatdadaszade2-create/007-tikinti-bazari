import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { WhatsAppButton } from "@/components/ContactButtons";

export const metadata: Metadata = {
  title: "Səhifə tapılmadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grid-dark text-white">
      <div className="container-x py-20 sm:py-28">
        <p className="font-display text-[96px] font-black leading-none text-yellow sm:text-[140px]">404</p>
        <h1 className="mt-4 text-4xl font-black !text-white sm:text-5xl">Səhifə tapılmadı</h1>
        <p className="mt-4 max-w-lg text-lg text-white/70">
          Axtardığınız səhifə silinib və ya ünvan səhv yazılıb. Aşağıdakı bölmələrdən birinə keçin və ya bizə yazın.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Ana səhifəyə qayıt
          </Link>
          <Link href="/mehsullar" className="btn btn-outline-light">
            Məhsullar <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <WhatsAppButton context="404" />
        </div>
        <ul className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/kateqoriya/${c.slug}`} className="inline-block rounded-full border border-white/15 px-4 py-2 text-[14px] text-white/80 hover:border-yellow hover:text-white">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
