/**
 * Ekibin birlikte çalıştığı markalar (kaynak: algow.net referansları, 11 Ekim 2026).
 * mono:false → opak zeminli logolar (filtre uygulanmaz). hoverRenk:false → orijinali siyah, hover'da da beyaz kalsın.
 */
export type Marka = { ad: string; dosya: string; site?: string; mono?: boolean; hoverRenk?: boolean };

export const MARKALAR: Marka[] = [
  { ad: "Kartalcılar", dosya: "kartalcilar.webp", site: "https://kartalcilar.com.tr" },
  { ad: "Aquamet", dosya: "aquamet.webp", site: "https://aquamet.com.tr" },
  { ad: "Erkeç Grup", dosya: "erkec.webp", site: "https://erkec.com.tr", hoverRenk: false },
  { ad: "Altınışık Turizm", dosya: "altinisik.webp" },
  { ad: "Ege Terra Foods", dosya: "egeterra.webp", site: "https://egeterrafood.com" },
  { ad: "Kırıkkale Üniversitesi", dosya: "kirikkale-universitesi.webp" },
  { ad: "Cerkar Makina", dosya: "cerkar.webp", site: "https://cerkar.com.tr" },
  { ad: "PLZ Palazoğlu", dosya: "plz-palazoglu.webp" },
  { ad: "Ayyıldız Nakliyat", dosya: "ayyildiz.webp" },
  { ad: "Provista Petshop", dosya: "provista.webp" },
  { ad: "Lena Nakış", dosya: "lena-nakis.webp" },
  { ad: "Güçlü Öğrenme Akademisi", dosya: "gucluogrenme.webp" },
  { ad: "İlyas Saltay", dosya: "ilyassaltay.webp", mono: false },
  { ad: "Perspektif Araştırma", dosya: "perspektif.webp", mono: false },
  { ad: "Çağdaş Matbaa & Reklam", dosya: "cagdas-matbaa.webp" },
];
