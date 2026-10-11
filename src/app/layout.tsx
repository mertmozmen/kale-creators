import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import "./globals.css";
import { medyaYolu } from "@/lib/yol";

/* Kurumsal kimlik: Poppins SemiBold (Kale) / Light (Creators). Instrument Serif italik yalnızca vurgu satırlarında. */
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600", "700"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin", "latin-ext"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kalecreators.com"),
  title: "Kale Creators — Kırıkkale'nin içerik üretici topluluğu",
  description:
    "Kırıkkale'de üreten ve üretmek isteyen içerik üreticileri için eğitim, ekipman, ortak yapım ve ücretli marka projeleri. Kurucu 20 dönemi başvuruları açık.",
  icons: { icon: medyaYolu("/favicon.svg") },
  openGraph: {
    title: "Kale Creators",
    description: "Üretiyoruz, gelişiyoruz, birlikte büyüyoruz. Kurucu 20 dönemi başvuruları açık.",
    url: "https://kalecreators.com",
    siteName: "Kale Creators",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${poppins.variable} ${instrument.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
