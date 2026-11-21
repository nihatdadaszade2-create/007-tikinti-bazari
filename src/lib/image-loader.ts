/**
 * Image loader for the static GitHub Pages build: images are already optimised
 * WebP files, so it only prefixes the base path. `w` is appended so each size
 * gets a distinct URL (static hosts ignore it).
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  if (!src.startsWith("/")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}?w=${width}`;
}
