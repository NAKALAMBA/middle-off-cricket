import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAdminGuard } from "@/lib/admin-guard";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, formatINR } from "@/lib/product-images";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Products — Admin" }] }),
  component: AdminProducts,
});

type Product = Tables<"products">;

const empty: TablesInsert<"products"> = {
  slug: "",
  name: "",
  category: "Bats",
  description: "",
  price_inr: 0,
  compare_at_inr: null,
  image_url: null,
  badge: null,
  stock: 0,
  is_active: true,
};

function AdminProducts() {
  const { ready } = useAdminGuard();
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | TablesInsert<"products"> | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => {
    if (ready) void load();
  }, [ready]);

  if (!ready) return null;

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    const payload = { ...editing } as TablesInsert<"products"> & { id?: string };
    const { error } = "id" in payload && payload.id
      ? await supabase.from("products").update(payload).eq("id", payload.id)
      : await supabase.from("products").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Product saved");
    setEditing(null);
    void load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    void load();
  };

  return (
    <AdminShell title="Products">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-primary-foreground text-sm"
        >
          <Plus className="w-4 h-4" /> New product
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background/60">
            <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Active</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((p) => (
              <tr key={p.id}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={resolveProductImage(p.image_url ?? p.slug)}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{formatINR(p.price_inr)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.is_active ? "Yes" : "No"}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setEditing(p)}
                    className="inline-flex items-center gap-1 text-navy hover:underline mr-4"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="inline-flex items-center gap-1 text-destructive hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-muted-foreground">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-card w-full max-w-2xl rounded-2xl border border-border p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-navy-deep">
                {"id" in editing && editing.id ? "Edit product" : "New product"}
              </h2>
              <button onClick={() => setEditing(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  className="input"
                  value={editing.name ?? ""}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Field>
              <Field label="Slug">
                <input
                  className="input"
                  value={editing.slug ?? ""}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                />
              </Field>
              <Field label="Category">
                <select
                  className="input"
                  value={editing.category ?? "Bats"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                >
                  {["Bats", "Pads", "Gloves", "Balls", "Protection", "Footwear"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Badge">
                <input
                  className="input"
                  value={editing.badge ?? ""}
                  onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
                />
              </Field>
              <Field label="Price (INR)">
                <input
                  type="number"
                  className="input"
                  value={editing.price_inr ?? 0}
                  onChange={(e) => setEditing({ ...editing, price_inr: Number(e.target.value) })}
                />
              </Field>
              <Field label="Compare-at (INR)">
                <input
                  type="number"
                  className="input"
                  value={editing.compare_at_inr ?? ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      compare_at_inr: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                />
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  className="input"
                  value={editing.stock ?? 0}
                  onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                />
              </Field>
              <Field label="Image URL or path">
                <input
                  className="input"
                  value={editing.image_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value || null })}
                />
              </Field>
              <Field label="Description" full>
                <textarea
                  className="input min-h-[100px]"
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Field>
              <Field label="Active" full>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.is_active ?? true}
                    onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  />
                  Visible in store
                </label>
              </Field>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-full border border-border">
                Cancel
              </button>
              <button
                onClick={save}
                disabled={busy}
                className="px-6 py-2.5 rounded-full bg-navy text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;padding:0.65rem 0.9rem;border-radius:0.65rem;background:hsl(var(--background, 0 0% 100%));border:1px solid hsl(var(--border));font-size:.875rem;}`}</style>
    </AdminShell>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
