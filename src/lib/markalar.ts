/**
 * Ekibin birlikte çalıştığı markalar (kaynak: algow.net referansları, 11 Ekim 2026).
 * mono:false → opak zeminli logolar (filtre uygulanmaz). hoverRenk:false → orijinali siyah/beyaz tek renk, hover'da da beyaz kalsın.
 * Higgsfield (Recraft V4.1 vector) ile üretilenler: misirci-amca, green-golf, ak-teknik, yagmur-insaat, umut-cam-balkon, arya-ambalaj.
 * Instagram profil görselinden büyütülüp (bytedance upscale) şeffaflaştırılanlar: charlot, yenisehir-veteriner, regnum-apart.
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
  { ad: "Perspektif Araştırma", dosya: "perspektif.webp", mono: false },
  { ad: "Çağdaş Matbaa & Reklam", dosya: "cagdas-matbaa.webp" },
  // Kullanıcının eklediği markalar (11 Ekim 2026)
  { ad: "MedyaFest25", dosya: "medyafest.svg" },
  { ad: "Charlot Cafe & Bistro", dosya: "charlot.png", site: "https://www.instagram.com/charlotcoffeebistro/", hoverRenk: false },
  { ad: "Mısırcı Amca Cafe Bistro", dosya: "misirci-amca.png", site: "https://www.instagram.com/misirciamcacafebistro/", hoverRenk: false },
  { ad: "Yenişehir Veteriner Kliniği", dosya: "yenisehir-veteriner.png", site: "https://www.instagram.com/yenisehirveterinerklinik/" },
  { ad: "Regnum Apart", dosya: "regnum-apart.png", site: "https://www.instagram.com/regnumapart1/" },
  { ad: "Green Golf ve Tenis Kulübü", dosya: "green-golf.png", hoverRenk: false },
  { ad: "Arya Ambalaj", dosya: "arya-ambalaj.png", hoverRenk: false },
  { ad: "AK Teknik", dosya: "ak-teknik.png", hoverRenk: false },
  { ad: "Yağmur İnşaat", dosya: "yagmur-insaat.png", hoverRenk: false },
  { ad: "Umut Cam Balkon", dosya: "umut-cam-balkon.png", hoverRenk: false },
];
