"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { Ikon } from "./ikonlar";

const LINKLER = [
  { href: "/#program", ad: "Program" },
  { href: "/#nasil", ad: "Nasıl işler" },
  { href: "/ilkeler/", ad: "İlkeler" },
  { href: "/#sss", ad: "SSS" },
  { href: "/#iletisim", ad: "İletişim" },
];

/** Üstten asılı siyah sekme menü (supaste esini); koyu zemin → beyaz logo */
export function Nav() {
  const [acik, setAcik] = useState(false);
  const yol = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 sm:px-4">
      <div className={`nav-gir w-full max-w-[52rem] bg-ink text-white shadow-[0_20px_50px_-20px_rgba(17,17,17,0.6)] sm:rounded-b-[18px] ${acik ? "rounded-b-[18px]" : ""}`}>
        <div className="flex h-14 items-center justify-between pl-5 pr-2.5">
          <Link href="/" aria-label="Kale Creators ana sayfa" className="nav-link" style={{ "--i": 0 } as React.CSSProperties}>
            <Logo varyant="beyaz" boyut={26} />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {LINKLER.map((l, i) => (
              <Link key={l.href} href={l.href} className={`nav-link rounded-full px-3 py-1.5 text-[0.84rem] font-medium transition-colors hover:text-white ${yol === l.href ? "text-white" : "text-white/65"}`} style={{ "--i": i + 1 } as React.CSSProperties}>
                {l.ad}
              </Link>
            ))}
            <Link href="/basvur/" className="nav-link parla ml-2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.84rem] font-semibold text-ink transition-all hover:bg-paper" style={{ "--i": LINKLER.length + 1 } as React.CSSProperties}>
              Başvur <Ikon ad="ok" boyut={15} />
            </Link>
          </nav>
          <button className="rounded-full p-2 text-white md:hidden" onClick={() => setAcik((a) => !a)} aria-label={acik ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={acik}>
            <Ikon ad={acik ? "kapat" : "menu"} boyut={24} />
          </button>
        </div>
        {acik && (
          <nav className="flex flex-col gap-1 border-t border-white/10 px-3 pb-4 pt-2 md:hidden">
            {LINKLER.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setAcik(false)} className="rounded-xl px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5">
                {l.ad}
              </Link>
            ))}
            <Link href="/basvur/" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-ink">
              Kurucu 20&apos;ye başvur <Ikon ad="ok" boyut={18} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
