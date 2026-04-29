import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatINR } from "@/lib/product-images";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — Middle Off" }] }),
  component: AccountPage,
});

type Order = { id: string; order_number: string; status: string; total_inr: number; created_at: string };

function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("id, order_number, status, total_inr, created_at").order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data as Order[]) ?? []));
  }, [user]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p>Please sign in</p>
      <Link to="/login" className="px-5 py-2 rounded-full bg-navy text-primary-foreground">Sign in</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h1 className="font-serif text-4xl md:text-5xl text-navy-deep">My account</h1>
          <p className="mt-2 text-muted-foreground">{user.email}</p>

          <h2 className="font-serif text-2xl text-navy-deep mt-12 mb-5">Order history</h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet. <Link to="/shop" className="text-navy">Browse shop</Link>.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex flex-wrap justify-between items-center gap-4 p-5 bg-card border border-border rounded-2xl">
                  <div>
                    <p className="font-serif text-lg text-navy-deep">{o.order_number}</p>
                    <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-muted">{o.status}</span>
                  <p className="font-serif text-lg">{formatINR(o.total_inr)}</p>
                </div>
              ))}
            </div>
          )}

          <button onClick={signOut} className="mt-12 px-5 py-2 rounded-full border border-border hover:border-destructive hover:text-destructive">Sign out</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
