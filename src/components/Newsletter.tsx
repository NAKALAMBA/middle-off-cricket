import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="relative py-28 md:py-36 overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.45 0.08 155 / 0.25), transparent 60%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5">The Analysis Club</p>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.02]">
            Get the <span className="italic text-gradient-gold">middle off</span>
            <br /> your inbox.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Weekly drops. No spam. Just cricket.
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
              className="flex-1 px-5 py-4 rounded-full bg-card border border-border focus:border-gold focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="px-7 py-4 rounded-full bg-gold text-primary-foreground font-medium hover:shadow-[var(--shadow-glow-gold)] transition-shadow inline-flex items-center justify-center gap-2"
            >
              {done ? <><Check className="w-4 h-4" /> Subscribed</> : "Join the Club"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
