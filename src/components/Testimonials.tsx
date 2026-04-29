import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type T = {
  name: string;
  role: string;
  initials: string;
  quote: string;
  rating: number;
  product: string;
  accent: "navy" | "gold" | "pitch";
};

const TESTIMONIALS: T[] = [
  {
    name: "Rohan Kapoor",
    role: "State-level batter, Mumbai",
    initials: "RK",
    quote:
      "The Pro Willow felt match-ready out of the cover. Pinged off the middle from ball one. I've owned bats twice the price that didn't come close.",
    rating: 5,
    product: "Pro Willow Match Bat",
    accent: "navy",
  },
  {
    name: "Aisha Verma",
    role: "U-19 all-rounder, Bengaluru",
    initials: "AV",
    quote:
      "Crease Guard pads are the lightest I've ever worn. Ran a quick single in the 40th over of a 50-over match and didn't even feel them. Game-changing.",
    rating: 5,
    product: "Crease Guard Batting Pads",
    accent: "gold",
  },
  {
    name: "Coach Vikram S.",
    role: "Academy head, Pune",
    initials: "VS",
    quote:
      "We kit our entire U-16 squad with Middle Off gear now. Honest pricing, real specs on the listings, and customer service that actually picks up.",
    rating: 5,
    product: "Full team kit",
    accent: "pitch",
  },
  {
    name: "Priya Nair",
    role: "Club cricketer, Kochi",
    initials: "PN",
    quote:
      "Ordered the helmet on Tuesday night, got it Thursday morning, wore it in Saturday's match. Fits like it was made for me. The grille is rock solid.",
    rating: 5,
    product: "Sixth Stump Helmet",
    accent: "navy",
  },
  {
    name: "Karan Joshi",
    role: "Office league, Delhi",
    initials: "KJ",
    quote:
      "I came for the bat, stayed for the analysis content. Felt like buying gear from a brand that actually understands the sport, not just sells to it.",
    rating: 5,
    product: "Pro Willow Match Bat",
    accent: "gold",
  },
  {
    name: "Sana Shaikh",
    role: "Wicketkeeper, Hyderabad",
    initials: "SS",
    quote:
      "Gloves grip the bat perfectly even in summer humidity. The padding absorbed two yorkers in a row without a single sting. Already buying my second pair.",
    rating: 5,
    product: "Cover Drive Batting Gloves",
    accent: "pitch",
  },
];

const accentClass = (a: T["accent"]) =>
  a === "navy"
    ? "bg-navy text-primary-foreground"
    : a === "gold"
      ? "bg-gold text-primary-foreground"
      : "bg-pitch text-accent-foreground";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 bg-ink border-y border-border overflow-hidden"
    >
      <div className="absolute inset-0 grid-paper opacity-60" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-gold mb-4"
          >
            Loved by players
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-6xl font-semibold leading-[1.02] text-navy-deep"
          >
            10,000+ kits shipped.<br />
            <span className="italic text-gradient-gold">Every review is real.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" />
                ))}
              </div>
              <span className="font-serif text-2xl text-navy-deep ml-1">4.9</span>
              <span className="text-sm text-muted-foreground">/ 5 average</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">2,418</span> verified reviews
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">98%</span> would recommend
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="relative bg-card rounded-3xl p-7 border border-border shadow-[var(--shadow-card)]"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-gold/30" />

              <div className="flex mb-5">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-gold" fill="currentColor" />
                ))}
              </div>

              <blockquote className="font-serif text-lg leading-relaxed text-navy-deep mb-6">
                "{t.quote}"
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-serif text-sm ${accentClass(
                    t.accent,
                  )}`}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="hidden lg:inline text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t.product}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
