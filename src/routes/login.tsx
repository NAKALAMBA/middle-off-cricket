import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Middle Off" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) return toast.error(error);
    toast.success("Welcome back");
    navigate({ to: "/account" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-ink">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-elevated)]">
        <Link to="/" className="font-serif text-2xl text-navy-deep">Middle <span className="text-gold">Off</span></Link>
        <h1 className="font-serif text-3xl mt-6 text-navy-deep">Welcome back.</h1>
        <p className="text-sm text-muted-foreground mt-2">Sign in to track orders and check out faster.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
          <button disabled={loading} className="w-full py-3 rounded-full bg-navy text-primary-foreground font-medium disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-6">No account? <Link to="/signup" className="text-navy font-medium">Sign up</Link></p>
        <p className="text-xs text-muted-foreground text-center mt-2"><Link to="/admin/login" className="hover:text-navy">Admin login →</Link></p>
      </div>
    </div>
  );
}
