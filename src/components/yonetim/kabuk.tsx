"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Logo } from "../logo";
import { Ikon } from "../ikonlar";
import { Buton } from "../ui";

const MENU = [
  { href: "/yonetim/", ad: "Başvurular", ikon: "liste" },
  { href: "/yonetim/ayarlar/", ad: "Ayarlar", ikon: "ayar" },
];

/** Yönetim paneli kabuğu: şifre kapısı + üst menü */
export function YonetimKabuk({ children, baslik }: { children: React.ReactNode; baslik?: string }) {
  const { hazir, yonetici, girisYap, cikisYap } = useStore();
  const yol = usePathname();
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState(false);

  if (!hazir) return <div className="min-h-screen bg-paper" />;

  if (!yonetici) {
    return (
      <main className="koyu-parilti flex min-h-screen items-center justify-center bg-ink px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!girisYap(sifre)) setHata(true);
          }}
          className="w-full max-w-sm rounded-3xl bg-white p-8 text-ink"
        >
          <Logo />
          <h1 className="font-display mt-6 text-2xl font-bold">Yönetim paneli</h1>
          <p className="mt-1 text-sm text-ink/60">Değerlendirme kurulu girişi.</p>
          <label className="mt-6 block">
            <span className="mb-1.5 block text-sm font-semibold">Şifre</span>
            <input
              type="password"
              className="alan"
              value={sifre}
              onChange={(e) => {
                setSifre(e.target.value);
                setHata(false);
              }}
              autoFocus
            />
          </label>
          {hata && <p className="mt-2 text-sm font-medium text-rose-ink">Şifre yanlış.</p>}
          <Buton varyant="ink" className="mt-5 w-full" type="submit">
            <Ikon ad="kilit" boyut={18} /> Giriş yap
          </Buton>
          <p className="mt-4 text-center text-xs text-muted">Demo şifresi: kale2026 · Ayarlar&apos;dan değiştirilir.</p>
          <Link href="/" className="mt-4 block text-center text-xs font-medium text-ink/50 hover:text-ink">
            ← Siteye dön
          </Link>
        </form>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-line-light bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/yonetim/">
              <Logo boyut={26} />
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${yol === m.href ? "bg-ink text-paper" : "text-ink/65 hover:bg-paper-2"}`}>
                  <Ikon ad={m.ikon} boyut={16} /> {m.ad}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden text-sm font-medium text-ink/60 hover:text-ink sm:block">
              Siteyi gör
            </Link>
            <button onClick={cikisYap} className="inline-flex items-center gap-1.5 rounded-full border border-line-light px-3 py-1.5 text-sm font-medium hover:bg-paper-2">
              <Ikon ad="cikis" boyut={16} /> Çıkış
            </button>
          </div>
        </div>
        <nav className="flex gap-1 border-t border-line-light px-4 py-2 sm:hidden">
          {MENU.map((m) => (
            <Link key={m.href} href={m.href} className={`rounded-full px-3 py-1.5 text-sm font-medium ${yol === m.href ? "bg-ink text-paper" : "text-ink/65"}`}>
              {m.ad}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {baslik && <h1 className="font-display mb-6 text-3xl font-bold">{baslik}</h1>}
        {children}
      </main>
    </div>
  );
}
