import { motion } from "framer-motion";
import { Award, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import aboutImg from "@/assets/about-field.jpg";

const PILLARS = [
  { icon: Award, title: "Match-grade specs", desc: "Every product tested against international standards before it ships." },
  { icon: Truck, title: "Free shipping ₹2,000+", desc: "Fast pan-India delivery. 2–4 days for most pin codes." },
  { icon: ShieldCheck, title: "1-year warranty", desc: "Manufacturing defects covered. We replace, no friction." },
  { icon: RotateCcw, title: "30-day returns", desc: "Didn't middle it? Send it back, full refund." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-elevated)]"
        >
          <img
            src={aboutImg}
            alt="Cricket field at dusk"
            loading="lazy"
            width={1200}
            height={1400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Founder</p>
            <p className="font-serif text-2xl">Arjun Mehta</p>
            <p className="text-sm opacity-80 mt-1">Ex-Ranji opener · cricket nerd</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-5">Our story</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-7 text-navy-deep">
            Built by players who ask <span className="italic text-gradient-gold">'why'</span> — not just <span className="italic">'what'</span>.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-5">
            Middle Off started in a Mumbai garage with one bat, one idea, and a refusal to overcharge.
            Today we kit thousands of players — and break down the game on the side, because we love it.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Premium gear. Honest pricing. Analysis that respects your time. That's the brief.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy/5 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-navy" />
                  </div>
                  <p className="font-serif text-base text-navy-deep mb-1">{p.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
