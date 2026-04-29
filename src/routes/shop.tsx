import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, formatINR } from "@/lib/product-images";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

type Product = {
  id: string; slug: string; name: string; category: string;
  price_inr: number; compare_at_inr: number | null;
  image_url: string | null; badge: string | null;
  rating: number | null; reviews_count: number | null;
};

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop cricket gear — Middle Off" },
      { name: "description", content: "Browse premium cricket bats, balls, pads, gloves, helmets and shoes. Free shipping over ₹2,000." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const add = useCart((s) => s.add);

  useEffect(() => {
    supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false })
      .then(({ data }) => { setProducts((data as Product[]) ?? []); setLoading(false); });
  }, []);

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-4">All gear</p>
          <h1 className="font-serif text-5xl md:text-6xl text-navy-deep">The full kit, <span className="italic text-gradient-gold">match-ready.</span></h1>

          <div className="mt-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-all ${filter === c ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy hover:text-navy"}`}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="mt-16 text-muted-foreground">Loading products…</p>
          ) : (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visible.map((p, i) => {
                const img = resolveProductImage(p.image_url ?? p.slug);
                return (
                  <motion.article key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }} whileHover={{ y: -6 }}
                    className="group relative rounded-3xl overflow-hidden bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
                      <div className="relative aspect-square overflow-hidden bg-[oklch(0.97_0.005_260)]">
                        <img src={img} alt={p.name} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        {p.badge && <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-navy text-primary-foreground">{p.badge}</span>}
                        <button aria-label="Wishlist" onClick={(e) => e.preventDefault()} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur border border-border flex items-center justify-center hover:text-gold hover:border-gold transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.category}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                            <span className="font-medium text-foreground">{p.rating}</span>
                            <span>({p.reviews_count})</span>
                          </div>
                        </div>
                        <h3 className="font-serif text-xl leading-tight mb-3 group-hover:text-navy transition-colors">{p.name}</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="font-serif text-2xl text-navy-deep">{formatINR(p.price_inr)}</span>
                          {p.compare_at_inr && <span className="text-sm text-muted-foreground line-through">{formatINR(p.compare_at_inr)}</span>}
                        </div>
                      </div>
                    </Link>
                    <div className="px-6 pb-6">
                      <button onClick={() => { add({ productId: p.id, slug: p.slug, name: p.name, image: img, unitPrice: p.price_inr }); toast.success(`Added ${p.name} to cart`); }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep transition-colors">
                        <ShoppingBag className="w-4 h-4" /> Add to cart
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
