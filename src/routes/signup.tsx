import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Middle Off" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) return toast.error(error);
    toast.success("Account created — check your email to verify.");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-ink">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-elevated)]">
        <Link to="/" className="font-serif text-2xl text-navy-deep">Middle <span className="text-gold">Off</span></Link>
        <h1 className="font-serif text-3xl mt-6 text-navy-deep">Create your account.</h1>
        <p className="text-sm text-muted-foreground mt-2">Save addresses, track orders, get 10% off your first kit.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (6+ chars)" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none focus:ring-2 focus:ring-ring" />
          <button disabled={loading} className="w-full py-3 rounded-full bg-navy text-primary-foreground font-medium disabled:opacity-60">{loading ? "Creating…" : "Create account"}</button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-6">Already have one? <Link to="/login" className="text-navy font-medium">Sign in</Link></p>
      </div>
    </div>
  );
}
