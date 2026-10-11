import type { Metadata } from "next";
import { Belge } from "@/components/belge";
import { KVKK } from "@/lib/legal";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni — Kale Creators" };

export default function KvkkSayfasi() {
  return (
    <Belge
      kicker="Kişisel veriler"
      baslik={KVKK.baslik}
      alt={`Son güncelleme: ${KVKK.guncelleme}`}
      bolumler={KVKK.bolumler}
      not="Taslak metindir. Veri sorumlusunun tüzel kişiliği netleştikten sonra unvan, adres ve KEP bilgileri eklenecek; metin yayın öncesi avukat tarafından incelenecektir."
    />
  );
}
