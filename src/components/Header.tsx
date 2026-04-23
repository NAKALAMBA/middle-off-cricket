import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WicketMark } from "./WicketMark";

const NAV = [
  { label: "Analysis", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "Signature", href: "#signature" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <WicketMark className="w-6 h-6 text-gold transition-transform group-hover:rotate-6" />
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight">
            Middle <span className="text-gold">Off</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#newsletter"
          className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium px-4 py-2.5 rounded-full bg-gold text-primary-foreground hover:shadow-[var(--shadow-glow-gold)] transition-shadow"
        >
          Subscribe
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-base text-foreground/90"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#newsletter"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center items-center px-4 py-3 rounded-full bg-gold text-primary-foreground text-sm uppercase tracking-widest"
            >
              Subscribe
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
