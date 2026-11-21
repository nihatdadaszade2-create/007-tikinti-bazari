import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, Boxes, Handshake, MapPin, Palette, Wrench } from "lucide-react";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { pageMetadata } from "@/lib/seo";
import { PageHero, SectionHeading } from "@/components/ui";
import { WhatsAppButton } from "@/components/ContactButtons";

export const metadata = pageMetadata({
  title: "Haqqımızda",
  description:
    "007 Tikinti Bazarı — Bakıda tikinti və təmir üçün lazım olan materiallar, santexnika, elektrik malları, istilik sistemləri və alət kirayəsi bir ünvanda.",
  path: "/haqqimizda",
});

const values = [
  { icon: Boxes, title: "Məhsul müxtəlifliyi", text: "Kobud tikintidən son tamamlamaya qədər lazım olan malların böyük hissəsi bir mağazada." },
  { icon: Wrench, title: "Tikinti həlləri", text: "Material, alət və kirayə — işin hər mərhələsi üçün bir ünvan." },
  { icon: BadgePercent, title: "Münasib qiymət", text: "Sərfəli qiymət prinsipimizdir. Qiyməti soruşun, müqayisə edin." },
  { icon: Handshake, title: "Müştəriyə diqqət", text: "Usta da olsanız, evinizi özünüz təmir etsəniz də — seçimdə kömək edirik." },
  { icon: Palette, title: "Rəng xidməti", text: "Boyalar kompüterlə, istədiyiniz çalarda hazırlanır." },
  { icon: MapPin, title: "Rahatlıq", text: `Nəsimi bazarının yanında — ${site.address.street}.` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Haqqımızda"
        title="Tikinti və təmir üçün etibarlı ünvan"
        intro="007 Tikinti Bazarı Bakıda, Nəsimi bazarının yanında yerləşən tikinti materialları və təsərrüfat malları mağazasıdır."
        crumbs={[{ href: "/", label: "Ana səhifə" }, { label: "Haqqımızda" }]}
      />

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[20px]">
              <Image
                src="/images/site-crew.webp"
                alt="Böyük tikinti sahəsində işçilər"
                fill
                sizes="(min-width:1024px) 360px, 60vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-[20px]">
                <Image src="/images/blueprint.webp" alt="Tikinti layihəsinin çertyojı üzərində iş" fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover" />
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[20px]">
                <Image src="/images/tools-wall.webp" alt="Rəfdə sıralanmış açarlar və kəlbətinlər" fill sizes="(min-width:1024px) 240px, 40vw" className="object-cover" />
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow">Biz kimik</p>
            <h2 className="mt-3 text-[30px] font-extrabold sm:text-4xl">Hər şey bir məkanda</h2>
            <div className="mt-5 space-y-4 text-[16.5px] leading-relaxed text-ink-2">
              <p>
                Tikinti və ya təmir zamanı ən çox vaxt aparan iş — lazım olan materialları müxtəlif yerlərdən toplamaqdır. Bizim
                məqsədimiz bunu sadələşdirməkdir: santexnika, elektrik malları, kombi və radiatorlar, tikinti materialları,
                boyalar, döşəmə və təsərrüfat malları bir ünvanda.
              </p>
              <p>
                Bir dəfəlik işlər üçün alət almağa ehtiyac yoxdur — mağazamızda <strong>alətlərin kirayəsi</strong> xidməti də var.
                Boyalar isə <strong>kompüterlə</strong>, istədiyiniz çalarda hazırlanır.
              </p>
              <p className="font-display text-xl font-extrabold text-ink">{site.slogan}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/mehsullar" className="btn btn-dark">
                Məhsullara bax <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <WhatsAppButton context="about" />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-white" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeading id="values-title" eyebrow="Prinsiplərimiz" title="Nəyə önəm veririk" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-yellow text-ink">
                  <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="range-title">
        <div className="container-x">
          <SectionHeading id="range-title" eyebrow="Çeşid" title="Mağazamızda nələr var" />
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/kateqoriya/${c.slug}`} className="font-display text-lg font-extrabold text-ink hover:underline decoration-yellow decoration-[3px] underline-offset-4">
                  {c.name}
                </Link>
                <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                  {c.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
