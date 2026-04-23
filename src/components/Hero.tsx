import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import heroImg from "@/assets/hero-stadium.jpg";

const TICKER = [
  "150+ Posts", "10K+ Followers", "IPL 2025", "Tests", "ODIs", "T20Is",
  "Wagon Wheels", "Heatmaps", "Match Threads", "Player Spotlights",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Cricket stadium at night under floodlights"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.10 0.02 260 / 0.3) 0%, oklch(0.10 0.02 260 / 0.7) 60%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              The game within the game
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-semibold">
            Where Cricket
            <br />
            Gets <span className="italic text-gradient-gold">Serious.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Data-driven analysis, deep dives, and stories for fans who see beyond the scoreboard.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#featured"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-[var(--shadow-glow-gold)] transition-all"
            >
              Read Latest Analysis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#instagram"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-foreground/25 text-foreground hover:border-gold hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-y border-border bg-ink/80 backdrop-blur-md overflow-hidden">
        <div className="flex whitespace-nowrap ticker-track py-4">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-8 text-xs uppercase tracking-[0.3em] text-muted-foreground inline-flex items-center gap-8">
              {t}
              <span className="w-1 h-1 rounded-full bg-gold/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
