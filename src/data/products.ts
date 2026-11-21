import type { Product } from "./types";

/**
 * ───────────────────────────────────────────────────────────────
 *  PRODUCT LIST — DEMONSTRATION CONTENT
 * ───────────────────────────────────────────────────────────────
 *  Product groups come from the store's business card, but individual records,
 *  descriptions and images are SAMPLES (isDemo: true). No prices or stock
 *  levels are claimed: price = null, availability = "unknown".
 *
 *  To add a real product: copy a record, set a unique id + slug, put the photo
 *  in /public/images/products/, set price + showPrice: true if the owner wants
 *  it displayed, and set isDemo: false.
 */

type Draft = Omit<Product, "price" | "showPrice" | "availability" | "isDemo" | "specifications" | "featured" | "image"> &
  Partial<Pick<Product, "price" | "showPrice" | "availability" | "isDemo" | "specifications" | "featured" | "image">>;

const demo = (p: Draft): Product => ({
  price: null,
  showPrice: false,
  availability: "unknown",
  isDemo: true,
  specifications: [],
  featured: false,
  image: null,
  ...p,
});

export const products: Product[] = [
  // ── Kombi və istilik ───────────────────────────────────────────
  demo({
    id: "p-kombi",
    slug: "kombi",
    name: "Kombi",
    category: "kombi-istilik",
    shortDescription: "Mənzil və fərdi evlər üçün istilik və isti su kombiləri.",
    description:
      "Mənzil və fərdi evlərin istilik və isti su təminatı üçün kombilər. Sahəyə və istifadəyə uyğun gücün seçilməsində məsləhət veririk. Mövcud modellər və qiymətlər üçün bizimlə əlaqə saxlayın.",
    specifications: [{ label: "Təyinatı", value: "İstilik və isti su" }],
    featured: true,
  }),
  demo({
    id: "p-radiator",
    slug: "radiator",
    name: "Radiator",
    category: "kombi-istilik",
    shortDescription: "Kombi sistemləri üçün müxtəlif ölçülü radiatorlar.",
    description:
      "Kombi və mərkəzi istilik sistemləri üçün radiatorlar. Otağın ölçüsünə görə lazım olan seksiya sayını hesablamağa kömək edirik.",
    specifications: [{ label: "Təyinatı", value: "Otaq istiliyi" }],
    featured: true,
  }),
  demo({
    id: "p-isti-doseme-borusu",
    slug: "isti-doseme-borusu",
    name: "İsti döşəmə boruları",
    category: "kombi-istilik",
    shortDescription: "Döşəmədən istilik sistemləri üçün borular.",
    description: "Döşəmədən istilik (isti döşəmə) sistemlərinin quraşdırılması üçün borular və aksesuarlar.",
  }),

  // ── Santexnika ─────────────────────────────────────────────────
  demo({
    id: "p-kollektor",
    slug: "kollektor",
    name: "Kollektor",
    category: "santexnika",
    shortDescription: "Su və istilik xətlərinin paylanması üçün kollektorlar.",
    description:
      "Su təchizatı və isti döşəmə sistemlərində xətlərin paylanması üçün kollektorlar. Çıxış sayına görə seçim üçün bizə yazın.",
    featured: true,
  }),
  demo({
    id: "p-su-borulari",
    slug: "su-borulari",
    name: "Su boruları",
    category: "santexnika",
    shortDescription: "Daxili su xətləri üçün borular və birləşdiricilər.",
    description: "Mənzil və evlərdə daxili su xətlərinin çəkilməsi üçün borular və birləşdirici elementlər.",
  }),
  demo({
    id: "p-su-motoru",
    slug: "su-motoru",
    name: "Su motoru",
    category: "santexnika",
    shortDescription: "Su təzyiqinin artırılması və su vurulması üçün motorlar.",
    description: "Evdə su təzyiqini artırmaq və ya çəndən su vurmaq üçün su motorları (nasoslar).",
    featured: true,
  }),
  demo({
    id: "p-qaz-borusu",
    slug: "qaz-borusu",
    name: "Qaz borusu",
    category: "santexnika",
    shortDescription: "Qaz xətləri üçün borular.",
    description: "Məişət qaz xətlərinin çəkilməsi üçün borular. Quraşdırma işləri səlahiyyətli mütəxəssis tərəfindən aparılmalıdır.",
  }),
  demo({
    id: "p-su-qizdiricisi",
    slug: "su-qizdiricisi",
    name: "Su qızdırıcısı",
    category: "santexnika",
    shortDescription: "Mənzil və evlər üçün su qızdırıcıları.",
    description: "Mətbəx və hamam üçün su qızdırıcıları. Həcm və növ seçimi üçün bizimlə əlaqə saxlayın.",
  }),

  // ── Elektrik ───────────────────────────────────────────────────
  demo({
    id: "p-lustr",
    slug: "lustr",
    name: "Lüstr",
    category: "elektrik",
    shortDescription: "Qonaq otağı, yataq otağı və mətbəx üçün lüstrlər.",
    description: "Müxtəlif interyerlər üçün lüstrlər. Mövcud modelləri WhatsApp vasitəsilə soruşa bilərsiniz.",
    featured: true,
  }),
  demo({
    id: "p-led-isiqlar",
    slug: "led-isiqlar-ve-lampalar",
    name: "LED işıqlar və lampalar",
    category: "elektrik",
    shortDescription: "Enerjiyə qənaət edən LED işıqlar və lampalar.",
    description: "Ev və iş yerləri üçün LED işıqlar, spot işıqlar və lampalar.",
  }),
  demo({
    id: "p-elektrik-naqili",
    slug: "elektrik-naqilleri",
    name: "Elektrik naqilləri",
    category: "elektrik",
    shortDescription: "Daxili elektrik xətləri üçün naqillər.",
    description: "Mənzil təmiri və yeni tikinti üçün elektrik naqilləri. Lazım olan kəsiyi yükə görə seçməkdə kömək edirik.",
  }),
  demo({
    id: "p-yuva-acar",
    slug: "elektrik-yuvasi-ve-acari",
    name: "Elektrik yuvası və açarı",
    category: "elektrik",
    shortDescription: "Rozetkalar və işıq açarları.",
    description: "Daxili quraşdırma üçün elektrik yuvaları (rozetkalar) və işıq açarları.",
  }),

  // ── Tikinti materialları ───────────────────────────────────────
  demo({
    id: "p-alcipan",
    slug: "alcipan",
    name: "Alçipan",
    category: "tikinti-materiallari",
    shortDescription: "Arakəsmə və asma tavan işləri üçün alçipan lövhələr.",
    description: "Arakəsmələr, asma tavanlar və divar örtükləri üçün alçipan lövhələr. Profil və bərkidicilərlə birlikdə təklif olunur.",
    featured: true,
  }),
  demo({
    id: "p-profil",
    slug: "profil-ve-eqreb",
    name: "Profil və əqrəb",
    category: "tikinti-materiallari",
    shortDescription: "Alçipan karkası üçün profillər və birləşdiricilər.",
    description: "Alçipan konstruksiyalarının karkası üçün metal profillər və əqrəb birləşdiriciləri.",
  }),
  demo({
    id: "p-sement",
    slug: "sement",
    name: "Sement",
    category: "tikinti-materiallari",
    shortDescription: "Hörgü, suvaq və beton işləri üçün sement.",
    description: "Hörgü, suvaq və beton işləri üçün sement.",
    featured: true,
  }),
  demo({
    id: "p-spaklyovka",
    slug: "spaklyovka",
    name: "Şpaklyovka",
    category: "tikinti-materiallari",
    shortDescription: "Divar və tavanların hamarlanması üçün.",
    description: "Boyadan və ya divar kağızından əvvəl divar və tavan səthlərinin hamarlanması üçün şpaklyovka.",
  }),
  demo({
    id: "p-qum-atsep",
    slug: "qum-ve-atsep",
    name: "Qum və atsep",
    category: "tikinti-materiallari",
    shortDescription: "Məhlul və beton qarışıqları üçün.",
    description: "Hörgü məhlulu, suvaq və beton qarışıqları üçün qum və atsep.",
  }),
  demo({
    id: "p-kerpic",
    slug: "kerpic",
    name: "Kərpic",
    category: "tikinti-materiallari",
    shortDescription: "Divar hörgüsü üçün kərpic.",
    description: "Divar və arakəsmə hörgüsü üçün kərpic.",
  }),
  demo({
    id: "p-taxta-dikt",
    slug: "taxta-dikt-reyka",
    name: "Taxta, dikt və reyka",
    category: "tikinti-materiallari",
    shortDescription: "Karkas, qəlib və köməkçi işlər üçün taxta materiallar.",
    description: "Tikinti və təmir işləri üçün taxta, dikt və reyka.",
  }),

  // ── Boya və rəngləmə ───────────────────────────────────────────
  demo({
    id: "p-boyalar",
    slug: "boyalar",
    name: "Boyalar",
    category: "boya-rengleme",
    shortDescription: "Daxili və xarici işlər üçün boyalar.",
    description:
      "Daxili və xarici səthlər üçün boyalar. Mağazamızda rənglər kompüterlə hazırlanır — istədiyiniz çaları nümunəyə görə seçə bilərsiniz.",
    image: "/images/paint-roller.webp",
    imageAlt: "Divarın rulonla boyanması",
    featured: true,
  }),
  demo({
    id: "p-komputerle-reng",
    slug: "komputerle-rengin-hazirlanmasi",
    name: "Kompüterlə rəngin hazırlanması",
    category: "boya-rengleme",
    shortDescription: "Boyanın istədiyiniz çalarda kompüterlə hazırlanması.",
    description:
      "Rəng kataloqundan və ya gətirdiyiniz nümunəyə görə boyanın kompüterlə hazırlanması xidməti. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.",
    specifications: [{ label: "Növü", value: "Xidmət" }],
  }),

  // ── Laminat və döşəmə ──────────────────────────────────────────
  demo({
    id: "p-laminat",
    slug: "laminat",
    name: "Laminat",
    category: "laminat-doseme",
    shortDescription: "Yaşayış sahələri üçün laminat döşəmə.",
    description: "Yaşayış və ofis sahələri üçün laminat döşəmə. Çeşid və qiymətlər üçün bizimlə əlaqə saxlayın.",
    image: "/images/wood-floor.webp",
    imageAlt: "Laminat döşəməli işıqlı otaq",
    featured: true,
  }),
  demo({
    id: "p-lambirin",
    slug: "lambirin",
    name: "Lambirin",
    category: "laminat-doseme",
    shortDescription: "Divar və tavan üzlüyü üçün panellər.",
    description: "Divar və tavanların üzlənməsi üçün lambirin panellər.",
  }),
  demo({
    id: "p-plintus",
    slug: "plintus",
    name: "Plintus",
    category: "laminat-doseme",
    shortDescription: "Döşəmə ilə divarın birləşməsi üçün plintuslar.",
    description: "Döşəmə ilə divar arasındakı birləşməni tamamlamaq üçün plintuslar.",
  }),
  demo({
    id: "p-pencerealti",
    slug: "pencerealti",
    name: "Pəncərəaltı",
    category: "laminat-doseme",
    shortDescription: "Pəncərə altlıqları.",
    description: "Pəncərə altı səthlər üçün altlıqlar (pəncərəaltı).",
  }),
  demo({
    id: "p-paduqa",
    slug: "paduqa-ve-lustralti",
    name: "Paduqa və lüstraltı",
    category: "laminat-doseme",
    shortDescription: "Tavan karnizləri və lüstr altlıqları.",
    description: "Tavan ilə divarın birləşməsi üçün paduqalar və lüstr altlıqları (lüstraltı).",
  }),

  // ── Təsərrüfat malları ─────────────────────────────────────────
  demo({
    id: "p-mebel-aksesuar",
    slug: "mebel-aksesuarlari",
    name: "Mebel aksesuarları",
    category: "teserrufat",
    shortDescription: "Tutacaqlar, menteşələr və digər mebel furniturası.",
    description: "Mebel quraşdırılması və təmiri üçün aksesuarlar və furnitura.",
  }),
  demo({
    id: "p-qapi-ceftesi",
    slug: "qapi-ceftesi",
    name: "Qapı cəftəsi",
    category: "teserrufat",
    shortDescription: "Daxili və giriş qapıları üçün cəftələr.",
    description: "Daxili və giriş qapıları üçün cəftələr.",
  }),

  // ── Tikinti alətləri ───────────────────────────────────────────
  demo({
    id: "p-drel",
    slug: "drel",
    name: "Drel",
    category: "tikinti-aletleri",
    shortDescription: "Deşmə və vintləmə işləri üçün drellər.",
    description: "Ağac, metal və divarda deşmə və vintləmə işləri üçün drellər. Bu aləti kirayəyə də götürə bilərsiniz — kirayə şərtlərini soruşun.",
    image: "/images/drill-yellow.webp",
    imageAlt: "Akkumulyatorlu sarı drel",
    specifications: [{ label: "Növü", value: "Elektrik aləti" }],
    featured: true,
  }),
  demo({
    id: "p-laqonda",
    slug: "laqonda",
    name: "Laqonda",
    category: "tikinti-aletleri",
    shortDescription: "Kəsmə və cilalama üçün bucaq daşlama maşını.",
    description: "Metal, daş və plitələrin kəsilməsi və cilalanması üçün laqonda (bucaq daşlama maşını).",
    specifications: [{ label: "Növü", value: "Elektrik aləti" }],
  }),
  demo({
    id: "p-lobzik",
    slug: "lobzik",
    name: "Lobzik",
    category: "tikinti-aletleri",
    shortDescription: "Əyri və düz kəsiklər üçün elektrik mişarı.",
    description: "Ağac, dikt və laminatda düz və əyri kəsiklər üçün lobzik.",
    specifications: [{ label: "Növü", value: "Elektrik aləti" }],
  }),
];

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export function countByCategory(): Record<string, number> {
  return products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
}
