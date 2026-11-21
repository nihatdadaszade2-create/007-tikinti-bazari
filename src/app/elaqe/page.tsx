import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { isContactBackendConfigured } from "@/lib/contact-server";
import { MapEmbed, PageHero, StoreDetails } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton, CallButton } from "@/components/ContactButtons";

export const metadata = pageMetadata({
  title: "Əlaqə — ünvan və xəritə",
  description: `007 Tikinti Bazarı: ${site.address.street}, ${site.address.landmark}, Bakı. WhatsApp, telefon, xəritə və əlaqə forması.`,
  path: "/elaqe",
});

export default function ContactPage() {
  const mode = isContactBackendConfigured() ? "server" : site.whatsapp ? "whatsapp" : "none";

  return (
    <>
      <PageHero
        eyebrow="Əlaqə"
        title="Bizimlə əlaqə saxlayın"
        intro="Məhsul, qiymət və ya alət kirayəsi barədə sualınız var? Ən tez cavabı WhatsApp-da veririk."
        crumbs={[{ href: "/", label: "Ana səhifə" }, { label: "Əlaqə" }]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton context="contact_hero" />
          <CallButton context="contact_hero" variant="outline-light" />
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold">Mağaza məlumatları</h2>
            <div className="mt-7">
              <StoreDetails />
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold">Mesaj yazın</h2>
            <p className="mt-2 text-[15px] text-muted">Formu doldurun — sizinlə əlaqə saxlayaq.</p>
            <div className="mt-7">
              <ContactForm mode={mode} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-label="Xəritə">
        <div className="container-x">
          <MapEmbed className="h-[380px] sm:h-[460px]" />
        </div>
      </section>
    </>
  );
}
