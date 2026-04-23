import { motion } from "framer-motion";

// Synthetic "graphic post" tiles — visual SVGs to mimic IG analytics carousel
function WagonWheel() {
  const lines = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const len = 30 + Math.random() * 60;
    return {
      x2: 50 + Math.cos(angle) * len,
      y2: 50 + Math.sin(angle) * len,
      gold: Math.random() > 0.6,
    };
  });
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.62 0.13 155 / 0.4)" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="oklch(0.62 0.13 155 / 0.25)" strokeWidth="0.3" />
      {lines.map((l, i) => (
        <line key={i} x1="50" y1="50" x2={l.x2} y2={l.y2}
          stroke={l.gold ? "oklch(0.85 0.18 80)" : "oklch(0.97 0.005 260 / 0.5)"} strokeWidth="0.7" strokeLinecap="round" />
      ))}
      <circle cx="50" cy="50" r="2" fill="oklch(0.85 0.18 80)" />
    </svg>
  );
}

function Heatmap() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => {
          const v = Math.random();
          return (
            <rect key={`${r}-${c}`} x={20 + c * 10} y={10 + r * 10} width={9} height={9}
              fill={`oklch(${0.3 + v * 0.55} ${0.05 + v * 0.13} ${v > 0.6 ? 75 : 155} / ${0.3 + v * 0.7})`} rx="1" />
          );
        })
      )}
    </svg>
  );
}

function StatBar() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {[60, 82, 45, 90, 70].map((v, i) => (
        <g key={i}>
          <rect x={15 + i * 16} y={90 - v * 0.8} width="10" height={v * 0.8}
            fill={i === 3 ? "oklch(0.85 0.18 80)" : "oklch(0.62 0.13 155 / 0.7)"} rx="1.5" />
          <text x={20 + i * 16} y="96" fontSize="3.5" fill="oklch(0.7 0.01 260)" textAnchor="middle">P{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

const TILES = [
  { type: "wheel", title: "Kohli vs Spin", sub: "Wagon Wheel · 2024" },
  { type: "heat", title: "Bumrah Pitch Map", sub: "Death Overs Heatmap" },
  { type: "bar", title: "Top 5 Strike Rates", sub: "IPL 2025 Phase 3" },
  { type: "wheel", title: "Rohit's Pull Shot", sub: "Last 50 Innings" },
  { type: "heat", title: "Spin Friendly Zones", sub: "Chepauk Tactical" },
  { type: "bar", title: "Death Bowling Econ", sub: "T20 World Cup" },
];

export function Signature() {
  return (
    <section id="signature" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Signature posts</p>
            <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1]">
              Our graphics go viral
              <br />
              <span className="italic text-muted-foreground">for a reason.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Heatmaps, wagon wheels, comparison cards. Designed for sharing, built on data you can trust.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {TILES.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-gold/50 transition-all cursor-pointer"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, oklch(0.30 0.05 260 / 0.6), oklch(0.16 0.025 260))",
                }}
              />
              <div className="relative h-full p-5 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full h-full max-w-[80%] max-h-[70%]">
                    {t.type === "wheel" && <WagonWheel />}
                    {t.type === "heat" && <Heatmap />}
                    {t.type === "bar" && <StatBar />}
                  </div>
                </div>
                <div className="border-t border-border/60 pt-3 mt-2">
                  <p className="font-serif text-base leading-tight">{t.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.sub}</p>
                </div>
                <div className="absolute top-3 right-3 text-[9px] uppercase tracking-widest text-gold/80">
                  @middleoff
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
