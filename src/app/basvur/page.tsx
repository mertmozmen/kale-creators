import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Kicker } from "@/components/ui";
import { BasvuruFormu } from "@/components/basvuru-formu";
import { Bulutlar } from "@/components/bulutlar";
import { KelimeKelime } from "@/components/kelime";

export const metadata: Metadata = { title: "Başvuru — Kale Creators Kurucu 20" };

export default function BasvurSayfasi() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper text-ink">
        <div className="hero-zemin relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
          <Bulutlar ton="acik" />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
            <Kicker className="mb-5 justify-center">Kurucu 20 başvurusu</Kicker>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              <KelimeKelime metin="10 dakikada" baslangic={200} /> <span className="font-serif-italic parilti-nabiz text-kirmizi"><KelimeKelime metin="başvur." baslangic={420} /></span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-light text-gri">Beş adım: profil, bilgiler, herkese sorulan sorular, sana özel sorular ve onay. Cevaplar yalnızca değerlendirme kuruluna görünür.</p>
          </div>
        </div>
        <div className="giris-egik relative mx-auto -mt-14 max-w-3xl px-4 pb-20 sm:px-6 sm:pb-28">
          <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl bg-white/60" />}>
            <BasvuruFormu />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
