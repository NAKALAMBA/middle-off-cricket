import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import a1 from "@/assets/article-1.jpg";
import a2 from "@/assets/article-2.jpg";
import a3 from "@/assets/article-3.jpg";

const POSTS = [
  {
    img: a1,
    tag: "#DataViz",
    title: "Why Bumrah's Sixth-Stump Line is a Statistical Anomaly",
    excerpt: "Mapping 1,200 deliveries to understand the geometry of India's most lethal seamer.",
    read: "8 min read",
  },
  {
    img: a2,
    tag: "#IPL2025",
    title: "The Death-Overs Revolution: How Strike-Rates Broke 200",
    excerpt: "A deep dive into the tactical shift that rewrote the back-ten playbook.",
    read: "12 min read",
  },
  {
    img: a3,
    tag: "#Tactics",
    title: "Reading the Pitch: A Visual Guide to Subcontinent Surfaces",
    excerpt: "From Chepauk to Chinnaswamy — the heatmaps that decide every toss.",
    read: "6 min read",
  },
];

export function Featured() {
  return (
    <section id="featured" className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">This week at Middle Off</p>
            <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1]">
              Featured <span className="italic text-muted-foreground">analysis.</span>
            </h2>
          </div>
          <a
            href="#all"
            className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-gold transition-colors"
          >
            View all posts <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-pitch-glow/50 transition-all duration-500 hover:shadow-[var(--shadow-glow-pitch)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold px-2.5 py-1 rounded-full border border-gold/30">
                    {p.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.read}</span>
                </div>
                <h3 className="font-serif text-2xl leading-tight mb-3 transition-colors group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
