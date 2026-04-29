import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, ShoppingBag, Search, User, LogOut, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WicketMark } from "./WicketMark";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Shop", to: "/shop" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const cartCount = useCart((s) => s.count());
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setMenuOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <WicketMark className="w-6 h-6 text-navy transition-transform group-hover:rotate-6" />
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-navy-deep">
            Middle <span className="text-gold">Off</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-foreground/70 hover:text-navy-deep transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              activeProps={{ className: "text-navy-deep font-medium after:w-full" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            aria-label="Search"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-navy hover:text-navy transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-navy hover:text-navy transition-colors"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-[var(--shadow-elevated)] overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted"
                    >
                      <User className="w-4 h-4" /> My account
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted text-navy"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted text-destructive"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium border border-border hover:border-navy hover:text-navy transition-colors"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy text-primary-foreground hover:shadow-[var(--shadow-glow-navy)] transition-shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cart</span>
            <motion.span
              key={cartCount}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="ml-1 w-5 h-5 rounded-full bg-gold text-primary-foreground text-[10px] flex items-center justify-center font-semibold"
            >
              {cartCount}
            </motion.span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="text-base text-foreground/90"
                >
                  {n.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/account" onClick={() => setOpen(false)} className="text-base">My account</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="text-base text-navy">Admin</Link>}
                  <button onClick={handleSignOut} className="text-base text-destructive text-left">Sign out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="text-base">Sign in</Link>
              )}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-navy text-primary-foreground text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" /> Cart ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
