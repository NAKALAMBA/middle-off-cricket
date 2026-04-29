import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Middle Off" }, { name: "description", content: "Built by players, for players. Honest pricing, premium gear, real cricket analysis." }] }),
  component: () => <div className="min-h-screen bg-background"><Header /><main className="pt-20"><About /></main><Footer /></div>,
});
