import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/product-images";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Middle Off" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "", customer_email: user?.email ?? "", customer_phone: "",
    shipping_address: "", shipping_city: "", shipping_state: "", shipping_pincode: "",
  });

  const sub = subtotal();
  const shipping = sub >= 2000 ? 0 : 99;
  const total = sub + shipping;

  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Cart is empty");
    setLoading(true);
    const { data: order, error } = await supabase.from("orders").insert({
      user_id: user?.id ?? null,
      ...form,
      subtotal_inr: sub, shipping_inr: shipping, total_inr: total,
      status: "pending",
    }).select().single();

    if (error || !order) { setLoading(false); return toast.error(error?.message ?? "Order failed"); }

    const { error: itemsErr } = await supabase.from("order_items").insert(
      items.map((i) => ({
        order_id: order.id, product_id: i.productId, product_name: i.name, product_image: i.image,
        unit_price_inr: i.unitPrice, quantity: i.quantity, line_total_inr: i.unitPrice * i.quantity,
      })),
    );
    setLoading(false);
    if (itemsErr) return toast.error(itemsErr.message);
    clear();
    toast.success("Order placed! " + order.order_number);
    navigate({ to: "/account" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-4xl md:text-5xl text-navy-deep mb-10">Checkout</h1>
          {!user && <p className="mb-6 text-sm text-muted-foreground">Have an account? <Link to="/login" className="text-navy">Sign in</Link> for faster checkout.</p>}
          <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl text-navy-deep mb-2">Shipping details</h2>
              {[
                ["customer_name", "Full name", "text"],
                ["customer_email", "Email", "email"],
                ["customer_phone", "Phone", "tel"],
                ["shipping_address", "Address", "text"],
                ["shipping_city", "City", "text"],
                ["shipping_state", "State", "text"],
                ["shipping_pincode", "Pincode", "text"],
              ].map(([k, label, type]) => (
                <input key={k} type={type} required={k !== "customer_phone"} value={form[k as keyof typeof form]} onChange={(e) => set(k as keyof typeof form, e.target.value)}
                  placeholder={label as string}
                  className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
              ))}
            </div>
            <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
              <h2 className="font-serif text-xl mb-5 text-navy-deep">Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {items.map((i) => (
                  <div key={i.productId} className="flex justify-between"><span className="truncate">{i.name} × {i.quantity}</span><span>{formatINR(i.unitPrice * i.quantity)}</span></div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(sub)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                <div className="flex justify-between font-serif text-lg text-navy-deep border-t border-border pt-2"><span>Total</span><span>{formatINR(total)}</span></div>
              </div>
              <button disabled={loading} className="mt-5 w-full px-5 py-3 rounded-full bg-navy text-primary-foreground font-medium disabled:opacity-60">{loading ? "Placing…" : "Place order"}</button>
              <p className="text-[11px] text-muted-foreground mt-3 text-center">Mock checkout — no payment processed yet.</p>
            </aside>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
