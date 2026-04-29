import { motion } from "framer-motion";

const ITEMS = [
  "Pro Willow Bats",
  "Match-grade Balls",
  "Crease Guard Pads",
  "Cover Drive Gloves",
  "Sixth Stump Helmets",
  "Spike & Stride Shoes",
  "Free Shipping ₹2,000+",
  "30-Day Returns",
];

export function ShopMarquee() {
  return (
    <section
      aria-hidden
      className="relative py-8 bg-navy text-primary-foreground overflow-hidden border-y border-border"
    >
      <motion.div
        className="flex whitespace-nowrap marquee-track"
        initial={{ x: 0 }}
      >
        {[...ITEMS, ...ITEMS, ...ITEMS].map((t, i) => (
          <span
            key={i}
            className="mx-10 font-serif text-3xl md:text-5xl italic inline-flex items-center gap-10"
          >
            {t}
            <span className="w-2 h-2 rounded-full bg-gold" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
