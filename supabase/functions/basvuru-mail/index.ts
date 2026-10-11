// Kale Creators · başvuru e-postaları
// Tetik: public.basvuru_mail_tetik() (pg_net) → POST { tur, basvuru } + x-webhook-secret
// SMTP: Hostinger (smtp.hostinger.com:465) · gönderen bilgi@kalecreators.com
// Gizli değerler (Dashboard → Edge Functions → Secrets): SMTP_PASS (zorunlu), SMTP_USER (vars. bilgi@kalecreators.com)
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

type Tur = "alindi" | "gorusme" | "kabul" | "ret";
type Basvuru = {
  id: string;
  ad: string;
  soyad: string;
  eposta: string;
  telefon: string;
  profil: "aktif" | "yukselen";
  donem: string;
  alanlar: string[];
  konum: string;
};

const SITE = "https://kalecreators.com";
const EKIP = "bilgi@kalecreators.com";
const PROFIL = { aktif: "Active Creator", yukselen: "Rising Creator" } as const;

const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

/* ---------- şablonlar ---------- */
function sablon(baslik: string, govde: string, altNot = "") {
  return `<!doctype html><html lang="tr"><body style="margin:0;background:#f3f4f6;font-family:Poppins,Helvetica,Arial,sans-serif;color:#111">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fff;border-radius:20px;overflow:hidden">
<tr><td style="background:#111;padding:22px 28px;color:#fff;font-size:18px"><span style="font-weight:600">Kale</span> <span style="font-weight:300">Creators</span>
<span style="display:inline-block;width:8px;height:8px;background:#E11D2E;transform:rotate(45deg);margin-left:10px"></span></td></tr>
<tr><td style="padding:30px 28px 10px"><h1 style="margin:0 0 14px;font-size:24px;line-height:1.2;font-weight:600">${baslik}</h1>
<div style="font-size:15px;line-height:1.65;color:#333">${govde}</div></td></tr>
<tr><td style="padding:10px 28px 28px;font-size:12px;line-height:1.6;color:#6b7280">${altNot}
<p style="margin:14px 0 0">Kale Creators · Yenişehir Mahallesi, Atatürk Caddesi, Yahşihan / Kırıkkale · <a href="tel:+905057876348" style="color:#6b7280">+90 505 787 63 48</a> · <a href="${SITE}" style="color:#E11D2E">kalecreators.com</a></p></td></tr>
</table></td></tr></table></body></html>`;
}

function mailIcerik(tur: Tur, b: Basvuru): { konu: string; html: string; metin: string } {
  const ad = b.ad.trim();
  const profil = PROFIL[b.profil] ?? b.profil;
  switch (tur) {
    case "alindi":
      return {
        konu: `Başvurun alındı, ${ad} · Kale Creators ${b.donem}`,
        html: sablon(
          `Başvurun alındı, ${ad}.`,
          `<p>${b.donem} dönemi için <strong>${profil}</strong> başvurunu aldık. Cevaplarını değerlendirme kurulumuz inceliyor.</p>
           <p>Sıradaki adım <strong>ön değerlendirme</strong>. Uygun bulunursan kısa bir görüşme için bu e-posta adresinden ya da telefonla ulaşacağız. Genelde birkaç gün içinde dönüş yaparız.</p>
           <p>Bu arada <a href="${SITE}/ilkeler/" style="color:#E11D2E">yayın ilkelerimize</a> tekrar göz atabilirsin.</p>`,
          `Başvuru no: ${b.id.slice(0, 8).toUpperCase()}. Bu e-posta ${b.eposta} adresine, kalecreators.com üzerinden yaptığın başvuru üzerine gönderildi.`,
        ),
        metin: `Merhaba ${ad},\n\n${b.donem} dönemi için ${profil} başvurunu aldık. Değerlendirme kurulumuz inceliyor; uygun bulunursan kısa bir görüşme için ulaşacağız.\n\nKale Creators · kalecreators.com · +90 505 787 63 48`,
      };
    case "gorusme":
      return {
        konu: `Görüşmeye davetlisin, ${ad} · Kale Creators`,
        html: sablon(
          `Seninle tanışmak istiyoruz, ${ad}.`,
          `<p>Başvurun ön değerlendirmeyi geçti. Sıradaki adım <strong>20 dakikalık kısa bir görüşme</strong>; Yahşihan'daki merkezimizde yüz yüze ya da çevrim içi yapabiliriz.</p>
           <p>Ekip arkadaşlarımız uygun gün ve saati belirlemek için seninle iletişime geçecek. İstersen sen de bize yazabilirsin.</p>`,
          `Bu e-posta ${b.eposta} adresine gönderildi.`,
        ),
        metin: `Merhaba ${ad},\n\nBaşvurun ön değerlendirmeyi geçti. Sıradaki adım 20 dakikalık kısa bir görüşme. Ekip arkadaşlarımız gün ve saat için seninle iletişime geçecek.\n\nKale Creators · +90 505 787 63 48`,
      };
    case "kabul":
      return {
        konu: `Onaylandın, ${ad}. Kale Creators'a hoş geldin!`,
        html: sablon(
          `Onaylandın, ${ad}.`,
          `<p><strong>${b.donem}</strong> ekibine seçildin. Ekip arkadaşlarımız sözleşme, oryantasyon ve ilk eğitim takvimi için en kısa sürede seninle iletişime geçecek.</p>
           <p>Hazırlanman için: <a href="${SITE}/ilkeler/" style="color:#E11D2E">yayın ilkeleri</a> ve <a href="${SITE}/kvkk/" style="color:#E11D2E">aydınlatma metni</a> imza aşamasında önüne gelecek belgelerin özeti.</p>
           <p>Kırıkkale'nin hikâyesini birlikte anlatacağız. Hoş geldin.</p>`,
          `Bu e-posta ${b.eposta} adresine gönderildi.`,
        ),
        metin: `Merhaba ${ad},\n\n${b.donem} ekibine seçildin! Ekip arkadaşlarımız sözleşme ve oryantasyon için seninle iletişime geçecek.\n\nHoş geldin.\nKale Creators · +90 505 787 63 48`,
      };
    case "ret":
      return {
        konu: `Başvurun hakkında · Kale Creators`,
        html: sablon(
          `Teşekkürler, ${ad}.`,
          `<p>${b.donem} dönemi için başvurunu özenle değerlendirdik. Bu dönem kontenjanımız sınırlı olduğu için seni ekibe alamıyoruz.</p>
           <p>Bu bir kapanış değil: sonraki dönemler başvuruya açıldığında ya da sana uygun bir ortak proje çıktığında yeniden ulaşmak istiyoruz. Üretmeye devam et.</p>`,
          `Bu e-posta ${b.eposta} adresine gönderildi.`,
        ),
        metin: `Merhaba ${ad},\n\n${b.donem} dönemi için başvurunu değerlendirdik; bu dönem kontenjan sınırlı olduğu için seni ekibe alamıyoruz. Sonraki dönemlerde yeniden ulaşmak istiyoruz.\n\nKale Creators`,
      };
  }
}

