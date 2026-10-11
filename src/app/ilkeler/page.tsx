import type { Metadata } from "next";
import { Belge } from "@/components/belge";
import { ILKELER } from "@/lib/legal";

export const metadata: Metadata = { title: "Yayın İlkeleri — Kale Creators" };

export default function IlkelerSayfasi() {
  return (
    <Belge
      kicker="Kurallar"
      baslik={ILKELER.baslik}
      alt="Üyelik sözleşmesinin eki olarak düzenlenecek; avukat incelemesine tabidir."
      giris={ILKELER.giris}
      bolumler={ILKELER.bolumler}
      not="Bu metin planlama ve müzakere amaçlıdır. Kişilik hakları, ifade özgürlüğü, iş hukuku, rekabet sınırlamaları, fikrî haklar ve KVKK bakımından nihai hâli avukat incelemesinden geçecektir."
    />
  );
}
