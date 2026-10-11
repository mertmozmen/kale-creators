import Link from "next/link";
import { Logo } from "./logo";
import { Ikon } from "./ikonlar";
import { MARKA } from "@/lib/icerik";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mazgal mazgal-kay h-1.5 w-full" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo varyant="beyaz" />
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/60">
            {MARKA.slogan} {MARKA.altSlogan}
          </p>
          <a href={`https://instagram.com/${MARKA.instagram}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-kirmizi">
            <Ikon ad="insta" boyut={18} /> @{MARKA.instagram}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Program</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link href="/#program" className="hover:text-white">Kurucu 20</Link></li>
            <li><Link href="/#nasil" className="hover:text-white">Kabul süreci</Link></li>
            <li><Link href="/basvur/" className="hover:text-white">Başvuru formu</Link></li>
            <li><Link href="/#sss" className="hover:text-white">Sık sorulanlar</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Kurallar</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link href="/ilkeler/" className="hover:text-white">Yayın ilkeleri</Link></li>
            <li><Link href="/kvkk/" className="hover:text-white">KVKK aydınlatma</Link></li>
            <li><Link href="/yonetim/" className="text-white/40 hover:text-white">Yönetim</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">İletişim</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-white/75">
            <p>
              {MARKA.adres}
              <br />
              {MARKA.ilce}
            </p>
            <p>
              <a href={`tel:${MARKA.telefonHam}`} className="hover:text-white">{MARKA.telefon}</a>
            </p>
            <p>
              <a href={`https://${MARKA.domain}`} className="hover:text-white">{MARKA.domain}</a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Kale Creators · Kırıkkale</span>
          <span>İş birliği &amp; katılım: DM</span>
        </div>
      </div>
    </footer>
  );
}
