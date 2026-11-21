# 007 Tikinti Bazarı — website

Business website for **007 Tikinti Bazarı** (M. Mirqasımov küç. 29, Nəsimi bazarının yanı, Bakı).
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Azerbaijani UI, structured for RU/EN later.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (51 pre-rendered pages)
npm start          # serve the production build
```

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: hero, categories, featured products, rental promo, why us, store info + map, CTA |
| `/mehsullar` | Catalog: live search (diacritic-insensitive: `kerpic` finds `Kərpic`), sorting, filters, empty state |
| `/kateqoriya/<slug>` | 8 category pages, each with its own SEO title (e.g. "Santexnika malları Bakıda") |
| `/mehsullar/<slug>` | Product detail: image, description, specs, price/inquiry, WhatsApp CTA, related products |
| `/aletlerin-kirayesi` | Tool rental catalog + how-it-works |
| `/haqqimizda` | About |
| `/elaqe` | Contact: address, phone, hours, form, Google Map |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, domain, Instagram, GA | environment variables, see `.env.example` |
| Address, working hours, slogan | `src/config/site.ts` |
| Products | `src/data/products.ts` |
| Rental tools | `src/data/rental.ts` |
| Categories | `src/data/categories.ts` |
| UI text / translations | `src/i18n/dictionaries/az.ts` |
| Colours, buttons, cards (design system) | `src/app/globals.css` (`@theme` tokens + components) |

**Adding a product:** copy a record in `products.ts`, give it a unique `id` and `slug`, put the photo in
`public/images/products/`, set `image: "/images/products/<file>.webp"`, and set `price` plus `showPrice: true`
if the price should be shown. Set `isDemo: false` once the store has confirmed it.
Availability: `"in_stock" | "out_of_stock" | "on_order" | "unknown"`.

## Built-in safety behaviours

- **No number configured:** WhatsApp and call buttons show the message "nömrə tezliklə əlavə olunacaq" instead of linking to a guessed number. A yellow **DEMO** bar stays visible until the phone number and working hours are set.
- **Prices:** shown only when `showPrice: true` and a price is set. Otherwise the page shows "Qiymət üçün əlaqə saxlayın".
- **Contact form:** with Supabase configured, messages are saved on the server. Otherwise, if WhatsApp is configured, the form opens WhatsApp with the message pre-filled and says so honestly. If neither is configured, the form is disabled with a note. It never shows a fake "sent".
- **Spam protection:** honeypot field, minimum fill time, per-IP rate limit, size cap, and validation plus sanitising on both client and server.
- **Analytics:** GA4 loads only when `NEXT_PUBLIC_GA_ID` is set **and** the visitor accepts the consent banner. Tracked events: product views, searches, WhatsApp clicks, phone clicks, form submissions. No personal data is sent.

## Deploy (Vercel, recommended, free tier is enough)

1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project**, import the repo. The framework is auto-detected.
3. **Settings → Environment Variables**: add the values from `.env.example` (at least `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP` once confirmed).
4. Deploy. To use a custom domain (e.g. a `.az` domain), add it under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.
5. Changing an environment variable requires a **redeploy** (values are baked in at build time).

**Optional: contact form storage (Supabase).** Create a free project, run `supabase/schema.sql` in the SQL editor,
then add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only, never `NEXT_PUBLIC_`). Messages appear in
Supabase → Table Editor → `contact_messages`.

**Google Search Console:** add the property, choose "HTML tag", put the `content` value into `NEXT_PUBLIC_GSC_VERIFICATION`,
redeploy, verify, then submit `https://<domain>/sitemap.xml`. Also create a **Google Business Profile** for the store.
For local searches in Baku it matters as much as the website.

## Future: admin panel / RU-EN

- Products are typed static data today, which is fast and free. When the owner wants to edit products without a
  developer, move `products` / `rental` into Supabase tables. Only the functions in `src/data/*.ts` need to change,
  and the owner can then edit through Supabase's Table Editor (photos via Supabase Storage). No admin dashboard is built yet.
- Languages: see the steps in `src/i18n/config.ts`.

## Image credits

Photos in `public/images/` are from Unsplash (free to use under the Unsplash License). They are generic
illustrations, not photos of this store. Replace them with real store and product photos when available.
