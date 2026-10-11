"use client";

import { useSyncExternalStore } from "react";
import type { Ayarlar, Basvuru, Durum, Kriter, Not, YeniBasvuru } from "./types";
import { AYARLAR_VARSAYILAN, BASVURU_SEED } from "./seed";
import { supabase } from "./supabase";

/**
 * Veri katmanı — iki mod, tek API:
 *  • Bulut modu (Supabase env var): başvurular/notlar/ayarlar Postgres'te, yönetici girişi Supabase Auth.
 *  • Demo modu (env yok): her şey localStorage'da, yönetici girişi tek şifre (GitHub Pages demosu).
 * Bileşenler useStore() dışında hiçbir şey bilmez. useSyncExternalStore ile bağlanır.
 */
const K_BASVURU = "kc_basvurular";
const K_AYARLAR = "kc_ayarlar";
const K_ADMIN = "kc_admin";

export const BULUT = supabase !== null;

type Veri = { hazir: boolean; basvurular: Basvuru[]; ayarlar: Ayarlar; yonetici: boolean; yoneticiEposta: string | null; hata: string | null };

const SUNUCU: Veri = { hazir: false, basvurular: BASVURU_SEED, ayarlar: AYARLAR_VARSAYILAN, yonetici: false, yoneticiEposta: null, hata: null };
let veri: Veri = SUNUCU;
let yuklendi = false;
const dinleyiciler = new Set<() => void>();

const yay = () => dinleyiciler.forEach((d) => d());
function guncelle(f: (v: Veri) => Partial<Veri>) {
  veri = { ...veri, ...f(veri) };
  if (!BULUT) {
    yaz(K_BASVURU, veri.basvurular);
    yaz(K_AYARLAR, veri.ayarlar);
  }
  yay();
}

/* ---------- localStorage yardımcıları (demo) ---------- */
const oku = <T,>(k: string, varsayilan: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : varsayilan;
  } catch {
    return varsayilan;
  }
};
const yaz = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

