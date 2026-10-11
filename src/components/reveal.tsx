"use client";

import { useEffect, useRef } from "react";

/** Görünür olunca .in sınıfı ekler (kaydırma animasyonu) */
export function Reveal({ children, className = "", gecikme = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; gecikme?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const T = Tag as React.ElementType;
  return (
    <T ref={ref} className={`reveal ${className}`} style={{ "--d": `${gecikme}ms` } as React.CSSProperties}>
      {children}
    </T>
  );
}
