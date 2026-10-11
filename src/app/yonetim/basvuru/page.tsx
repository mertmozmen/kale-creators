"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { YonetimKabuk } from "@/components/yonetim/kabuk";
import { DurumRozeti, Kart, ProfilRozeti } from "@/components/yonetim/parcalar";
import { Ikon } from "@/components/ikonlar";
import { Buton } from "@/components/ui";
import { tarihKisa, useStore, yas } from "@/lib/store";
import { DURUMLAR, DURUM_MAP, KONUM_SECENEKLERI, KRITERLER, ORTAK_SORULAR, profilSorulari, puanlandiMi, sonrakiDurum, toplamPuan } from "@/lib/sorular";
import type { Durum } from "@/lib/types";

/* Statik dışa aktarımda useSearchParams, Suspense sınırı ister */
export default function BasvuruDetay() {
  return (
    <Suspense fallback={<YonetimKabuk><p className="text-muted">Yükleniyor…</p></YonetimKabuk>}>
      <BasvuruDetayIc />
    </Suspense>
  );
}

function BasvuruDetayIc() {
  const { basvurular, ayarlar, durumDegistir, puanla, notEkle, notSil, basvuruSil } = useStore();
  const router = useRouter();
  const id = useSearchParams().get("id");
  const [yeniNot, setYeniNot] = useState("");

  const b = basvurular.find((x) => x.id === id);

  if (!b) {
    return (
      <YonetimKabuk>
        <p className="text-muted">Başvuru bulunamadı.</p>
        <Link href="/yonetim/" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
          <Ikon ad="geri" boyut={18} /> Listeye dön
        </Link>
      </YonetimKabuk>
    );
  }

  const sonraki = sonrakiDurum(b.durum);
  const kucuk = yas(b.dogumYili) < ayarlar.minYas;
  const sorular = [...ORTAK_SORULAR, ...profilSorulari(b.profil)];

  return (
    <YonetimKabuk>
      <Link href="/yonetim/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink">
        <Ikon ad="geri" boyut={18} /> Başvurular
      </Link>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ProfilRozeti profil={b.profil} />
            <DurumRozeti durum={b.durum} />
            {kucuk && <span className="inline-flex items-center gap-1 rounded-full bg-sun px-2.5 py-1 text-xs font-semibold text-sun-ink"><Ikon ad="uyari" boyut={14} /> {ayarlar.minYas} yaş altı</span>}
          </div>
          <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
            {b.ad} {b.soyad}
          </h1>
          <p className="mt-2 text-sm text-ink/65">
            {yas(b.dogumYili)} yaş · {KONUM_SECENEKLERI.find((k) => k.id === b.konum)?.ad} · başvuru {tarihKisa(b.olusturulma)}
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${b.eposta}`} className="font-medium text-kirmizi-2 hover:underline">{b.eposta}</a>
            <span className="text-muted"> · </span>
            <a href={`tel:${b.telefon.replace(/\s/g, "")}`} className="font-medium text-kirmizi-2 hover:underline">{b.telefon}</a>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="alan w-auto" value={b.durum} onChange={(e) => durumDegistir(b.id, e.target.value as Durum)}>
            {DURUMLAR.map((d) => (
              <option key={d.id} value={d.id}>
                {d.ad}
              </option>
            ))}
          </select>
          {sonraki && b.durum !== "ret" && (
            <Buton varyant="ink" boyut="sm" onClick={() => durumDegistir(b.id, sonraki)} ok>
              {DURUM_MAP[sonraki].ad}
            </Buton>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Cevaplar */}
        <div className="space-y-6">
          <Kart baslik="Alanlar ve zaman">
            <div className="flex flex-wrap gap-2">
              {b.alanlar.map((a) => (
                <span key={a} className="rounded-full bg-paper px-3 py-1 text-sm font-medium">
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink/70">
              Haftalık zaman: <strong>{b.haftalikSaat}</strong>
            </p>
          </Kart>
          <Kart baslik="Cevaplar">
            <dl className="space-y-6">
              {sorular.map((s) => (
                <div key={s.id}>
                  <dt className="text-sm font-semibold">{s.metin}</dt>
                  <dd className="mt-1.5 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/75">{b.cevaplar[s.id] || <span className="text-muted">Boş</span>}</dd>
                </div>
              ))}
            </dl>
          </Kart>
        </div>

        {/* Değerlendirme */}
        <div className="space-y-6">
          <Kart baslik="Puanlama">
            <div className="space-y-4">
              {KRITERLER.map((k) => (
                <div key={k.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">{k.ad}</p>
                    <p className="text-xs text-muted">{k.aciklama}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => puanla(b.id, k.id, p)}
                        className={`puan-btn rounded-lg py-2 text-sm font-bold ${(b.puanlar[k.id] ?? 0) >= p ? "bg-ink text-paper" : "bg-paper text-ink/50 hover:bg-paper-2"}`}
                        aria-label={`${k.ad}: ${p}`}
                        aria-pressed={b.puanlar[k.id] === p}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-line-light pt-4">
              <span className="text-sm font-semibold">Toplam</span>
              <span className="font-display text-2xl font-bold">
                {toplamPuan(b.puanlar)} <span className="text-sm text-muted">/ 25</span>
              </span>
            </div>
            {!puanlandiMi(b.puanlar) && <p className="mt-2 text-xs text-muted">Tüm kriterler puanlanınca listede sıralamaya girer.</p>}
          </Kart>

          <Kart baslik="Kurul notları">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (yeniNot.trim().length < 2) return;
                notEkle(b.id, yeniNot.trim());
                setYeniNot("");
              }}
            >
              <textarea className="alan" rows={3} placeholder="Görüşme izlenimi, risk, öneri…" value={yeniNot} onChange={(e) => setYeniNot(e.target.value)} />
              <Buton varyant="ink" boyut="sm" className="mt-2" type="submit">
                Not ekle
              </Buton>
            </form>
            <ul className="mt-5 space-y-3">
              {b.notlar.length === 0 && <li className="text-sm text-muted">Henüz not yok.</li>}
              {b.notlar.map((n) => (
                <li key={n.id} className="group rounded-xl bg-paper p-3.5">
                  <p className="text-sm leading-relaxed">{n.metin}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>{tarihKisa(n.tarih)}</span>
                    <button onClick={() => notSil(b.id, n.id)} className="inline-flex items-center gap-1 opacity-0 transition-opacity hover:text-rose-ink group-hover:opacity-100">
                      <Ikon ad="cop" boyut={14} /> Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Kart>

          <Kart>
            <p className="text-xs text-muted">Onaylar: yayın ilkeleri {b.ilkelerOnay ? "✓" : "—"} · KVKK {b.kvkkOnay ? "✓" : "—"} · başvuru no {b.id.toUpperCase()}</p>
            <button
              onClick={() => {
                if (confirm(`${b.ad} ${b.soyad} başvurusu kalıcı olarak silinsin mi?`)) {
                  basvuruSil(b.id);
                  router.push("/yonetim/");
                }
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-ink hover:underline"
            >
              <Ikon ad="cop" boyut={14} /> Başvuruyu sil
            </button>
          </Kart>
        </div>
      </div>
    </YonetimKabuk>
  );
}
