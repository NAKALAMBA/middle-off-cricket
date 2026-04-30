import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin sign in — Middle Off" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success("Signed in");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-ink">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-elevated)]">
        <Link to="/" className="font-serif text-2xl text-navy-deep">
          Middle <span className="text-gold">Off</span>
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-pitch mt-2">Admin console</p>
        <h1 className="font-serif text-3xl mt-4 text-navy-deep">Sign in.</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Restricted access. You'll need an admin role on your account.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            disabled={busy}
            className="w-full py-3 rounded-full bg-navy text-primary-foreground font-medium disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          <Link to="/" className="hover:text-navy">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}
