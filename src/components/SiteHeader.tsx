"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { site, phoneDisplay, telHref } from "@/config/site";
import { t } from "@/i18n";
import { Logo } from "./Logo";
import { WhatsAppButton, CallButton } from "./ContactButtons";
import { mainNav, isActive } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation; lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-[#111] text-[13px] text-white/70 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-yellow" aria-hidden="true" />
            {site.address.street}, {site.address.landmark}
          </p>
          <p className="flex items-center gap-5">
            <span className="font-semibold text-yellow">{site.slogan}</span>
            {telHref && phoneDisplay && (
              <a href={telHref} className="flex items-center gap-1.5 hover:text-white">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {phoneDisplay}
              </a>
            )}
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white/10 bg-ink">
        <div className="container-x flex h-[68px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Əsas menyu" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-md px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                        active ? "text-white" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {active && <span className="absolute inset-x-3.5 -bottom-[16px] h-[3px] bg-yellow" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton context="header" size="sm" label={t.cta.whatsappShort} className="hidden sm:inline-flex" />
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-ink lg:hidden">
        <nav aria-label="Mobil menyu" className="container-x py-6">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 font-display text-xl font-bold ${
                      active ? "text-yellow" : "text-white"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-white/30">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 grid gap-3">
            <WhatsAppButton context="mobile_menu" fullWidth />
            <CallButton context="mobile_menu" variant="outline-light" fullWidth />
          </div>
          <p className="mt-8 flex items-start gap-2 text-sm text-white/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
            {site.address.street}, {site.address.landmark}, {site.address.city}
          </p>
        </nav>
      </div>
    </header>
  );
}
