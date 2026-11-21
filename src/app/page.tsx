import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Boxes, Check, Handshake, Palette, Store, Wrench } from "lucide-react";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { getFeaturedProducts, countByCategory } from "@/data/products";
import { rentalItems } from "@/data/rental";
import { pageMetadata } from "@/lib/seo";
import { t } from "@/i18n";
import { ProductCard } from "@/components/product";
import { CategoryCard, MapEmbed, SectionHeading, StoreDetails } from "@/components/ui";
import { WhatsAppButton, CallButton } from "@/components/ContactButtons";

export const metadata = pageMetadata({
  title: "Tikinti materialları, santexnika və elektrik malları Bakıda",
  description:
    "Tikinti materialları, santexnika, elektrik malları, kombi və radiatorlar, boyalar və alət kirayəsi — sərfəli qiymətlərlə. 007 Tikinti Bazarı, Nəsimi bazarının yanı, Bakı.",
  path: "/",
});

const reasons = [
  {
    icon: Boxes,
    title: "Geniş çeşid bir ünvanda",
    text: "Kobud tikintidən son tamamlama işlərinə qədər — santexnika, elektrik, istilik, boya və alətlər eyni mağazada.",
  },
  {
    icon: BadgePercent,
    title: "Sərfəli qiymətlər",
    text: "Məqsədimiz usta və ev sahibləri üçün münasib qiymət təklif etməkdir. Qiyməti WhatsApp-da soruşun — tez cavab verək.",
  },
  {
    icon: Palette,
    title: "Kompüterlə rəng hazırlanması",
    text: "İstədiyiniz çaları kataloqdan və ya nümunəyə görə yerindəcə hazırlayırıq.",
  },
  {
    icon: Wrench,
    title: "Alət kirayəsi",
    text: "Bir dəfəlik iş üçün bahalı alət almağa ehtiyac yoxdur — lazım olanı kirayələyin.",
  },
  {
    icon: Handshake,
    title: "Məsləhət və diqqət",
    text: "Hansı material, nə qədər və hansı ölçüdə lazımdır — seçimdə kömək edirik.",
  },
  {
    icon: Store,
    title: "Rahat ünvan",
    text: `${site.address.street}, ${site.address.landmark}. Gəlin, baxın, seçin.`,
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const counts = countByCategory();

  return (
    <>
      {/* ───────────── 1. Hero ───────────── */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/images/hero.webp"
          alt="Tikinti sahəsində armatur üzərində işləyən inşaatçılar"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[60%_center] opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden="true" />
        <div className="container-x py-16 sm:py-24 lg:py-32">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-white/85 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-yellow" aria-hidden="true" />
            Bakı · {site.address.landmark}
          </p>
          <h1 className="animate-rise delay-1 mt-6 max-w-3xl text-[38px] font-black leading-[1.02] !text-white sm:text-6xl lg:text-[72px]">
            İnşaat və Təmir üçün Axtardığınız Hər Şey <span className="text-yellow">Bir Məkanda!</span>
          </h1>
          <p className="animate-rise delay-2 mt-6 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-xl">
            Tikinti materialları, santexnika, elektrik avadanlıqları və alət kirayəsi — sərfəli qiymətlərlə.
          </p>
          <div className="animate-rise delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/mehsullar" className="btn btn-primary h-14 px-7 text-base">
              {t.cta.viewProducts}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <WhatsAppButton context="hero" className="h-14 px-7 text-base" />
          </div>
          <ul className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 text-[14px] text-white/75 sm:grid-cols-3">
            {["Tikinti materialları", "Santexnika", "Elektrik malları", "Kombi və radiator", "Boya və rəng", "Alət kirayəsi"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="hazard h-1.5" aria-hidden="true" />
      </section>

      {/* ───────────── 2. Categories ───────────── */}
      <section className="section" aria-labelledby="categories-title">
        <div className="container-x">
          <SectionHeading
              id="categories-title"
              eyebrow="Kateqoriyalar"
              title="Nə axtarırsınız?"
              intro="Səkkiz əsas bölmə — lazım olanı tez tapın, sualınızı birbaşa WhatsApp-da verin."
              action={
                <Link href="/mehsullar" className="btn btn-outline self-start md:self-auto">
                  Bütün məhsullar <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              }
            />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} count={counts[c.id]} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 3. Featured products ───────────── */}
      <section className="section border-y border-line bg-white" aria-labelledby="featured-title">
        <div className="container-x">
          <SectionHeading
              id="featured-title"
              eyebrow="Seçilmiş məhsullar"
              title="Ən çox soruşulanlar"
              intro="Qiymət və mövcudluq dəyişə bildiyi üçün ən dəqiq məlumatı WhatsApp-da veririk."
              action={
                <Link href="/mehsullar" className="btn btn-dark self-start md:self-auto">
                  {t.cta.viewAll} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              }
            />
          {/* Phones show the first 4 (keeps the page short); 8 from small tablets up. */}
          <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 max-sm:[&>*:nth-child(n+5)]:hidden">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 4. Rental promo ───────────── */}
      <section className="section" aria-labelledby="rental-title">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[20px] bg-ink lg:grid-cols-2">
            <div className="relative min-h-[260px] lg:min-h-[480px]">
              <Image
                src="/images/rental-saw.webp"
                alt="Qoruyucu geyimdə usta elektrik mişarı ilə taxta kəsir"
                fill
                sizes="(min-width:1024px) 620px, 100vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 rounded-md bg-yellow px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
                Alətlərin kirayəsi
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <h2 id="rental-title" className="text-[30px] font-black !text-white sm:text-[42px]">
                Alət almağa ehtiyac yoxdur — <span className="text-yellow">kirayələyin!</span>
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
                Bir neçə günlük iş üçün bahalı alət almaq sərfəli deyil. Lazım olan aləti kirayəyə götürün, işinizi bitirin, geri qaytarın.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {rentalItems.map((r) => (
                  <li key={r.id} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[14px] font-medium text-white/85">
                    {r.name}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/aletlerin-kirayesi" className="btn btn-primary">
                  Kirayə alətlərinə bax <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <WhatsAppButton
                  context="home_rental"
                  message="Salam. Alət kirayəsi haqqında məlumat almaq istəyirəm."
                  label="Kirayəni soruş"
                  variant="outline-light"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 5. Why us ───────────── */}
      <section className="section grid-dark text-white" aria-labelledby="why-title">
        <div className="container-x">
          <SectionHeading
              id="why-title"
              tone="dark"
              eyebrow="Niyə biz?"
              title="Niyə 007 Tikinti Bazarı?"
              intro="Ustanın da, evini təmir edənin də vaxtı qiymətlidir. Biz bunu sadə edirik."
            />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-ink p-7 sm:p-8">
                <Icon className="h-8 w-8 text-yellow" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold !text-white">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── 6 + 7. Store info & map ───────────── */}
      <section className="section" aria-labelledby="store-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <p className="eyebrow">Mağaza</p>
            <h2 id="store-title" className="mt-3 text-[30px] font-extrabold sm:text-4xl">
              Bizi asanlıqla tapın
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Mağazamız Nəsimi bazarının yanında yerləşir. Gəlin, məhsulları yerində görün və seçin.
            </p>
            <div className="mt-8">
              <StoreDetails />
            </div>
          </div>
          <MapEmbed className="min-h-[340px] lg:min-h-[460px]" />
        </div>
      </section>

      {/* ───────────── 8. Contact CTA ───────────── */}
      <section className="pb-16 lg:pb-24" aria-labelledby="cta-title">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[20px] bg-yellow px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-[30px] font-black sm:text-[40px]">
                Lazım olanı tapmadınız?
              </h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink/80">
                Saytda hər məhsul göstərilməyib. Yazın və ya zəng edin — mağazada olub-olmadığını dərhal deyək.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <WhatsAppButton context="home_cta" variant="dark" />
              <CallButton context="home_cta" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
