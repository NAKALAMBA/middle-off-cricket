import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, formatINR } from "@/lib/product-images";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

type Product = {
  id: string; slug: string; name: string; category: string; description: string | null;
  price_inr: number; compare_at_inr: number | null; image_url: string | null;
  badge: string | null; rating: number | null; reviews_count: number | null; stock: number;
};

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = useParams({ from: "/products/$slug" });
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const add = useCart((s) => s.add);

  useEffect(() => {
    supabase.from("products").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => { setProduct(data as Product | null); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-serif text-3xl">Product not found</p>
      <Link to="/shop" className="text-navy underline">Back to shop</Link>
    </div>
  );

  const img = resolveProductImage(product.image_url ?? product.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy mb-8"><ArrowLeft className="w-4 h-4" /> Back to shop</Link>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              className="aspect-square rounded-3xl overflow-hidden bg-ink border border-border shadow-[var(--shadow-elevated)]">
              <img src={img} alt={product.name} width={1024} height={1024} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-3">{product.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl text-navy-deep leading-[1.05]">{product.name}</h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold" fill="currentColor" />)}</div>
                <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews_count} reviews</span>
              </div>
              <div className="flex items-baseline gap-3 mt-6">
                <span className="font-serif text-4xl text-navy-deep">{formatINR(product.price_inr)}</span>
                {product.compare_at_inr && <span className="text-lg text-muted-foreground line-through">{formatINR(product.compare_at_inr)}</span>}
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 hover:text-navy">−</button>
                  <span className="w-10 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 hover:text-navy">+</button>
                </div>
                <p className="text-xs text-muted-foreground">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button onClick={() => { add({ productId: product.id, slug: product.slug, name: product.name, image: img, unitPrice: product.price_inr }, qty); toast.success("Added to cart"); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-navy text-primary-foreground font-medium hover:shadow-[var(--shadow-glow-navy)] transition-shadow">
                  <ShoppingBag className="w-4 h-4" /> Add to cart
                </button>
                <button onClick={() => { add({ productId: product.id, slug: product.slug, name: product.name, image: img, unitPrice: product.price_inr }, qty); navigate({ to: "/checkout" }); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gold text-primary-foreground font-medium">
                  Buy now
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 pt-8 border-t border-border">
                {[{ i: Truck, t: "Free shipping ₹2k+" }, { i: ShieldCheck, t: "1-year warranty" }, { i: RotateCcw, t: "30-day returns" }].map((x) => (
                  <div key={x.t} className="text-center"><x.i className="w-5 h-5 text-navy mx-auto mb-2" /><p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{x.t}</p></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
