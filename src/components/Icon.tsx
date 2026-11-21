import { BrickWall, Droplet, Drill, Flame, Home, Layers, PaintRoller, Wrench, Zap, type LucideProps } from "lucide-react";
import type { IconName } from "@/data/types";

const map = {
  droplet: Droplet,
  zap: Zap,
  flame: Flame,
  brick: BrickWall,
  paint: PaintRoller,
  layers: Layers,
  home: Home,
  wrench: Wrench,
  drill: Drill,
} satisfies Record<IconName, unknown>;

export function CategoryIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" {...props} />;
}

/** WhatsApp glyph (lucide has no brand icons). */
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.41 4.41-9.82 9.84-9.82a9.75 9.75 0 0 1 6.95 2.88 9.75 9.75 0 0 1 2.88 6.95c0 5.42-4.41 9.82-9.83 9.82m8.36-18.18A11.73 11.73 0 0 0 12.05.17C5.5.17.17 5.5.17 12.04c0 2.1.55 4.13 1.58 5.93L.07 24l6.17-1.62a11.83 11.83 0 0 0 5.8 1.48h.01c6.55 0 11.87-5.33 11.88-11.88a11.8 11.8 0 0 0-3.48-8.41" />
    </svg>
  );
}