export const kimlik = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`);

/* ---------- Supabase satır dönüşümleri ---------- */
type SatirBasvuru = {
  id: string; olusturulma: string; profil: Basvuru["profil"]; ad: string; soyad: string; eposta: string; telefon: string;
  dogum_yili: number; konum: Basvuru["konum"]; alanlar: string[]; haftalik_saat: string; cevaplar: Record<string, string>;
  durum: Durum; puanlar: Partial<Record<Kriter, number>>; kvkk_onay: boolean; ilkeler_onay: boolean;
  basvuru_notlari?: { id: string; tarih: string; metin: string }[];
};
const satirdan = (r: SatirBasvuru): Basvuru => ({
  id: r.id, olusturulma: r.olusturulma, profil: r.profil, ad: r.ad, soyad: r.soyad, eposta: r.eposta, telefon: r.telefon,
  dogumYili: r.dogum_yili, konum: r.konum, alanlar: r.alanlar ?? [], haftalikSaat: r.haftalik_saat, cevaplar: r.cevaplar ?? {},
  durum: r.durum, puanlar: r.puanlar ?? {}, kvkkOnay: r.kvkk_onay, ilkelerOnay: r.ilkeler_onay,
  notlar: [...(r.basvuru_notlari ?? [])].sort((a, b) => b.tarih.localeCompare(a.tarih)).map((n) => ({ id: n.id, tarih: n.tarih, metin: n.metin })),
});
const satira = (b: YeniBasvuru, id: string) => ({
  id, profil: b.profil, ad: b.ad, soyad: b.soyad, eposta: b.eposta, telefon: b.telefon, dogum_yili: b.dogumYili, konum: b.konum,
  alanlar: b.alanlar, haftalik_saat: b.haftalikSaat, cevaplar: b.cevaplar, kvkk_onay: b.kvkkOnay, ilkeler_onay: b.ilkelerOnay,
});

/* ---------- yükleme ---------- */
async function bulutYukle() {
  const sb = supabase!;
  const { data: ayar } = await sb.from("ayarlar").select("deger").eq("anahtar", "donem").maybeSingle();
  const ayarlar: Ayarlar = { ...AYARLAR_VARSAYILAN, ...((ayar?.deger as Partial<Ayarlar>) ?? {}) };
  const { data: oturum } = await sb.auth.getSession();
  let yonetici = false;
  let basvurular: Basvuru[] = [];
  const uid = oturum.session?.user.id;
  if (uid) {
    const { data: y } = await sb.from("yoneticiler").select("user_id").eq("user_id", uid).maybeSingle();
    yonetici = !!y;
    if (yonetici) basvurular = await basvurulariCek();
  }
  guncelle(() => ({ hazir: true, ayarlar, yonetici, yoneticiEposta: oturum.session?.user.email ?? null, basvurular }));
  sb.auth.onAuthStateChange((_e, s) => {
    if (!s) guncelle(() => ({ yonetici: false, yoneticiEposta: null, basvurular: [] }));
  });
}
async function basvurulariCek(): Promise<Basvuru[]> {
  const { data, error } = await supabase!
    .from("basvurular")
    .select("*, basvuru_notlari(id, tarih, metin)")
    .order("olusturulma", { ascending: false });
  if (error) {
    guncelle(() => ({ hata: error.message }));
    return [];
  }
  return (data as SatirBasvuru[]).map(satirdan);
}

function yukle() {
  if (yuklendi || typeof window === "undefined") return;
  yuklendi = true;
  if (BULUT) {
    bulutYukle().catch((e) => guncelle(() => ({ hazir: true, hata: String(e) })));
    return;
  }
  let yonetici = false;
  try {
    yonetici = sessionStorage.getItem(K_ADMIN) === "1";
  } catch {}
  veri = {
    hazir: true,
    basvurular: oku<Basvuru[]>(K_BASVURU, BASVURU_SEED),
    ayarlar: { ...AYARLAR_VARSAYILAN, ...oku<Partial<Ayarlar>>(K_AYARLAR, {}) },
    yonetici,
    yoneticiEposta: null,
    hata: null,
  };
}

const abone = (cb: () => void) => {
  dinleyiciler.add(cb);
  return () => {
    dinleyiciler.delete(cb);
  };
};
const anlik = () => {
  yukle();
  return veri;
};
const sunucuAnlik = () => SUNUCU;

/* ---------- eylemler ---------- */
const yerelDegistir = (id: string, f: (b: Basvuru) => Basvuru) =>
  guncelle((v) => ({ basvurular: v.basvurular.map((b) => (b.id === id ? f(b) : b)) }));
const hataYaz = (e: { message?: string } | null) => {
  if (e) guncelle(() => ({ hata: e.message ?? "Bilinmeyen hata" }));
};

const eylemler = {
  /** Başvuru gönderir. Bulutta hata olursa fırlatır (form yakalar). */
  async basvuruEkle(b: YeniBasvuru): Promise<Basvuru> {
    const id = kimlik();
    const yeni: Basvuru = { ...b, id, olusturulma: new Date().toISOString(), durum: "yeni", puanlar: {}, notlar: [] };
    if (BULUT) {
      const { error } = await supabase!.from("basvurular").insert(satira(b, id));
      if (error) throw new Error(error.message);
      if (veri.yonetici) guncelle((v) => ({ basvurular: [yeni, ...v.basvurular] }));
      return yeni;
    }
    guncelle((v) => ({ basvurular: [yeni, ...v.basvurular] }));
    return yeni;
  },
  durumDegistir(id: string, durum: Durum) {
    yerelDegistir(id, (b) => ({ ...b, durum }));
    if (BULUT) supabase!.from("basvurular").update({ durum }).eq("id", id).then(({ error }) => hataYaz(error));
  },
  puanla(id: string, kriter: Kriter, puan: number) {
    const b = veri.basvurular.find((x) => x.id === id);
    const puanlar = { ...(b?.puanlar ?? {}), [kriter]: puan };
    yerelDegistir(id, (x) => ({ ...x, puanlar }));
    if (BULUT) supabase!.from("basvurular").update({ puanlar }).eq("id", id).then(({ error }) => hataYaz(error));
  },
  notEkle(id: string, metin: string) {
    const n: Not = { id: kimlik(), tarih: new Date().toISOString(), metin };
    yerelDegistir(id, (b) => ({ ...b, notlar: [n, ...b.notlar] }));
    if (BULUT) supabase!.from("basvuru_notlari").insert({ id: n.id, basvuru_id: id, metin }).then(({ error }) => hataYaz(error));
  },
  notSil(id: string, notId: string) {
    yerelDegistir(id, (b) => ({ ...b, notlar: b.notlar.filter((n) => n.id !== notId) }));
    if (BULUT) supabase!.from("basvuru_notlari").delete().eq("id", notId).then(({ error }) => hataYaz(error));
  },
  basvuruSil(id: string) {
    guncelle((v) => ({ basvurular: v.basvurular.filter((b) => b.id !== id) }));
    if (BULUT) supabase!.from("basvurular").delete().eq("id", id).then(({ error }) => hataYaz(error));
  },
  ayarlarGuncelle(patch: Partial<Ayarlar>) {
    const yeni = { ...veri.ayarlar, ...patch };
    guncelle(() => ({ ayarlar: yeni }));
    if (BULUT) {
      // yoneticiSifre bulutta anlamsız; DB'ye yazma
      const { yoneticiSifre: _s, ...deger } = yeni;
      void _s;
      supabase!.from("ayarlar").update({ deger }).eq("anahtar", "donem").then(({ error }) => hataYaz(error));
    }
  },
  /** Demo: tek şifre. Bulut: e-posta + şifre (Supabase Auth); kullanıcı yoneticiler tablosunda olmalı. */
  async girisYap(sifre: string, eposta?: string): Promise<boolean> {
    if (!BULUT) {
      if (sifre !== veri.ayarlar.yoneticiSifre) return false;
      try {
        sessionStorage.setItem(K_ADMIN, "1");
      } catch {}
      guncelle(() => ({ yonetici: true }));
      return true;
    }
    const sb = supabase!;
    const { data, error } = await sb.auth.signInWithPassword({ email: (eposta ?? "").trim().toLowerCase(), password: sifre });
    if (error || !data.user) return false;
    const { data: y } = await sb.from("yoneticiler").select("user_id").eq("user_id", data.user.id).maybeSingle();
    if (!y) {
      await sb.auth.signOut();
      return false;
    }
    const basvurular = await basvurulariCek();
    guncelle(() => ({ yonetici: true, yoneticiEposta: data.user.email ?? null, basvurular }));
    return true;
  },
  async cikisYap() {
    if (BULUT) await supabase!.auth.signOut();
    try {
      sessionStorage.removeItem(K_ADMIN);
    } catch {}
    guncelle(() => ({ yonetici: false, yoneticiEposta: null, basvurular: BULUT ? [] : veri.basvurular }));
  },
  async yenile() {
    if (BULUT && veri.yonetici) guncelle(() => ({ basvurular: [] }));
    if (BULUT && veri.yonetici) {
      const b = await basvurulariCek();
      guncelle(() => ({ basvurular: b }));
    }
  },
  demoyuSifirla() {
    if (BULUT) return;
    guncelle(() => ({ basvurular: BASVURU_SEED, ayarlar: AYARLAR_VARSAYILAN }));
  },
  hatayiTemizle() {
    guncelle(() => ({ hata: null }));
  },
};

export function useStore() {
  const v = useSyncExternalStore(abone, anlik, sunucuAnlik);
  return { ...v, bulut: BULUT, ...eylemler };
}

export const yas = (dogumYili: number) => new Date().getFullYear() - dogumYili;

export const tarihKisa = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