function ekipBildirimi(b: Basvuru) {
  const profil = PROFIL[b.profil] ?? b.profil;
  return {
    konu: `Yeni başvuru: ${b.ad} ${b.soyad} · ${profil}`,
    html: sablon(
      `Yeni başvuru geldi.`,
      `<p><strong>${b.ad} ${b.soyad}</strong> · ${profil}<br>${b.eposta} · ${b.telefon}<br>Alanlar: ${(b.alanlar ?? []).join(", ") || "-"}</p>
       <p><a href="${SITE}/yonetim/basvuru/?id=${b.id}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600">Panelde aç</a></p>`,
      `Otomatik bildirim · kalecreators.com`,
    ),
    metin: `Yeni başvuru: ${b.ad} ${b.soyad} (${profil}) · ${b.eposta} · ${b.telefon}\n${SITE}/yonetim/basvuru/?id=${b.id}`,
  };
}

/* ---------- gönderim ---------- */
async function gonder(alici: string, icerik: { konu: string; html: string; metin: string }) {
  const kullanici = Deno.env.get("SMTP_USER") ?? EKIP;
  const sifre = Deno.env.get("SMTP_PASS");
  if (!sifre) throw new Error("SMTP_PASS tanımlı değil (Dashboard → Edge Functions → Secrets)");
  const client = new SMTPClient({
    connection: { hostname: Deno.env.get("SMTP_HOST") ?? "smtp.hostinger.com", port: Number(Deno.env.get("SMTP_PORT") ?? 465), tls: true, auth: { username: kullanici, password: sifre } },
  });
  try {
    await client.send({ from: `Kale Creators <${kullanici}>`, to: alici, replyTo: EKIP, subject: icerik.konu, content: icerik.metin, html: icerik.html });
  } finally {
    await client.close();
  }
}

async function logla(basvuru_id: string, tur: string, alici: string, durum: string, hata?: string) {
  await admin.from("mail_log").insert({ basvuru_id, tur, alici, durum, hata: hata ?? null });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("yöntem yok", { status: 405 });

  // Doğrulama: tetikleyicinin gönderdiği gizli başlık, veritabanındaki değerle eşleşmeli
  const { data: gizli } = await admin.from("gizli_ayarlar").select("deger").eq("anahtar", "webhook_secret").maybeSingle();
  const baslik = req.headers.get("x-webhook-secret");
  if (!gizli?.deger || !baslik || baslik !== gizli.deger) return new Response("yetkisiz", { status: 401 });

  let govde: { tur: Tur; basvuru: Basvuru };
  try {
    govde = await req.json();
  } catch {
    return new Response("geçersiz gövde", { status: 400 });
  }
  const { tur, basvuru } = govde;
  if (!["alindi", "gorusme", "kabul", "ret"].includes(tur) || !basvuru?.eposta) return new Response("eksik alan", { status: 400 });

  const sonuc: Record<string, string> = {};
  // 1) Adaya
  try {
    await gonder(basvuru.eposta, mailIcerik(tur, basvuru));
    await logla(basvuru.id, tur, basvuru.eposta, "gonderildi");
    sonuc.aday = "gonderildi";
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await logla(basvuru.id, tur, basvuru.eposta, "hata", msg);
    sonuc.aday = "hata: " + msg;
  }
  // 2) Ekibe (yalnızca yeni başvuruda)
  if (tur === "alindi") {
    try {
      await gonder(EKIP, ekipBildirimi(basvuru));
      await logla(basvuru.id, "ekip_bildirim", EKIP, "gonderildi");
      sonuc.ekip = "gonderildi";
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      await logla(basvuru.id, "ekip_bildirim", EKIP, "hata", msg);
      sonuc.ekip = "hata: " + msg;
    }
  }
  // Tetikleyici yeniden denemesin diye her durumda 200
  return new Response(JSON.stringify(sonuc), { headers: { "Content-Type": "application/json" } });
});
