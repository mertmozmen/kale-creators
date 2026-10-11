"use client";

import { useState } from "react";
import { YonetimKabuk } from "@/components/yonetim/kabuk";
import { Kart } from "@/components/yonetim/parcalar";
import { Alan, Buton } from "@/components/ui";
import { Ikon } from "@/components/ikonlar";
import { useStore } from "@/lib/store";
import type { Ayarlar } from "@/lib/types";

export default function AyarlarSayfasi() {
  const { ayarlar } = useStore();
  const [kaydedildi, setKaydedildi] = useState(false);
  return (
    <YonetimKabuk baslik="Ayarlar">
      {/* key: mağaza değişince (kaydet / demoya dön) taslak yeniden kurulur; "Kaydedildi" mesajı üstte tutulur ki remount'ta kaybolmasın */}
      <AyarlarFormu
        key={JSON.stringify(ayarlar)}
        kaydedildi={kaydedildi}
        onKaydet={() => {
          setKaydedildi(true);
          setTimeout(() => setKaydedildi(false), 2200);
        }}
      />
    </YonetimKabuk>
  );
}

function AyarlarFormu({ kaydedildi, onKaydet }: { kaydedildi: boolean; onKaydet: () => void }) {
  const { ayarlar, ayarlarGuncelle, basvurular, demoyuSifirla, bulut, yenile } = useStore();
  const [taslak, setTaslak] = useState<Ayarlar>(ayarlar);

  const kaydet = (e: React.FormEvent) => {
    e.preventDefault();
    ayarlarGuncelle(taslak);
    onKaydet();
  };

  const indir = () => {
    const blob = new Blob([JSON.stringify(basvurular, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kale-creators-basvurular-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const sayi = (k: keyof Ayarlar) => (e: React.ChangeEvent<HTMLInputElement>) => setTaslak({ ...taslak, [k]: Number(e.target.value) });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={kaydet} className="space-y-6">
          <Kart baslik="Başvuru dönemi">
            <div className="grid gap-5 sm:grid-cols-2">
              <Alan etiket="Dönem adı">
                <input className="alan" value={taslak.donemAdi} onChange={(e) => setTaslak({ ...taslak, donemAdi: e.target.value })} />
              </Alan>
              <Alan etiket="Son başvuru tarihi">
                <input className="alan" type="date" value={taslak.sonTarih} onChange={(e) => setTaslak({ ...taslak, sonTarih: e.target.value })} />
              </Alan>
            </div>
            <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl bg-paper p-4">
              <span>
                <span className="block text-sm font-semibold">Başvurular açık</span>
                <span className="block text-xs text-muted">Kapatınca form yerine &quot;başvurular kapalı&quot; mesajı görünür.</span>
              </span>
              <input type="checkbox" className="h-5 w-5 accent-[#ff5a2d]" checked={taslak.basvuruAcik} onChange={(e) => setTaslak({ ...taslak, basvuruAcik: e.target.checked })} />
            </label>
          </Kart>

          <Kart baslik="Kontenjan ve kriterler">
            <div className="grid gap-5 sm:grid-cols-2">
              <Alan etiket="Toplam kontenjan">
                <input className="alan" type="number" min={1} value={taslak.kontenjan} onChange={sayi("kontenjan")} />
              </Alan>
              <Alan etiket="Alt yaş sınırı" yardim="Altındakiler listede uyarıyla işaretlenir; başvuru engellenmez.">
                <input className="alan" type="number" min={13} max={30} value={taslak.minYas} onChange={sayi("minYas")} />
              </Alan>
              <Alan etiket="Hedef: Active Creator">
                <input className="alan" type="number" min={0} value={taslak.hedefAktif} onChange={sayi("hedefAktif")} />
              </Alan>
              <Alan etiket="Hedef: Rising Creator">
                <input className="alan" type="number" min={0} value={taslak.hedefYukselen} onChange={sayi("hedefYukselen")} />
              </Alan>
            </div>
          </Kart>

          {!bulut && (
            <Kart baslik="Yönetici şifresi">
              <Alan etiket="Şifre" yardim="Demo sürümünde tarayıcıda saklanır. Canlı sitede giriş Supabase hesaplarıyla yapılır.">
                <input className="alan" value={taslak.yoneticiSifre} onChange={(e) => setTaslak({ ...taslak, yoneticiSifre: e.target.value })} />
              </Alan>
            </Kart>
          )}

          <div className="flex items-center gap-3">
            <Buton varyant="ink" type="submit">
              Kaydet
            </Buton>
            {kaydedildi && <span className="inline-flex items-center gap-1 text-sm font-medium text-mint-ink"><Ikon ad="onay" boyut={16} /> Kaydedildi</span>}
          </div>
        </form>

        <div className="space-y-6">
          <Kart baslik="Veri">
            <p className="text-sm text-ink/65">
              {bulut
                ? "Başvurular Supabase veritabanında (proje: kalecreators). Yedek için JSON indirebilirsin."
                : "Bu demo tüm veriyi tarayıcıda tutar. Yedek almak için JSON indir."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Buton varyant="ghost-dark" boyut="sm" onClick={indir}>
                <Ikon ad="indir" boyut={16} /> Başvuruları indir ({basvurular.length})
              </Buton>
              {bulut ? (
                <Buton varyant="ghost-dark" boyut="sm" onClick={() => void yenile()}>
                  <Ikon ad="yenile" boyut={16} /> Listeyi yenile
                </Buton>
              ) : (
                <Buton
                  varyant="ghost-dark"
                  boyut="sm"
                  onClick={() => {
                    if (confirm("Tüm başvurular ve ayarlar demo verisine dönsün mü?")) demoyuSifirla();
                  }}
                >
                  <Ikon ad="yenile" boyut={16} /> Demo verisine dön
                </Buton>
              )}
            </div>
          </Kart>
          {bulut && (
            <Kart baslik="E-posta otomasyonu">
              <p className="text-sm text-ink/65">
                bilgi@kalecreators.com üzerinden otomatik gider: başvuru alındı (adaya + ekibe bildirim), görüşme daveti, kabul, olumsuz. Durumu
                değiştirdiğinde ilgili e-posta kendiliğinden yollanır.
              </p>
            </Kart>
          )}
          <Kart baslik="Açık kararlar">
            <p className="text-sm text-ink/65">Strateji belgesinde (11 Ekim 2026) karara bağlanmamış başlıklar:</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                "Faaliyet gösterilecek tüzel kişi",
                "Üyelik için yaş sınırı",
                "Yayın ön incelemesinin kapsamı ve hizmet süreleri",
                "20 kişilik seçim puanlaması (bu panelde 5 kriter × 5 puan taslağı var)",
                "Müşteri tanımlama ve CRM sistemi",
                "Gider paylaşımı, ödeme ve fatura akışı",
                "Uygulanabilir fesih ve gizlilik hükümleri",
              ].map((m) => (
                <li key={m} className="flex gap-2.5">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-sm bg-kirmizi" />
                  {m}
                </li>
              ))}
            </ul>
          </Kart>
        </div>
    </div>
  );
}
