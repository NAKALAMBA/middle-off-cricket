import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Middle Off" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-pitch mb-4">Get in touch</p>
            <h1 className="font-serif text-5xl text-navy-deep">Talk to us.</h1>
            <p className="mt-4 text-muted-foreground">Questions about gear, sizing, bulk orders for academies — we reply within 24 hours.</p>
            <div className="mt-10 space-y-5">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-navy" /> hello@middleoff.in</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-navy" /> +91 98 7654 3210</p>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-navy" /> Andheri West, Mumbai 400053</p>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll be in touch."); setForm({ name: "", email: "", message: "" }); }}
            className="bg-card border border-border rounded-3xl p-7 space-y-4 shadow-[var(--shadow-card)]">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-navy focus:outline-none" />
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message" className="w-full px-4 py-3 rounded-2xl bg-background border border-border focus:border-navy focus:outline-none" />
            <button className="w-full px-5 py-3 rounded-full bg-navy text-primary-foreground font-medium">Send message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
