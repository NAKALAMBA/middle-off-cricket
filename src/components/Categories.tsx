import { motion } from "framer-motion";
import { BarChart3, Target, Trophy, Mic, Gauge } from "lucide-react";

const CATS = [
  { icon: Gauge, emoji: "🏏", title: "Match Analysis", desc: "Ball-by-ball breakdowns" },
  { icon: BarChart3, emoji: "📊", title: "Stats & Data", desc: "Charts, trends, comparisons" },
  { icon: Target, emoji: "🎯", title: "Player Spotlights", desc: "Deep dives on batters & bowlers" },
  { icon: Trophy, emoji: "🏆", title: "Tournament Threads", desc: "IPL, World Cup, Tests" },
  { icon: Mic, emoji: "🎙️", title: "Opinion", desc: "Hot takes, bold predictions" },
];

export function Categories() {
  return (
    <section id="categories" className="relative py-24 md:py-32 border-y border-border bg-ink/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-pitch-glow mb-4">What we cover</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
            Five lenses on the<br />
            <span className="italic text-gradient-gold">same beautiful game.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {CATS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group glass rounded-xl p-6 hover:border-gold/40 transition-all cursor-pointer"
              >
                <div className="w-11 h-11 rounded-lg bg-pitch/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-pitch-glow group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-serif text-lg mb-1.5">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
