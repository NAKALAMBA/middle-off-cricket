import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Featured } from "@/components/Featured";
import { Categories } from "@/components/Categories";
import { Signature } from "@/components/Signature";
import { About } from "@/components/About";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Middle Off — Where Cricket Gets Serious" },
      {
        name: "description",
        content:
          "Premium cricket media and analytics. Data-driven analysis, deep dives, and stories for fans who see beyond the scoreboard.",
      },
      { property: "og:title", content: "Middle Off — Where Cricket Gets Serious" },
      {
        property: "og:description",
        content:
          "Editorial cricket analysis, heatmaps, wagon wheels, and tactical breakdowns from IPL to Tests.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Featured />
        <Categories />
        <Signature />
        <About />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
