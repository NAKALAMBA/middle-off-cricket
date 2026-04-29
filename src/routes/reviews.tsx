import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Middle Off" }, { name: "description", content: "Read 2,400+ verified reviews from cricketers across India." }] }),
  component: () => <div className="min-h-screen bg-background"><Header /><main className="pt-20"><Testimonials /></main><Footer /></div>,
});
