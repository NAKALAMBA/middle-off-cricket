import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WicketMark } from "./WicketMark";

const NAV = [
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Analysis", href: "#featured" },
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
          ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <WicketMark className="w-6 h-6 text-navy transition-transform group-hover:rotate-6" />
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-navy-deep">
            Middle <span className="text-gold">Off</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-foreground/70 hover:text-navy-deep transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Search"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-navy hover:text-navy transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <a
            href="#products"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy text-primary-foreground hover:shadow-[var(--shadow-glow-navy)] transition-shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cart</span>
            <span className="ml-1 w-5 h-5 rounded-full bg-gold text-primary-foreground text-[10px] flex items-center justify-center font-semibold">
              0
            </span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
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
                href="#products"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-navy text-primary-foreground text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" /> Shop
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
