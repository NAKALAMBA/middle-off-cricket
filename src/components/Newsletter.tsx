import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="relative py-28 md:py-36 overflow-hidden bg-navy-deep text-primary-foreground">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.74 0.16 75 / 0.35), transparent 60%)",
        }}
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 mb-6">
            <Mail className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] uppercase tracking-[0.25em] opacity-80">The dressing room</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.02]">
            Early drops. Player tips.<br />
            <span className="italic text-gradient-gold">Straight to your inbox.</span>
          </h2>
          <p className="mt-6 text-white/70 text-lg">
            10% off your first order. Plus a weekly cricket breakdown. No spam, ever.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/15 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              className="px-7 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-[var(--shadow-glow-gold)] transition-shadow inline-flex items-center justify-center gap-2"
            >
              {done ? <><Check className="w-4 h-4" /> Subscribed</> : "Get 10% off"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
