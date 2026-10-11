/**
 * Kale Creators logosu — resmi vektör (kale_creators_icon.svg, kimlik rehberi v1.0) birebir.
 * Sol burç kırmızı #E11D2E, sağ burç siyah #111111, ortada kırmızı eşkenar dörtgen ve siyah kapı.
 * Koruma alanı: en az 1x (x ≈ kapı açıklığı). Dijital minimum 32 px. Gölge/kontur/esnetme yok.
 */
export type LogoVaryant = "renkli" | "beyaz" | "siyah";

const RENK = { kirmizi: "#E11D2E", siyah: "#111111", beyaz: "#FFFFFF" };

/* Orijinal dosyanın viewBox'ı 0 0 700 660; çizim 20..630 × 0..620 aralığında. Yalnızca görünüm penceresi kırpıldı, geometri değişmedi. */
export function Amblem({ boyut = 36, varyant = "renkli", className = "" }: { boyut?: number; varyant?: LogoVaryant; className?: string }) {
  const a = varyant === "renkli" ? RENK.kirmizi : varyant === "beyaz" ? RENK.beyaz : RENK.siyah;
  const b = varyant === "renkli" ? RENK.siyah : varyant === "beyaz" ? RENK.beyaz : RENK.siyah;
  return (
    <svg width={boyut} height={boyut * (620 / 610)} viewBox="20 0 610 620" className={className} aria-hidden="true">
      <path fill={a} d="M20 135 L95 97 L95 180 L165 140 L165 40 L245 0 L245 290 L165 350 L165 620 L20 620 Z" />
      <path fill={b} d="M405 0 L485 40 L485 140 L555 180 L555 97 L630 135 L630 620 L485 620 L485 350 L405 290 Z" />
      <path fill={a} d="M323 220 L375 272 L323 324 L271 272 Z" />
      <path fill={b} d="M263 620 L263 415 L323 355 L383 415 L383 620 Z" />
    </svg>
  );
}

/** Ana kombinasyon: ikon + "Kale" (SemiBold) "Creators" (Light) */
export function Logo({ varyant = "renkli", boyut = 30, className = "" }: { varyant?: LogoVaryant; boyut?: number; className?: string }) {
  const metin = varyant === "beyaz" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Amblem boyut={boyut} varyant={varyant} />
      <span className={`whitespace-nowrap leading-none tracking-tight ${metin}`} style={{ fontSize: boyut * 0.7 }}>
        <span className="font-semibold">Kale</span> <span className="font-light">Creators</span>
      </span>
    </span>
  );
}
