import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase istemcisi. Ortam değişkenleri yoksa null döner → uygulama localStorage demo modunda çalışır
 * (GitHub Pages demosu). Hostinger derlemesinde NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY verilir.
 * flowType 'implicit': statik sitede şifre sıfırlama bağlantıları hangi tarayıcıda açılırsa açılsın çalışsın.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, { auth: { flowType: "implicit", detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } })
    : null;

export const bulutModu = supabase !== null;
