# Kale Creators — başvuru sitesi ve değerlendirme paneli

Kırıkkale içerik üretici topluluğu "Kale Creators" için Kurucu 20 dönemi web sitesi: tanıtım sayfası, çok adımlı başvuru formu, yayın ilkeleri ve KVKK metinleri, değerlendirme kurulu paneli.

Strateji belgesi: `docs/kale-creators-strateji-2026-10-11.pdf` (ham metin `docs/strateji-ham-metin.txt`).

## Çalıştırma

```bash
npm install
npm run dev -- -p 3060
```

- Site: http://localhost:3060
- Yönetim: http://localhost:3060/yonetim/ (demo şifre `kale2026`, Ayarlar'dan değişir)

## Yapı

| Yol | Ne |
| --- | --- |
| `/` | Tanıtım: iki profil, avantajlar, kabul süreci, ilkeler özeti, SSS |
| `/basvur/` | 5 adımlı form; `?profil=aktif` veya `?profil=yukselen` ile ön seçim |
| `/ilkeler/` | Yayın ilkeleri ve marka güvenliği (PDF bölüm 6-8) |
| `/kvkk/` | KVKK aydınlatma metni taslağı |
| `/yonetim/` | Başvuru listesi, filtre, kontenjan sayacı |
| `/yonetim/basvuru/?id=` | Cevaplar, 5 kriter × 5 puan, durum akışı, kurul notları |
| `/yonetim/ayarlar/` | Dönem, kontenjan, yaş sınırı, şifre, JSON yedek |

Veri: `src/lib/store.tsx` (localStorage). Soru bankası ve kriterler: `src/lib/sorular.ts`. Metinler: `src/lib/icerik.ts`, `src/lib/legal.ts`.

## Canlıya geçiş

1. Supabase projesi aç, `supabase/schema.sql` uygula, yönetici e-postasını `yoneticiler` tablosuna ekle.
2. `store.tsx` içindeki localStorage katmanını Supabase çağrılarıyla değiştir (bileşen API'si aynı kalır).
3. `npm run build` → `out/` → Hostinger `public_html` (statik export).

Yasal metinler taslaktır; yayın öncesi avukat incelemesi gerekir.
