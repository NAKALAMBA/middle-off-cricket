import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/product-images";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — Middle Off" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotal } = useCart();
  const sub = subtotal();
  const shipping = sub >= 2000 || sub === 0 ? 0 : 99;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-4xl md:text-5xl text-navy-deep">Your cart</h1>

          {items.length === 0 ? (
            <div className="mt-12 text-center bg-card border border-border rounded-3xl p-16">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-serif text-2xl text-navy-deep">Empty cart</p>
              <p className="text-muted-foreground mt-2">Add some gear and let's get you match-ready.</p>
              <Link to="/shop" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-navy text-primary-foreground">Browse shop <ArrowRight className="w-4 h-4" /></Link>
            </div>
          ) : (
            <div className="mt-10 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence>
                  {items.map((it) => (
                    <motion.div key={it.productId} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }}
                      className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
                      <img src={it.image} alt={it.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <Link to="/products/$slug" params={{ slug: it.slug }} className="font-serif text-lg text-navy-deep hover:text-gold">{it.name}</Link>
                        <p className="text-sm text-muted-foreground mt-1">{formatINR(it.unitPrice)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded-full">
                            <button onClick={() => setQty(it.productId, it.quantity - 1)} className="w-8 h-8 hover:text-navy">−</button>
                            <span className="w-8 text-center text-sm">{it.quantity}</span>
                            <button onClick={() => setQty(it.productId, it.quantity + 1)} className="w-8 h-8 hover:text-navy">+</button>
                          </div>
                          <button onClick={() => remove(it.productId)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="font-serif text-lg text-navy-deep">{formatINR(it.unitPrice * it.quantity)}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
                <h2 className="font-serif text-xl mb-5 text-navy-deep">Order summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(sub)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                  <div className="border-t border-border pt-3 flex justify-between font-serif text-lg text-navy-deep"><span>Total</span><span>{formatINR(sub + shipping)}</span></div>
                </div>
                <Link to="/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-navy text-primary-foreground font-medium">Checkout <ArrowRight className="w-4 h-4" /></Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
