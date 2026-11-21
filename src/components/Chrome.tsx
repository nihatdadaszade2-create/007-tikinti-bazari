import Link from "next/link";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { site, isDemoMode, phoneDisplay, telHref, mapsDirectionsUrl } from "@/config/site";
import { categories } from "@/data/categories";
import { t } from "@/i18n";
import { Logo } from "./Logo";
import { WhatsAppButton, CallButton } from "./ContactButtons";
import { mainNav } from "./nav";

/** Clearly labels the site as pre-launch while phone / hours / prices are missing. */
export function DemoBar() {
  if (!isDemoMode) return null;
  return (
    <div className="bg-yellow text-ink">
      <p className="container-x py-2 text-center text-[12.5px] font-medium leading-snug">
        <strong className="mr-1.5 font-extrabold uppercase tracking-wide">Demo</strong>
        {t.demoBar}
      </p>
    </div>
  );
}

/** Sticky bottom bar on phones — contact is always one tap away. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-[1fr_1.4fr] gap-2.5">
        <CallButton context="mobile_bar" variant="outline" />
        <WhatsAppButton context="mobile_bar" label="WhatsApp" />
      </div>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grid-dark text-white/70">
      <div className="hazard h-1.5" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
            Tikinti materialları, santexnika, elektrik malları, kombi və istilik sistemləri, alət kirayəsi — bir ünvanda.
          </p>
          <p className="mt-4 font-display text-lg font-bold text-yellow">{site.slogan}</p>
        </div>

        <nav aria-label="Səhifələr">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Səhifələr</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-yellow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kateqoriyalar">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Kateqoriyalar</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/kateqoriya/${c.slug}`} className="hover:text-yellow">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Əlaqə</h2>
          <ul className="mt-5 space-y-4 text-[15px]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
                {site.address.street}, {site.address.landmark}, {site.address.city}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
              {telHref ? (
                <a href={telHref} className="hover:text-yellow">
                  {phoneDisplay}
                </a>
              ) : (
                <span className="italic text-white/50">{t.phone.pending}</span>
              )}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
              {site.workingHours ? (
                <span>{site.workingHours.map((h) => `${h.days}: ${h.hours}`).join(" · ")}</span>
              ) : (
                <span className="italic text-white/50">{t.hours.pending}</span>
              )}
            </li>
            {site.instagram && (
              <li className="flex gap-3">
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 pb-28 text-[13px] text-white/50 sm:flex-row sm:justify-between md:pb-6">
          <p>
            © {year} {site.name}. Bütün hüquqlar qorunur.
          </p>
          <p>Bakı, Azərbaycan</p>
        </div>
      </div>
    </footer>
  );
}
