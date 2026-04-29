import { motion } from "framer-motion";
import bat from "@/assets/product-bat.jpg";
import pads from "@/assets/product-pads.jpg";
import gloves from "@/assets/product-gloves.jpg";
import ball from "@/assets/product-ball.jpg";
import helmet from "@/assets/product-helmet.jpg";
import shoes from "@/assets/product-shoes.jpg";

const CATS = [
  { img: bat, title: "Bats", count: "12 styles" },
  { img: ball, title: "Balls", count: "8 styles" },
  { img: pads, title: "Pads", count: "6 styles" },
  { img: gloves, title: "Gloves", count: "9 styles" },
  { img: helmet, title: "Protection", count: "5 styles" },
  { img: shoes, title: "Footwear", count: "7 styles" },
];

export function Categories() {
  return (
    <section id="categories" className="relative py-24 md:py-32 bg-ink border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-4">Shop by category</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight text-navy-deep">
            Find your kit, <span className="italic text-gradient-gold">piece by piece.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {CATS.map((c, i) => (
            <motion.a
              href="#products"
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
            >
              <div className="absolute inset-0 bg-[oklch(0.97_0.005_260)] flex items-center justify-center p-4">
                <motion.img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-card via-card/80 to-transparent">
                <p className="font-serif text-lg text-navy-deep">{c.title}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{c.count}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
