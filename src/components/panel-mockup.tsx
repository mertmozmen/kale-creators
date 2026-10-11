import { Logo } from "./logo";
import { Ikon } from "./ikonlar";
import { PANEL_ORNEK } from "@/lib/icerik";

/** Üye paneli önizlemesi: hero altındaki "uygulama ekranı" (CSS ile, görsel yok) */
export function PanelMockup() {
  const sekmeler = ["Eğitim takvimi", "Proje teklifleri", "Ekipman", "Onay kuyruğu", "Performans"];
  return (
    <div className="suzul mx-auto w-full max-w-5xl">
    <div className="golge-derin isilti mx-auto w-full overflow-hidden rounded-[28px] border border-line-light bg-white text-left" aria-label="Üye paneli önizlemesi">
      {/* üst çubuk */}
      <div className="flex items-center justify-between border-b border-line-light px-5 py-3">
        <div className="flex items-center gap-4">
          <Logo boyut={22} />
          <span className="hidden rounded-full bg-paper px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-gri sm:inline">Üye paneli · önizleme</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-gri sm:inline">Elif K. · Active Creator</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">EK</span>
        </div>
      </div>
      {/* sekmeler */}
      <div className="flex gap-1 overflow-x-auto border-b border-line-light px-3 py-2 text-[0.8rem] scrollbar-thin">
        {sekmeler.map((s, i) => (
          <span key={s} className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium ${i === 0 ? "bg-ink text-white" : "text-gri"}`}>
            {s}
          </span>
        ))}
      </div>
      {/* gövde */}
      <div className="grid gap-4 bg-paper p-4 sm:grid-cols-3 sm:p-5">
        <div className="rounded-2xl bg-white p-4">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gri">
            Bu hafta <Ikon ad="egitim" boyut={16} className="text-kirmizi" />
          </p>
          <ul className="mt-3 space-y-2.5">
            {PANEL_ORNEK.egitimler.map((e, i) => (
              <li key={e.ad} className="gir flex gap-3" style={{ "--t": `${1500 + i * 120}ms` } as React.CSSProperties}>
                <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-paper text-[0.6rem] font-semibold uppercase leading-tight text-ink">
                  {e.gun}
                  <span className="text-[0.62rem] font-medium text-gri">{e.saat}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.82rem] font-medium">{e.ad}</span>
                  <span className="block text-[0.7rem] text-gri">{e.yer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gri">
            Proje teklifleri <Ikon ad="proje" boyut={16} className="text-kirmizi" />
          </p>
          <ul className="mt-3 space-y-2.5">
            {PANEL_ORNEK.projeler.map((p, i) => (
              <li key={p.ad} className="gir rounded-xl border border-line-light p-3" style={{ "--t": `${1700 + i * 140}ms` } as React.CSSProperties}>
                <span className="block text-[0.82rem] font-medium">{p.ad}</span>
                <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${p.renk}`}>{p.durum}</span>
              </li>
            ))}
          </ul>
          <div className="gir mt-3 rounded-xl bg-ink p-3 text-white" style={{ "--t": "2050ms" } as React.CSSProperties}>
            <p className="text-[0.65rem] uppercase tracking-wider text-white/60">Bu ay</p>
            <p className="mt-1 text-[0.85rem] font-semibold">6 içerik · 2 proje · ödül adayı</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gri">
            Onay kuyruğu <Ikon ad="onay" boyut={16} className="text-kirmizi" />
          </p>
          <ul className="mt-3 space-y-2.5">
            {PANEL_ORNEK.kuyruk.map((k, i) => (
              <li key={k.ad} className="gir flex items-center justify-between gap-2" style={{ "--t": `${1900 + i * 120}ms` } as React.CSSProperties}>
                <span className="min-w-0">
                  <span className="block truncate text-[0.82rem] font-medium">{k.ad}</span>
                  <span className="block text-[0.7rem] text-gri">{k.durum}</span>
                </span>
                {k.kalan && <span className={`shrink-0 rounded-full bg-kirmizi-soft px-2 py-0.5 text-[0.65rem] font-semibold text-kirmizi ${i === 0 ? "nabiz" : ""}`}>{k.kalan}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-paper">
            <div className="dolgu h-full w-2/3 rounded-full bg-kirmizi" />
          </div>
          <p className="mt-1.5 text-[0.7rem] text-gri">Hedef süre: standart 12 saat</p>
        </div>
      </div>
    </div>
    </div>
  );
}
