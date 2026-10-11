import Link from "next/link";
import { Ikon } from "./ikonlar";

type Varyant = "ink" | "kirmizi" | "paper" | "ghost" | "ghost-dark";

/* Hap biçimli düğmeler (supaste esini): siyah birincil, beyaz ikincil, kırmızı vurgu */
const stiller: Record<Varyant, string> = {
  ink: "bg-ink text-white hover:bg-ink-3 shadow-[0_10px_30px_-12px_rgba(17,17,17,0.6)]",
  kirmizi: "bg-kirmizi text-white hover:bg-kirmizi-2 shadow-[0_10px_30px_-12px_rgba(225,29,46,0.6)]",
  paper: "bg-white text-ink border border-line-light hover:border-steel",
  ghost: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  "ghost-dark": "border border-line-light text-ink hover:bg-paper",
};

const boyutlar = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-[0.95rem]", lg: "px-8 py-4 text-base" };

export function Buton({
  href,
  children,
  varyant = "ink",
  boyut = "md",
  className = "",
  ok,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  varyant?: Varyant;
  boyut?: keyof typeof boyutlar;
  className?: string;
  ok?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  const cls = `parla inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none ${stiller[varyant]} ${boyutlar[boyut]} ${className}`;
  const icerik = (
    <>
      {children}
      {ok && <Ikon ad="ok" boyut={18} />}
    </>
  );
  if (href) return <Link href={href} className={cls}>{icerik}</Link>;
  return (
    <button className={cls} {...rest}>
      {icerik}
    </button>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-kirmizi ${className}`}>
      <span className="h-1.5 w-1.5 rotate-45 bg-kirmizi" />
      {children}
    </p>
  );
}

export function Baslik({ kicker, children, alt, acik = false, ortala = false, className = "" }: { kicker?: string; children: React.ReactNode; alt?: string; acik?: boolean; ortala?: boolean; className?: string }) {
  return (
    <div className={`max-w-2xl ${ortala ? "mx-auto text-center" : ""} ${className}`}>
      {kicker && <Kicker className="mb-4">{kicker}</Kicker>}
      <h2 className={`font-display text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[2.9rem] ${acik ? "text-white" : "text-ink"}`}>{children}</h2>
      {alt && <p className={`mt-4 text-base font-light leading-relaxed sm:text-lg ${acik ? "text-white/65" : "text-gri"}`}>{alt}</p>}
    </div>
  );
}

export function Rozet({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

export function Alan({
  etiket,
  yardim,
  hata,
  children,
  zorunlu,
}: {
  etiket: string;
  yardim?: string;
  hata?: string;
  children: React.ReactNode;
  zorunlu?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {etiket}
        {zorunlu && <span className="ml-1 text-kirmizi">*</span>}
      </span>
      {yardim && <span className="mb-2 block text-[0.8rem] leading-snug text-muted">{yardim}</span>}
      {children}
      {hata && <span className="mt-1.5 block text-[0.8rem] font-medium text-rose-ink">{hata}</span>}
    </label>
  );
}
