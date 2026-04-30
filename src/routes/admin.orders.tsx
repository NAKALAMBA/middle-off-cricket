import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAdminGuard } from "@/lib/admin-guard";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/product-images";
import type { Tables, Enums } from "@/integrations/supabase/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Admin" }] }),
  component: AdminOrders,
});

type Order = Tables<"orders">;
type Status = Enums<"order_status">;
const STATUSES: Status[] = ["pending", "paid", "shipped", "delivered", "cancelled"];

function AdminOrders() {
  const { ready } = useAdminGuard();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
  };

  useEffect(() => {
    if (ready) void load();
  }, [ready]);

  if (!ready) return null;

  const setStatus = async (id: string, status: Status) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Order updated");
    void load();
  };

  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <AdminShell title="Orders">
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] border transition ${
              filter === s ? "bg-navy text-primary-foreground border-navy" : "border-border hover:border-navy"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background/60">
            <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((o) => (
              <tr key={o.id}>
                <td className="p-4 font-medium">{o.order_number}</td>
                <td className="p-4">
                  <p>{o.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{o.customer_email}</p>
                </td>
                <td className="p-4 font-serif text-navy-deep">{formatINR(o.total_inr)}</td>
                <td className="p-4 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o.id, e.target.value as Status)}
                    className="px-3 py-1.5 rounded-full border border-border bg-background text-xs uppercase tracking-[0.16em]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-muted-foreground">
                  No orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
