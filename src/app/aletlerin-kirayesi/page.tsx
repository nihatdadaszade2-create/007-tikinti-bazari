import { ClipboardList, MessageCircle, PackageCheck, RotateCcw } from "lucide-react";
import { rentalItems } from "@/data/rental";
import { pageMetadata } from "@/lib/seo";
import { PageHero, SectionHeading } from "@/components/ui";
import { RentalCard } from "@/components/product";
import { WhatsAppButton } from "@/components/ContactButtons";

export const metadata = pageMetadata({
  title: "Tikinti alətlərinin kirayəsi Bakıda",
  description:
    "Drel, perforator, laqonda, lobzik və digər tikinti alətlərinin kirayəsi. Alət almağa ehtiyac yoxdur — kirayələyin! 007 Tikinti Bazarı, Nəsimi bazarının yanı.",
  path: "/aletlerin-kirayesi",
});

const steps = [
  { icon: MessageCircle, title: "Yazın", text: "Lazım olan aləti və müddəti WhatsApp-da bildirin." },
  { icon: ClipboardList, title: "Dəqiqləşdirək", text: "Mövcudluğu, kirayə qiymətini və şərtləri sizə deyək." },
  { icon: PackageCheck, title: "Götürün", text: "Aləti mağazadan götürün və işinizi görün." },
  { icon: RotateCcw, title: "Qaytarın", text: "İş bitdikdən sonra razılaşdırılmış vaxtda geri qaytarın." },
];

export default function RentalPage() {
  return (
    <>
      <PageHero
        eyebrow="Alətlərin kirayəsi"
        title="Alət almağa ehtiyac yoxdur — kirayələyin!"
        intro="Bir neçə günlük iş üçün bahalı alət almaq sərfəli deyil. Lazım olan aləti kirayəyə götürün — mövcudluq və şərtlər üçün bizə yazın."
        crumbs={[{ href: "/", label: "Ana səhifə" }, { label: "Alətlərin kirayəsi" }]}
      >
        <div className="mt-8">
          <WhatsAppButton
            context="rental_hero"
            message="Salam. Alət kirayəsi haqqında məlumat almaq istəyirəm. Hansı alətlər mövcuddur?"
            label="Kirayəni WhatsApp-da soruş"
          />
        </div>
      </PageHero>

      <section className="section" aria-labelledby="rental-list-title">
        <div className="container-x">
          <SectionHeading
            id="rental-list-title"
            eyebrow="Kirayə alətləri"
            title="Kirayəyə verilən alətlər"
            intro="Kirayə qiyməti, müddəti və alətin hazırda mövcud olub-olmaması barədə WhatsApp-da dəqiq məlumat veririk."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rentalItems.map((item) => (
              <li key={item.id} className="flex [&>article]:w-full">
                <RentalCard item={item} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-muted">Siyahıda olmayan alət lazımdır? Yazın — imkan daxilində kömək edək.</p>
        </div>
      </section>

      <section className="section border-t border-line bg-white" aria-labelledby="how-title">
        <div className="container-x">
          <SectionHeading id="how-title" eyebrow="Necə işləyir?" title="Kirayə 4 sadə addımda" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="card relative p-6">
                <span className="absolute right-5 top-4 font-display text-5xl font-black text-line" aria-hidden="true">
                  {i + 1}
                </span>
                <Icon className="h-8 w-8 text-ink" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[13.5px] text-muted">
            Girov, sənəd və ödəniş şərtləri kirayə zamanı mağaza tərəfindən bildirilir.
          </p>
        </div>
      </section>
    </>
  );
}
