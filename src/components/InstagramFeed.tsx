import { motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

const POSTS = [
  { tag: "Wagon Wheel", color: "oklch(0.45 0.08 155)" },
  { tag: "Heatmap", color: "oklch(0.78 0.16 75)" },
  { tag: "Stat Card", color: "oklch(0.30 0.05 260)" },
  { tag: "Player DNA", color: "oklch(0.62 0.13 155)" },
  { tag: "Match Thread", color: "oklch(0.85 0.18 80)" },
  { tag: "Tactical", color: "oklch(0.40 0.07 220)" },
];

export function InstagramFeed() {
  return (
    <section id="instagram" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Follow the conversation</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
              Live on Instagram.
            </h2>
            <p className="text-muted-foreground mt-3">10,400 followers and counting.</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:border-gold/50 transition-colors text-sm"
          >
            <Instagram className="w-4 h-4 text-gold" />
            @middleoff.cricket
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {POSTS.map((p, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square rounded-lg overflow-hidden border border-border hover:border-gold/60 transition-colors"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${p.color}, oklch(0.16 0.025 260))`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Instagram className="w-7 h-7 text-foreground/40 group-hover:text-gold transition-colors" />
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                {p.tag}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
