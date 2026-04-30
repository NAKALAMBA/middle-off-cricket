import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAdminGuard } from "@/lib/admin-guard";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/product-images";
import { Package, ShoppingBag, IndianRupee, Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin dashboard" }] }),
  component: AdminDashboard,
});

type Stats = {
  products: number;
  orders: number;
  revenue: number;
  pending: number;
};

function AdminDashboard() {
  const { ready } = useAdminGuard();
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, revenue: 0, pending: 0 });
  const [recent, setRecent] = useState<
    { id: string; order_number: string; customer_name: string; total_inr: number; status: string; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      const [{ count: pc }, { data: orders }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("id, order_number, customer_name, total_inr, status, created_at").order("created_at", { ascending: false }),
      ]);
      const all = orders ?? [];
      setStats({
        products: pc ?? 0,
        orders: all.length,
        revenue: all.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total_inr, 0),
        pending: all.filter((o) => o.status === "pending").length,
      });
      setRecent(all.slice(0, 6));
    })();
  }, [ready]);

  if (!ready) return null;

  const cards = [
    { label: "Products", value: stats.products, icon: Package },
    { label: "Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Revenue", value: formatINR(stats.revenue), icon: IndianRupee },
    { label: "Pending", value: stats.pending, icon: Users },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</p>
              <c.icon className="w-4 h-4 text-pitch" />
            </div>
            <p className="font-serif text-3xl text-navy-deep mt-3">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-card border border-border rounded-2xl">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-xl text-navy-deep">Recent orders</h2>
        </div>
        <div className="divide-y divide-border">
          {recent.length === 0 && <p className="p-6 text-sm text-muted-foreground">No orders yet.</p>}
          {recent.map((o) => (
            <div key={o.id} className="p-5 flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-foreground">{o.order_number}</p>
                <p className="text-muted-foreground">{o.customer_name}</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-navy-deep">{formatINR(o.total_inr)}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-pitch">{o.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
