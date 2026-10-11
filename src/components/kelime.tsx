/** Metni kelime kelime, kademeli giriş animasyonuyla basar (CSS .kelime). */
export function KelimeKelime({ metin, baslangic = 0, className = "" }: { metin: string; baslangic?: number; className?: string }) {
  return (
    <>
      {metin.split(" ").map((k, i) => (
        <span key={i} className={`kelime ${className}`} style={{ "--i": i, "--t": `${baslangic}ms` } as React.CSSProperties}>
          {k}
          {i < metin.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
