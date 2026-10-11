"use client";

import { useStore, tarihKisa } from "@/lib/store";

/** Başvuru dönemi açık mı? Ayarlardan okur (yönetim panelinden değişir). */
export function BasvuruDurumu({ className = "" }: { className?: string }) {
  const { hazir, ayarlar } = useStore();
  if (!hazir) return <span className={`inline-block h-5 w-40 animate-pulse rounded bg-white/10 ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className={`relative flex h-2.5 w-2.5 ${ayarlar.basvuruAcik ? "" : "opacity-60"}`}>
        {ayarlar.basvuruAcik && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kirmizi opacity-70" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${ayarlar.basvuruAcik ? "bg-kirmizi" : "bg-steel"}`} />
      </span>
      {ayarlar.basvuruAcik ? (
        <>
          {ayarlar.donemAdi} başvuruları açık · son gün {tarihKisa(ayarlar.sonTarih)}
        </>
      ) : (
        <>{ayarlar.donemAdi} başvuruları şu an kapalı</>
      )}
    </span>
  );
}
