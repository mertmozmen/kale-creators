/** Bulanık, yavaşça süzülen renk bulutları. Ton: "acik" (hero), "kirmizi" (koyu zemin), "beyaz" (kırmızı zemin). */
export function Bulutlar({ ton = "acik", className = "" }: { ton?: "acik" | "kirmizi" | "beyaz"; className?: string }) {
  const r = (a: number) => `rgba(225, 29, 46, ${a})`;
  const b = (a: number) => `rgba(255, 255, 255, ${a})`;
  const paletler = {
    acik: [r(0.32), "rgba(255, 128, 110, 0.34)", "rgba(255, 205, 195, 0.7)", b(0.9)],
    kirmizi: [r(0.42), r(0.26), "rgba(120, 20, 40, 0.5)", r(0.18)],
    beyaz: [b(0.28), b(0.18), "rgba(255, 200, 190, 0.35)", b(0.22)],
  }[ton];
  const bulutlar = [
    { cls: "bulut-a", stil: { width: 620, height: 620, left: "-12%", top: "-28%", background: paletler[0] } },
    { cls: "bulut-b", stil: { width: 540, height: 540, right: "-10%", top: "-18%", background: paletler[1] } },
    { cls: "bulut-c", stil: { width: 700, height: 420, left: "28%", bottom: "-30%", background: paletler[2] } },
    { cls: "bulut-b hidden sm:block", stil: { width: 380, height: 380, left: "38%", top: "6%", background: paletler[3], animationDelay: "-9s" } },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {bulutlar.map((x, i) => (
        <div key={i} className={`bulut ${x.cls}`} style={x.stil} />
      ))}
    </div>
  );
}
