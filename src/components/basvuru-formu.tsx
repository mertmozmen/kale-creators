"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStore, yas } from "@/lib/store";
import type { Konum, Profil, YeniBasvuru } from "@/lib/types";
import { ALANLAR, KONUM_SECENEKLERI, ORTAK_SORULAR, PROFIL_BILGI, SAAT_SECENEKLERI, profilSorulari, type Soru } from "@/lib/sorular";
import { Alan, Buton } from "./ui";
import { Ikon } from "./ikonlar";
import { Amblem } from "./logo";

const ADIMLAR = ["Profil", "Bilgiler", "Sorular", "Senin soruların", "Onay"];

type Kisisel = { ad: string; soyad: string; eposta: string; telefon: string; dogumYili: string; konum: Konum | "" };

const epostaGecerli = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());



export function BasvuruFormu() {
  const { hazir, ayarlar, basvuruEkle } = useStore();
  /* /basvur/?profil=aktif ile gelen ön seçim */
  const paramProfil = useSearchParams().get("profil");
  const onSecim: Profil | null = paramProfil === "aktif" || paramProfil === "yukselen" ? paramProfil : null;
  const [profil, setProfil] = useState<Profil | null>(onSecim);
  const [adim, setAdim] = useState(onSecim ? 1 : 0);
  const [kisisel, setKisisel] = useState<Kisisel>({ ad: "", soyad: "", eposta: "", telefon: "", dogumYili: "", konum: "" });
  const [alanlar, setAlanlar] = useState<string[]>([]);
  const [saat, setSaat] = useState("");
  const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
  const [ilkeler, setIlkeler] = useState(false);
  const [kvkk, setKvkk] = useState(false);
  const [hatalar, setHatalar] = useState<Record<string, string>>({});
  const [gonderildi, setGonderildi] = useState<string | null>(null);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderimHatasi, setGonderimHatasi] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [adim]);

  const ekSorular = useMemo(() => (profil ? profilSorulari(profil) : []), [profil]);

  const cevapYaz = (id: string, v: string) => setCevaplar((c) => ({ ...c, [id]: v }));

  const dogrula = (): boolean => {
    const h: Record<string, string> = {};
    if (adim === 0 && !profil) h.profil = "Bir profil seç.";
    if (adim === 1) {
      if (kisisel.ad.trim().length < 2) h.ad = "Adını yaz.";
      if (kisisel.soyad.trim().length < 2) h.soyad = "Soyadını yaz.";
      if (!epostaGecerli(kisisel.eposta)) h.eposta = "Geçerli bir e-posta gir.";
      if (kisisel.telefon.replace(/\D/g, "").length < 10) h.telefon = "Telefon numaranı gir.";
      const y = Number(kisisel.dogumYili);
      if (!y || y < 1940 || y > new Date().getFullYear() - 10) h.dogumYili = "Doğum yılını gir (örn. 2001).";
      if (!kisisel.konum) h.konum = "Nerede yaşadığını seç.";
    }
    if (adim === 2) {
      ORTAK_SORULAR.forEach((s) => {
        if (s.zorunlu && (cevaplar[s.id] ?? "").trim().length < 10) h[s.id] = "Birkaç cümleyle anlat.";
      });
      if (alanlar.length === 0) h.alanlar = "En az bir alan seç.";
      if (!saat) h.saat = "Haftalık zamanını seç.";
    }
    if (adim === 3) {
      ekSorular.forEach((s) => {
        if (s.zorunlu && (cevaplar[s.id] ?? "").trim().length < 3) h[s.id] = "Bu soruyu boş bırakma.";
      });
    }
    if (adim === 4) {
      if (!ilkeler) h.ilkeler = "Yayın ilkelerini incelediğini onayla.";
      if (!kvkk) h.kvkk = "KVKK aydınlatma metnini onayla.";
    }
    setHatalar(h);
    return Object.keys(h).length === 0;
  };

  const ileri = () => {
    if (!dogrula()) return;
    setAdim((a) => Math.min(a + 1, ADIMLAR.length - 1));
  };
  const geri = () => {
    setHatalar({});
    setAdim((a) => Math.max(a - 1, 0));
  };

  const gonder = async () => {
    if (!dogrula() || !profil || !kisisel.konum) return;
    setGonderimHatasi(null);
    setGonderiliyor(true);
    const b: YeniBasvuru = {
      profil,
      ad: kisisel.ad.trim(),
      soyad: kisisel.soyad.trim(),
      eposta: kisisel.eposta.trim().toLowerCase(),
      telefon: kisisel.telefon.trim(),
      dogumYili: Number(kisisel.dogumYili),
      konum: kisisel.konum,
      alanlar,
      haftalikSaat: saat,
      cevaplar: Object.fromEntries(
        [...ORTAK_SORULAR, ...ekSorular].map((s) => [s.id, (cevaplar[s.id] ?? "").trim()]),
      ),
      kvkkOnay: true,
      ilkelerOnay: true,
    };
    try {
      const kayit = await basvuruEkle(b);
      setGonderildi(kayit.id);
    } catch (e) {
      setGonderimHatasi(e instanceof Error ? e.message : "Gönderilemedi. Bağlantını kontrol edip tekrar dene.");
    } finally {
      setGonderiliyor(false);
    }
  };

  if (!hazir) return <div className="h-72 animate-pulse rounded-3xl bg-white/60" />;

  if (!ayarlar.basvuruAcik) {
    return (
      <div className="rounded-3xl border border-line-light bg-white p-10 text-center">
        <Amblem boyut={56} className="mx-auto" />
        <h2 className="font-display mt-5 text-2xl font-semibold">Başvurular şu an kapalı</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/65">
          {ayarlar.donemAdi} dönemi başvuruları kapandı. Sonraki dönem ve özel davetler için Instagram&apos;dan DM ile ulaşabilirsin.
        </p>
        <Buton href="/" varyant="ghost-dark" className="mt-8">
          Ana sayfaya dön
        </Buton>
      </div>
    );
  }

  if (gonderildi) {
    return (
      <div className="rounded-3xl border border-line-light bg-white p-8 sm:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mint text-mint-ink">
          <Ikon ad="onay" boyut={28} />
        </span>
        <h2 className="font-display mt-6 text-3xl font-semibold">Başvurun alındı, {kisisel.ad.trim()}.</h2>
        <p className="mt-3 max-w-lg leading-relaxed text-ink/70">
          Cevaplarını ön değerlendirmeye aldık. Uygun bulunursan kısa bir görüşme için <strong>{kisisel.eposta.trim()}</strong> adresinden veya telefonla ulaşacağız.
        </p>
        <dl className="mt-8 grid gap-4 rounded-2xl bg-paper p-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Başvuru no</dt>
            <dd className="mt-1 font-mono font-semibold">{gonderildi.slice(0, 8).toUpperCase()}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Profil</dt>
            <dd className="mt-1 font-semibold">{profil && PROFIL_BILGI[profil].ad}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Sıradaki adım</dt>
            <dd className="mt-1 font-semibold">Ön değerlendirme</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Buton href="/" varyant="ink">
            Ana sayfa
          </Buton>
          <Buton href="/ilkeler/" varyant="ghost-dark">
            Yayın ilkelerini tekrar oku
          </Buton>
        </div>
      </div>
    );
  }

  const yasDegeri = Number(kisisel.dogumYili) ? yas(Number(kisisel.dogumYili)) : null;

  return (
    <div className="rounded-3xl border border-line-light bg-white p-6 sm:p-10">
      {/* İlerleme */}
      <ol className="mb-8 flex flex-wrap gap-2">
        {ADIMLAR.map((a, i) => (
          <li key={a} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${i === adim ? "bg-ink text-paper" : i < adim ? "bg-mint text-mint-ink" : "bg-paper text-muted"}`}>
            <span className="font-mono">{i + 1}</span>
            <span className="hidden sm:inline">{a}</span>
          </li>
        ))}
      </ol>

      {/* ADIM 0: profil */}
      {adim === 0 && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Hangisi seni anlatıyor?</h2>
          <p className="mt-2 text-ink/65">Sorular seçtiğin profile göre değişir. İkisi de aynı ekibe çıkar.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {(["aktif", "yukselen"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProfil(p)}
                className={`rounded-2xl border-2 p-6 text-left transition-all ${profil === p ? "border-kirmizi bg-kirmizi-soft/40" : "border-line-light hover:border-steel"}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-kirmizi-2">{PROFIL_BILGI[p].kisa}</span>
                <span className="font-display mt-2 block text-xl font-bold">{PROFIL_BILGI[p].ad}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ink/65">{PROFIL_BILGI[p].aciklama}</span>
              </button>
            ))}
          </div>
          {hatalar.profil && <p className="mt-3 text-sm font-medium text-rose-ink">{hatalar.profil}</p>}
        </div>
      )}

      {/* ADIM 1: kişisel */}
      {adim === 1 && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Seni tanıyalım</h2>
          <p className="mt-2 text-ink/65">Bu bilgiler yalnızca değerlendirme kurulu tarafından görülür.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Alan etiket="Ad" zorunlu hata={hatalar.ad}>
              <input className="alan" value={kisisel.ad} onChange={(e) => setKisisel({ ...kisisel, ad: e.target.value })} autoComplete="given-name" />
            </Alan>
            <Alan etiket="Soyad" zorunlu hata={hatalar.soyad}>
              <input className="alan" value={kisisel.soyad} onChange={(e) => setKisisel({ ...kisisel, soyad: e.target.value })} autoComplete="family-name" />
            </Alan>
            <Alan etiket="E-posta" zorunlu hata={hatalar.eposta}>
              <input className="alan" type="email" value={kisisel.eposta} onChange={(e) => setKisisel({ ...kisisel, eposta: e.target.value })} autoComplete="email" inputMode="email" />
            </Alan>
            <Alan etiket="Telefon" zorunlu hata={hatalar.telefon}>
              <input className="alan" type="tel" value={kisisel.telefon} onChange={(e) => setKisisel({ ...kisisel, telefon: e.target.value })} autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" />
            </Alan>
            <Alan etiket="Doğum yılı" zorunlu hata={hatalar.dogumYili} yardim={yasDegeri !== null && yasDegeri < ayarlar.minYas ? `${ayarlar.minYas} yaş altı başvurular için veli onayı istenebilir.` : undefined}>
              <input className="alan" inputMode="numeric" maxLength={4} value={kisisel.dogumYili} onChange={(e) => setKisisel({ ...kisisel, dogumYili: e.target.value.replace(/\D/g, "") })} placeholder="2001" />
            </Alan>
            <Alan etiket="Nerede yaşıyorsun?" zorunlu hata={hatalar.konum}>
              <select className="alan" value={kisisel.konum} onChange={(e) => setKisisel({ ...kisisel, konum: e.target.value as Konum })}>
                <option value="">Seç</option>
                {KONUM_SECENEKLERI.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.ad}
                  </option>
                ))}
              </select>
            </Alan>
          </div>
        </div>
      )}

      {/* ADIM 2: ortak sorular */}
      {adim === 2 && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Herkese sorduklarımız</h2>
          <p className="mt-2 text-ink/65">Uzun yazmak zorunda değilsin; samimi ve net olsun yeter.</p>
          <div className="mt-7 space-y-6">
            <Alan etiket="Hangi alanlarda üretmek veya kendini geliştirmek istiyorsun?" zorunlu hata={hatalar.alanlar} yardim="Birden fazla seçebilirsin.">
              <div className="flex flex-wrap gap-2">
                {ALANLAR.map((a) => {
                  const secili = alanlar.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAlanlar((l) => (secili ? l.filter((x) => x !== a) : [...l, a]))}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${secili ? "border-ink bg-ink text-paper" : "border-line-light bg-white hover:border-steel"}`}
                      aria-pressed={secili}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </Alan>
            <Alan etiket="Haftada ne kadar zaman ayırabilirsin?" zorunlu hata={hatalar.saat}>
              <div className="grid gap-2 sm:grid-cols-4">
                {SAAT_SECENEKLERI.map((s) => (
                  <button key={s} type="button" onClick={() => setSaat(s)} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${saat === s ? "border-ink bg-ink text-paper" : "border-line-light hover:border-steel"}`} aria-pressed={saat === s}>
                    {s}
                  </button>
                ))}
              </div>
            </Alan>
            {ORTAK_SORULAR.map((s) => (
              <SoruAlani key={s.id} soru={s} deger={cevaplar[s.id] ?? ""} hata={hatalar[s.id]} onChange={(v) => cevapYaz(s.id, v)} />
            ))}
          </div>
        </div>
      )}

      {/* ADIM 3: profil soruları */}
      {adim === 3 && profil && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{PROFIL_BILGI[profil].ad} soruları</h2>
          <p className="mt-2 text-ink/65">{profil === "aktif" ? "Ürettiklerini görelim." : "Portföy beklemiyoruz; niyetini ve fikrini merak ediyoruz."}</p>
          <div className="mt-7 space-y-6">
            {ekSorular.map((s) => (
              <SoruAlani key={s.id} soru={s} deger={cevaplar[s.id] ?? ""} hata={hatalar[s.id]} onChange={(v) => cevapYaz(s.id, v)} />
            ))}
          </div>
        </div>
      )}

      {/* ADIM 4: onay */}
      {adim === 4 && profil && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Son bir bakış</h2>
          <p className="mt-2 text-ink/65">Gönderdikten sonra cevaplarını değiştiremezsin; gerekirse geri dönüp düzenle.</p>
          <dl className="mt-7 grid gap-4 rounded-2xl bg-paper p-5 text-sm sm:grid-cols-2">
            <Ozet b="Profil" v={PROFIL_BILGI[profil].ad} />
            <Ozet b="Ad soyad" v={`${kisisel.ad} ${kisisel.soyad}`} />
            <Ozet b="E-posta" v={kisisel.eposta} />
            <Ozet b="Telefon" v={kisisel.telefon} />
            <Ozet b="Alanlar" v={alanlar.join(", ")} />
            <Ozet b="Haftalık zaman" v={saat} />
          </dl>
          <div className="mt-7 space-y-4">
            <OnayKutusu
              secili={ilkeler}
              onChange={setIlkeler}
              hata={hatalar.ilkeler}
              metin={
                <>
                  <Link href="/ilkeler/" target="_blank" className="font-semibold text-kirmizi-2 underline-offset-2 hover:underline">
                    Yayın ilkelerini ve ticari işleyişi
                  </Link>{" "}
                  inceledim. Üyelik kapsamındaki kamuya açık paylaşımların yayın öncesi birlikte gözden geçirildiğini biliyorum.
                </>
              }
            />
            <OnayKutusu
              secili={kvkk}
              onChange={setKvkk}
              hata={hatalar.kvkk}
              metin={
                <>
                  <Link href="/kvkk/" target="_blank" className="font-semibold text-kirmizi-2 underline-offset-2 hover:underline">
                    KVKK aydınlatma metnini
                  </Link>{" "}
                  okudum; başvuru bilgilerimin değerlendirme amacıyla işlenmesini kabul ediyorum.
                </>
              }
            />
          </div>
        </div>
      )}

      {/* Gezinme */}
      <div className="mt-10 flex items-center justify-between border-t border-line-light pt-6">
        <button type="button" onClick={geri} disabled={adim === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink disabled:invisible">
          <Ikon ad="geri" boyut={18} /> Geri
        </button>
        {adim < ADIMLAR.length - 1 ? (
          <Buton onClick={ileri} varyant="ink" ok>
            Devam
          </Buton>
        ) : (
          <Buton onClick={gonder} ok disabled={gonderiliyor}>
            {gonderiliyor ? "Gönderiliyor…" : "Başvuruyu gönder"}
          </Buton>
        )}
      </div>
      {gonderimHatasi && <p className="mt-3 text-right text-sm font-medium text-rose-ink">Hata: {gonderimHatasi}</p>}
    </div>
  );
}

function SoruAlani({ soru, deger, hata, onChange }: { soru: Soru; deger: string; hata?: string; onChange: (v: string) => void }) {
  return (
    <Alan etiket={soru.metin} yardim={soru.yardim} zorunlu={soru.zorunlu} hata={hata}>
      <textarea className="alan" value={deger} onChange={(e) => onChange(e.target.value)} rows={soru.tip === "uzun" ? 4 : 2} />
    </Alan>
  );
}

function Ozet({ b, v }: { b: string; v: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{b}</dt>
      <dd className="mt-1 font-medium">{v || "—"}</dd>
    </div>
  );
}

function OnayKutusu({ secili, onChange, metin, hata }: { secili: boolean; onChange: (v: boolean) => void; metin: React.ReactNode; hata?: string }) {
  return (
    <div>
      <label className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors ${secili ? "border-ink bg-white" : "border-line-light hover:border-steel"}`}>
        <input type="checkbox" checked={secili} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[#ff5a2d]" />
        <span className="text-sm leading-relaxed text-ink/80">{metin}</span>
      </label>
      {hata && <p className="mt-1.5 text-[0.8rem] font-medium text-rose-ink">{hata}</p>}
    </div>
  );
}
