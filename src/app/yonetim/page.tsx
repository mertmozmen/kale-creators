"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { YonetimKabuk } from "@/components/yonetim/kabuk";
import { DurumRozeti, ProfilRozeti, Sayi } from "@/components/yonetim/parcalar";
import { Ikon } from "@/components/ikonlar";
import { tarihKisa, useStore, yas } from "@/lib/store";
import { DURUMLAR, puanlandiMi, toplamPuan } from "@/lib/sorular";
import type { Durum, Profil } from "@/lib/types";

type Siralama = "tarih" | "puan";

export default function YonetimAnaSayfa() {
  const { basvurular, ayarlar } = useStore();
  const [arama, setArama] = useState("");
  const [durum, setDurum] = useState<Durum | "hepsi">("hepsi");
  const [profil, setProfil] = useState<Profil | "hepsi">("hepsi");
  const [sira, setSira] = useState<Siralama>("tarih");

  const kabul = basvurular.filter((b) => b.durum === "kabul");
  const kabulAktif = kabul.filter((b) => b.profil === "aktif").length;
  const kabulYukselen = kabul.filter((b) => b.profil === "yukselen").length;

  const liste = useMemo(() => {
    const q = arama.trim().toLowerCase();
    return basvurular
      .filter((b) => (durum === "hepsi" ? true : b.durum === durum))
      .filter((b) => (profil === "hepsi" ? true : b.profil === profil))
      .filter((b) => (q ? `${b.ad} ${b.soyad} ${b.eposta} ${b.alanlar.join(" ")}`.toLowerCase().includes(q) : true))
      .sort((a, b) => {
        if (sira === "puan") {
          const fark = toplamPuan(b.puanlar) - toplamPuan(a.puanlar);
          if (fark !== 0) return fark;
        }
        return b.olusturulma.localeCompare(a.olusturulma);
      });
  }, [basvurular, arama, durum, profil, sira]);

  return (
    <YonetimKabuk baslik="Başvurular">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Sayi etiket="Toplam başvuru" deger={basvurular.length} alt={`${basvurular.filter((b) => b.profil === "aktif").length} aktif · ${basvurular.filter((b) => b.profil === "yukselen").length} yükselen`} />
        <Sayi etiket="İncelenmeyi bekleyen" deger={basvurular.filter((b) => b.durum === "yeni").length} alt="Durumu 'Yeni' olanlar" />
        <Sayi etiket="Görüşme aşamasında" deger={basvurular.filter((b) => b.durum === "gorusme" || b.durum === "teklif").length} alt="Görüşme + teklif" />
        <Sayi vurgu etiket={`${ayarlar.donemAdi} kontenjanı`} deger={`${kabul.length} / ${ayarlar.kontenjan}`} alt={`${kabulAktif}/${ayarlar.hedefAktif} aktif · ${kabulYukselen}/${ayarlar.hedefYukselen} yükselen`} />
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <Ikon ad="ara" boyut={18} />
          </span>
          <input className="alan pl-11" placeholder="Ad, e-posta veya alan ara" value={arama} onChange={(e) => setArama(e.target.value)} />
        </label>
        <select className="alan lg:w-52" value={durum} onChange={(e) => setDurum(e.target.value as Durum | "hepsi")}>
          <option value="hepsi">Tüm durumlar</option>
          {DURUMLAR.map((d) => (
            <option key={d.id} value={d.id}>
              {d.ad}
            </option>
          ))}
        </select>
        <select className="alan lg:w-48" value={profil} onChange={(e) => setProfil(e.target.value as Profil | "hepsi")}>
          <option value="hepsi">İki profil</option>
          <option value="aktif">Active Creator</option>
          <option value="yukselen">Rising Creator</option>
        </select>
        <select className="alan lg:w-44" value={sira} onChange={(e) => setSira(e.target.value as Siralama)}>
          <option value="tarih">Yeniden eskiye</option>
          <option value="puan">Puana göre</option>
        </select>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line-light bg-white">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_0.7fr_0.8fr] gap-4 border-b border-line-light bg-paper px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted md:grid">
          <span>Aday</span>
          <span>Profil</span>
          <span>Durum</span>
          <span>Puan</span>
          <span>Tarih</span>
        </div>
        {liste.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted">Bu filtreyle başvuru yok.</p>}
        <ul className="divide-y divide-line-light">
          {liste.map((b) => {
            const kucuk = yas(b.dogumYili) < ayarlar.minYas;
            return (
              <li key={b.id}>
                <Link href={`/yonetim/basvuru/?id=${b.id}`} className="grid gap-2 px-5 py-4 transition-colors hover:bg-paper md:grid-cols-[1.6fr_1fr_1fr_0.7fr_0.8fr] md:items-center md:gap-4">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold">
                      {b.ad} {b.soyad}
                      {kucuk && (
                        <span className="text-sun-ink" title={`${ayarlar.minYas} yaş altı`}>
                          <Ikon ad="uyari" boyut={16} />
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-muted">{b.alanlar.slice(0, 3).join(" · ")}</p>
                  </div>
                  <div>
                    <ProfilRozeti profil={b.profil} />
                  </div>
                  <div>
                    <DurumRozeti durum={b.durum} />
                  </div>
                  <div className="font-display text-sm font-bold">{puanlandiMi(b.puanlar) ? `${toplamPuan(b.puanlar)} / 25` : <span className="font-sans font-normal text-muted">—</span>}</div>
                  <div className="text-xs text-muted">{tarihKisa(b.olusturulma)}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </YonetimKabuk>
  );
}
