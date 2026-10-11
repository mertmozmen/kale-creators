import type { Durum, Kriter, Profil } from "./types";

export type Soru = {
  id: string;
  metin: string;
  tip: "metin" | "uzun" | "secim" | "coklu";
  secenekler?: string[];
  yardim?: string;
  zorunlu?: boolean;
};

export const PROFIL_BILGI: Record<Profil, { ad: string; kisa: string; aciklama: string }> = {
  aktif: {
    ad: "Active Creator",
    kisa: "Zaten üretiyorum",
    aciklama: "Video, fotoğraf, tasarım, yayın veya sosyal medya içeriği hâlihazırda üreten üretici.",
  },
  yukselen: {
    ad: "Rising Creator",
    kisa: "Üretmeye başlamak istiyorum",
    aciklama: "Henüz içerik üretmeyen ama öğrenmeye, Kırıkkale'ye katkı sunmaya ve ortak projelere istekli aday.",
  },
};

export const ALANLAR = [
  "Video çekimi",
  "Kurgu",
  "Fotoğraf",
  "Tasarım",
  "Seslendirme",
  "Canlı yayın",
  "Sosyal medya yönetimi",
  "Yazı ve senaryo",
  "Yapay zekâ araçları",
  "Röportaj ve sunum",
];

export const SAAT_SECENEKLERI = ["2–4 saat", "5–8 saat", "9–15 saat", "15 saatten fazla"];

export const KONUM_SECENEKLERI: { id: "merkez" | "ilce" | "disarida"; ad: string }[] = [
  { id: "merkez", ad: "Kırıkkale merkez" },
  { id: "ilce", ad: "Kırıkkale'nin bir ilçesi" },
  { id: "disarida", ad: "Şehir dışındayım, Kırıkkale bağlantım var" },
];

/** Herkese sorulan sorular (PDF, bölüm 3) */
export const ORTAK_SORULAR: Soru[] = [
  {
    id: "neden",
    metin: "Neden Kale Creators'ın ilk 20 üyesinden biri olmak istiyorsun?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "hikaye",
    metin: "Kırıkkale'de anlatılması gerektiğini düşündüğün hikâye veya geliştirilmesi gereken konu nedir?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "hedef",
    metin: "Altı ay sonunda hangi becerileri kazanmak veya hangi projeyi tamamlamak istiyorsun?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "takim",
    metin: "Takım çalışması, geri bildirim ve editoryal değerlendirmeye yaklaşımın nedir?",
    tip: "uzun",
    yardim: "Üretilen her içerik yayın öncesi ekiple birlikte gözden geçirilir. Bu çalışma biçimine nasıl bakıyorsun?",
    zorunlu: true,
  },
];

/** Aktif üreticiler için ek sorular */
export const AKTIF_SORULAR: Soru[] = [
  {
    id: "hesaplar",
    metin: "Hesap bağlantılarını paylaş.",
    tip: "uzun",
    yardim: "Instagram, TikTok, YouTube veya diğer platformlar. Her satıra bir bağlantı.",
    zorunlu: true,
  },
  {
    id: "calismalar",
    metin: "En iyi üç çalışmanın bağlantısı.",
    tip: "uzun",
    yardim: "Her satıra bir bağlantı. Üçten az olabilir.",
    zorunlu: true,
  },
  {
    id: "ekipman",
    metin: "Hangi ekipman ve yazılımları kullanıyorsun?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "markaisi",
    metin: "Daha önce ücretli marka işi yaptın mı? Yaptıysan rolün neydi?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "musteri",
    metin: "Kendi bulduğun mevcut müşterilerin var mı?",
    tip: "uzun",
    yardim: "Üyelik öncesi belgeli müşterilerin, Kale Creators'ın müşteri koruma kapsamının dışında kalır. Burada belirtmen senin lehine.",
    zorunlu: true,
  },
];

/** Yeni başlayanlar için ek sorular */
export const YUKSELEN_SORULAR: Soru[] = [
  {
    id: "ilkvideo",
    metin: "Yarın ilk videonu çekecek olsan konusu ne olurdu?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "engel",
    metin: "Üretime başlamanı bugüne kadar ne engelledi?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "beceri",
    metin: "Öğrenmek istediğin ilk üç beceri nedir?",
    tip: "uzun",
    zorunlu: true,
  },
  {
    id: "proje",
    metin: "Kırıkkale için gerçekleştirmek istediğin bir içerik projesini tarif et.",
    tip: "uzun",
    zorunlu: true,
  },
];

export const profilSorulari = (p: Profil) => (p === "aktif" ? AKTIF_SORULAR : YUKSELEN_SORULAR);

export const TUM_SORULAR: Record<string, Soru> = Object.fromEntries(
  [...ORTAK_SORULAR, ...AKTIF_SORULAR, ...YUKSELEN_SORULAR].map((s) => [s.id, s]),
);

export const KRITERLER: { id: Kriter; ad: string; aciklama: string }[] = [
  { id: "ozgunluk", ad: "Özgünlük", aciklama: "Bakış açısı ve anlatım kendine özgü mü?" },
  { id: "kalite", ad: "Kalite / potansiyel", aciklama: "Mevcut işlerin ya da fikirlerin seviyesi." },
  { id: "gelisim", ad: "Gelişim isteği", aciklama: "Geri bildirime ve öğrenmeye açıklık." },
  { id: "sureklilik", ad: "Süreklilik", aciklama: "Zaman ayırma ve devamlılık ihtimali." },
  { id: "sehir", ad: "Şehre katkı", aciklama: "Kırıkkale'yi anlatma motivasyonu ve fikirleri." },
];

export const DURUMLAR: { id: Durum; ad: string; renk: string; aciklama: string }[] = [
  { id: "yeni", ad: "Yeni", renk: "bg-steel/20 text-ink", aciklama: "Henüz incelenmedi." },
  { id: "on_degerlendirme", ad: "Ön değerlendirme", renk: "bg-sky text-sky-ink", aciklama: "Form ve çalışmalar inceleniyor." },
  { id: "gorusme", ad: "Görüşme", renk: "bg-sun text-sun-ink", aciklama: "Kısa görüşmeye davet edildi." },
  { id: "teklif", ad: "Kabul teklifi", renk: "bg-lilac text-lilac-ink", aciklama: "Teklif iletildi, sözleşme bekleniyor." },
  { id: "kabul", ad: "Kabul edildi", renk: "bg-mint text-mint-ink", aciklama: "Kurucu üye." },
  { id: "ret", ad: "Olumsuz", renk: "bg-rose text-rose-ink", aciklama: "Bu dönem için uygun bulunmadı." },
];

export const DURUM_MAP = Object.fromEntries(DURUMLAR.map((d) => [d.id, d])) as Record<Durum, (typeof DURUMLAR)[number]>;

/** Kabul akışındaki sıra (PDF, bölüm 3): web başvurusu → ön değerlendirme → görüşme → teklif → kabul */
export const DURUM_SIRASI: Durum[] = ["yeni", "on_degerlendirme", "gorusme", "teklif", "kabul"];

export const sonrakiDurum = (d: Durum): Durum | null => {
  const i = DURUM_SIRASI.indexOf(d);
  return i >= 0 && i < DURUM_SIRASI.length - 1 ? DURUM_SIRASI[i + 1] : null;
};

export const toplamPuan = (p: Partial<Record<Kriter, number>>) =>
  KRITERLER.reduce((t, k) => t + (p[k.id] ?? 0), 0);

export const puanlandiMi = (p: Partial<Record<Kriter, number>>) => KRITERLER.every((k) => (p[k.id] ?? 0) > 0);
