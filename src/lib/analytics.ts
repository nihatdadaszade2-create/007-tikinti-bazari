/**
 * Minimal, consent-aware event tracking.
 * Events are sent to Google Analytics 4 only when NEXT_PUBLIC_GA_ID is set AND
 * the visitor accepted analytics cookies. Otherwise calls are silently ignored.
 * No personal data (names, phone numbers, message text) is ever sent.
 */
export type TrackEvent =
  | { name: "whatsapp_click"; params: { context: string; item?: string } }
  | { name: "phone_click"; params: { context: string } }
  | { name: "product_view"; params: { item: string; category: string } }
  | { name: "search"; params: { search_term: string } }
  | { name: "contact_form_submit"; params: { method: "server" | "whatsapp" } };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event.name, event.params);
}

export const CONSENT_KEY = "007-analytics-consent";
