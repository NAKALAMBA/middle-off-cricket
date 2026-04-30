import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { LayoutDashboard, Package, ShoppingBag, MessageSquareQuote, LogOut } from "lucide-react";
import type { ReactNode } from "react";

const NAV: { to: "/admin" | "/admin/products" | "/admin/orders" | "/admin/reviews"; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { signOut, user } = useAuth();
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-ink text-foreground">
      <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border p-6 flex flex-col">
        <Link to="/" className="font-serif text-2xl text-navy-deep">
          Middle <span className="text-gold">Off</span>
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Admin</p>
        <nav className="mt-10 space-y-1 flex-1">
          {NAV.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-navy text-primary-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border pt-4 text-xs">
          <p className="text-muted-foreground truncate">{user?.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-3 inline-flex items-center gap-2 text-foreground hover:text-navy"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>
      <main className="ml-64 p-10">
        <h1 className="font-serif text-4xl text-navy-deep mb-8">{title}</h1>
        {children}
      </main>
    </div>
  );
}
