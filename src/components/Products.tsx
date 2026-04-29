import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star } from "lucide-react";
import bat from "@/assets/product-bat.jpg";
import pads from "@/assets/product-pads.jpg";
import gloves from "@/assets/product-gloves.jpg";
import ball from "@/assets/product-ball.jpg";
import helmet from "@/assets/product-helmet.jpg";
import shoes from "@/assets/product-shoes.jpg";

type Product = {
  img: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  badge?: string;
  rating: number;
  reviews: number;
};

const PRODUCTS: Product[] = [
  { img: bat, name: "Pro Willow Match Bat", category: "Bats", price: 14999, compareAt: 17999, badge: "Best seller", rating: 4.9, reviews: 412 },
  { img: pads, name: "Crease Guard Batting Pads", category: "Pads", price: 4499, badge: "New", rating: 4.8, reviews: 187 },
  { img: gloves, name: "Cover Drive Batting Gloves", category: "Gloves", price: 2899, rating: 4.7, reviews: 246 },
  { img: ball, name: "Test Series Leather Ball", category: "Balls", price: 999, badge: "Test grade", rating: 4.9, reviews: 521 },
  { img: helmet, name: "Sixth Stump Helmet", category: "Protection", price: 5999, rating: 4.8, reviews: 134 },
  { img: shoes, name: "Spike & Stride Cricket Shoes", category: "Footwear", price: 6499, compareAt: 7499, badge: "−14%", rating: 4.7, reviews: 92 },
];

const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export function Products() {
  return (
    <section id="products" className="relative py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-4">Shop the kit</p>
            <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1] text-navy-deep">
              Every piece, <span className="italic text-gradient-gold">match-ready.</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Six categories. Hand-picked specs. The kind of gear coaches recommend
              and selectors notice.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {["All", "Bats", "Pads", "Gloves", "Balls", "Footwear"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-all ${
                  i === 0
                    ? "bg-navy text-primary-foreground border-navy"
                    : "border-border hover:border-navy hover:text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-[oklch(0.97_0.005_260)]">
                <motion.img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06, rotate: -1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {p.badge && (
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-navy text-primary-foreground">
                    {p.badge}
                  </span>
                )}

                <button
                  aria-label="Add to wishlist"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>

                {/* Quick add bar */}
                <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep">
                    <ShoppingBag className="w-4 h-4" /> Quick add
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.category}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                    <span className="font-medium text-foreground">{p.rating}</span>
                    <span>({p.reviews})</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl leading-tight mb-3 group-hover:text-navy transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl text-navy-deep">{inr(p.price)}</span>
                  {p.compareAt && (
                    <span className="text-sm text-muted-foreground line-through">
                      {inr(p.compareAt)}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-navy text-navy hover:bg-navy hover:text-primary-foreground transition-colors text-sm uppercase tracking-[0.2em]"
          >
            View all products
          </a>
        </div>
      </div>
    </section>
  );
}
