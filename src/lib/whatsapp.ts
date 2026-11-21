import { site } from "@/config/site";

/**
 * Builds a wa.me link with a pre-filled message.
 * Returns null when no WhatsApp number is configured — callers must handle that
 * (never link to a guessed number).
 */
export function whatsappUrl(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
