export type Profil = "aktif" | "yukselen";

export type Durum = "yeni" | "on_degerlendirme" | "gorusme" | "teklif" | "kabul" | "ret";

export type Kriter = "ozgunluk" | "kalite" | "gelisim" | "sureklilik" | "sehir";

export type Konum = "merkez" | "ilce" | "disarida";

export type Not = { id: string; tarih: string; metin: string };

export type Basvuru = {
  id: string;
  olusturulma: string;
  profil: Profil;
  ad: string;
  soyad: string;
  eposta: string;
  telefon: string;
  dogumYili: number;
  konum: Konum;
  alanlar: string[];
  haftalikSaat: string;
  /** soru id → cevap */
  cevaplar: Record<string, string>;
  durum: Durum;
  puanlar: Partial<Record<Kriter, number>>;
  notlar: Not[];
  kvkkOnay: boolean;
  ilkelerOnay: boolean;
};

export type Ayarlar = {
  donemAdi: string;
  basvuruAcik: boolean;
  sonTarih: string;
  kontenjan: number;
  hedefAktif: number;
  hedefYukselen: number;
  minYas: number;
  yoneticiSifre: string;
};

export type YeniBasvuru = Omit<Basvuru, "id" | "olusturulma" | "durum" | "puanlar" | "notlar">;
