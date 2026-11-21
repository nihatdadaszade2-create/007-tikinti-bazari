"use client";

import { Phone } from "lucide-react";
import { telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { t } from "@/i18n";
import { WhatsAppIcon } from "./Icon";
import { notify } from "./toast";

type Variant = "wa" | "primary" | "dark" | "outline" | "outline-light";

interface Common {
  /** Where on the site the click happened — used for analytics. */
  context: string;
  label?: string;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  fullWidth?: boolean;
}

const cls = (variant: Variant, size: "sm" | "md", fullWidth?: boolean, extra = "") =>
  ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", fullWidth ? "w-full" : "", extra].filter(Boolean).join(" ");

/**
 * Opens WhatsApp with a pre-filled message. If no number is configured yet,
 * it explains that instead of linking anywhere.
 */
export function WhatsAppButton({
  message = t.whatsapp.general,
  item,
  context,
  label = t.cta.whatsapp,
  variant = "wa",
  size = "md",
  className,
  fullWidth,
}: Common & { message?: string; item?: string }) {
  const href = whatsappUrl(message);
  const onClick = () => track({ name: "whatsapp_click", params: { context, item } });

  if (!href) {
    return (
      <button type="button" className={cls(variant, size, fullWidth, className)} onClick={() => notify(t.whatsapp.notConfigured)}>
        <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
        {label}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls(variant, size, fullWidth, className)} onClick={onClick}>
      <WhatsAppIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      {label}
      <span className="sr-only"> (yeni pəncərədə açılır)</span>
    </a>
  );
}

export function CallButton({ context, label = t.cta.call, variant = "outline", size = "md", className, fullWidth }: Common) {
  if (!telHref) {
    return (
      <button type="button" className={cls(variant, size, fullWidth, className)} onClick={() => notify(t.phone.pending)}>
        <Phone className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    );
  }
  return (
    <a href={telHref} className={cls(variant, size, fullWidth, className)} onClick={() => track({ name: "phone_click", params: { context } })}>
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
