-- Kale Creators · Kurucu 20 başvuru sistemi (Supabase / Postgres)
-- Uygulama: apply_migration ile tek seferde. Yönetici kullanıcı 0002 ile eklenir.

create extension if not exists pg_net with schema extensions;

create type profil_tipi as enum ('aktif', 'yukselen');
create type basvuru_durumu as enum ('yeni', 'on_degerlendirme', 'gorusme', 'teklif', 'kabul', 'ret');
create type konum_tipi as enum ('merkez', 'ilce', 'disarida');

-- ---------- Başvurular ----------
create table public.basvurular (
  id            uuid primary key default gen_random_uuid(),
  olusturulma   timestamptz not null default now(),
  profil        profil_tipi not null,
  ad            text not null check (char_length(ad) between 1 and 80),
  soyad         text not null check (char_length(soyad) between 1 and 80),
  eposta        text not null check (eposta ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  telefon       text not null check (char_length(telefon) between 7 and 30),
  dogum_yili    int  not null check (dogum_yili between 1940 and 2030),
  konum         konum_tipi not null,
  alanlar       text[] not null default '{}',
  haftalik_saat text not null,
  cevaplar      jsonb not null default '{}'::jsonb,
  durum         basvuru_durumu not null default 'yeni',
  puanlar       jsonb not null default '{}'::jsonb,
  kvkk_onay     boolean not null default false,
  ilkeler_onay  boolean not null default false,
  donem         text not null default 'Kurucu 20'
);
create index basvurular_durum_idx on public.basvurular (durum);
create index basvurular_olusturulma_idx on public.basvurular (olusturulma desc);

-- ---------- Kurul notları ----------
create table public.basvuru_notlari (
  id          uuid primary key default gen_random_uuid(),
  basvuru_id  uuid not null references public.basvurular (id) on delete cascade,
  yazar_id    uuid references auth.users (id) on delete set null,
  tarih       timestamptz not null default now(),
  metin       text not null check (char_length(metin) between 1 and 4000)
);
create index basvuru_notlari_basvuru_idx on public.basvuru_notlari (basvuru_id);

-- ---------- Ayarlar (herkese açık) ----------
create table public.ayarlar (
  anahtar text primary key,
  deger   jsonb not null
);
insert into public.ayarlar (anahtar, deger) values
  ('donem', '{"donemAdi":"Kurucu 20","basvuruAcik":true,"sonTarih":"2026-11-15","kontenjan":20,"hedefAktif":10,"hedefYukselen":10,"minYas":18}');

-- ---------- Gizli ayarlar (yalnızca service role) ----------
create table public.gizli_ayarlar (
  anahtar text primary key,
  deger   text not null
);

-- ---------- Yöneticiler ----------
create table public.yoneticiler (
  user_id uuid primary key references auth.users (id) on delete cascade,
  ad      text,
  eklendi timestamptz not null default now()
);

create or replace function public.is_yonetici() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.yoneticiler where user_id = auth.uid());
$$;

-- ---------- Mail günlüğü ----------
create table public.mail_log (
  id         uuid primary key default gen_random_uuid(),
  tarih      timestamptz not null default now(),
  basvuru_id uuid references public.basvurular (id) on delete set null,
  tur        text not null,
  alici      text not null,
  durum      text not null,          -- gonderildi | hata | atlandi
  hata       text
);

-- ---------- RLS ----------
alter table public.basvurular      enable row level security;
alter table public.basvuru_notlari enable row level security;
alter table public.ayarlar         enable row level security;
alter table public.gizli_ayarlar   enable row level security;
alter table public.yoneticiler     enable row level security;
alter table public.mail_log        enable row level security;

-- Herkes başvuru EKLER (okuyamaz); yönetici her şeyi yapar
create policy "basvuru ekle (herkes)"    on public.basvurular for insert to anon, authenticated with check (true);
create policy "basvuru oku (yonetici)"   on public.basvurular for select to authenticated using (public.is_yonetici());
create policy "basvuru guncelle (yonetici)" on public.basvurular for update to authenticated using (public.is_yonetici()) with check (public.is_yonetici());
create policy "basvuru sil (yonetici)"   on public.basvurular for delete to authenticated using (public.is_yonetici());

create policy "not (yonetici)" on public.basvuru_notlari for all to authenticated using (public.is_yonetici()) with check (public.is_yonetici());

create policy "ayar oku (herkes)"     on public.ayarlar for select to anon, authenticated using (true);
create policy "ayar yaz (yonetici)"   on public.ayarlar for update to authenticated using (public.is_yonetici()) with check (public.is_yonetici());

-- gizli_ayarlar: politika yok → yalnızca service role
create policy "yonetici kendi kaydini gorur" on public.yoneticiler for select to authenticated using (user_id = auth.uid());
create policy "mail log oku (yonetici)" on public.mail_log for select to authenticated using (public.is_yonetici());

-- ---------- Mail tetikleyicisi: başvuru eklenince / durum değişince Edge Function'a POST ----------
create or replace function public.basvuru_mail_tetik() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare
  tur text;
  gizli text;
  url text;
begin
  if tg_op = 'INSERT' then
    tur := 'alindi';
  elsif tg_op = 'UPDATE' and new.durum is distinct from old.durum and new.durum in ('gorusme', 'kabul', 'ret') then
    tur := new.durum::text;
  else
    return new;
  end if;
  select deger into gizli from public.gizli_ayarlar where anahtar = 'webhook_secret';
  select deger into url   from public.gizli_ayarlar where anahtar = 'mail_fonksiyon_url';
  if gizli is null or url is null then
    return new; -- mail altyapısı kurulmamışsa sessizce geç
  end if;
  perform net.http_post(
    url := url,
    body := jsonb_build_object('tur', tur, 'basvuru', to_jsonb(new)),
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-webhook-secret', gizli),
    timeout_milliseconds := 30000
  );
  return new;
end $$;

create trigger basvuru_mail
after insert or update of durum on public.basvurular
for each row execute function public.basvuru_mail_tetik();
