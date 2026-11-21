import Link from "next/link";
import { site } from "@/config/site";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${site.name} — ana səhifə`}>
      <span className="grid h-10 w-[52px] place-items-center rounded-md bg-yellow font-display text-[22px] font-black tracking-tight text-ink shadow-[inset_0_-3px_0_rgb(0_0_0/0.12)]">
        007
      </span>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-display text-[17px] font-extrabold tracking-[0.02em]">TİKİNTİ</span>
        <span className="mt-0.5 text-[11px] font-semibold tracking-[0.32em] opacity-70">BAZARI</span>
      </span>
    </Link>
  );
}
