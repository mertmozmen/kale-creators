/** Kamuya açık sayfa metinleri. Strateji belgesi (11 Ekim 2026) + kullanıcı bilgileri. */

export const MARKA = {
  ad: "Kale Creators",
  slogan: "Kırıkkale'nin içerik üretici topluluğu.",
  altSlogan: "Üretiyoruz, gelişiyoruz, birlikte büyüyoruz.",
  bio: "Şehrin yaratıcı gücünü bir araya getiriyoruz.",
  domain: "kalecreators.com",
  instagram: "kalecreators",
  telefon: "+90 505 787 63 48",
  telefonHam: "+905057876348",
  adres: "Yenişehir Mahallesi, Atatürk Caddesi",
  ilce: "Yahşihan / Kırıkkale",
  haritaEmbed:
    "https://www.google.com/maps?q=Yeni%C5%9Fehir+Mahallesi+Atat%C3%BCrk+Caddesi+Yah%C5%9Fihan+K%C4%B1r%C4%B1kkale&z=15&output=embed",
  haritaLink: "https://www.google.com/maps/search/?api=1&query=Yeni%C5%9Fehir+Mahallesi+Atat%C3%BCrk+Caddesi+Yah%C5%9Fihan+K%C4%B1r%C4%B1kkale",
};

/** Kırıkkale'ye özgü: anlatılmayı bekleyen hikâyeler */
export const SEHIR_HIKAYELERI = [
  {
    no: "01",
    baslik: "Çeliğin ustaları",
    metin: "Şehrin yarısı MKE'de büyüdü. Tezgâh başındaki ustaların, emekli mühendislerin ve fabrika lojmanlarının hikâyesi kayıt altına alınmadı.",
    etiket: "Belgesel seri",
  },
  {
    no: "02",
    baslik: "Kızılırmak kıyısı",
    metin: "Yahşihan'dan Keskin'e, Delice'den Sulakyurt'a; ilçeler görünmez kaldı. Her ilçeye bir kısa film, her kıyıya bir hikâye.",
    etiket: "İlçe serisi",
  },
  {
    no: "03",
    baslik: "Kampüsten şehre",
    metin: "Kırıkkale Üniversitesi'ne gelen binlerce öğrenci şehri tanımadan mezun oluyor. Öğrenci gözünden rehber, mekân ve esnaf içerikleri.",
    etiket: "Rehber",
  },
  {
    no: "04",
    baslik: "Esnafın vitrini",
    metin: "Hürriyet Caddesi'nden Yenişehir'e işletmelerin dijitalde görünür olması. Ücretli marka projelerinin ilk durağı burası.",
    etiket: "Marka projeleri",
  },
];

export const AVANTAJLAR = [
  {
    baslik: "Ayda iki eğitim",
    metin: "Kurgu, çekim, seslendirme, reklam ve yapay zekâ araçları üzerine eğitim ve mentorluk oturumları.",
    ikon: "egitim",
  },
  {
    baslik: "Ekipman ve stüdyo",
    metin: "Rezervasyonla kamera, ses ve ışık ekipmanı; Yahşihan'daki çekim alanına erişim. Teslim-tesellüm kaydıyla.",
    ikon: "ekipman",
  },
  {
    baslik: "Ücretli marka projeleri",
    metin: "Network'ün bulduğu işletme işleri üyelerle eşleştirilir; her proje yazılı görevlendirme ve şeffaf paylaşımla yürür.",
    ikon: "proje",
  },
  {
    baslik: "Ortak yapımlar",
    metin: "Şehir hikâyeleri, röportajlar, içerik serileri ve ortak çekimler. Tek başına çıkaramayacağın işler.",
    ikon: "ortak",
  },
  {
    baslik: "Aylık üretici ödülü",
    metin: "Özgünlük, kalite, gelişim, süreklilik ve şehre katkı kriterleriyle her ay bir üretici ödüllendirilir.",
    ikon: "odul",
  },
  {
    baslik: "Üye paneli",
    metin: "Eğitim takvimi, proje teklifleri, ekipman rezervasyonu, onay kuyruğu ve performans görünümü tek yerde.",
    ikon: "panel",
  },
];

