import { DURUM_MAP, PROFIL_BILGI } from "@/lib/sorular";
import type { Durum, Profil } from "@/lib/types";
import { Rozet } from "../ui";

export function DurumRozeti({ durum }: { durum: Durum }) {
  const d = DURUM_MAP[durum];
  return <Rozet className={d.renk}>{d.ad}</Rozet>;
}

export function ProfilRozeti({ profil }: { profil: Profil }) {
  return <Rozet className={profil === "aktif" ? "bg-ink text-paper" : "border border-ink/20 bg-white text-ink"}>{PROFIL_BILGI[profil].ad}</Rozet>;
}

export function Kart({ children, className = "", baslik }: { children: React.ReactNode; className?: string; baslik?: string }) {
  return (
    <section className={`rounded-2xl border border-line-light bg-white p-5 sm:p-6 ${className}`}>
      {baslik && <h2 className="font-display mb-4 text-lg font-semibold">{baslik}</h2>}
      {children}
    </section>
  );
}

export function Sayi({ etiket, deger, alt, vurgu = false }: { etiket: string; deger: string | number; alt?: string; vurgu?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${vurgu ? "border-kirmizi bg-kirmizi text-white" : "border-line-light bg-white"}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${vurgu ? "text-white/80" : "text-muted"}`}>{etiket}</p>
      <p className="font-display mt-2 text-3xl font-bold">{deger}</p>
      {alt && <p className={`mt-1 text-xs ${vurgu ? "text-white/80" : "text-muted"}`}>{alt}</p>}
    </div>
  );
}
