import type { NextConfig } from "next";

/**
 * Two build targets:
 *  - default (Vercel / any Node host): full features incl. /api/contact and security headers
 *  - GITHUB_PAGES=true: static export into ./out, served under NEXT_PUBLIC_BASE_PATH
 *    (e.g. /007-tikinti-bazari). See .github/workflows/pages.yml.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isPages
    ? {
        output: "export",
        basePath,
        // Folder-per-page (mehsullar/index.html) so client prefetches stay inside the base path.
        trailingSlash: true,
        // Static hosting has no image optimiser; the loader only adds the base path.
        images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
