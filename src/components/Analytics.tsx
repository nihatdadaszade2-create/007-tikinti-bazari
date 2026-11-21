"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { CONSENT_KEY } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Google Analytics 4 — loaded ONLY when NEXT_PUBLIC_GA_ID is set and the visitor
 * accepts. Without a GA ID this component renders nothing (no banner, no script).
 */
export function Analytics() {
  const gaId = site.analytics.gaId;
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  if (!gaId || !ready) return null;

  const choose = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* storage blocked — choice applies to this visit only */
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === null && (
        <div
          role="dialog"
          aria-label="Statistika kukiləri"
          className="fixed inset-x-3 bottom-24 z-[55] mx-auto max-w-lg rounded-xl border border-line bg-white p-4 shadow-2xl md:bottom-6"
        >
          <p className="text-[14px] leading-relaxed text-ink-2">
            Saytı yaxşılaşdırmaq üçün anonim ziyarət statistikasından (Google Analytics) istifadə etmək istəyirik. Razısınız?
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn btn-dark btn-sm" onClick={() => choose("granted")}>
              Razıyam
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => choose("denied")}>
              Xeyr
            </button>
          </div>
        </div>
      )}
    </>
  );
}
