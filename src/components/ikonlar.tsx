import type { SVGProps } from "react";

const yollar: Record<string, React.ReactNode> = {
  egitim: (
    <>
      <path d="M3 9l9-4 9 4-9 4-9-4z" />
      <path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 9v5" />
    </>
  ),
  ekipman: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="2" />
      <path d="M16 10l5-2v8l-5-2z" />
      <circle cx="9.5" cy="12" r="2.5" />
    </>
  ),
  proje: (
    <>
      <path d="M4 7h16v12H4z" />
      <path d="M9 7V5h6v2" />
      <path d="M4 12h16" />
    </>
  ),
  ortak: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M2.5 19c.5-3 3-5 5.5-5s5 2 5.5 5" />
      <path d="M13 14.5c1-.4 2-.5 3-.5 2.5 0 5 2 5.5 5" />
    </>
  ),
  odul: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7 21l5-2 5 2-2-7.5" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </>
  ),
  ok: <path d="M5 12h14M13 6l6 6-6 6" />,
  onay: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  kapat: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  ara: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  geri: <path d="M19 12H5M11 6l-6 6 6 6" />,
  kilit: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  cop: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
    </>
  ),
  uyari: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18v.5" />
    </>
  ),
  ayar: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </>
  ),
  cikis: (
    <>
      <path d="M10 4H5v16h5" />
      <path d="M14 8l5 4-5 4M19 12H9" />
    </>
  ),
  liste: <path d="M8 6h13M8 12h13M8 18h13M3 6h.5M3 12h.5M3 18h.5" />,
  insta: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </>
  ),
  indir: <path d="M12 4v11M7 10l5 5 5-5M4 20h16" />,
  yenile: (
    <>
      <path d="M20 12a8 8 0 11-2.3-5.7" />
      <path d="M20 4v5h-5" />
    </>
  ),
};

export function Ikon({ ad, boyut = 20, ...rest }: { ad: keyof typeof yollar | string; boyut?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={boyut}
      height={boyut}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {yollar[ad]}
    </svg>
  );
}
