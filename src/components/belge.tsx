import { Nav } from "./nav";
import { Footer } from "./footer";
import { Kicker } from "./ui";
import { Bulutlar } from "./bulutlar";
import type { Bolum } from "@/lib/legal";

/** Yasal / ilke metinleri için ortak sayfa kabuğu (açık tema) */
export function Belge({ kicker, baslik, alt, giris, bolumler, not }: { kicker: string; baslik: string; alt?: string; giris?: string; bolumler: Bolum[]; not?: string }) {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-white text-ink">
        <div className="hero-zemin relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
          <Bulutlar ton="acik" />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
            <Kicker className="mb-5">{kicker}</Kicker>
            <h1 className="gir font-display text-4xl font-semibold leading-[1.05] sm:text-5xl" style={{ "--t": "200ms" } as React.CSSProperties}>{baslik}</h1>
            {alt && <p className="mt-4 text-sm text-gri">{alt}</p>}
          </div>
        </div>
        <article className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
          {giris && <p className="text-lg font-light leading-relaxed text-ink/80">{giris}</p>}
          <div className={`space-y-10 ${giris ? "mt-12" : ""}`}>
            {bolumler.map((b) => (
              <section key={b.baslik}>
                <h2 className="font-display text-2xl font-semibold">{b.baslik}</h2>
                {b.paragraflar?.map((p) => (
                  <p key={p} className="mt-3 font-light leading-relaxed text-ink/75">
                    {p}
                  </p>
                ))}
                {b.maddeler && (
                  <ul className="mt-4 space-y-2.5">
                    {b.maddeler.map((m) => (
                      <li key={m} className="flex gap-3 font-light leading-relaxed text-ink/75">
                        <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-kirmizi" />
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          {not && <p className="mt-14 rounded-2xl border border-line-light bg-paper p-5 text-sm leading-relaxed text-gri">{not}</p>}
        </article>
      </main>
      <Footer />
    </>
  );
}
