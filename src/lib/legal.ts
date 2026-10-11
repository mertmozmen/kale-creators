/**
 * Yasal metin taslakları. Hukuki görüş değildir; yayın öncesi avukat incelemesi gerekir.
 * Kaynak: Kale Creators strateji belgesi, 11 Ekim 2026 (bölüm 6, 7, 9).
 */

export type Bolum = { baslik: string; paragraflar?: string[]; maddeler?: string[] };

export const VERI_SORUMLUSU = "Kale Creators — Yenişehir Mahallesi, Atatürk Caddesi, Yahşihan / Kırıkkale (tüzel kişilik unvanı eklenecek)";

export const KVKK: { baslik: string; guncelleme: string; bolumler: Bolum[] } = {
  baslik: "Kişisel Verilerin Korunması Aydınlatma Metni",
  guncelleme: "11 Ekim 2026 · taslak",
  bolumler: [
    {
      baslik: "1. Veri sorumlusu",
      paragraflar: [
        `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${VERI_SORUMLUSU} tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
      ],
    },
    {
      baslik: "2. İşlenen kişisel veriler",
      maddeler: [
        "Kimlik ve iletişim: ad, soyad, e-posta, telefon, doğum yılı, yaşadığınız yer bilgisi.",
        "Başvuru içeriği: form sorularına verdiğiniz cevaplar, ilgi alanlarınız, haftalık zaman beyanınız.",
        "Mesleki bilgi: sosyal medya hesap bağlantıları, örnek çalışmalar, kullandığınız ekipman ve yazılımlar, geçmiş marka işleri ve mevcut müşteri beyanı (yalnızca Active Creator profili).",
        "Değerlendirme kayıtları: puanlama, görüşme notları ve başvuru durumu.",
        "Teknik veri: başvuru tarihi ve saati.",
      ],
    },
    {
      baslik: "3. İşleme amaçları",
      maddeler: [
        "Kurucu 20 programına yapılan başvuruların alınması, değerlendirilmesi ve sonuçlandırılması.",
        "Başvuru sahibiyle iletişim kurulması; görüşme planlanması ve sonuç bildirimi.",
        "Kabul hâlinde üyelik sözleşmesinin hazırlanması ve oryantasyon sürecinin yürütülmesi.",
        "Program kontenjanının ve aday profili dengesinin planlanması.",
      ],
    },
    {
      baslik: "4. Hukuki sebep",
      paragraflar: [
        "Kişisel verileriniz KVKK m.5/2-c (bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması), m.5/2-f (veri sorumlusunun meşru menfaati) ve gerekli hâllerde m.5/1 (açık rıza) hukuki sebeplerine dayanılarak işlenir. Sosyal medya hesap bağlantıları ve örnek çalışmalar, sizin tarafınızdan kamuya açık biçimde paylaşılmış içerikler olarak değerlendirme amacıyla incelenir.",
      ],
    },
    {
      baslik: "5. Aktarım",
      paragraflar: [
        "Başvuru verileri, yalnızca değerlendirme kurulunda yer alan Kale Creators yöneticileriyle paylaşılır. Verileriniz üçüncü kişilere satılmaz, pazarlama amacıyla aktarılmaz. Barındırma hizmeti sağlayıcısına (sunucu/veritabanı) aktarım, hizmetin gerektirdiği ölçüde ve sözleşmesel güvencelerle yapılır.",
      ],
    },
    {
      baslik: "6. Saklama süresi",
      paragraflar: [
        "Olumsuz sonuçlanan başvurular, sonuç bildiriminden itibaren en fazla 12 ay saklanır; bu süre sonunda silinir veya anonim hâle getirilir. Kabul edilen üyelerin verileri üyelik süresince ve yasal saklama yükümlülükleri boyunca tutulur.",
      ],
    },
    {
      baslik: "7. Haklarınız",
      paragraflar: ["KVKK m.11 kapsamında aşağıdaki haklara sahipsiniz:"],
      maddeler: [
        "Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme.",
        "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.",
        "Eksik veya yanlış işlenmişse düzeltilmesini isteme.",
        "KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme.",
        "İşlemenin kanuna aykırı olması sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
      ],
    },
    {
      baslik: "8. Başvuru yolu",
      paragraflar: [
        "Haklarınızı kullanmak için taleplerinizi yazılı olarak Yenişehir Mahallesi, Atatürk Caddesi, Yahşihan / Kırıkkale adresine veya +90 505 787 63 48 numarası üzerinden iletebilirsiniz. Talepler en geç 30 gün içinde sonuçlandırılır.",
      ],
    },
  ],
};

export const ILKELER: { baslik: string; giris: string; bolumler: Bolum[] } = {
  baslik: "Yayın İlkeleri ve Marka Güvenliği",
  giris:
    "Kale Creators üyeleri bağımsız üreticilerdir; hesapları ve kimlikleri kendilerine aittir. Buna karşılık topluluğun adı tek bir üyenin paylaşımıyla zarar görebilir. Bu yüzden üyelik kapsamında kamuya açık paylaşımlar yayın öncesi birlikte gözden geçirilir. Aşağıdaki ilkeler bu dengeyi tarif eder.",
  bolumler: [
    {
      baslik: "Ne inceleriz, ne incelemeyiz",
      maddeler: [
        "İnceleme; mevzuat, üçüncü kişi hakları, reklam kuralları, telif, gizlilik ve önceden bildirilmiş marka güvenliği ölçütleriyle sınırlıdır.",
        "Siyasi görüş, hukuka uygun eleştiri, mizah veya özel hayat tercihi tek başına inceleme ya da disiplin konusu değildir.",
        "Özel mesajlar, kapalı hesaplar ve yakın arkadaş paylaşımları kapsam dışıdır.",
        "Hesap mülkiyeti ve bağımsız fikrî haklar üyede kalır. Şifre istenmez, hesaba erişim talep edilmez.",
      ],
    },
    {
      baslik: "İçerik türüne göre süreç",
      maddeler: [
        "Kişisel Reels, TikTok ve Shorts: önceden içerik bildirimi; kalite ve güvenlik açısından gerekçeli inceleme.",
        "Story ve canlı yayın: mümkünse önceden içerik planı; plansız anlık yayınlar için hızlandırılmış değerlendirme.",
        "Sponsorlu içerik: reklam açıklaması, ürün ve hizmet uygunluğu, telif ve sözleşme şartları için yazılı onay.",
        "Kale Creators destekli içerik: kurgu, ses, marka kullanımı ve yayın standardı kontrolü.",
        "Ticari müşteri içeriği: yönetim onayı ve sözleşmede öngörülmüşse müşteri onayı.",
      ],
    },
    {
      baslik: "Hedef süreler",
      paragraflar: ["Operasyon hedefi olarak: standart içerik 12 saat, ticari içerik 24 saat, acil durumlar 1 saat. Süre içinde yanıt verilmezse izlenecek yol sözleşmede ayrıca düzenlenir."],
    },
    {
      baslik: "Kararlar ve itiraz",
      maddeler: [
        "Her inceleme üç sonuçtan biriyle biter: onay, gerekçeli revizyon talebi veya gerekçeli ret.",
        "Kararlar kayıt altına alınır. Üye karara itiraz edebilir; itiraz ikinci bir yönetici tarafından değerlendirilir.",
      ],
    },
    {
      baslik: "Kırmızı çizgiler",
      paragraflar: ["Aşağıdaki durumlar marka güvenliği açısından risk sınıflarına göre ele alınır:"],
      maddeler: [
        "Kritik: yasa dışı bahis tanıtımı, dolandırıcılık, tehdit. Acil inceleme, proje askısı, gerektiğinde fesih.",
        "Ağır: gizli reklam, müşteri sırrı ifşası, sahte performans. Yazılı açıklama, proje durdurma, uygun yaptırım.",
        "Orta: onaysız sponsorlu içerik, tekrarlı süreç ihlali. Uyarı, revizyon, geçici destek kısıtı.",
        "Hafif: eksik etiket, teknik hata. Düzeltme ve eğitim.",
      ],
    },
    {
      baslik: "İhlal süreci",
      paragraflar: ["Bildirim ve delil → ön inceleme → üyenin açıklaması → gerekçeli karar → itiraz → kayıt. Hiçbir yaptırım üye dinlenmeden uygulanmaz."],
    },
    {
      baslik: "Ticari işler ve müşteri koruması",
      maddeler: [
        "Kale Creators'ın yazılı olarak tanıttığı veya yönlendirdiği işletmeler 'korunan müşteri' kaydına alınır; hizmet ve dönem sınırları yazılır.",
        "Müşteri sözleşmesini network imzalar, teklif ve fiyatı network yönetir, tahsilat network üzerinden yapılır.",
        "Üreticiye proje görevlendirmesi, ücret ve paylaşım, teslimler ve lisans koşulları yazılı iletilir.",
        "Üye, korunan müşteriden doğrudan teklif aldığında yönetimi bilgilendirir.",
        "Üyelik öncesi belgeli müşteriler ve tamamen bağımsız işler koruma kapsamına girmez.",
      ],
    },
  ],
};
