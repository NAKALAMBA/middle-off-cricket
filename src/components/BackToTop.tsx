import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full transition-all duration-500 group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        background: "radial-gradient(circle at 30% 30%, oklch(0.62 0.22 25), oklch(0.34 0.15 25))",
        boxShadow: "0 12px 28px -10px oklch(0.32 0.13 25 / 0.55), inset -2px -2px 6px oklch(0 0 0 / 0.4)",
      }}
    >
      <span className="absolute inset-y-0 left-1/2 w-px bg-white/70" />
      <span className="absolute inset-y-2 left-[calc(50%-2px)] w-1 border-l border-r border-dashed border-white/60 rounded" />
      <ArrowUp className="w-4 h-4 text-white relative z-10 mx-auto group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
