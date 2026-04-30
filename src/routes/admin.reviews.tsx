import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAdminGuard } from "@/lib/admin-guard";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Star, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Admin" }] }),
  component: AdminReviews,
});

type Testimonial = Tables<"testimonials">;

function AdminReviews() {
  const { ready } = useAdminGuard();
  const [items, setItems] = useState<Testimonial[]>([]);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => {
    if (ready) void load();
  }, [ready]);

  if (!ready) return null;

  const toggle = async (t: Testimonial, key: "is_approved" | "is_featured") => {
    const { error } = await supabase.from("testimonials").update({ [key]: !t[key] }).eq("id", t.id);
    if (error) return toast.error(error.message);
    void load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    void load();
  };

  return (
    <AdminShell title="Reviews">
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium">{t.author_name}</p>
                <p className="text-xs text-muted-foreground">{t.author_role}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-sm leading-relaxed">"{t.quote}"</p>
            {t.product_name && (
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-pitch">{t.product_name}</p>
            )}
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => toggle(t, "is_approved")}
                className={`px-3 py-1.5 rounded-full border ${
                  t.is_approved ? "bg-pitch text-primary-foreground border-pitch" : "border-border"
                }`}
              >
                <Check className="w-3 h-3 inline mr-1" />
                {t.is_approved ? "Approved" : "Approve"}
              </button>
              <button
                onClick={() => toggle(t, "is_featured")}
                className={`px-3 py-1.5 rounded-full border ${
                  t.is_featured ? "bg-gold text-navy-deep border-gold" : "border-border"
                }`}
              >
                {t.is_featured ? "Featured" : "Feature"}
              </button>
              <button
                onClick={() => remove(t.id)}
                className="px-3 py-1.5 rounded-full border border-border text-destructive ml-auto"
              >
                <Trash2 className="w-3 h-3 inline mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
      </div>
    </AdminShell>
  );
}
