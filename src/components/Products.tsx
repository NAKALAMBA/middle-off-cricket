import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, formatINR } from "@/lib/product-images";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const FILTERS = ["All", "Bats", "Pads", "Gloves", "Balls", "Protection", "Footwear"];

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const add = useCart((s) => s.add);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!mounted) return;
        setProducts(data ?? []);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  );

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
              Hand-picked specs. The kind of gear coaches recommend and selectors notice.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-all ${
                  filter === t
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
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-card border border-border aspect-[3/4] animate-pulse" />
            ))}

          {!loading &&
            filtered.map((p, i) => {
              const img = resolveProductImage(p.image_url ?? p.slug);
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
                >
                  <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
                    <div className="relative aspect-square overflow-hidden bg-[oklch(0.97_0.005_260)]">
                      <motion.img
                        src={img}
                        alt={p.name}
                        loading="lazy"
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
                        type="button"
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          toast.success("Saved to wishlist");
                        }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            add({
                              productId: p.id,
                              slug: p.slug,
                              name: p.name,
                              unitPrice: p.price_inr,
                              image: resolveProductImage(p.image_url ?? p.slug),
                            });
                            toast.success(`${p.name} added to cart`);
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep"
                        >
                          <ShoppingBag className="w-4 h-4" /> Quick add
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.category}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                          <span className="font-medium text-foreground">{Number(p.rating ?? 4.8).toFixed(1)}</span>
                          <span>({p.reviews_count ?? 0})</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl leading-tight mb-3 group-hover:text-navy transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl text-navy-deep">{formatINR(p.price_inr)}</span>
                        {p.compare_at_inr && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatINR(p.compare_at_inr)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-navy text-navy hover:bg-navy hover:text-primary-foreground transition-colors text-sm uppercase tracking-[0.2em]"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
