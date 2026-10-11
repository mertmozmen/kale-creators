import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Baslik, Buton } from "@/components/ui";
import { Ikon } from "@/components/ikonlar";
import { Amblem } from "@/components/logo";
import { BasvuruDurumu } from "@/components/basvuru-durumu";
import { PanelMockup } from "@/components/panel-mockup";
import { Bulutlar } from "@/components/bulutlar";
import { KelimeKelime } from "@/components/kelime";
import { MarkaSeridi } from "@/components/markalar";
import { AVANTAJLAR, ILKELER_OZET, KABUL_AKISI, MARKA, SEHIR_HIKAYELERI, SSS } from "@/lib/icerik";
import { PROFIL_BILGI } from "@/lib/sorular";

export default function AnaSayfa() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* HERO */}
        <section className="hero-zemin relative overflow-hidden pt-32 pb-10 sm:pt-40">
          <Bulutlar ton="acik" />
          <div className="hero-izgara pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-6">
            <span className="gir inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink backdrop-blur" style={{ "--t": "150ms" } as React.CSSProperties}>
              <Amblem boyut={14} /> Kırıkkale · Kurucu 20 dönemi
            </span>
            <h1 className="font-display mx-auto mt-7 max-w-4xl text-[2.9rem] font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-[5.4rem]">
              <KelimeKelime metin="Kırıkkale üretsin." baslangic={300} />
              <span className="font-serif-italic parilti-nabiz mt-1 block text-kirmizi">
                <KelimeKelime metin="Birlikte büyüsün." baslangic={620} />
              </span>
            </h1>
            <p className="gir mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-gri sm:text-lg" style={{ "--t": "950ms" } as React.CSSProperties}>
              Kale Creators, Kırıkkale&apos;de üreten ve üretmek isteyen içerik üreticilerini bir araya getiren seçici bir topluluk. Eğitim, ekipman, ortak yapım ve ücretli marka projeleri; hepsi tek çatı altında.
            </p>
            <div className="gir mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--t": "1150ms" } as React.CSSProperties}>
              <Buton href="/basvur/" boyut="lg" ok>
                Kurucu 20&apos;ye başvur
              </Buton>
              <Buton href="#program" varyant="paper" boyut="lg">
                Programı incele
              </Buton>
            </div>
            <div className="gir mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] text-gri" style={{ "--t": "1350ms" } as React.CSSProperties}>
              <span>20 kurucu üye</span>
              <span className="hidden h-1 w-1 rounded-full bg-steel sm:block" />
              <span>6 aylık pilot</span>
              <span className="hidden h-1 w-1 rounded-full bg-steel sm:block" />
              <span>Yahşihan, Kırıkkale</span>
              <span className="hidden h-1 w-1 rounded-full bg-steel sm:block" />
              <BasvuruDurumu />
            </div>
            <div className="giris-egik mt-14 sm:mt-20">
              <PanelMockup />
            </div>
          </div>
        </section>

        {/* MARKALAR */}
        <MarkaSeridi />

        {/* ŞEHİR */}
        <section id="sehir" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <Baslik kicker="Neden Kırıkkale" alt="Plakası 71, nüfusu üç yüz bin, hikâyesi anlatılmamış. Kurucu 20'nin ilk işi bu serileri açmak.">
                Anlatılmayı bekleyen bir şehir.
              </Baslik>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SEHIR_HIKAYELERI.map((h, i) => (
                <Reveal key={h.no} gecikme={i * 80} className="group kart-canli relative overflow-hidden rounded-3xl bg-paper p-7 hover:bg-ink">
                  <span className="font-display inline-block text-5xl font-semibold text-ink/10 transition-all duration-500 group-hover:scale-110 group-hover:text-kirmizi">{h.no}</span>
                  <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-kirmizi">{h.etiket}</p>
                  <h3 className="font-display mt-2 text-xl font-semibold text-ink transition-colors group-hover:text-white">{h.baslik}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-gri transition-colors group-hover:text-white/65">{h.metin}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section id="program" className="bg-paper py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <Baslik ortala kicker="Kurucu 20 programı" alt="Kontenjanın yarısı zaten üretenlere, yarısı yeni başlayanlara. Kesin kota yerine başvuru kalitesine göre karar veriyoruz.">
                İki profil, tek ekip.
              </Baslik>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {(["aktif", "yukselen"] as const).map((p, i) => {
                const b = PROFIL_BILGI[p];
                const koyu = p === "aktif";
                const liste = koyu
                  ? ["Hesaplarını ve en iyi üç işini paylaşırsın", "Ekipman ve yazılım deneyimin değerlendirilir", "Mevcut müşterilerin kayda alınır, sana kalır"]
                  : ["Portföy şartı yok, niyet ve fikir yeter", "İlk videonu ekiple birlikte çekersin", "Öğrenmek istediğin üç beceri program haritana girer"];
                return (
                  <Reveal key={p} gecikme={i * 100} className={`golge-yumusak kart-canli isilti relative overflow-hidden rounded-[28px] p-8 sm:p-10 ${koyu ? "bg-ink text-white" : "bg-white"}`}>
                    <div className="suzul-yavas pointer-events-none absolute -right-10 -top-10 opacity-[0.07]">
                      <Amblem boyut={220} varyant={koyu ? "beyaz" : "siyah"} />
                    </div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-kirmizi">{b.kisa}</p>
                    <h3 className="font-display mt-3 text-3xl font-semibold">{b.ad}</h3>
                    <p className={`mt-3 font-light leading-relaxed ${koyu ? "text-white/65" : "text-gri"}`}>{b.aciklama}</p>
                    <ul className="mt-7 space-y-3">
                      {liste.map((m) => (
                        <li key={m} className="flex gap-3 text-sm">
                          <span className="mt-0.5 shrink-0 text-kirmizi">
                            <Ikon ad="onay" boyut={18} />
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                    <Buton href={`/basvur/?profil=${p}`} varyant={koyu ? "paper" : "ink"} className="mt-9" ok>
                      {b.ad} olarak başvur
                    </Buton>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* AVANTAJLAR */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <Baslik kicker="Üyelik ne sağlar" alt="Tek başına çıkaramayacağın işleri birlikte çıkarmak için gereken her şey.">
                Üretenin yanında duran altyapı.
              </Baslik>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AVANTAJLAR.map((a, i) => (
                <Reveal key={a.baslik} gecikme={(i % 3) * 90} className="group kart-canli rounded-3xl border border-line-light bg-white p-7 hover:border-kirmizi/40">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-kirmizi-soft text-kirmizi transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-kirmizi group-hover:text-white">
                    <Ikon ad={a.ikon} boyut={22} />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold text-ink">{a.baslik}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-gri">{a.metin}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* NASIL İŞLER */}
        <section id="nasil" className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <Baslik kicker="Kabul süreci" alt="Başvurudan ilk projeye yedi adım. Her adımda yazılı geri dönüş alırsın.">
                Nasıl işler?
              </Baslik>
              <Buton href="/basvur/" className="mt-8" ok>
                Formu doldur
              </Buton>
            </Reveal>
            <ol className="relative border-l-2 border-paper-3 pl-8">
              {KABUL_AKISI.map((a, i) => (
                <Reveal key={a.ad} as="li" gecikme={i * 60} className="relative pb-8 last:pb-0">
                  <span className="font-display absolute -left-[2.65rem] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white ring-4 ring-paper">{i + 1}</span>
                  <h3 className="font-display pt-1.5 text-lg font-semibold text-ink">{a.ad}</h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-gri">{a.metin}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* İLKELER (koyu zemin, ters beyaz logo) */}
        <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
          <Bulutlar ton="kirmizi" />
          <div className="suzul-yavas pointer-events-none absolute -right-16 top-10 opacity-[0.06]">
            <Amblem boyut={480} varyant="beyaz" />
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Baslik acik kicker="Yayın ilkeleri" alt="Üyeler bağımsız üreticidir. Ama topluluğun adı tek bir paylaşımla zarar görebilir; bu yüzden yayın öncesi birlikte bakıyoruz.">
                Hesap senin, kimlik senin. Yayın birlikte.
              </Baslik>
              <Link href="/ilkeler/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-kirmizi hover:text-white">
                İlkelerin tamamını oku <Ikon ad="ok" boyut={18} />
              </Link>
            </Reveal>
            <Reveal gecikme={120} className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <ul className="space-y-4">
                {ILKELER_OZET.map((m, i) => (
                  <li key={m} className="flex gap-4 text-[0.95rem] leading-relaxed text-white/80">
                    <span className="font-display mt-0.5 w-6 shrink-0 text-sm font-semibold text-kirmizi">0{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* SSS */}
        <section id="sss" className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <Reveal>
              <Baslik ortala kicker="Sık sorulanlar">Aklındakiler.</Baslik>
            </Reveal>
            <div className="mt-10 divide-y divide-line-light border-y border-line-light">
              {SSS.map((s, i) => (
                <Reveal key={s.soru} gecikme={i * 40}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[1.02rem] font-semibold text-ink">
                      {s.soru}
                      <span className="shrink-0 rotate-45 text-kirmizi transition-transform group-open:rotate-90">
                        <Ikon ad="kapat" boyut={20} />
                      </span>
                    </summary>
                    <div className="sss-icerik"><p className="mt-3 max-w-2xl text-[0.95rem] font-light leading-relaxed text-gri">{s.cevap}</p></div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="bg-paper py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <Baslik kicker="İletişim" alt="Görüşmeler ve ekipman teslimi Yahşihan'daki merkezimizde. Sorun için DM ya da telefon.">
                Bizi Yahşihan&apos;da bul.
              </Baslik>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">Adres</dt>
                  <dd className="mt-1 text-base text-ink">
                    {MARKA.adres}
                    <br />
                    {MARKA.ilce}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">Telefon</dt>
                  <dd className="mt-1 text-base">
                    <a href={`tel:${MARKA.telefonHam}`} className="text-ink hover:text-kirmizi">{MARKA.telefon}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">Instagram</dt>
                  <dd className="mt-1 text-base">
                    <a href={`https://instagram.com/${MARKA.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-kirmizi">
                      <Ikon ad="insta" boyut={18} /> @{MARKA.instagram}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Buton href={`https://wa.me/${MARKA.telefonHam.replace("+", "")}`} varyant="ink">
                  WhatsApp&apos;tan yaz
                </Buton>
                <Buton href={MARKA.haritaLink} varyant="paper">
                  Yol tarifi al
                </Buton>
              </div>
            </Reveal>
            <Reveal gecikme={120} className="golge-yumusak overflow-hidden rounded-[28px] border border-line-light bg-white">
              <iframe
                title="Kale Creators konumu — Yenişehir Mahallesi, Atatürk Caddesi, Yahşihan / Kırıkkale"
                src={MARKA.haritaEmbed}
                className="h-[320px] w-full grayscale-[0.35] sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-5 py-16 sm:px-6 sm:py-24">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-kirmizi px-7 py-14 text-white sm:px-14 sm:py-20">
            <Bulutlar ton="beyaz" />
            <div className="suzul-yavas pointer-events-none absolute -left-16 -bottom-20 opacity-15">
              <Amblem boyut={360} varyant="beyaz" />
            </div>
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/80">Kırıkkale · Kurucu 20</p>
                <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] sm:text-5xl">
                  Şehrin hikâyesini anlatacak <span className="font-serif-italic">ilk 20 kişiden</span> biri ol.
                </h2>
                <BasvuruDurumu className="mt-6 text-white/85" />
              </div>
              <Buton href="/basvur/" varyant="paper" boyut="lg" className="shrink-0 whitespace-nowrap border-0" ok>
                Başvuruya başla
              </Buton>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
