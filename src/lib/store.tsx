"use client";

import { useSyncExternalStore } from "react";
import type { Ayarlar, Basvuru, Durum, Kriter, YeniBasvuru } from "./types";
import { AYARLAR_VARSAYILAN, BASVURU_SEED } from "./seed";

/**
 * Demo veri katmanı: her şey tarayıcıda (localStorage) tutulur, React'e useSyncExternalStore ile bağlanır.
 * Sunucu/ilk hidrasyon anlık görüntüsü = seed (hazir:false); tarayıcı yüklenince gerçek veri gelir.
 * Supabase'e geçişte yalnızca bu dosya değişir; bileşenler aynı useStore() API'sini kullanır.
 */
const K_BASVURU = "kc_basvurular";
const K_AYARLAR = "kc_ayarlar";
const K_ADMIN = "kc_admin";

type Veri = { hazir: boolean; basvurular: Basvuru[]; ayarlar: Ayarlar; yonetici: boolean };

const SUNUCU: Veri = { hazir: false, basvurular: BASVURU_SEED, ayarlar: AYARLAR_VARSAYILAN, yonetici: false };
let veri: Veri = SUNUCU;
let yuklendi = false;
const dinleyiciler = new Set<() => void>();

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
  } catch {
    /* özel pencere vb. */
  }
};

function yukle() {
  if (yuklendi || typeof window === "undefined") return;
  yuklendi = true;
  let yonetici = false;
  try {
    yonetici = sessionStorage.getItem(K_ADMIN) === "1";
  } catch {}
  veri = {
    hazir: true,
    basvurular: oku<Basvuru[]>(K_BASVURU, BASVURU_SEED),
    ayarlar: { ...AYARLAR_VARSAYILAN, ...oku<Partial<Ayarlar>>(K_AYARLAR, {}) },
    yonetici,
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

function guncelle(f: (v: Veri) => Partial<Veri>) {
  const yeni = { ...veri, ...f(veri) };
  if (yeni.basvurular !== veri.basvurular) yaz(K_BASVURU, yeni.basvurular);
  if (yeni.ayarlar !== veri.ayarlar) yaz(K_AYARLAR, yeni.ayarlar);
  veri = yeni;
  dinleyiciler.forEach((d) => d());
}

export const kimlik = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const basvuruDegistir = (id: string, f: (b: Basvuru) => Basvuru) =>
  guncelle((v) => ({ basvurular: v.basvurular.map((b) => (b.id === id ? f(b) : b)) }));

const eylemler = {
  basvuruEkle(b: YeniBasvuru): Basvuru {
    const yeni: Basvuru = { ...b, id: kimlik(), olusturulma: new Date().toISOString(), durum: "yeni", puanlar: {}, notlar: [] };
    guncelle((v) => ({ basvurular: [yeni, ...v.basvurular] }));
    return yeni;
  },
  basvuruGuncelle(id: string, patch: Partial<Basvuru>) {
    basvuruDegistir(id, (b) => ({ ...b, ...patch }));
  },
  durumDegistir(id: string, durum: Durum) {
    basvuruDegistir(id, (b) => ({ ...b, durum }));
  },
  puanla(id: string, kriter: Kriter, puan: number) {
    basvuruDegistir(id, (b) => ({ ...b, puanlar: { ...b.puanlar, [kriter]: puan } }));
  },
  notEkle(id: string, metin: string) {
    const n = { id: kimlik(), tarih: new Date().toISOString(), metin };
    basvuruDegistir(id, (b) => ({ ...b, notlar: [n, ...b.notlar] }));
  },
  notSil(id: string, notId: string) {
    basvuruDegistir(id, (b) => ({ ...b, notlar: b.notlar.filter((n) => n.id !== notId) }));
  },
  basvuruSil(id: string) {
    guncelle((v) => ({ basvurular: v.basvurular.filter((b) => b.id !== id) }));
  },
  ayarlarGuncelle(patch: Partial<Ayarlar>) {
    guncelle((v) => ({ ayarlar: { ...v.ayarlar, ...patch } }));
  },
  girisYap(sifre: string): boolean {
    if (sifre !== veri.ayarlar.yoneticiSifre) return false;
    try {
      sessionStorage.setItem(K_ADMIN, "1");
    } catch {}
    guncelle(() => ({ yonetici: true }));
    return true;
  },
  cikisYap() {
    try {
      sessionStorage.removeItem(K_ADMIN);
    } catch {}
    guncelle(() => ({ yonetici: false }));
  },
  demoyuSifirla() {
    guncelle(() => ({ basvurular: BASVURU_SEED, ayarlar: AYARLAR_VARSAYILAN }));
  },
};

export function useStore() {
  const v = useSyncExternalStore(abone, anlik, sunucuAnlik);
  return { ...v, ...eylemler };
}

export const yas = (dogumYili: number) => new Date().getFullYear() - dogumYili;

export const tarihKisa = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
