export const az = {
  nav: {
    home: "Ana səhifə",
    products: "Məhsullar",
    rental: "Alətlərin kirayəsi",
    about: "Haqqımızda",
    contact: "Əlaqə",
    menu: "Menyu",
    closeMenu: "Menyunu bağla",
    skipToContent: "Əsas məzmuna keç",
  },
  cta: {
    whatsapp: "WhatsApp ilə əlaqə",
    whatsappShort: "WhatsApp",
    askOnWhatsapp: "WhatsApp-da soruş",
    call: "Zəng et",
    viewProducts: "Məhsullara bax",
    viewAll: "Hamısına bax",
    details: "Ətraflı",
    directions: "Xəritədə yol tap",
  },
  price: {
    onRequest: "Qiymət üçün əlaqə saxlayın",
    rentalOnRequest: "Kirayə qiyməti üçün əlaqə saxlayın",
    currency: "₼",
  },
  availability: {
    in_stock: "Mövcuddur",
    out_of_stock: "Hazırda yoxdur",
    on_order: "Sifarişlə",
    unknown: "Mövcudluğu soruşun",
    available: "Kirayə üçün mövcuddur",
    rented: "Hazırda kirayədədir",
  },
  demo: {
    badge: "Nümunə",
    imagePending: "Şəkil tezliklə",
  },
  whatsapp: {
    general: "Salam. 007 Tikinti Bazarından məlumat almaq istəyirəm.",
    product: (name: string) =>
      `Salam. ${name} haqqında məlumat almaq istəyirəm. Qiyməti barədə məlumat verə bilərsiniz?`,
    rental: (name: string) =>
      `Salam. ${name} kirayəsi haqqında məlumat almaq istəyirəm. Kirayə şərtləri və qiyməti barədə məlumat verə bilərsiniz?`,
    notConfigured: "Əlaqə nömrəsi tezliklə əlavə olunacaq. Hələlik mağazamıza yaxınlaşa bilərsiniz.",
  },
  catalog: {
    searchLabel: "Məhsul axtar",
    searchPlaceholder: "Məs.: kombi, sement, plintus…",
    allCategories: "Bütün kateqoriyalar",
    sortLabel: "Sırala",
    sortFeatured: "Seçilmişlər əvvəl",
    sortAz: "Ad: A → Z",
    sortZa: "Ad: Z → A",
    results: (n: number) => `${n} məhsul`,
    clearFilters: "Filtrləri təmizlə",
    emptyTitle: "Heç nə tapılmadı",
    emptyText: "Axtardığınız məhsul siyahıda olmaya bilər, amma mağazada ola bilər. Bizə yazın — dəqiqləşdirək.",
  },
  hours: {
    title: "İş saatları",
    pending: "İş saatları tezliklə əlavə olunacaq",
  },
  phone: {
    pending: "Telefon nömrəsi tezliklə əlavə olunacaq",
  },
  demoBar:
    "Sayt hazırlanma mərhələsindədir: telefon nömrəsi, iş saatları və qiymətlər tezliklə əlavə olunacaq. Məhsul siyahısı nümunədir.",
} as const;

export type Dictionary = typeof az;
