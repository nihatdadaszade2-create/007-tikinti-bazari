import { t } from "@/i18n";

export const mainNav = [
  { href: "/", label: t.nav.home },
  { href: "/mehsullar", label: t.nav.products },
  { href: "/aletlerin-kirayesi", label: t.nav.rental },
  { href: "/haqqimizda", label: t.nav.about },
  { href: "/elaqe", label: t.nav.contact },
] as const;

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/mehsullar" && pathname.startsWith("/kateqoriya"))
  );
}
