"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { cleanContact, validateContact, LIMITS, type ContactErrors, type ContactInput } from "@/lib/contact";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./Icon";

type Mode = "server" | "whatsapp" | "none";
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "handed_off" }
  | { kind: "error"; message: string };

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "Çox sayda müraciət göndərildi. Bir az sonra yenidən cəhd edin.",
  invalid: "Məlumatları yoxlayın və yenidən göndərin.",
  default: "Mesaj göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya WhatsApp ilə yazın.",
};

/**
 * mode = "server"   → POST /api/contact (Supabase configured)
 * mode = "whatsapp" → opens WhatsApp with the message pre-filled (no backend yet)
 * mode = "none"     → neither configured: form is shown but disabled, with a clear note
 */
export function ContactForm({ mode }: { mode: Mode }) {
  const [values, setValues] = useState<ContactInput>({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (key: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mode === "none" || status.kind === "submitting") return;

    const input = cleanContact(values as unknown as Record<string, unknown>);
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    if (mode === "whatsapp") {
      const text = `Salam. Saytdan yazıram.\nAd: ${input.name}\nTelefon: ${input.phone}\n\n${input.message}`;
      const href = whatsappUrl(text);
      if (!href) return;
      window.open(href, "_blank", "noopener,noreferrer");
      track({ name: "contact_form_submit", params: { method: "whatsapp" } });
      setStatus({ kind: "handed_off" });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: ContactErrors };
      if (res.ok && data.ok) {
        track({ name: "contact_form_submit", params: { method: "server" } });
        setStatus({ kind: "sent" });
        setValues({ name: "", phone: "", message: "" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus({ kind: "error", message: ERROR_TEXT[data.code ?? ""] ?? ERROR_TEXT.default });
    } catch {
      setStatus({ kind: "error", message: ERROR_TEXT.default });
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
        <h3 className="text-xl font-bold">Mesajınız göndərildi</h3>
        <p className="text-[15px] text-ink-2">Təşəkkür edirik! Qısa zamanda göstərdiyiniz nömrə ilə əlaqə saxlayacağıq.</p>
        <button type="button" className="btn btn-outline btn-sm mt-2" onClick={() => setStatus({ kind: "idle" })}>
          Yeni mesaj yaz
        </button>
      </div>
    );
  }

  const disabled = mode === "none";
  const field = (key: keyof ContactInput) => ({
    id: `cf-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    disabled,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `cf-${key}-error` : undefined,
    maxLength: LIMITS[key],
    className: "field",
  });
  const errorText = (key: keyof ContactInput) =>
    errors[key] ? (
      <p id={`cf-${key}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13.5px] font-medium text-[#b71c1c]">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {disabled && (
        <p className="rounded-lg border border-dashed border-line bg-paper px-4 py-3 text-[14px] text-muted">
          Əlaqə forması əlaqə nömrəsi təyin edildikdən sonra aktiv olacaq. Hələlik mağazamıza yaxınlaşa bilərsiniz.
        </p>
      )}

      {/* Honeypot — hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Vebsayt</label>
        <input ref={honeypot} id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[14px] font-semibold text-ink">
            Adınız <span aria-hidden="true">*</span>
          </label>
          <input {...field("name")} type="text" autoComplete="name" required />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-[14px] font-semibold text-ink">
            Telefon nömrəniz <span aria-hidden="true">*</span>
          </label>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+994 __ ___ __ __" required />
          {errorText("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[14px] font-semibold text-ink">
          Mesajınız <span aria-hidden="true">*</span>
        </label>
        <textarea {...field("message")} rows={5} required placeholder="Hansı məhsul və ya xidmət maraqlandırır?" className="field resize-y" />
        <div className="flex justify-between gap-3">
          {errorText("message") ?? <span />}
          <span className="mt-1.5 text-[12px] text-muted">
            {values.message.length}/{LIMITS.message}
          </span>
        </div>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-[14px] font-medium text-[#b71c1c]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {status.message}
        </p>
      )}
      {status.kind === "handed_off" && (
        <p role="status" className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-900">
          <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0" />
          WhatsApp açıldı — mesajınız hazırdır, göndərmək üçün WhatsApp-da “Göndər” düyməsini sıxın.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-muted">Məlumatlarınız yalnız sizinlə əlaqə üçün istifadə olunur.</p>
        <button type="submit" disabled={disabled || status.kind === "submitting"} className={`btn ${mode === "whatsapp" ? "btn-wa" : "btn-dark"} disabled:cursor-not-allowed disabled:opacity-50`}>
          {status.kind === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Göndərilir…
            </>
          ) : mode === "whatsapp" ? (
            <>
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp ilə göndər
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Göndər
            </>
          )}
        </button>
      </div>
    </form>
  );
}
