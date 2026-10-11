-- Kale Creators · başvuru sistemi şeması (Supabase / Postgres)
-- Demo şu an localStorage kullanıyor; canlıya geçişte bu şema uygulanır ve src/lib/store.tsx bu tablolara bağlanır.

create type profil_tipi as enum ('aktif', 'yukselen');
create type basvuru_durumu as enum ('yeni', 'on_degerlendirme', 'gorusme', 'teklif', 'kabul', 'ret');
create type konum_tipi as enum ('merkez', 'ilce', 'disarida');

create table basvurular (
  id            uuid primary key default gen_random_uuid(),
  olusturulma   timestamptz not null default now(),
  profil        profil_tipi not null,
  ad            text not null,
  soyad         text not null,
  eposta        text not null,
  telefon       text not null,
  dogum_yili    int  not null check (dogum_yili between 1940 and 2030),
  konum         konum_tipi not null,
  alanlar       text[] not null default '{}',
  haftalik_saat text not null,
  cevaplar      jsonb not null default '{}'::jsonb,   -- soru id → cevap
  durum         basvuru_durumu not null default 'yeni',
  puanlar       jsonb not null default '{}'::jsonb,   -- {ozgunluk, kalite, gelisim, sureklilik, sehir}: 1-5
  kvkk_onay     boolean not null default false,
  ilkeler_onay  boolean not null default false,
  donem         text not null default 'Kurucu 20'
);
create index basvurular_durum_idx on basvurular (durum);
create index basvurular_donem_idx on basvurular (donem);

create table basvuru_notlari (
  id          uuid primary key default gen_random_uuid(),
  basvuru_id  uuid not null references basvurular (id) on delete cascade,
  yazar_id    uuid references auth.users (id),
  tarih       timestamptz not null default now(),
  metin       text not null
);

create table ayarlar (
  anahtar text primary key,
  deger   jsonb not null
);
insert into ayarlar (anahtar, deger) values
  ('donem', '{"donemAdi":"Kurucu 20","basvuruAcik":true,"sonTarih":"2026-11-15","kontenjan":20,"hedefAktif":10,"hedefYukselen":10,"minYas":18}');

-- Yöneticiler: auth.users içinde e-postası bu tabloda olanlar
create table yoneticiler (
  user_id uuid primary key references auth.users (id) on delete cascade,
  ad      text
);

create or replace function is_yonetici() returns boolean
language sql stable security definer as $$
  select exists (select 1 from yoneticiler where user_id = auth.uid());
$$;

alter table basvurular     enable row level security;
alter table basvuru_notlari enable row level security;
alter table ayarlar        enable row level security;
alter table yoneticiler    enable row level security;

-- Herkes (anon) başvuru EKLEYEBİLİR, kimse okuyamaz; yöneticiler her şeyi yapar
create policy "anon basvuru ekler" on basvurular for insert to anon, authenticated with check (true);
create policy "yonetici basvuru okur"    on basvurular for select using (is_yonetici());
create policy "yonetici basvuru gunceller" on basvurular for update using (is_yonetici());
create policy "yonetici basvuru siler"   on basvurular for delete using (is_yonetici());

create policy "yonetici not"   on basvuru_notlari for all using (is_yonetici()) with check (is_yonetici());
create policy "ayar herkes okur" on ayarlar for select using (true);
create policy "ayar yonetici yazar" on ayarlar for update using (is_yonetici());
create policy "yonetici listesi" on yoneticiler for select using (is_yonetici());

-- Üye paneli (faz 2) için yer tutucu tablolar: egitimler, projeler, ekipman_rezervasyon, icerik_onay_kuyrugu
