import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import heroImg from "@/assets/hero-shop.jpg";

const TICKER = [
  "Free shipping over ₹2,000", "30-day returns", "Match-grade English willow",
  "Hand-stitched leather balls", "Test-approved gear", "Trusted by 10,000+ players",
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden grain pt-24 pb-20">
      {/* Soft gradient + paper grid */}
      <div className="absolute inset-0 grid-paper" aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      {/* Floating gold disc */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-7 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              New season · Spring drop 2026
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-semibold text-navy-deep">
            Cricket gear
            <br />
            built to <span className="italic text-gradient-gold">play sharp.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Bats, balls, pads, gloves and more — engineered with the players who actually
            read the game. Premium materials, honest pricing, free shipping.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-navy text-primary-foreground font-medium hover:shadow-[var(--shadow-glow-navy)] transition-all hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop the gear
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#testimonials"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-foreground/15 text-foreground hover:border-navy hover:bg-navy hover:text-primary-foreground transition-colors"
            >
              <Star className="w-4 h-4 text-gold" fill="currentColor" />
              Read reviews
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" />
              ))}
              <span className="ml-2 font-medium text-foreground">4.9</span>
              <span>· 2,418 reviews</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">10,000+ players kitted out</span>
          </div>
        </motion.div>

        {/* Hero image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)] border border-border bg-ink">
            <img
              src={heroImg}
              alt="Premium cricket bat against a white wall"
              width={1600}
              height={1200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

            {/* Floating price tag */}
            <motion.div
              className="absolute top-5 left-5 glass rounded-2xl px-4 py-3 shadow-md"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Best seller</p>
              <p className="font-serif text-lg text-navy-deep">Pro Willow · ₹14,999</p>
            </motion.div>

            {/* Floating spec chip */}
            <motion.div
              className="absolute bottom-5 right-5 glass-dark rounded-2xl px-4 py-3"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">Grain count</p>
              <p className="font-serif text-lg">8–11 straight</p>
            </motion.div>
          </div>

          {/* Spinning ball */}
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, oklch(0.6 0.22 25), oklch(0.32 0.15 25))",
              boxShadow: "inset -6px -8px 16px oklch(0 0 0 / 0.4), 0 12px 30px -8px oklch(0.32 0.15 25 / 0.5)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-y-0 left-1/2 w-px bg-white/80"
              style={{ boxShadow: "0 0 0 1px white" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-y border-border bg-navy text-primary-foreground overflow-hidden">
        <div className="flex whitespace-nowrap ticker-track py-3.5">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-8 text-[11px] uppercase tracking-[0.3em] inline-flex items-center gap-8">
              {t}
              <span className="w-1 h-1 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
