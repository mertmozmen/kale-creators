import { MARKALAR } from "@/lib/markalar";
import { medyaYolu } from "@/lib/yol";

/** Koyu zeminde kayan marka şeridi: beyaz silüet, üzerine gelince orijinal renk */
export function MarkaSeridi() {
  const liste = [...MARKALAR, ...MARKALAR];
  return (
    <section className="relative overflow-hidden bg-ink py-10 text-white sm:py-12" aria-label="Birlikte çalıştığımız markalar">
      <div className="mazgal absolute inset-x-0 top-0 h-1 opacity-70" />
      <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/45">Ekibimizin birlikte çalıştığı markalar</p>
      <div className="mt-7 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marka-kayan">
          {liste.map((m, i) => {
            const img = (
              <img
                src={medyaYolu(`/markalar/${m.dosya}`)}
                alt={m.ad}
                loading="lazy"
                decoding="async"
                className={`marka-logo h-8 w-auto max-w-[150px] object-contain sm:h-10 sm:max-w-[170px] ${m.mono === false ? "marka-renkli" : ""} ${m.hoverRenk === false ? "marka-sabit" : ""}`}
              />
            );
            return (
              <span key={i} className="flex shrink-0 items-center px-7 sm:px-9" title={m.ad}>
                {m.site ? (
                  <a href={m.site} target="_blank" rel="noreferrer" aria-label={m.ad}>
                    {img}
                  </a>
                ) : (
                  img
                )}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
