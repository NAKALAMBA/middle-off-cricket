import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import aboutImg from "@/assets/about-field.jpg";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 border-y border-border bg-ink/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border"
        >
          <img
            src={aboutImg}
            alt="Cricket field at dusk"
            loading="lazy"
            width={1200}
            height={1400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Founder</p>
            <p className="font-serif text-2xl">Arjun Mehta</p>
            <a
              href="#instagram"
              className="inline-flex items-center gap-2 mt-3 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" /> @middleoff.cricket
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-pitch-glow mb-5">Brand story</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-7">
            Built for the fan who asks <span className="italic text-gradient-gold">'why'</span> — not just <span className="italic">'what'</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-5">
            Middle Off breaks down every cover drive, every DRS call, every tactical masterclass into
            content you can actually use. No noise. No takes for the algorithm. Just the game, properly read.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            We sit between the broadcaster's hot take and the analyst's spreadsheet — and turn the gap
            into something worth your time.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-border">
            {[
              { n: "150+", l: "Posts published" },
              { n: "10K+", l: "Followers" },
              { n: "4.9★", l: "Reader rating" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl text-gold">{s.n}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