export const KABUL_AKISI = [
  { ad: "Web başvurusu", metin: "Bu sitedeki formu doldurursun. 10 dakika sürer." },
  { ad: "Ön değerlendirme", metin: "Cevaplarını ve varsa çalışmalarını inceleriz." },
  { ad: "Kısa görüşme", metin: "Yahşihan'da yüz yüze ya da çevrim içi 20 dakikalık sohbet." },
  { ad: "Kabul teklifi", metin: "Uygun bulunursan yazılı teklif iletilir." },
  { ad: "Sözleşme ve aydınlatma", metin: "Üyelik sözleşmesi ve KVKK metinleri imzalanır." },
  { ad: "Oryantasyon", metin: "Ekip, araçlar, yayın ilkeleri ve panel tanıtımı." },
  { ad: "Eğitim ve proje takvimi", metin: "İlk eğitim oturumu ve ilk ortak içerik." },
];

export const SSS = [
  {
    soru: "Hesaplarım bana mı ait kalacak?",
    cevap: "Evet. Üyeler kişisel hesaplarını ve bağımsız üretici kimliklerini korur. Kale Creators hesabına el koymaz, şifreni istemez.",
  },
  {
    soru: "Yayın öncesi inceleme ne demek?",
    cevap: "Üyelik kapsamında kamuya açık paylaşımlar, yayından önce ekiple gözden geçirilir. Amaç kalite ve marka güvenliği; siyasi görüş, hukuka uygun eleştiri, mizah veya özel hayat tercihi inceleme konusu değildir. Ret ve revizyon talepleri gerekçeli yazılır.",
  },
  {
    soru: "Hiç içerik üretmedim, başvurabilir miyim?",
    cevap: "Evet. Rising Creator profili tam olarak bunun için var. Kontenjanın yaklaşık yarısı yeni başlayanlara ayrılmıştır.",
  },
  {
    soru: "Ücretli işlerde para nasıl paylaşılıyor?",
    cevap: "Network'ün bulup yönettiği projelerde paylaşım önceden yazılı olarak belirlenir. Kendi bulduğun ve ağ kaynaklarını kullanmadığın işler tamamen sana aittir; üyelik öncesi müşterilerin koruma kapsamı dışındadır.",
  },
  {
    soru: "Kırıkkale dışında yaşıyorum, olur mu?",
    cevap: "Kırıkkale bağın varsa ve çekimler için şehre gelebiliyorsan başvurabilirsin. Eğitimlerin bir kısmı çevrim içi; ortak çekimler ve ekipman teslimi Yahşihan'da.",
  },
  {
    soru: "Üyelik ne kadar sürüyor, ayrılabilir miyim?",
    cevap: "İlk dönem altı aylık pilot. Ayrılma hakkı kaldırılamaz; makul bildirim, ekipman iadesi ve devam eden projelerin tamamlanması düzenlenir. Ayrılmak tek başına ceza sebebi değildir.",
  },
  {
    soru: "20 kişiden sonra ne olacak?",
    cevap: "Sonraki katılımlar dönemsel başvuru ve özel davetlerle açılır. Kurucu 20, programın yönünü belirleyen ilk ekiptir.",
  },
];

export const ILKELER_OZET = [
  "Hesap senin, kimlik senin. Biz yanında duran ekibiz.",
  "Her kamuya açık paylaşım yayın öncesi birlikte gözden geçirilir.",
  "İnceleme; mevzuat, üçüncü kişi hakları, reklam, telif ve marka güvenliğiyle sınırlıdır.",
  "Ret ve revizyon talepleri gerekçeli yazılır; itiraz yolu açıktır.",
  "Yasa dışı bahis, dolandırıcılık ve gizli reklam kırmızı çizgidir.",
];

/** Üye paneli önizlemesi (hero mockup) için örnek veri */
export const PANEL_ORNEK = {
  egitimler: [
    { gun: "Per", saat: "19:00", ad: "Kurgu atölyesi: DaVinci temelleri", yer: "Yahşihan stüdyo" },
    { gun: "Cmt", saat: "14:00", ad: "Telefonla çekim ve ışık", yer: "Saha" },
    { gun: "Sal", saat: "20:00", ad: "Yapay zekâ ile seslendirme", yer: "Çevrim içi" },
  ],
  projeler: [
    { ad: "Kafe · aylık 8 reels", durum: "Teklif bekliyor", renk: "bg-sun text-sun-ink" },
    { ad: "Mobilya mağazası · tanıtım filmi", durum: "Görevlendirildi", renk: "bg-mint text-mint-ink" },
  ],
  kuyruk: [
    { ad: "Reels #12 · Hürriyet Caddesi", durum: "İncelemede", kalan: "4 sa" },
    { ad: "Story planı · hafta sonu", durum: "Onaylandı", kalan: "" },
    { ad: "Sponsorlu · yerel market", durum: "Revizyon", kalan: "1 not" },
  ],
};
